<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'会诊邀请'"></myHeader>
        <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top:2.5rem;" ref="myscroller">
          <div class="aui-content aui-margin-b-15">
              <ul class="aui-list aui-media-list">
                  <li class="aui-list-item aui-list-item-arrow" v-if="tieziArr.length!=0" v-for="item in tieziArr"  @click="toDetail(item.id)">
                      <div class="aui-media-list-item-inner">
                          <div class="aui-list-item-inner">
                             
                              <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                                <div class="aui-pull-left" v-text="item.title"></div>
                                <div class="aui-pull-right" v-text="'诊费：￥'+item.price"></div>
                              </div>
                              <div class="aui-list-item-text aui-ellipsis-2 doctor-answer" v-html="'会诊内容：'+item.content+'...'">
                                
                              </div>
                          </div>
                      </div>
                      <div class="aui-media-list-item-inner doctor-box">
                          <div class="aui-list-item-media">
                              <img src="static/image/user.png" class="aui-img-round">
                          </div>
                          <div class="aui-list-item-inner">
                              <div class="aui-list-item-text doctor">
                                  <div class="aui-list-item-title" v-text="'知源医院'"> </div>
                                  <div class="aui-list-item-right" v-html="item.status"></div>
                              </div>
                          </div>
                      </div>
                  </li>

                  <li class="aui-list-item aui-list-item-middle" style="border-bottom:0px solid #eee" v-show="tieziArr.length == 0">
                    <img src="static/image/no.png" style="width:80%;margin:0.5rem auto">
                  </li>
                
              </ul>
          </div>
        </scroller>
    </div>
  
</template>

<script>
    import $ from '../public/jquery'
    import Vue from 'vue'
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)
    export default {
        name: 'geqian',
        data() {
            return {
               tieziArr: [],
               currentPage: 1,
               pageSize:4,
               isLoadFinish:false, //是否加载完全部数据   
            }
        },
        methods: {
          toDetail(id){
            this.$router.push({"path":"/yqdetail/"+id});
          },
          // 查询数据
          showList() {
              var that = this;
              var start = (that.currentPage-1)*that.pageSize;
              var filter = {
                "order": ["status ASC","createdAt DESC"],
                "where": {
                  "docid": window.localStorage.getItem('userId'),
                  "bankuai": '会诊'
                },
                "skip":start,
                "limit":that.pageSize
              };
              var currentTime = this.getNowFormatDate();
              that.ajax({
                url: "news?filter="+encodeURIComponent(JSON.stringify(filter)),
                method: "get",
                success: function(data) {
                  if(data.length<that.pageSize){
                    if(data.length>0){
                      for(var i=0;i<data.length;i++){
                        if(currentTime > data[i]['endtime']){
                          data[i].status = '<span style="color:green;">已完成</span>';
                        }else{
                          if(data[i].status==1){
                            data[i].status = '<span style="color:green;">已接受</span>';
                          } else {
                            data[i].status = '<span style="color:#f60;">待接受</span>'; 
                          }
                        }
                        data[i]['content'] = that.delHtmlTag(data[i]['content']);
                        data[i]['content'] = data[i]['content'].substr(0,50);
                        that.tieziArr.push(data[i]);
                      }
                    }
                    that.isLoadFinish = true;
                  } else {
                    for(var i=0;i<data.length;i++){
                      if(currentTime > data[i]['endtime']){
                        data[i].status = '<span style="color:green;">已完成</span>';
                      }else{
                        if(data[i].status==1){
                          data[i].status = '<span style="color:green;">已接受</span>';
                        } else {
                          data[i].status = '<span style="color:#f60;">待接受</span>'; 
                        }
                      }
                      data[i]['content'] = that.delHtmlTag(data[i]['content']);
                      data[i]['content'] = data[i]['content'].substr(0,50);
                      that.tieziArr.push(data[i]);
                    }
                  }
                }
              });
           },
           // 时间格式转换,不传参获取当前时间日期
           getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
           // 字符串去除HTML标签
             delHtmlTag(str){
              var msg  = str;
              msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
              msg = msg.replace(/[|]*\n/, '') //去除行尾空格
              msg = msg.replace(/&nbsp;/ig, ' '); //去掉npsp
              msg = msg.replace(/&amp;nbsp;/ig, ' '); //去掉npsp
              msg = msg.replace(/[\r\n]/g," ");//去掉回车换行
              msg = msg.replace(/\s+/g," ");//去掉回车换行
              return msg;
            },
           // 上拉加载更多
           infinite(done) {
            var that = this;
             setTimeout(function(){
                  if(!that.isLoadFinish){
                    that.currentPage++;
                    that.showList();
                  }
                  if(that.isLoadFinish){ // 加载完毕
                    done(true);
                    return;
                  } else {
                    done();
                  }
              }, 500)
            },
            // 下拉刷新
            refresh(done) {
                var that = this;
                setTimeout(function(){
                    that.currentPage = 1;
                    that.tieziArr = [];
                    that.isLoadFinish = false;
                    that.showList();
                    done();
                }, 500);
            },
          },
          mounted() {
            var that = this;
            this.showList();
          },
          deactivated(){
            this.$destroy(true);
          },

    }
</script>

<style scoped>

.price-total {
  position: relative;
  left:0;
  font-size:14px;
  color:#f60;
  height:2rem;
  line-height: 2rem;
  text-align: right;
  padding:0 0.7rem;
  border-bottom: 1px solid #eee;
  z-index: 1000;
  background: #fff;
}
.aui-list .aui-list-item-right, .aui-list-item-title-row em {
  top:0;
}

.aui-list-item-media {
  width:2rem !important;
  height:2rem !important;
  border-radius: 1rem;
  border: 1px solid #eee;
  overflow: hidden;
}
.aui-list-item-media img {
  min-height: 2rem;
  min-width: 2rem;
}
.doctor {
  height:2.2rem;
  line-height: 2.2rem;
  padding-left:0.7rem;
}
.doctor .aui-list-item-title {
  color:#666;
}
.doctor-box {
  padding-top:0.5rem;
}
.doctor-answer {
  margin-top:0.5rem;
}
.aui-label {
  top:-0.1rem;
}
 .aui-pull-left img {
    margin-top: 0.5rem;
    height: 1.25rem;
  }
  .aui-bar-nav {
    background-color: #34DBDA;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index:99999999999
  }
  .aui-list-item-inner{
    margin-right:0;
  }
  .aui-list-item-title {
    font-size: 0.6rem;
  }
  .aui-pull-right {
    color:rgb(39, 181, 177);
  }
</style>
<style>
  ._v-container{
    z-index: 0;
    padding-bottom: 2rem;
  }
  ._v-container ._v-content .loading-layer {
    height:100px !important;
  }
</style>

<template>
    <div style="background-color: white; min-height: 100%;">
      <myHeader :title="'知源资讯'"></myHeader>
      <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top:2.5rem;" ref="myscroller">
        <div class="aui-content aui-margin-b-15">
              <ul class="aui-list aui-media-list">
                  <li class="aui-list-item aui-list-item-arrow" v-if="tieziArr.length!=0" v-for="item in tieziArr" @click="opentiezi(item.id)">
                    <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">

                        <div class="aui-list-item-text aui-ellipsis-2" style="color:#0F0F0F" v-text="item.ttopic">

                        </div>
                        <div class="aui-list-item-text aui-ellipsis-2 doctor-answer" style="color:#666666" v-text="item.tcontents+'...'">

                        </div>
                      </div>
                    </div>
                    <div class="aui-media-list-item-inner doctor-box">
                      <div class="aui-list-item-media">
                        <img :src="(item.tuid && item.tuid.tx)?item.tuid.tx:'static/image/user.png'" class="aui-img-round">
                      </div>
                      <div class="aui-list-item-inner">
                        <div class="aui-list-item-text doctor">
                          <div class="aui-list-item-title" v-text="'知源医院'"> </div>
                          <div class="aui-list-item-right"><div class="aui-label" v-if="item.tsid" v-text="item.tsid?item.tsid.sname:''"></div></div>
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
               //isLoading: false, // 是否加载中，防止一直加载
               toast:null,
               vuegConfig: {
                  disable: false,
                  forwardAnim: 'fadeInRight',
                  duration: '.3',
                  backAnim: 'fadeInLeft'
              }
            }
        },
        methods: {
          opentiezi(id){
            this.$router.push({path:'/tiezi/'+id})
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
          // 查询数据
          showList() {
              var that = this;
              var start = (that.currentPage-1)*that.pageSize;
              var filter = {
                "fields": {"id":true,"ttopic":true,"tcontents":true,"tuid":true,"tsid":true},
                "order": "createdAt DESC",
                "where": {
                  "tType":3
                },
                "skip":start,
                "limit":that.pageSize,
                "include":["tuidPointer","tsidPointer"],
                "includefilter":{"expert":{"fields":['id','name','holder']},"bankuai":{"fields":['id','sname']}}
              };
              that.ajax({
                url: "tiezi?filter="+encodeURIComponent(JSON.stringify(filter)),
                method: "get",
                success: function(data) {
                  if(data.length<that.pageSize){
                    if(data.length>0){
                      for(var i=0;i<data.length;i++){
                        data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                        data[i]['tcontents'] = data[i]['tcontents'].substr(0,50);
                        that.tieziArr.push(data[i]);
                      }
                    }
                    that.isLoadFinish = true;
                  } else {
                    for(var i=0;i<data.length;i++){
                      data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                      data[i]['tcontents'] = data[i]['tcontents'].substr(0,50);
                      that.tieziArr.push(data[i]);
                    }
                  }
                  sessionStorage.removeItem("zhiyuan_zixun");
                  var tempDic = {};
                  tempDic['data'] = that.tieziArr;
                  tempDic['page'] = that.currentPage;
                  sessionStorage.setItem("zhiyuan_zixun", JSON.stringify(tempDic));
                }
              });
           },
           // 上拉加载更多
           infinite(done) {
            var that = this;
             setTimeout(function(){
                  if(!that.isLoadFinish){
                    that.currentPage++;
                    that.showList();
                  }
                  if(that.isLoadFinish){
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
        activated() {
          
        },
       mounted() {
          var that = this;
          this.toast = new auiToast();
          if(sessionStorage.getItem("zhiyuan_zixun")!=null){
            var tmp = JSON.parse(sessionStorage.getItem("zhiyuan_zixun"));
            this.tieziArr = tmp['data'];
            this.currentPage = tmp['page'];
            this.$refs.myscroller.scrollTo(0, tmp['position'], true);
            setTimeout(function () {
              that.$refs.myscroller.scrollTo(0, tmp['position'], true);
            },0)//同步转异步操作tTime
          }else{
            this.showList();
          }
       },
       beforeRouteLeave(to,from,next){//记录离开时的位置
          var tempSession = sessionStorage.getItem("zhiyuan_zixun");
          if (tempSession) {
            var tempDic = JSON.parse(tempSession);
            tempDic['position'] = this.$refs.myscroller.getPosition().top;
            tempDic['page'] = this.currentPage;
            sessionStorage.setItem("zhiyuan_zixun", JSON.stringify(tempDic));
          }
          next()
        },
        beforeRouteEnter(to,from,next){
          if(!sessionStorage.getItem("zhiyuan_zixun")){//当前页面刷新不需要切换位置
            next(vm => {
              //vm.showList();
            });
          }else{
            next(vm => {
              var tmp = JSON.parse(sessionStorage.getItem("zhiyuan_zixun"));
              vm.$refs.myscroller.scrollTo(0, tmp['position'], false);
              setTimeout(function () {
                vm.$refs.myscroller.scrollTo(0, tmp['position'], false);
              },20)//同步转异步操作tTime
            })
          }
       }
    }
</script>

<style scoped>
    .my-middle {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-align: center;
        display: box;
        box-orient: horizontal;
        box-align: center;
    }
    .text {
        width: 16.75rem;
        height: 7rem;
        margin: 0.7rem auto 0;
        padding: 0.3rem;
        font-size: 0.7rem;
        color: #0f0f0f;
        background-color: rgb(250, 250, 250);
        letter-spacing: 0.1rem;
    }
    .exitBg {
        height: 5rem;
    }
    .exit {
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        color: #f22a2a;
        background-color: rgb(240, 240, 240);
        width: 7.5rem;
        margin: 0 auto;
        text-align: center;
    }
  h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}

.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #0fc37c;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}

.mark1 {
  background-color: red;
}

.mark2 {
  background-color: blue;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
.myred{
    height:15px;
    width:55px;
    background:red;
    position:relative;
    float:left;
    margin-left:20px;
    margin-top:10px
}
.myblue{
    height:15px;
    width:55px;
    background:blue;
    position:relative;
    float:left;
    margin-left:20px;
    margin-top:10px
}
.button1{
     border:1px solid #d1d1d1;
     background:#fff;
     height:30px;
     width:67px;
     color:#d1d1d1;
     border-radius:15px

}

.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
.l1{
    color:#34DBDA;
    border:1px solid #34DBDA;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:60px;
    margin-left:10px
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
  .fatie-btn {
    position:absolute;
    right:0.7rem;
    top:0;
  }
  .fatie-btn a {
    font-size:14px;
  }
  .aui-list-item-inner{
    margin-right:0;
  }
  .aui-list-item-title {
    font-size: 0.6rem;
  }
</style>

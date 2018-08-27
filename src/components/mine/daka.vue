<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'患者评价'"></myHeader>
        <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top:2.5rem;" ref="myscroller">
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle" v-if="tieziArr" v-for="item in tieziArr">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img :src="(item.brid && item.brid.Tx)?item.brid.Tx:'static/image/1.jpg'" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14" v-text="'住院患者：'+((item.brid && item.brid.realname)?item.brid.realname:item.brid.username)">林洪生</div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px" v-text="'留言内容：'+item.pjcontent+'...'">
                            
                        </div>
                        <div class="aui-list-item-text yuding-time pingjia-num" style="margin-left:11px" v-text="'评价分数：'+item.pingfen">
                            
                        </div>
                    </div>
                </div>
            </li>

            <li class="aui-list-item aui-list-item-middle" style="border-bottom:0px solid #eee" v-show="tieziArr.length == 0">
              <img src="static/image/no.png" style="width:80%;margin:0.5rem auto">
            </li>
           
        </ul>
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
          // 查询数据
          showList() {
              var that = this;
              var start = (that.currentPage-1)*that.pageSize;
              var filter = {
                "order": "createdAt DESC",
                "where": {
                  "did": window.localStorage.getItem('userId')
                },
                "skip":start,
                "limit":that.pageSize,
                "include":"bridPointer",
                "includefilter":{"my_user":{"fields":['id','username','realname','Tx']}}
              };
              that.ajax({
                url: "pingjia?filter="+encodeURIComponent(JSON.stringify(filter)),
                method: "get",
                success: function(data) {
                  if(data.length<that.pageSize){
                    if(data.length>0){
                      for(var i=0;i<data.length;i++){
                        data[i]['pjcontent'] = data[i]['pjcontent']?data[i]['pjcontent'].substr(0,12):'';
                        that.tieziArr.push(data[i]);
                      }
                    }
                    that.isLoadFinish = true;
                  } else {
                    for(var i=0;i<data.length;i++){
                      data[i]['pjcontent'] = data[i]['pjcontent']?data[i]['pjcontent'].substr(0,12):'';
                      that.tieziArr.push(data[i]);
                    }
                  }
                  sessionStorage.removeItem("pingjia_list");
                  var tempDic = {};
                  tempDic['data'] = that.tieziArr;
                  tempDic['page'] = that.currentPage;
                  sessionStorage.setItem("pingjia_list", JSON.stringify(tempDic));
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
          if(sessionStorage.getItem("pingjia_list")!=null){
            var tmp = JSON.parse(sessionStorage.getItem("pingjia_list"));
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
          var tempSession = sessionStorage.getItem("pingjia_list");
          if (tempSession) {
            var tempDic = JSON.parse(tempSession);
            tempDic['position'] = this.$refs.myscroller.getPosition().top;
            tempDic['page'] = this.currentPage;
            sessionStorage.setItem("pingjia_list", JSON.stringify(tempDic));
          }
          next()
        },
        beforeRouteEnter(to,from,next){
          if(!sessionStorage.getItem("pingjia_list")){//当前页面刷新不需要切换位置
            next(vm => {
              //vm.showList();
            });
          }else{
            next(vm => {
              var tmp = JSON.parse(sessionStorage.getItem("pingjia_list"));
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
    .order-status {
      width:100%;
      text-align: right;
      color:rgb(255, 152, 0);
      font-size:14px;
    }
    .aui-list-item-inner.aui-list-item-arrow {
      padding-right: 0rem;
      margin-right: 0rem;
    }
    .yuding-time {
      font-size:12px;
      color:#666;
      margin:0.4rem 0;
    }
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
.pingjia-num {
  color:rgb(229,28,35);
  margin-bottom: 0;
}
</style>

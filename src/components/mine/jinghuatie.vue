<template>
    <div style="background-color: white; min-height: 100%;">
      <div>
        <div class="aui-bar"></div>
        <header class="aui-bar aui-bar-nav">
          <div class="aui-pull-left" @click="closewin">
            <img src="static/image/fanhui@3x.png" style="height:1.1rem;margin-top:0.55rem">
          </div>
          <div class="aui-title">医生帖子</div>
          <div class="fatie-btn">
            <!-- <a href="javascript:;" >发帖</a> -->
            <img src="static/image/fatie@2x.png" style="height:1.1rem;margin:0.55rem 0 0 0" @click="openfatie()">
          </div>
        </header>
      </div>

      <div class="search-type">
        <div class="one">
          <div class="left" v-text="bankuai_name"></div>
          <div class="right" @click="bankuaiChoice"><img :src="isShowSearchList?'static/image/top.png':'static/image/bottom.png'"></div>
        </div>
        <ul class="two" style="display:none">
          <li @click="search('','全部')" v-bind:class="{activeStatus:!tsid}">全部</li>
          <li v-for="item in bankuaiarr" v-text="item.sname" @click="search(item.id,item.sname)" v-bind:class="{activeStatus:(item.id==tsid)}"></li>
        </ul>
      </div>

      <div class="mark-screen" v-show="isMark" @click="hideMenu"></div>

      <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top:4.5rem;" ref="myscroller">
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
                          <div class="aui-list-item-title" v-text="(item.tuid && item.tuid.name?item.tuid.name:item.tuid.mobile)+' '+(item.tuid && item.tuid.holder?item.tuid.holder:'')"> </div>
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
               toast: null,
               isShowSearchList: false,
               bankuai_name: '全部',
               isMark: false,
               bankuaiarr: [],
               tsid: '',
               ischeck: false,
               //isLoading: false, // 是否加载中，防止一直加载
               vuegConfig: {
                  disable: false,
                  forwardAnim: 'fadeInRight',
                  duration: '.3',
                  backAnim: 'fadeInLeft'
              }
            }
        },
        methods: {
          // 是否签约判断
          isSignCheck() {
            var that = this;
            var filter = {
              fields:{"id":true,"ischeck":true},
              where:{
                id:window.localStorage.getItem('userId')
              }
            };
            that.ajax({
              url:'expert?filter='+encodeURIComponent(JSON.stringify(filter)),
              method:"get",
              success:function(data2){
                if(data2.length>0){
                  if(data2[0]['ischeck']==1){
                    that.ischeck = true;
                  }else{
                    that.ischeck = false;
                  }
                }
              }
            })
          },
          search(param,param2) {
            this.tsid = param;
            this.bankuai_name = param2;
            this.isMark = false;
            this.isShowSearchList = false;
            var that = this;
            setTimeout(function(){
              that.isMark = false;
            }, 400);
            $('.search-type .two').slideUp();
            that.currentPage = 1;
            that.tieziArr = [];
            that.$refs.myscroller.finishInfinite(0);
            that.isLoadFinish = false;
            this.showList();
          },
          bankuaiChoice() {
            var that = this;
            if(this.isShowSearchList){
              this.isShowSearchList = false;
              setTimeout(function(){
                that.isMark = false;
              }, 400);
              $('.search-type .two').slideUp();
            }else{
              this.isShowSearchList = true;
              this.isMark = true;
              $('.search-type .two').slideDown();
            }
          },
          // 查询板块
          bankuai_list() {
            var that = this;
            var filter = {
              "fields":{"id":true,"sname":true}
            };
            that.ajax({
              url:'bankuai?filter='+encodeURIComponent(JSON.stringify(filter)),
              method: 'get',
              success:function(data){
                that.bankuaiarr = data;
              }
            })
          },
          hideMenu() {
            var that = this;
            this.isShowSearchList = false;
            setTimeout(function(){
              that.isMark = false;
            }, 400);
            $('.search-type .two').slideUp();
          },
          openfatie(){
            if(window.localStorage.getItem('userId')){
              if(this.ischeck){
                this.$router.push({path:'/fatie'})
              }else{
                this.toast.fail({
                    title:"您未签约，禁止发帖",
                    duration:2000
                });
              }
            }else{
              this.$router.push({path:'/login'})
            }
          },
          openzhifu:function(){
           this.$router.push({path:'/mingyi'})
          },
          opentiezi(id){
            this.$router.push({path:'/tiezi/'+id})
          },
          closewin:function() {
            var _this = this;
            _this.$router.back();
          },
          // 查询数据
          showList() {
              var that = this;
              var start = (that.currentPage-1)*that.pageSize;
              var filter = {
                "fields": {"id":true,"ttopic":true,"tcontents":true,"tuid":true,"tsid":true},
                "order": "createdAt DESC",
                "where": {
                  "tflag":0,
                  "if_delete": "1",
                  "tType":0
                },
                "skip":start,
                "limit":that.pageSize,
                "include":["tuidPointer","tsidPointer"],
                "includefilter":{"expert":{"fields":['id','name','holder','tx','mobile']},"bankuai":{"fields":['id','sname']}}
              };
              if(that.tsid) {
                filter['where']['tsid'] = that.tsid;
              }
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
                  sessionStorage.removeItem("doctor_tiezi");
                  var tempDic = {};
                  tempDic['data'] = that.tieziArr;
                  tempDic['page'] = that.currentPage;
                  sessionStorage.setItem("doctor_tiezi", JSON.stringify(tempDic));
                }
              });
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
        activated() {
          this.isSignCheck();
        }, 
       mounted() {
          var that = this;
          this.toast = new auiToast();
          this.bankuai_list();
          if(sessionStorage.getItem("doctor_tiezi")!=null){
            var tmp = JSON.parse(sessionStorage.getItem("doctor_tiezi"));
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
          this.isMark = false;
          this.isShowSearchList = false;
          $('.search-type .two').hide();
          var tempSession = sessionStorage.getItem("doctor_tiezi");
          if (tempSession) {
            var tempDic = JSON.parse(tempSession);
            tempDic['position'] = this.$refs.myscroller.getPosition().top;
            tempDic['page'] = this.currentPage;
            sessionStorage.setItem("doctor_tiezi", JSON.stringify(tempDic));
          }
          next()
        },
        beforeRouteEnter(to,from,next){
          if(!sessionStorage.getItem("doctor_tiezi")){//当前页面刷新不需要切换位置
            next(vm => {
              //vm.showList();
            });
          }else{
            next(vm => {
              var tmp = JSON.parse(sessionStorage.getItem("doctor_tiezi"));
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
  font-size: 0.64rem;
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
  /* 版块搜索开始 */
  .search-type {
    background: #fff;
    height:2rem;
    z-index:100;
    position: relative;
    width:100%;
    border-bottom: 1px solid #eee;
  }
  .search-type .one {
    width:100%;
    height:2rem;
  }
  .search-type .one .left{
    position: absolute;
    width:auto;
    height:2rem;
    top:0;
    left:0;
    right:3rem;
    text-align: left;
    padding-left:0.5rem;
    line-height: 2rem;
    color:#666;
    font-size:0.65rem;
  }
  .search-type .one .right{
    position: absolute;
    width:3rem;
    height:2rem;
    right:0;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left:1px solid #eee;
  }
  .search-type .one .right img {
    height:0.5rem;    
  }
  .search-type .two {
    position:absolute;
    left:0;
    top:2rem;
    width:100%;
    background: #fff;
    z-index: 2000;
  }
  .search-type .two li {
    height:1.8rem;
    line-height: 1.8rem;
    padding:0 0.5rem;
    border-bottom: 1px solid rgb(238,238,238);
    color:#666;
    font-size:0.65rem;
    background: #fff;
  }
  .mark-screen {
    background: rgba(0,0,0,0.6);
    position: fixed;
    left:0;
    right:0;
    top:4.25rem;
    bottom:0;
    z-index: 20;
  }
  .activeStatus{
    color:#f60 !important;
  }
  /* 版块搜索结束 */
</style>

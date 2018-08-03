<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'门诊患者跟踪'"></myHeader>
    <div class="aui-tab" id="tab" style="position:fixed;width:100%;z-index:1">
      <div class="aui-tab-item aui-active" v-if="myindex==0" @click="selectmenu(0)">门诊患者在线</div>
      <div class="aui-tab-item " v-if="myindex!=0" @click="selectmenu(0)">门诊患者在线</div> 
      <div class="aui-tab-item aui-active" v-if="myindex==1" @click="selectmenu(1)">患者打卡</div>
      <div class="aui-tab-item " v-if="myindex!=1" @click="selectmenu(1)">患者打卡</div> 
    </div>
    <div  v-if="myindex==0">
      <scroller :on-refresh="refresh" :on-infinite="infinite1" style="padding-top:4.5rem;height:auto !important" ref="myscroller">
        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-media-list">

            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu2(item.patientid.id,item.startdate,item.enddate,item.CRNumber)" v-for="item in tieziArr" >
             <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media" style="width: 3rem;">
                <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-text" style="margin-left:11px">
                  <div class="aui-list-item-title aui-font-size-14">患者：{{item.patientid.realname?item.patientid.realname:''}}</div>
                </div>
                <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                  预约：{{item.startdate}}-{{item.enddate}} 线上诊疗
                </div>
                <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                  诊疗时间：{{item.servicetime}}分钟
                </div>
                <div class="aui-list-item-text" style="margin-left:11px">
                  <div class="order-status">查看详情</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
  <div  v-if="myindex==1">
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-media-list">

       <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
         <div class="aui-media-list-item-inner">
          <div class="aui-list-item-media" style="width: 3rem;">
            <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
          </div>
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div class="aui-list-item-text" style="margin-left:11px">
              <div class="aui-list-item-title aui-font-size-14">患者：林洪生</div>
            </div>
            <div class="aui-list-item-text yuding-time" style="margin-left:11px">
              病房号：90000001
            </div>
            <div class="aui-list-item-text yuding-time" style="margin-left:11px">
              住院时间：2018-05-10 下午12:30
            </div>
            <div class="aui-list-item-text" style="margin-left:11px">
              <div class="order-status">打卡记录</div>
            </div>
          </div>
        </div>
      </li>
      <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
       <div class="aui-media-list-item-inner">
        <div class="aui-list-item-media" style="width: 3rem;">
          <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
        </div>
        <div class="aui-list-item-inner aui-list-item-arrow">
          <div class="aui-list-item-text" style="margin-left:11px">
            <div class="aui-list-item-title aui-font-size-14">患者：林洪生</div>
          </div>
          <div class="aui-list-item-text yuding-time" style="margin-left:11px">
            病房号：90000001
          </div>
          <div class="aui-list-item-text yuding-time" style="margin-left:11px">
            住院时间：2018-05-10 下午12:30
          </div>
          <div class="aui-list-item-text" style="margin-left:11px">
            <div class="order-status">打卡记录</div>
          </div>
        </div>
      </div>
    </li>

  </ul>
</div>
</div>
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
     myindex:0,
     tieziArr: [],
     currentPage: 1,
     pageSize:8,
     isLoadFinish:false, //是否加载完全部数据
     //isLoading: false, // 是否加载中，防止一直加载
   }
 },
 methods: {
          //获取用户信息函数
          selectmenu:function(index){

            this.myindex=index

          },
          openzhifu:function(){
            this.$router.push({path:'/zhifu'})
          },
          openzhifu2:function(id,startdate,enddate,crnumber){
            var JZTime = startdate+'-'+enddate
            console.log(JZTime)
            sessionStorage.setItem("hz_id", id);
            sessionStorage.setItem("JZTime", JZTime);
            sessionStorage.setItem("crnumber", crnumber);
            this.$router.push({path:'/zhifu1'})
          },
           // 首次加载获取用户信息
          //  getMy_user(){
          //   var that = this
          //   var url = 'my_user'
          //   var method = 'GET';
          //   that.ajax({url,method,success:function(data){
          //     that.userData = data
          //   }})

          // },
           // 查询数据
           getMy_user() {
            var that = this;
            var start = (that.currentPage-1)*that.pageSize;

            var filter = {
              "fields": {"id":true,"startdate":true,"enddate":true,"servicetime":true,"servieceid":true,"patientid":true},
              "order": "createdAt DESC",
              "where": {
                "info":1,
                "status":1
              },
              "skip":start,
              "limit":that.pageSize,
              "include":"patientidPointer",
              "includefilter":{"my_user":{"fields":['id','realname',]}}
            };
            that.ajax({
              url: "appointment?filter="+encodeURIComponent(JSON.stringify(filter)),
              method: "get",
              success: function(data) {
                if (data) {
                  if(data.length<that.pageSize){
                    if(data.length>0){
                      for(var i=0;i<data.length;i++){
                        that.tieziArr.push(data[i]);
                      }
                    }
                    that.isLoadFinish = true;
                  } else {
                    for(var i=0;i<data.length;i++){
                      that.tieziArr.push(data[i]);
                    }
                  }
                  sessionStorage.removeItem("hz_list");
                  var tempDic = {};
                  tempDic['data'] = that.tieziArr;
                  tempDic['page'] = that.currentPage;
                  sessionStorage.setItem("hz_list", JSON.stringify(tempDic));
                }
              }
            });
          },
           // 上拉加载更多
           infinite1(done) {
            //done(true);return;
            var that = this;
            setTimeout(function(){
              if(!that.isLoadFinish){
                that.currentPage++;
                that.getMy_user();
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
                that.getMy_user();
                done();
              }, 500);
            },
          },
          activated() {
            // this.getMy_user()
          },
          created() {


          },
          mounted() {
            console.log(sessionStorage.getItem("hz_list"));
            var that = this;
            // this.toast = new auiToast();
            if(sessionStorage.getItem("hz_list")!=null){
              var tmp = JSON.parse(sessionStorage.getItem("hz_list"));
              this.tieziArr = tmp['data'];
              this.currentPage = tmp['page'];
              this.$refs.myscroller.scrollTo(0, tmp['position'], true);
              setTimeout(function () {
                that.$refs.myscroller.scrollTo(0, tmp['position'], true);
            },0)//同步转异步操作tTime
            }else{
              this.getMy_user();
            }
          },
       beforeRouteLeave(to,from,next){//记录离开时的位置
        var tempSession = sessionStorage.getItem("hz_list");
        if (tempSession) {
          var tempDic = JSON.parse(tempSession);
          tempDic['position'] = this.$refs.myscroller.getPosition().top;
          tempDic['page'] = this.currentPage;
          sessionStorage.setItem("hz_list", JSON.stringify(tempDic));
        }
        next()
      },
      beforeRouteEnter(to,from,next){
          if(!sessionStorage.getItem("hz_list")){//当前页面刷新不需要切换位置
            next(vm => {
              vm.getMy_user();
            });
          }else{
            next(vm => {
              var tmp = JSON.parse(sessionStorage.getItem("hz_list"));
              vm.$refs.myscroller.scrollTo(0, tmp['position'], false);
              setTimeout(function () {
                vm.$refs.myscroller.scrollTo(0, tmp['position'], false);
              },20)//同步转异步操作tTime
            })
          }
        },
        components: {

        }
      }
      </script>

      <style  scoped>
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
     .l1{
      color:#27B5B1;
      border:1px solid #27B5B1;
      border-radius:8px;
      font-size:12px;
      background:#fff;
      width:50px;
      margin-left:10px
    }
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
      font-size:12px !important;
      color:#666;
      margin:0.15rem 0;
    }
    </style>

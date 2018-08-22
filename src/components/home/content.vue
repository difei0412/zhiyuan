<template style="background: #ffffff;">
  <div>
    <div style="width:100%;height:2.25rem;"></div>
    <div class="aui-tips aui-margin-b-15" id="tips-1" v-show="isTips">
      <i class="aui-iconfont aui-icon-info"></i>
      <div class="aui-tips-title">知源会诊邀请<span style="color:#f60;margin-left:0.5rem" @click="toYaoqing">去接受</span></div>
      <i class="aui-iconfont aui-icon-close" @click="closeTips"></i>
    </div>
    <div  class="swiper-container" style="width:100%;">
      <div class="swiper-wrapper" style="width:100%;height:100%">
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/myim1.jpeg"   />
        </div>
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/myim1.jpeg"   />
        </div>
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/myim1.jpeg"   />
        </div>
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/myim1.jpeg"   />
        </div>

      </div>
      <div class="swiper-pagination"></div>
    </div>
    <section class="aui-grid">
      <div class="row aui-text-center">
        <div class="aui-col-xs-3" @click="openRouter()">
          <img style="width:3rem;margin: auto;" src="static/image/xszs.png"   />
          <p style="color:#0F0F0F">线上诊室</p>
        </div>
        <div class="aui-col-xs-3" @click="openRouter1()">
          <img style="width:3rem;margin: auto;" src="static/image/zyzx.png"   />
          <p style="color:#0F0F0F">知源资讯</p>
        </div>
        <div class="aui-col-xs-3" @click="openRouter2()">
          <img style="width:3rem;margin: auto;" src="static/image/genzong.png"   />
          <p style="color:#0F0F0F">患者跟踪</p>
        </div>
        <div class="aui-col-xs-3" @click="openRouter3()">
          <img style="width:3rem;margin: auto;" src="static/image/zyrz.png"   />
          <p style="color:#0F0F0F">住院日志</p>
        </div>
      </div>

    </section>
    
    <!-- 最新帖子和精华帖 << start >> -->
    <div class="aui-content aui-margin-b-10">
      <ul class="aui-list aui-media-list">
        <li class="aui-list-header" style="background:#eee">
         <div class="recent-btn">
          <p>最新帖子</p>
        </div>
        <div class="jinghua-btn">
          <p @click="openjinghua" style="color:#666">更多</p>
        </div>
      </li>
      <div v-if="tieziArr" v-for="item in tieziArr" @click="opentiezi(item.id)">
        <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
          <div class="aui-media-list-item-inner">
            <div class="aui-list-item-inner">

              <div class="aui-list-item-text aui-ellipsis-2" style="color:#0F0F0F" v-text="item.ttopic">

              </div>
              <div class="aui-list-item-text aui-ellipsis-2 doctor-answer" style="color:#666666" v-text="item.tcontents.substr(0,45)+'...'">

              </div>
            </div>
          </div>
        </li>
        <li class="aui-list-item doctor-box">
          <div class="aui-media-list-item-inner">
            <div class="aui-list-item-media">
              <img :src="item.tuid.tx?item.tuid.tx:'static/image/user.png'" class="aui-img-round">
            </div>
            <div class="aui-list-item-inner">
              <div class="aui-list-item-text doctor">
                <div class="aui-list-item-title" v-text="item.tuid.name+' '+item.tuid.holder"> </div>
                <div class="aui-list-item-right"><div class="aui-label" v-if="item.tsid" v-text="item.tsid?item.tsid.sname:''"></div></div>
              </div>
            </div>
          </div>
        </li>
      </div>


      <li class="aui-list-item aui-list-item-arrow"></li>

    </ul>

  </div>
  <!-- 最新帖子和精华帖 << end >> -->

</div>
</template>

<style scoped>
@import url("/static/css/swiper.min.css");
</style>
<script src="sha.js"></script>
<script>
import $ from '../public/jquery'
import Swiper from '../public/swiper.min.js'
import Vue from 'vue'

export default {
  name: 'content1',
  data() {
    return {
        mylist : [],
        myIndex : -1,
        userId: "",
        sessionName: 'scrollForHome',
        tieziArr: [], // 帖子数据展示
        toast: null,
        isTips: true,
        readNum: 0,
      }
    },
    methods:{
      openjinghua() {
        this.$router.push({name:'jinghuatie'})
      },
      opentiezi(tid){
        this.$router.push({path:'/tiezi/'+tid})
      },
      openRouter:function(){
        if(window.localStorage.getItem('userId')){
          this.$router.push({path:'/mingyilist'})
        }else{
          this.$router.push({name:'login'})
        }
      },
      openRouter1:function(){
       this.$router.push({path:'/zixun'})
     },
     openRouter2:function(){
      if(window.localStorage.getItem('userId')){
        this.$router.push({path:'/zhenshi'})
      }else{
        this.$router.push({name:'login'})
      }
    },
    openRouter3:function(){
      if(window.localStorage.getItem('userId')){
        this.$router.push({path:'/jianhu'})
      }else{
        this.$router.push({name:'login'})
      }
    },
    toYaoqing() {
      this.$router.push({path:'/yqlist'})
    },
    closeTips() {
      this.isTips = false;
    },
    showList() {
      var that = this;
      var filter = {
        "order": "createdAt DESC",
        "where": {
          "tflag":0,
          "if_delete": "1",
          "tType":0
        },
        "limit":4,
        "include":["tuidPointer","tsidPointer"],
        "includefilter":{"expert":{"fields":['id','name','holder',"tx"]},"bankuai":{"fields":['id','sname']}}
      };
      that.ajax({
        url: "tiezi?filter="+encodeURIComponent(JSON.stringify(filter)),
        method: "get",
        success: function(data) {
          for(var i=0;i<data.length;i++){
            data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
            data[i]['tcontents'] = data[i]['tcontents'].substr(0,45);
            that.tieziArr.push(data[i]);
          }
        }
      });
    }, 
       // 置顶资讯
       showList2() {
        var that = this;
        var filter = {
          "order": "updatedAt DESC",
          "where": {
            "tflag":0,
            "if_delete": "1",
            "if_top":"1",
              "tType":3 // 官方后台发帖
            },
            "limit":2,
            "include":["tuidPointer","tsidPointer"],
            "includefilter":{"expert":{"fields":['id','name','holder']},"bankuai":{"fields":['id','sname']}}
          };
          that.ajax({
            url: "tiezi?filter="+encodeURIComponent(JSON.stringify(filter)),
            method: "get",
            success: function(data) {
              if(data.length==0){ // 没有置顶记录
                var limit=2;
                that.showList3(limit);
              } else if (data.length==1) { // 查询到一条置顶
                var limit=1;
                for(var i=0;i<data.length;i++){
                  data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                  data[i]['tcontents'] = data[i]['tcontents'].substr(0,45);
                  that.tieziArr.push(data[i]);
                }
                that.showList3(limit);
              } else {
                for(var i=0;i<data.length;i++){
                  data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                  data[i]['tcontents'] = data[i]['tcontents'].substr(0,45);
                  that.tieziArr.push(data[i]);
                }
              }
            }
          });
        },
       // 非置顶资讯
       showList3(param) {
        var that = this;
        var filter = {
          "order": "updatedAt DESC",
          "where": {
            "tflag":0,
            "if_delete": "1",
            "if_top":"0",
              "tType":3 // 官方后台发帖
            },
            "limit":param,
            "include":["tuidPointer","tsidPointer"],
            "includefilter":{"expert":{"fields":['id','name','holder']},"bankuai":{"fields":['id','sname']}}
          };
          that.ajax({
            url: "tiezi?filter="+encodeURIComponent(JSON.stringify(filter)),
            method: "get",
            success: function(data) {
              for(var i=0;i<data.length;i++){
                data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                data[i]['tcontents'] = data[i]['tcontents'].substr(0,45);
                that.tieziArr.push(data[i]);
              }
            }
          });
        },
       // 字符串去除HTML标签
       delHtmlTag(str){
        return str.replace(/<[^>]+>/g,"");
      },
       // 是否存在会诊邀请
       yaoqing() {
        var currentTime = this.getNowFormatDate();
        var that = this;
        var filter = {
          "where": {
            "docid": window.localStorage.getItem('userId'),
            "status": {'inq':[0,null]},
            "bankuai": '会诊',
            "endtime": {"gte":currentTime}
          }
        };
        that.ajax({
          url: "news/count?filter="+encodeURIComponent(JSON.stringify(filter)),
          method: "get",
          success: function(data) {
            if(data.count>0){
              that.isTips = true;
            }else{
              that.isTips = false;
            }
          }
        });
      },
      // 是否存在未读消息
       readMsg() {
        var that = this;
        var filter = {
          "order": "createdAt DESC",
          "where": {
            "user_id": {"like":window.localStorage.getItem('userId')},
            "if_read": "{'inq':[0,null]}",
          }
        };
        that.ajax({
          url: "message_push/count?filter="+encodeURIComponent(JSON.stringify(filter)),
          method: "get",
          success: function(data) {
            that.readNum = data.count;
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
    },
    mounted () {
    this.toast = new auiToast();
    this.showList2();
    this.showList();
    var swiper = new Swiper('.swiper-container', {
      autoplay:2500,
      mode: 'horizontal',
      pagination: '.swiper-pagination',
                                            //loop: true,
                                            observer: true,//修改swiper自己或子元素时，自动初始化swiper
                                            observeParents: true//修改swiper的父元素时，自动初始化swiper
                                          });


  },
  created:function() {
    var swiper = new Swiper('.swiper-container', {
      autoplay:2500,
      mode: 'horizontal',
      pagination: '.swiper-pagination',
                                            //loop: true,
                                            observer: true,//修改swiper自己或子元素时，自动初始化swiper
                                            observeParents: true//修改swiper的父元素时，自动初始化swiper
                                          });
  },
  activated() {
    this.yaoqing();
    this.readMsg();
  },
  watch: {
    '$route'(to, from) {
      if (from.name == "mylable") {
        this.chooseData();
      }
    }
  }
}
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 0px;
  padding-bottom: calc(100% * 695 / 1240.0);
  overflow:hidden;
  margin: 0;
  position:relative;
}
.img-container img {
  position:absolute;
  width: 100%;
  height: 100%;
}
.img-noVide-container {
  width: 100%;
  height: 0px;
  padding-bottom: calc(100% * 245 / 375.0);
  overflow:hidden;
  margin: 0;
  position:relative;
}
.img-noVide-container img {
  position:absolute;
  width: 100%;
  height: 100%;
}
.my-middle {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: center;
  display: box;
  box-orient: horizontal;
  box-align: center;
}
.headTitle {
  position: fixed;
  width: 100%;
  height: 2rem;
  top: 2.25rem;
  left: 0;
  z-index: 10;
  overflow: hidden;
  background-color: white;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  border-bottom: 1px solid #eee;
}
.chooseImageBg {
  width: 2.5rem;
  height: 100%;
  position: absolute;
  right:0;
  top: 0;
}
.chooseImage {
  width: 100%;
  height: 1rem;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  border-left: 1px solid #eee;
}
.chooseImage img {
  width: 0.75rem;
}
.head {
  float: left;
  width: calc(100% - 2.5rem);
  height: calc(2rem + 10px);
  line-height: 2rem;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.head_activate {
  width: 100%;
}
.head::-webkit-scrollbar {
  display: none;
}
.head li {
  display: inline-block;
  height: 2rem;
  line-height: 2rem;
  padding: 0 10px;
  position: relative;
}
.carve {
  position: absolute;
  width: 100%;
  top: 0.5rem;
  left: 0;
  height: 1rem;
  line-height: 1rem;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  border-right: 1px solid #eee;
}
.head li span {
  display: inline-block;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.8rem;
}
.head li:nth-last-child(1) :nth-child(1) {
  border-right: none;
}
.nav_active {
  color: #f22a2a;
  border-bottom: 3px solid #f22a2a;
}
.aui-list .aui-list-item-media {
  width: 6rem;
}
.H-position-center-all {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
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
.recent-btn p {
  font-size:14px;
  color:#333;
}
.jinghua-btn p {
  font-size:14px;
  color:#34DBDA;
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
  padding-top:0rem;
}
.doctor-answer {
  margin-top:0.5rem;
  font-size: 0.64rem;
}
.aui-label {
  top:-0.1rem;
}
.aui-list-item-inner{
  margin-right:0;
}
.aui-list-item-title {
  font-size: 0.6rem;
}
.aui-tips {
  position: fixed;
  top:2.25rem;
}
</style>

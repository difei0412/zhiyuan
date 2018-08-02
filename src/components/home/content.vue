<template style="background: #ffffff;">
  <div>
    <div  class="swiper-container" style="width:100%;margin-top:40px">
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
            <i class="aui-iconfont aui-icon-display"></i>
            <p>线上诊室</p>
        </div>
        <div class="aui-col-xs-3" @click="openRouter1()">
            <i class="aui-iconfont aui-icon-date"></i>
            <p>知源资讯</p>
        </div>
         <div class="aui-col-xs-3" @click="openRouter2()">
            <i class="aui-iconfont aui-icon-cert"></i>
            <p>门诊患者跟踪</p>
        </div>
         <div class="aui-col-xs-3" @click="openRouter3()">
            <i class="aui-iconfont aui-icon-video"></i>
            <p>住院日志</p>
        </div>
    </div>

    </section>
    
    <!-- 最新帖子和精华帖 << start >> -->
    <div class="aui-content aui-margin-b-10">
          <ul class="aui-list aui-media-list">
              <li class="aui-list-header">
                 <div class="recent-btn">
                      <p>最新帖子</p>
                  </div>
                 <div class="jinghua-btn">
                      <p @click="openjinghua">更多</p>
                 </div>
              </li>
              <div v-if="tieziArr" v-for="item in tieziArr" @click="opentiezi(item.id)">
                <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-inner">
                           
                            <div class="aui-list-item-text aui-ellipsis-2" style="color:#000" v-text="item.ttopic">
                              
                            </div>
                            <div class="aui-list-item-text aui-ellipsis-2 doctor-answer" v-text="item.tcontents.substr(0,45)+'...'">
                              
                            </div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item doctor-box">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media">
                            <img src="static/image/sofa@3x.png" class="aui-img-round">
                        </div>
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-text doctor">
                                <div class="aui-list-item-title" v-text="item.tuid.name+' '+item.tuid.holder"> </div>
                                <div class="aui-list-item-right"><div class="aui-label" v-text="item.tType==3?'官方发帖':'优质问答'"></div></div>
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
      }
    },
    methods:{
      openjinghua() {
        this.$router.push({name:'jinghuatie'})
      },
      opentiezi(tid){
        var that = this;
        this.toast.loading({
             title:"加载中",
             duration:2000
         },function(ret){
         });
        setTimeout(function(){
          that.$router.push({path:'/tiezi/'+tid})
        }, 100);
      },
       openRouter:function(){
             this.$router.push({path:'/mingyilist'})
       },
        openRouter1:function(){
             this.$router.push({path:'/zixun'})
       },
         openRouter2:function(){
             this.$router.push({path:'/zhenshi'})
       },
       openzhifu:function(){
           this.$router.push({path:'/mingyi'})
       },
       openRouter3:function(){
             this.$router.push({path:'/jianhu'})
       },
       showList() {
          var that = this;
          var filter = {
            "order": "createdAt DESC",
            "where": {
              "tflag":0,
              "tType":0
            },
            "limit":4,
            "include":"tuidPointer",
            "includeFilter":{"expert":{"fields":['id','name','holder']}}
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
       showList2() {
          var that = this;
          var filter = {
            "order": "createdAt DESC",
            "where": {
              "tflag":0,
              "tType":3 // 官方后台发帖
            },
            "limit":2,
            "include":"tuidPointer",
            "includeFilter":{"expert":{"fields":['id','name','holder']}}
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
       }
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
    color:#27B5B1;
    border:1px solid #27B5B1;
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
  color:#28B8A1;
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
}
.aui-label {
  top:-0.1rem;
}
</style>

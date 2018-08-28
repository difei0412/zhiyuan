<template>
  <div style="height: 100%;" id="app">
    <header class="aui-bar aui-bar-nav" style="z-index:99999" v-if="menuindex == 0 && yindao==false">
      <div style="position:relative;">
        <div>诊疗中心</div>
        <div style="position:absolute;right:1rem;top:0rem;">
          <div class="aui-badge" style="top:0.4rem;left:50%" v-show="readNum>0" v-text="readNum"></div>
          <img src="static/image/tongzhi@3x.png" style="height:1.2rem;margin:0.6rem 0 0 0" @click="opentongzhi()">
        </div>
      </div>
    </header>
    <header class="aui-bar aui-bar-nav" v-if="menuindex == 1 && yindao==false">病患沟通</header>
    <header class="aui-bar aui-bar-nav" v-if="menuindex == 2 && yindao==false">个人中心</header>

    <transition :name="transitionName">
      <keep-alive>
        <content1 ref="content1" v-if="menuindex==0 && yindao==false"></content1>
        <content2 ref="content2" v-if="menuindex==1 && yindao==false"></content2>
        <content3 v-if="menuindex==2 && yindao==false"></content3>
      </keep-alive>
    </transition>

    <footer class="aui-bar aui-bar-tab foot-nav" v-show="yindao==false">
      <div class="aui-bar-tab-item aui-active" @click="openmenu(0)">
        <center>
          <i class="aui-iconfont aui-icon-home"></i>
        </center>
        <div class="aui-bar-tab-label">诊疗中心</div>
      </div>
      <div class="aui-bar-tab-item" @click="openmenu(1)">
        <center>
          <i class="aui-iconfont aui-icon-comment"></i>
        </center>
        <div class="aui-bar-tab-label">病患沟通</div>
      </div>
      <div class="aui-bar-tab-item" @click="openmenu(2)">
        <center>
          <i class="aui-iconfont aui-icon-my"></i>
        </center>
        <div class="aui-bar-tab-label">个人中心</div>
      </div>
    </footer>

    <!-- 引导页 -->
    <div  class="swiper-container" style="width:100%;height:100%" v-show="yindao==true">
      <div class="swiper-wrapper" style="width:100%;height:100%">
        <div class="swiper-slide"  style="display:flex;justify-content:center;align-items:center;">
          <img style="width:100%;" src="static/image/start1.png"   />
        </div>
        <div class="swiper-slide"  style="display:flex;justify-content:center;align-items:center;">
          <img style="width:100%;" src="static/image/start2.png"   />
        </div>
        <div class="swiper-slide"  style="display:flex;justify-content:center;align-items:center;">
          <img style="width:100%;" src="static/image/start3.png"   />
          <div class="aui-btn aui-btn-primary" style="position: absolute;bottom:3.2rem;margin: auto;left: 0;right: 0;width: 8.5rem;" @click="tiaozhuan">立即使用</div>
        </div>

      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import $ from "./public/jquery";
import Swiper from "./public/swiper.min.js";
import content1 from './home/content'
import content2 from './home/content2'
import content3 from './home/content3'
import Vue from 'vue'

export default {
  name: 'index',
  data() {
    return {
      menuindex: 0,
      transitionName: '',
      vuegConfig: {
        disable: false,
        forwardAnim: 'fadeInRight',
        duration: '.5',
        backAnim: 'fadeIn'
      },
      readNum: 0,
      yindao: false,
    }
  },
  components: {
    content1,
    content2,
    content3
  },
  methods: {
    tiaozhuan(){
      this.yindao = false;
      localStorage.yindao = 1;
    },
    opentongzhi() {
      if(window.localStorage.getItem('userId')){
        this.$router.push({name:"tongzhi"});
      }else{
        this.$router.push({name:'login'})
      }
    },
    goToSearch() {
      this.$router.push({name:"search"});
    },
    openmenu:function(index) {
      var that = this
      if (that.menuindex == 0) {

      } else if (that.menuindex == 1) {
        that.$refs.content2.childMethod()
      }
      if((index==2) && (!window.localStorage.getItem('userId'))){
       this.$router.push({path:'/login'})
       return;
     }
     if(that.menuindex > index){
      that.transitionName = 'slide-right'
    } else{
      this.transitionName = 'slide-left'
    }
    that.menuindex = index

    var footeritem = document.getElementsByClassName("aui-bar-tab-item")
    var iconcls = document.getElementsByClassName("iconcls")
    for (var i = 0; i < footeritem.length; i ++) {
      footeritem[i].className = 'aui-bar-tab-item'

    }

    footeritem[index].className = 'aui-bar-tab-item aui-active'

  },
  // 是否存在未读消息
   readMsg() {
    var that = this;
    var filter = {
      "order": "createdAt DESC",
      "where": {
        "or":[
              {"user_id": {"like":window.localStorage.getItem('userId')},"if_read": {'inq':[0,null]}},
              {"user_id": '[]',"if_read": {'inq':[0,null]}}
         ]
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
},
created() {
  // -------------------- 引导页 -----------------------
  if(localStorage.yindao != 1){
      var that=this;
      that.yindao = true;
      setTimeout(function(){
        var swiper = new Swiper(".swiper-container", {
            autoplay: 2500,
            mode: "horizontal",
            pagination: ".swiper-pagination",
            // loop: 1,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            autoplayStopOnLast: true,
            onAutoplayStop: function(swiper){
            //  that.$router.push({
            //   name: "index"
            // })
           },

         });
      }, 20);
  }
  // -------------------- 引导页 -----------------------
  var supportDic = window.localStorage.getItem('supportDic');
  if (!supportDic) {
    var dic = {
      "login" : {
        "news" : {},
        "pinglun" : {}
      },
      "noLogin" : {
        "news" : {},
        "pinglun" : {}
      }
    }
    window.localStorage.setItem('supportDic', JSON.stringify(dic));
  }
 
},
activated() {
  this.readMsg();
}, 
beforeRouteEnter(to,from,next){
 next(vm => {
   if(!window.localStorage.getItem('userId') && (vm.menuindex==2)){
    vm.menuindex = 0;
    var footeritem = document.getElementsByClassName("aui-bar-tab-item")
    var iconcls = document.getElementsByClassName("iconcls")
    for (var i = 0; i < footeritem.length; i++) {
      footeritem[i].className = 'aui-bar-tab-item'
    }
    footeritem[vm.menuindex].className = 'aui-bar-tab-item aui-active'
  }
})    
}
}
</script>

<style scoped>
.aui-bar-nav {
  background: #34DBDA;
  text-align: center;
  position: fixed;
  float: left;
  margin-left: 0px;
  width: 100%;
  top: 0px;
  z-index: 99999;
}
.aui-bar-tab .aui-active {
  color: #34DBDA;
}
.iconcls {
  max-height: 22px;
}
.logo {
  float: left;
  max-height: 0.9rem;
  margin-left: 10px;
  margin-top: 0.675rem;
}
.search {
  float: right;
  max-width:90%;
  margin-right:5%;
  margin-top:5px

}
.aui-searchbar {
  width: 60%;
  float: right;
  margin-right: 22px;
  margin-top: -22px;
  height: 100%;
  background: none
}
footer {
  border-top: 1px solid #eee;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
}
.H-flexbox-vertical {
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-flow: column;
  flex-flow: column;
  height: 100%;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.H-flex-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

/* 首页切换动画 */
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-left-enter, .slide-right-leave-active {
  z-index: 30;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.slide-left-enter,.slide-right-enter {
  opacity: 0;
}
.slide-right-enter, .slide-left-leave-active {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.slide-left-enter-to, .slide-right-leave-to {
  position: fixed;
}
/* 首页切换动画 */
.aui-bar-tab {
  top:auto !important;
}
.foot-nav {
  z-index: 1000;
}
</style>

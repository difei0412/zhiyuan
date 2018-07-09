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
    <secton class="aui-grid">
    <div class="row aui-text-center">
    <div class="aui-col-xs-3" @click="openRouter()">
            <i class="aui-iconfont aui-icon-display"></i>
            <p>名医风采</p>
        </div>
        <div class="aui-col-xs-3" @click="openRouter1()">
            <i class="aui-iconfont aui-icon-date"></i>
            <p>预约挂号</p>
        </div>
         <div class="aui-col-xs-3" @click="openRouter2()">
            <i class="aui-iconfont aui-icon-cert"></i>
            <p>线上诊室</p>
        </div>
         <div class="aui-col-xs-3" @click="openRouter3()">
            <i class="aui-iconfont aui-icon-video"></i>
            <p>患者看护</p>
        </div>
    </div>

    </secton>
    <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-header">
                 名医讲堂
            </li>
           
           
            <li class="aui-list-item"  @click="opennews()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-title">怎么治疗失眠</div>
                        <div class="aui-list-item-text">
                            你看看怎么治就怎么治吧
                        </div>
                          <div class="aui-list-item-text">
                            888人阅读
                        </div>
                    </div>
                    <div class="aui-list-item-media">
                        <img src="static/image/myim1.jpeg">
                    </div>
                </div>
            </li>
            <li class="aui-list-item" @click="opennews()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-title">怎么治疗失眠</div>
                        <div class="aui-list-item-text">
                            你看看怎么治就怎么治吧
                        </div>
                          <div class="aui-list-item-text">
                            888人阅读
                        </div>
                    </div>
                    <div class="aui-list-item-media">
                        <img src="static/image/myim1.jpeg">
                    </div>
                </div>
            </li>
        </ul>
    </div>
     <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-header">
                知名专家
            </li>
          
           
           
        </ul>
         <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">身心科专家   林洪生</div>
                             <div class="aui-list-item-right" style="color:blue">￥19.00</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                            沈阳知源精神卫生诊疗中心
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                            擅长精神分裂症的治疗
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <button class="l1">神经病</button>  <button class="l1">神经病</button>  <button class="l1">神经病</button>
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
                            <div class="aui-list-item-title aui-font-size-14">身心科专家   林洪生</div>
                             <div class="aui-list-item-right" style="color:blue">￥19.00</div>
                        </div>
                           <div class="aui-list-item-text" style="margin-left:11px">
                            沈阳知源精神卫生诊疗中心
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                            擅长精神分裂症的治疗
                        </div>
                          <div class="aui-list-item-text" style="margin-left:11px">
                            <button class="l1">神经病</button>  <button class="l1">神经病</button>  <button class="l1">神经病</button>
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
                            <div class="aui-list-item-title aui-font-size-14">身心科专家   林洪生</div>
                             <div class="aui-list-item-right" style="color:blue">￥19.00</div>
                        </div>
                           <div class="aui-list-item-text" style="margin-left:11px">
                            沈阳知源精神卫生诊疗中心
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                            擅长精神分裂症的治疗
                        </div>
                          <div class="aui-list-item-text" style="margin-left:11px">
                            <button class="l1">神经病</button>  <button class="l1">神经病</button>  <button class="l1">神经病</button>
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
                            <div class="aui-list-item-title aui-font-size-14">身心科专家   林洪生</div>
                             <div class="aui-list-item-right" style="color:blue">￥19.00</div>
                        </div>
                           <div class="aui-list-item-text" style="margin-left:11px">
                            沈阳知源精神卫生诊疗中心
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                            擅长精神分裂症的治疗
                        </div>
                          <div class="aui-list-item-text" style="margin-left:11px">
                            <button class="l1">神经病</button>  <button class="l1">神经病</button>  <button class="l1">神经病</button>
                        </div>
                    </div>
                </div>
            </li>
           
        </ul>
    </div>
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
    name: 'content',
    data() {
      return {
        mylist : [],
        myIndex : -1,
        userId: "",
        sessionName: 'scrollForHome'
      }
    },
    methods:{
       openRouter:function(){
             this.$router.push({path:'/mingyilist'})
       },
        openRouter1:function(){
             this.$router.push({path:'/guahao'})
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
       opennews(){
         this.$router.push({path:'/newsdetail'})
       }
    },
     mounted () {
     console.log('挂载好了')
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
</style>

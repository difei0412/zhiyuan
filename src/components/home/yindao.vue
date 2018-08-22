<template>
	<div style="background-color: white; min-height: 100%;">
   <div  class="swiper-container" style="width:100%;height:100%">
    <div class="swiper-wrapper" style="width:100%;height:100%">
      <div class="swiper-slide"  >
        <img style="width:100%;height:100%" src="static/image/start1.png"   />
      </div>
      <div class="swiper-slide"  >
        <img style="width:100%;height:100%" src="static/image/start2.png"   />
      </div>
      <div class="swiper-slide"  >
        <img style="width:100%;height:100%" src="static/image/start3.png"   />
        <div class="aui-btn aui-btn-primary" style="position: absolute;bottom: 3rem;margin: auto;left: 0;right: 0;width: 8rem;" @click="tiaozhuan">立即使用</div>
      </div>

    </div>
    <div class="swiper-pagination"></div>
  </div>
</div>
</template>
<style scoped>
@import url("/static/css/swiper.min.css");
</style>
<script>
import $ from "../public/jquery";
import Swiper from "../public/swiper.min.js";
import Vue from "vue";
export default {
  name: "yindao",
  data() {
    return {};
  },

  methods: {
    tiaozhuan(){
      this.$router.push({path:'/'})
      localStorage.yindao = 1;
    }
  },
  mounted() {
    console.log("挂载好了");
    var that=this
    var swiper = new Swiper(".swiper-container", {
      autoplay: 2500,
      mode: "horizontal",
      pagination: ".swiper-pagination",
      // loop:1,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplayStopOnLast: true,
      onAutoplayStop: function(swiper){
        that.$router.pushRoute({
          name: "index"
        })
      },

    });
  },
  created: function() {
    var that=this
    var swiper = new Swiper(".swiper-container", {
      autoplay: 2500,
      mode: "horizontal",
      pagination: ".swiper-pagination",
      // loop: 1,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplayStopOnLast: true,
      onAutoplayStop: function(swiper){
       that.$router.pushRoute({
        name: "index"
      })
     },

   });
  }
};
</script>

<style scoped>
</style>
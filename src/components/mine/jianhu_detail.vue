<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'901病房详情'"></myHeader>
        <div  class="swiper-container" style="width:100%;margin-top:0px">
      <div class="swiper-wrapper" style="width:100%;height:100%">
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/bingfang.jpeg"   />
        </div>
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/bingfang.jpeg"   />
        </div>
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/bingfang.jpeg"   />
        </div>
        <div class="swiper-slide"  >
          <img style="width:100%;height:100%" src="static/image/bingfang.jpeg"   />
        </div>
        
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="aui-content aui-content-padded" >
       <li class="aui-list-header">
               病房住院监护
            </li>
             <ul class="aui-list aui-select-list">
       
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018年6月17日 患者就餐时间</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
         <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018年6月17日 患者活动时间</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018年6月17日 患者休息时间</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        </ul>
   
    </div>
     <div class="aui-content aui-content-padded" >
       <li class="aui-list-header">
               患者跟踪反馈意见
            </li>
             <ul class="aui-list aui-select-list">
       
        <li class="aui-list-item"  @click="openform1()">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018年6月17日 患者跟踪反馈意见</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        
        </ul>
   
    </div>
    </div>
  
</template>

<script>
import Calendar from '../vue-calendar-component/index';
    export default {
        name: 'geqian',
        data() {
            return {
               arr2: ['2018-7-3'],
                      arr: [
                {
                  date: '2018-07-04',
                  className: 'mark1'
                },
                {
                  date: '2018/7/5',
                  className: 'mark1'
                },
                {
                  date: '2018/7/6',
                  className: 'mark2'
                }
              ]     
            }
        },
        methods: {
        
         
         opennext(){
              
         },
         openform1(){
             this.$router.push({path:'/fankui'})
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
        components: {
                Calendar
              }
    }
</script>

<style >
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
.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
</style>

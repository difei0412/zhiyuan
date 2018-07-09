<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'打卡记录'"></myHeader>
        
    <div class="aui-content aui-content-padded" >
       <li class="aui-list-header">
              患者用药记录
            </li>
             <ul class="aui-list aui-select-list">
       
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  9点患者服用安定片  2片</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
         <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  9点患者服用安定片  2片</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  9点患者服用安定片  2片</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        </ul>
   
    </div>
      <div class="aui-content aui-content-padded" >
       <li class="aui-list-header">
              患者情绪记录
            </li>
             <ul class="aui-list aui-select-list">
       
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  9情绪不稳定有自杀倾向</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
         <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  9情绪不稳定有自杀倾向</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  9情绪不稳定有自杀倾向</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        </ul>
   
    </div>
    <div class="aui-content aui-content-padded" >
       <li class="aui-list-header">
              睡眠记录
            </li>
             <ul class="aui-list aui-select-list">
       
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  夜间睡眠很好</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
         <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  夜间睡眠很好</span>
         <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i>
        </li>
        <li class="aui-list-item">
         <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i><span style="float:left;margin-left:30px;position:absolute;top:15px">2018:5.1  夜间睡眠很好</span>
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
     

   },
    created:function() {
                      
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

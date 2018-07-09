<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'知源知识分享'"></myHeader>
       <div class="aui-content aui-content-padded ">
              <center>抑郁症的临床表现</center>
               <div class="aui-content">
              <center> <img src="static/image/12.jpg" style="max-width:100%"></center><br>
1．一天中的大部分时间意志消沉，几乎每天如此，通过两种方式得到证明，一个是主观表达（如感到空虚、无助、悲伤等），另一个是别人的观察（爱哭泣等）。青少年表现为情绪的莫名急躁。<br>
2．一天中的大部分时间内，对所有的事情或者几乎所有的事务明显感觉兴趣不大或者不感兴趣，几乎每天如此（通过自己的主观表达，和别人的感受得到证明）。<br>
3．没有节食却体重明显下降，或体重增加（例如一个月的体重变化超过5%），或食欲增加，或食欲降低，几乎每天如此。<br>
4．轻度郁抑症的症状失眠或者嗜睡，几乎每天如此。<br>
5．激动不安，或者反应迟钝，几乎每天如此（通过自己的主观表达，和别人的感受得到证明）。<br>
6．疲劳或者无精打采，几乎每天都如此。<br>
7．感觉自己或者环境一无是处，或是感觉过多的、不恰当的内疚，几乎每天如此，不仅仅是因为生病而自责或者内疚。<br>
8．思考或集中注意力的能力下降，或者犹豫不决，几乎每天如此（通过自己的主观表达，和别人的感受得到证明）。<br>
9．反复想到死（不仅是对死亡存在恐惧），反复出现自杀的念头而没有明确计划，或试图自杀，或有明确的自杀计划。<br>
还有一些轻度郁抑症的症状，但是以上所列出的是最常见的抑郁倾向的精神症状，凡是真正具有抑郁倾向的朋友几乎都有着以上9个特征的部分特征。<br>  

               </div>
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
         zhifu(){
           this.$router.push({path:'/zhifu2'})
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
.mybiaoqian900{
    color:#27B5B1;
    border:1px solid #27B5B1;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:60px;
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

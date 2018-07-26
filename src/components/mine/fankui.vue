<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'反馈与跟踪意见'"></myHeader>
       <div class="aui-content aui-content-padded" >
       <li class="aui-list-header">
              刘国旗  神经病二期
            </li>
             <ul class="aui-list aui-select-list">
       
        <li class="aui-list-item"  @click="openform1()">
         <div class="aui-content aui-content-padded ">
              <center>跟踪详情</center>
               <div class="aui-content">XXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
            </div>

        </li>
        <span style="color:#28B8A1">主管医师：赵宁</span>
        </ul>
   
    </div>
    <div class="aui-content aui-content-padded " style="color:#ddd">
         指导意见：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
    </div>
   <div class="aui-searchbar" id="search" style="background:#fff;width:270px">
    <div class="aui-searchbar-input aui-border-radius" tapmode  style="border:1px solid #000;">
        <i class="aui-iconfont aui-icon-pencil"></i>
        <form action="javascript:search();">
            <input type="search" placeholder="请输入您的评价" id="search-input" style="">
        </form>

    </div>
   <i class="aui-iconfont aui-icon-comment" style="font-size:20px"></i><i class="aui-iconfont aui-icon-laud" style="font-size:20px"></i>
   <i class="aui-iconfont aui-icon-hide" style="font-size:20px"></i>
</div>
<div class="aui-content aui-content-padded " style="color:#ddd">
         评价标签：  <button class="mybiaoqian900">耐心</button>  <button class="mybiaoqian900">医术高</button>  <button class="mybiaoqian900">有医德</button>
         <div class="aui-col-xs-4" style="color:#FF9800;margin-left:11px">
                    
                    <div class="aui-grid-label"><i class="aui-iconfont aui-icon-star"  style="font-size:18px"></i><i class="aui-iconfont aui-icon-star" style="font-size:18px"></i><i class="aui-iconfont aui-icon-star" style="font-size:18px"></i><i class="aui-iconfont aui-icon-star" style="font-size:18px"></i><i class="aui-iconfont aui-icon-star" style="font-size:18px"></i></div>
                </div>
    </div>
    <div class="aui-content aui-content-padded " style="color:#ddd">
         医师打赏：  <button class="mybiaoqian900" @click="zhifu">10元</button>  <button class="mybiaoqian900" @click="zhifu">5元</button>  <button class="mybiaoqian900" @click="zhifu">20元</button>
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

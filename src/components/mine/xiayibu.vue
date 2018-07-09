<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'完成注册'"></myHeader>
        <ul class="aui-list aui-form-list">

       <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
               用户属性
                </div>
                 <div class="aui-list-item-input">
                  
                    <label><input class="aui-radio" type="radio" name="demo1"> 患者</label>
                     <label><input class="aui-radio" type="radio" name="demo1">家属</label>
                   
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
               性别
                </div>
                 <div class="aui-list-item-input">
                  
                    <label><input class="aui-radio" type="radio" name="demo1"> 男</label>
                     <label><input class="aui-radio" type="radio" name="demo1">女</label>
                   
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                  真实姓名
                </div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入姓名">
                </div>
            </div>
        </li>
          <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                 身份证号
                </div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入身份证号">
                </div>
            </div>
        </li>
         <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                 年龄
                </div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="27">
                </div>
            </div>
        </li>
        
          <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
              家属与本人
                </div>
                 <div class="aui-list-item-input">
                  
                    <label><input class="aui-radio" type="radio" name="demo1"> 子女</label>
                     <label><input class="aui-radio" type="radio" name="demo1">夫妻</label>
                   
                </div>
            </div>
        </li>
       </ul> 
          
                <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #28B8A1;position:fixed;bottom:2px"  @click="">下一步</button>
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
             this.$router.push({path:'/jianhu_detail'}) 
         }
   
   
        },
        activated() {
          
        },
       created() {
   
   
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

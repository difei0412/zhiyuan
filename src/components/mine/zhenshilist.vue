<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'线上诊室医生选择'"></myHeader>
        <span style="margin-left:11px">为您选择身心科54位医生</span>
        <span style="float:right;margin-right:22px;margin-top:-10px;color:#36B6C3"><select>
                 <option value="选择科室">选择科室</option>
                  <option value="身心科">身心科</option>
            </select>
        </span>
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">身心科专家   林洪生</div>
                             <div class="aui-list-item-right" style="color:#27B5B1">￥19.00</div>
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
                             <div class="aui-list-item-right" style="color:#27B5B1">￥19.00</div>
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
                             <div class="aui-list-item-right" style="color:#27B5B1">￥19.00</div>
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
                             <div class="aui-list-item-right" style="color:#27B5B1">￥19.00</div>
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
  
</template>
<style scoped>
@import url("/static/css/swiper.min.css");
</style>
<script>
 import $ from '../public/jquery'
  import Swiper from '../public/swiper.min.js'
  import Vue from 'vue'
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
          openzhifu:function(){
              this.$router.push({path:'/zhifu1'})
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

<style  scoped>
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

<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'患者沟通'"></myHeader>
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu2('?uid=5b57f3466a27367358f16aeb&token=aplLoMUdf6uW88X23OFLIrDTuZQGF9BEDUGAmIPb1p9tNUAP8djGk42/GlX7DITw72x3VZnD8OwUm6ptkLRqcwwMcqtJkKqoMHKAU5vPpKKPCjOm17Ag5Q==')">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">住院患者：林洪生</div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            留言内容：您好吗？
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            诊疗时间：30分钟
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="order-status">沟通</div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu2('?uid=5b57d6866a27367358f1568c&token=7RqiVEycoMbKlz0Xe3WUsbDTuZQGF9BEDUGAmIPb1p9tNUAP8djGk+/3og9UJS56JCI6d/5KrHK1aduq93kkJgwMcqtJkKqofxP6k+6yw8E5aSn08zZvVQ==')">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">住院患者：林洪生</div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            留言内容：您好吗？
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            诊疗时间：30分钟
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="order-status">沟通</div>
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
                            <div class="aui-list-item-title aui-font-size-14">住院患者：林洪生</div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            留言内容：您好吗？
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            诊疗时间：30分钟
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="order-status">沟通</div>
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
                            <div class="aui-list-item-title aui-font-size-14">住院患者：林洪生</div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            留言内容：您好吗？
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            诊疗时间：30分钟
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="order-status">沟通</div>
                        </div>
                    </div>
                </div>
            </li>
            
           
        </ul>
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
          openzhifu:function(){
           this.$router.pushRoute({path:'/im'})
          },
          openzhifu2(param) {
            this.$router.pushRoute({path:'/im'+param})
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

 .order-status {
      width:100%;
      text-align: right;
      color:rgb(255, 152, 0);
      font-size:14px;
    }
    .aui-list-item-inner.aui-list-item-arrow {
      padding-right: 0rem;
      margin-right: 0rem;
    }
    .yuding-time {
      font-size:12px;
      color:#666;
      margin:0.15rem 0;
    }
</style>

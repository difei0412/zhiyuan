<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'与刘国旗患者聊天'"></myHeader>
        
        <section class="aui-chat">
            <div class="aui-chat-header">2016年7月13日</div>
            <div class="aui-chat-item aui-chat-left">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        Hello AUI 2.0!
                    </div>
                    <div class="aui-chat-status aui-chat-status-refresh">
                        <i class="aui-iconfont aui-icon-correct aui-text-success"></i>
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-right">
                <div class="aui-chat-media">
                    <img src="static/image/demo1.jpeg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">流浪男</div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        你好！
                    </div>
                    <div class="aui-chat-status">
                        <i class="aui-iconfont aui-icon-info aui-text-danger"></i>
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-left">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        <img src="static/image/bingfang.jpeg" />
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-right">
                <div class="aui-chat-media">
                    <img src="static/image/demo1.jpeg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">流浪男</div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        以前拍摄的牛背山星空
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-left">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        <img src="static/image/bingfang.jpeg" />
                    </div>
                </div>
            </div>

        </section>

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
           this.$router.push({path:'/mingyi'})
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
.aui-chat .aui-chat-right .aui-chat-content {
  background: rgb(158,234,106);
}
.aui-chat .aui-chat-right .aui-chat-arrow {
  background: rgb(158,234,106);
}
.aui-chat .aui-chat-media {
  height:2rem !important;
}
.aui-chat .aui-chat-media img {
  height:100%;
}
</style>

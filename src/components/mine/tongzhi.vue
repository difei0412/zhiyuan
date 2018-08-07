<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'通知消息'"></myHeader>
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-inner">
                        <div class="tongzhi-info">
                            患者<span style="color:#f60;font-size:12px;">流浪男</span>对您的帖子进行了评价 
                            <router-link to="/tiezi" class="detail-link">查看&gt;&gt;</router-link>
                        </div>
                    </div>
                </div>
                <div class="aui-info" style="padding-top:0">
                    <div class="aui-info-item">
                        <img src="static/image/demo1.jpeg" class="aui-img-round" /><span class="aui-margin-l-5">流浪男</span>
                        </div>
                    <div class="aui-info-item date-info">2015-07-14 10:31</div>
                </div>
            </li>
             <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-inner">
                        <div class="tongzhi-info">
                            患者<span style="color:#f60;font-size:12px;">流浪男</span>心情好，一不小心送了您一支大火箭
                            <router-link to="/aboutUs" class="detail-link">查看&gt;&gt;</router-link>
                        </div>
                    </div>
                </div>
                <div class="aui-info" style="padding-top:0">
                    <div class="aui-info-item">
                        <img src="static/image/demo1.jpeg" class="aui-img-round" /><span class="aui-margin-l-5">流浪男</span>
                        </div>
                    <div class="aui-info-item date-info">2015-07-14 10:31</div>
                </div>
            </li>
           
        </ul>
        <div style="height:100%"></div>
    </div>
  
</template>

<script>
import Calendar from '../vue-calendar-component/index';
    export default {
        name: 'geqian',
        data() {
            return {

            }
        },
        methods: {
          openzhifu:function(){
            this.$router.push({path:'/yuyueinfo'})
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
      margin:0.3rem 0;
    }
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
.price-total {
  clear:both;
  font-size:14px;
  color:#f60;
  height:2rem;
  line-height: 2rem;
  text-align: right;
  padding:0.5rem 0.7rem;
  margin-bottom: 1rem;
}
.aui-list .aui-list-item-right, .aui-list-item-title-row em {
  top:0;
}
.detail-link {
  font-size:12px;
  color:#f60;
  display: inline-block;
}
.aui-info {
  margin-right: 0rem;
  margin:0;
  padding:0;
  font-size:14px;
}
.aui-list-item {
  border-bottom:1px solid #eee;
  font-size:14px;
}
.date-info {
  font-size: 12px;
}
.aui-list-item-inner {
  min-height:0rem;
  margin-right: 0rem;
}
.tongzhi-info {
  font-size:12px;
  color:#666;
  padding:0 0 0.5rem;
}
.aui-info-item img {
  width:1.5rem;
  height:1.5rem;
}
.aui-info-item span {
  color:#444;
}
</style>

<template>
    <div style="background-color: #eee; min-height: 100%;">
        <myHeader :title="'通知消息'"></myHeader>
        <ul class="aui-list aui-media-list">
           
           <!--  <li class="aui-list-item">
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
            </li> -->

            <li class="aui-list-item" style="position:relative;background:#eee" v-for="item in msgArr" @click="readLink(item.id,item.link_url)">
                <div class="kapian"></div>
                <div class="kapian-top"></div>
                <div class="kapian-top-1"></div>
                <div class="kapian-bottom"></div>
                <div class="kapian-bottom-1"></div>
                <div class="msg-info">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                          <div class="tongzhi-info">
                              <span v-html="item.desc"></span>
                              <span class="detail-link">查看&gt;&gt;</span>
                          </div>
                      </div>
                  </div>
                  <div class="aui-info">
                      <div class="aui-info-item" style="font-size:0.6rem">
                          <!-- <img src="static/image/demo1.jpeg" class="aui-img-round" /><span class="aui-margin-l-5">流浪男</span> -->
                          发布日期
                      </div>
                      <div class="aui-info-item date-info" v-text="dateFormat(item.createdAt)"></div>
                  </div>
                </div>
                <div class="msg-status">
                  <span>未读</span>
                </div>
            </li>
           
        </ul>
        <div style="height:100%"></div>
    </div>
  
</template>

<script>
    export default {
        name: 'geqian',
        data() {
            return {
              vuegConfig: {
                  disable: false,
                  forwardAnim: 'fadeInRight',
                  duration: '.3',
                  backAnim: 'fadeInLeft'
              },
              msgArr: []
            }
        },
        methods: {
          openzhifu:function(){
            this.$router.push({path:'/yuyueinfo'})
          },
          // 是否存在未读消息
           readMsg() {
            var that = this;
            var filter = {
              "fields":{"id":true,"desc":true,"link_url":true,"createdAt":true},
              "order": "createdAt DESC",
              "where": {
                "or":[
                      {"user_id": {"like":window.localStorage.getItem('userId')},"if_read": {'inq':[0,null]}},
                      {"user_id": '[]',"if_read": {'inq':[0,null]}}
                 ]
              }
            };
            that.ajax({
              url: "message_push?filter="+encodeURIComponent(JSON.stringify(filter)),
              method: "get",
              success: function(data) {
                that.msgArr = data;
              }
            });
          },
          // 时间格式转换,不传参获取当前时间日期
          dateFormat(date) {
            date = date||null;
            if(date == null){
              var dateObj = new Date();
            } else {
              var dateObj = new Date(date);
            }
            var year = dateObj.getFullYear();
            var month = dateObj.getMonth()+1;
            var day = dateObj.getDate();
            var hour = dateObj.getHours();
            var minute = dateObj.getMinutes();
            var second = dateObj.getSeconds();
            if(month<=9){
              month = "0" + month;
            }
            if(day<=9){
              day = "0" + day;
            }
            if(hour<=9){
              hour = "0" + hour;
            }
            if(minute<=9){
              minute = "0" + minute;
            }
            if(second<=9){
              second = "0" + second;
            }
            var newDay = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            return newDay;
          },
          readLink(id,url) {
            var that = this;
            var params = {
              "data":{
                "if_read":'1',
                "_method":"PUT"
              }
            }
            that.ajax({
              url:'message_push/'+id,
              method:"post",
              params,
              success: function(res){

              }
            })
            var tmp = '';
            if(url){
              tmp = url;
            }else{
              tmp = '/tongzhidetail/'+id;
            }
            that.$router.push({path:tmp})
          }
        },
        activated() {
          this.readMsg();
        },
       created() {
   
   
  },
    }
</script>

<style scoped>
    body,html{
      background: #eee !important;
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
    color:#34DBDA;
    border:1px solid #34DBDA;
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
  position:absolute;
  width:90%;
  left:0.5rem;
  bottom:1rem;
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
  padding:0.5rem 0 0.5rem;
}
.aui-info-item img {
  width:1.5rem;
  height:1.5rem;
}
.aui-info-item span {
  color:#444;
}
.kapian {
  background:#fff;
  position:absolute;
  left:0.5rem;
  top:0.5rem;
  right:0.5rem;
  padding:0.5rem;
  height:6rem;
  border-radius:0.5rem;
  box-shadow: 0.05rem 0.05rem 0.5rem #ccc;
}
.kapian-top{
  position: absolute;
  right:20%;
  top:-0.5rem;
  width:2rem;
  height:2rem;
  background: #eee;
  z-index: 2;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0rem 0.1rem 0.2rem #ccc inset;
}
.kapian-bottom{
  position: absolute;
  right:20%;
  top:5.5rem;
  width:2rem;
  height:2rem;
  background: #eee;
  z-index: 2;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0rem 0.1rem 0.2rem #ccc inset;
}
.kapian-bottom-1 {
   position: absolute;
  right:20%;
  top:6.5rem;
  width:2rem;
  height:1rem;
  background: #eee;
  z-index: 3;
}
.kapian-top-1{
  position: absolute;
  right:20%;
  top:-0.5rem;
  width:2rem;
  height:1rem;
  background: #eee;
  z-index: 3;
}
.msg-status{
  position:absolute;
  right:0.5rem;
  top:0.5rem;
  width:17.5%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:6rem;
}
.msg-status span {
  color:#f60;
}
.msg-info{
  position:absolute;
  left:0.5rem;
  top:0.5rem;
  width:67%;
  padding:0 0.5rem;
  height:6rem;
  padding:1rem 0.5rem;
}
.aui-list-item{
  height:7rem;
}
.msg-status .yidu {
  color:green;
}
</style>
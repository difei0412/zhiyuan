<template>
    <div style="background-color: white; min-height: 100%;" v-cloak>
        <myHeader :title="'通知详情'"></myHeader>
      <div v-show="isLoadFinish" class="content-box">
         <div class="aui-content aui-content-padded">
           <h3 class="aui-list-header" v-text="showData.theme" style="margin-top:1.2rem;color:#34DBDA"></h3>
           <h6 v-text="dateFormat(showData.createdAt)" style="margin-top:0.5rem;color:#ccc;text-align:center"></h6>
           <ul class="aui-list aui-select-list" style="border-top:1px solid #eee;padding:0.5rem 0;margin:1rem 0">
              <li class="aui-list-item" style="border-bottom:0px solid #eee;">
                  <div class="aui-content aui-content-padded ">
                     <div class="aui-content" v-html="showData.desc"></div>
                  </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import $ from '../public/jquery'
    export default {
        name: 'geqian',
        data() {
            return {
               showData: {},
               toast: null,
               isLoadFinish:false,
            }
        },
        methods: {
          // 帖子数据
          findData(id){
            var that = this;
            that.ajax({
              url:'message_push/'+id,
              method:"get",
              success: function(data){
                that.toast.hide();
                if(JSON.stringify(data)!='{}'){
                  that.showData = data;
                }
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
        },
        mounted () {
            this.toast = new auiToast();
        },
        activated(){
          var that = this;
          that.isLoadFinish = false;
          var id = that.$route.params.id;
          that.findData(id);
          that.isLoadFinish = true;
        },
    }
</script>

<style scoped>
    [v-cloak] {
      display: none;
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
.mybiaoqian900{
    color:#34DBDA;
    border:1px solid #34DBDA;
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
.aui-list-header {
  font-weight: bold;
}
.aui-list .aui-list-item {
  padding: 0;
  color:#666;
  font-size:14px;
  text-indent: 2em;
}
.aui-icon-weibo,.aui-icon-wechat-circle,.aui-icon-wechat {
  font-size:24px;
  margin-right:1rem;
}
.aui-icon-laud {
  font-size:22px;
  margin-left:1rem;
}
span.zan-num {
  font-size:12px;
  margin-left:0.2rem;
  color:#666;
}
.zan-icon2 {
  margin-left: 0.3rem;
}
</style>

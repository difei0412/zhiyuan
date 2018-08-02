<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'线上论坛'"></myHeader>
        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-form-list">
              <li class="aui-list-item box-title">
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-input">
                          <input type="text" v-model="ttopic" placeholder="请您输入帖子标题">
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                <div class="aui-list-item-inner textarea-box">
                    <div class="aui-list-item-input">
                        <!-- <textarea placeholder="请您输入帖子内容！" class="textareacls" ></textarea> -->
                        <vue-html5-editor :content="content" 
                          @change="updateData" style="width:100%"></vue-html5-editor>
                        <div style="height:1rem;"></div>
                    </div>
                </div>
              </li>
            </ul>
          </div>
            <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #28B8A1;bottom:0px;position:fixed;border:none;border-radius:0rem;"  @click="saveData">发布</button>
    </div>
  
</template>

<script>
import Calendar from '../vue-calendar-component/index';
    export default {
        name: 'geqian',
        data() {
            return {
              ttopic: '',
               content: '请输入帖子内容',
               toast: null
            }
        },
        methods: {
          updateData(e = ''){  
            this.content = e;  
          },
          saveData() {
            var that = this;
            if(this.ttopic==''){
              that.toast.fail({
                  title:"请输入帖子标题",
                  duration:2000
              });
              return;
            }
            if(this.content=='' || this.content=="请输入帖子内容"){
              that.toast.fail({
                  title:"请输入帖子内容",
                  duration:2000
              });
              return;
            }
            var params = {
              "data":{
                "tType":1,
                "treplycount":0,
                "ttopic":this.ttopic,
                "tcontents":this.content,
                "ttime": this.dateFormat(),
                "tclickcount":0,
                "tflag":1,
                "tuid":window.localStorage.getItem('userId')
              }
            }
            that.toast.loading({
                 title:"加载中",
                 duration:2000
             },function(ret){
             });
            setTimeout(function(){
                that.ajax({
                  url:'tiezi',
                  method:"post",
                  params,
                  success: function(res){
                    that.toast.hide();
                    if(JSON.stringify(res)!='{}'){
                      setTimeout(function(){
                        that.ttopic = "";
                        that.content = "请输入帖子内容";
                        that.$router.back();
                      }, 2000);
                      that.toast.success({
                          title:"提交成功",
                          duration:2000
                      });
                    }else{
                      that.toast.fail({
                          title:"提交失败",
                          duration:2000
                      });
                    }
                  }
                })
             }, 500);
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
        activated() {
          
        },
       created() {
   
       },
       mounted() {
          this.toast = new auiToast();
        // var editor = new ___E('textarea1');

        // editor.init();
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
  margin-left:0;
  margin-top:20px;
  height:95px;

}
.aui-list-item-input input,.aui-list-item-input textarea{
  font-size:14px;
}
.textarea-box {
  margin-right: 0rem;
}
.textarea-box .aui-list-item-input {
  padding:0;
}
.vue-html5-editor{
  z-index: 2000 !important;
}
.box-title{
  border-bottom: 1px solid #eee;
}
.aui-toast{
  z-index: 9999 !important;
}
</style>

<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'编写住院日志'"></myHeader>

    <div class="date-box">
      <date-picker v-model="time1" type="datetime" :confirm="confirm" confirm-text="确认" :editable="editable" :format="format"></date-picker>
    </div>

    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              用药建议
            </div>
            <div class="aui-list-item-input" >
              <input type="text" placeholder="请输入用药建议" v-model="conntr" @click="yongyao" v-on:blur="yincang()" v-on:input="sjgb"> 
            </div>
          </div>
        </li>
        <select id="pid" name="" multiple class="yyseach" style="display: none" v-on:change="gradeChange">
          <option value="aa" v-for='item in yp'>{{item.name}} {{item.bzyl}}{{item.unit}}</option>
        </select>
        <li class="aui-list-item">
          <div class="aui-list-item-inner" style="margin-right: 0px">
            <div class="aui-list-item-label">
              睡眠建议
            </div>
            <div class="aui-list-item-input" style="padding-right:0px">
              <div @click="sleepBTN($event)" class="biao aui-btn" style="margin-right: 0.5rem">好</div>
              <div @click="sleepBTN($event)" class="biao aui-btn" style="margin-right: 0.5rem">一般</div>
              <div @click="sleepBTN($event)" class="biao aui-btn">不佳</div>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              其他建议
            </div>
            <div class="aui-list-item-input">
              <input type="text" placeholder="请输入其他建议" v-model="other">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <textarea class="text " placeholder="请输入日志内容" v-model='fkcont'></textarea>
      
     <!--  <ul class="yyseach" style="display: none">
        <li v-for='item in yp' @click="touchend(item.name,item.bzyl,item.unit)">{{item.name}} {{item.bzyl}}{{item.unit}}</li>
      </ul> -->
      <div class="exitBg my-middle">
        <div class="aui-btn aui-btn-success aui-btn-block aui-btn-sm" @click="submit">确 定</div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import $ from '../public/jquery';
import { Toast } from 'mint-ui';
export default {
  name: 'geqian',
  components:{DatePicker},
  data() {
    return {
      dakaijilu:[],
      conntr:'',
      sleep:'',
      other:'',
      fkcont:'',
      yp:[],
      brname:'',
      dakaijiluid:[],
      confirm:true,
      editable:false,
      format:'YYYY-MM-DD  HH:mm:ss',
      time1: '',
      time2: '',
      time3: '',
      brid:'',
      shortcuts: [
      {
        text: '今天',
        onClick: () => {
          this.time3 = [ new Date(), new Date() ]
        }
      }
      ],
      timePickerOptions:{
        start: '00:00',
        step: '00:30',
        end: '23:30'
      },
      vuegConfig: {
        disable: false,
                  //forwardAnim: 'bounceInUp',
                  duration: '.3',
                  backAnim: 'fadeInUp'
                }
              }
            },
            methods: {
              get_daka(id){
                var that = this;
                var filter = {
                  "fields":{'brid':true,'brname':true},
                  "where":{
                    "id":id
                  }
                }
                var url = "genzong?filter="+encodeURIComponent(JSON.stringify(filter))
                that.ajax({url,method:'get',success:function(data){
                  console.log(data)
                  that.brid = data[0].brid;
                  that.brname = data[0].brname;

                }})
              },
              // 建议
              sleepBTN(e){
                console.log($(e.target).html())
                $(e.target).addClass("sleepYS").siblings().removeClass("sleepYS");
                this.sleep = $(e.target).html()
              },
              yongyao(){
                var that = this;
                var url = 'medicine'
                that.ajax({url,method:'get',success:function(data){
                  console.log(data)
                  that.yp=data
                  $(".yyseach").show()
                }})
              },
              touchend(yname,yjiliang,ydanwei,e){
                this.conntr = yname+' '+yjiliang+ydanwei
              },
              yincang(){
                setTimeout(function(){
                  $(".yyseach").hide()
                },1)

              },
              sjgb(){

                var that = this;

                var filter = {
                  "where": {
                    "name":{
                      "like":that.conntr
                    },
                  },
                }
                var url = 'medicine?filter='+encodeURIComponent(JSON.stringify(filter))
        // console.log(filter)
        that.ajax({url,method:'get',success:function(data){
          // console.log(data)
          that.yp=data
        }})
      },
      gradeChange(){ 
        this.conntr = $("#pid  option:selected").text()
      },
      submit(){
        var that=this;
        var params = {
          data:{
            "dakaData":that.dateFormat(that.time1),
            "content":that.conntr,
            "sleep":that.sleep,
            "other":that.other,
            "rz_con":that.fkcont,
            "brname":that.brname,
            "did":window.localStorage.getItem("userId"),
            "brid":that.brid,
            "info":'1',
                    // "brname":
                  }
                }
                console.log(params)
                var url = 'dakalist'
                that.ajax({url,method:'post',params,success:function(data){
                  console.log(data)
                  that.$router.push({path:'/jianhu'})
                  Toast('反馈成功！');
                }})
              },
                //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
                dateFormat:function(time) {
                  var date=new Date(time);
                  var year=date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
     var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
     var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
     var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
     var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
     var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
  },
},
activated() {
  var id = this.$route.params.id

  this.get_daka(id);
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
  padding: 0 0.5rem;
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
.aui-btn-success {
  background: #28B8A1;
}
.aui-list-item {
  border-bottom: 1px solid #eee;
  font-size:14px;
}
.aui-list-item-label{
  color:#28B8A1;
}
.aui-list-item-input input {
  font-size:14px;
}
.date-box {
  padding:0 0.5rem;
}
</style>
<style>
.mx-datepicker {
  border:1px solid #eee;
  width:100%;
  margin: 0.5rem auto;
  display: block;
  background: #eee;
}
.mx-input-wrapper input {
  padding:0 0.5rem !important;
  text-align: center !important;
  color:#666 !important;
}
.mx-calendar-icon,.mx-input-icon {
  background: #eee;
}
.mx-datepicker-popup,.mx-calendar,.mx-calendar-content {
  width:100%;
}
.mx-panel-date td.today {
  color:#28B8A1;
  font-weight: bold;
}
.mx-calendar-content .cell.actived {
  background-color: #28B8A1;
}

.biao {
  background: #fff;
  color: #34DBDA;
  /*margin-top: 10px;*/
  height: auto;
  border: 1px solid #34DBDA;
  height: 1rem;
  width: 3rem;
  border-radius: 6px;
  line-height: 0.95rem;
}
.aui-btn:active {
  color: #fff;
  background-color: #34DBDA;
}
.sleepYS{
  background: #34DBDA; color:#fff;
}
.yyseach{
  /*position: fixed;*/
  /*bottom: 0px;*/
  /*height: 20rem;*/
  /*width: 100%;*/
  padding-left: 1rem; 
  background: #fff;
  z-index: 100;
}
.yyseach li{
  border-bottom: 1px solid #e5e5e5;
  line-height:1.5rem;
  padding-left: 1rem
}
</style>

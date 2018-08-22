<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'编写住院日志'"></myHeader>

    <div class="date-box">
      <date-picker v-model="time1" type="datetime" :confirm="confirm" confirm-text="确认" :editable="editable" :format="format"></date-picker>
    </div>

    <div class="aui-content aui-margin-b-15">
      <div style="width:100%;height:auto">
        <div class="ybiaoqian" v-for="(item,index) in yaoming">
          {{item}}
          <img src="static/image/shanchu.png" @click="shanchu(index)" alt="" class="quxiaoyao">
        </div>
      </div>
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              用药建议
            </div>
            <div class="aui-list-item-input" >
              <input type="text" placeholder="请输入用药建议" v-model="conntr" @click="yongyao"  v-on:input="sjgb"> 
            </div>
          </div>
        </li>
        <ul class="yyseach " style="display: none">
         <li v-for='item in yp' @click="touchend(item.name,item.bzyl,item.unit)">{{item.name}} {{item.bzyl}}{{item.unit}}</li>
       </ul>
       <!-- <select    v-on:change="gradeChange"> -->
        <!-- <option value="aa" v-for='item in yp'>{{item.name}} {{item.bzyl}}{{item.unit}}</option> -->
          <!-- <option  >aaaqqq</option>
          <option  >bbb</option>
          <option  >vvv</option>
          <option  >sss</option>
        </select> -->
        <li class="aui-list-item">
          <div class="aui-list-item-inner" style="margin-right: 0px">
            <div class="aui-list-item-label">
              饮食建议
            </div>
            <div class="aui-list-item-input" style="padding-right:0px">
              <div @click="sleepBTN($event,0)" class="biao aui-btn" style="margin-right: 0.5rem">好</div>
              <div @click="sleepBTN($event,0)" class="biao aui-btn" style="margin-right: 0.5rem">一般</div>
              <div @click="sleepBTN($event,0)" class="biao aui-btn">不佳</div>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner" style="margin-right: 0px">
            <div class="aui-list-item-label">
              睡眠建议
            </div>
            <div class="aui-list-item-input" style="padding-right:0px">
              <div @click="sleepBTN($event,1)" class="biao aui-btn" style="margin-right: 0.5rem">好</div>
              <div @click="sleepBTN($event,1)" class="biao aui-btn" style="margin-right: 0.5rem">一般</div>
              <div @click="sleepBTN($event,1)" class="biao aui-btn">不佳</div>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner" style="margin-right: 0px">
            <div class="aui-list-item-label">
              状态建议
            </div>
            <div class="aui-list-item-input" style="padding-right:0px">
              <div @click="sleepBTN($event,2)" class="biao aui-btn" style="margin-right: 0.5rem">好</div>
              <div @click="sleepBTN($event,2)" class="biao aui-btn" style="margin-right: 0.5rem">一般</div>
              <div @click="sleepBTN($event,2)" class="biao aui-btn">不佳</div>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner" style="margin-right: 0px">
            <div class="aui-list-item-label">
              诊疗建议
            </div>
            <div class="aui-list-item-input" style="padding-right:0px">
              <div @click="sleepBTN($event,3)" class="biao aui-btn" style="margin-right: 0.5rem">好</div>
              <div @click="sleepBTN($event,3)" class="biao aui-btn" style="margin-right: 0.5rem">一般</div>
              <div @click="sleepBTN($event,3)" class="biao aui-btn">不佳</div>
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
      yaoming:[],
      conntr:'',
      sleep:'',
      yinshi:'',
      zhuangtai:'',
      zhenliao:'',
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
              sleepBTN(e,index){
                // console.log($(e.target).html())
                $(e.target).addClass("sleepYS").siblings().removeClass("sleepYS");
                if (index == 0) {
                  this.yinshi = $(e.target).html()
                  console.log(this.yinshi)
                }
                if (index == 1) {
                  this.sleep = $(e.target).html()
                  console.log(this.sleep)
                }
                if (index == 2) {
                  this.zhuangtai = $(e.target).html()
                  console.log(this.zhuangtai)
                }
                if (index == 3) {
                  this.zhenliao = $(e.target).html()
                  console.log(this.zhenliao)
                }
                
              },
              yongyao(){
                var that = this;
                $("body").css('overflow','hidden');
                var url = 'medicine'
                that.ajax({url,method:'get',success:function(data){
                  console.log(data)
                  that.yp=data
                  $(".yyseach").show()
                }})
              },
              touchend(yname,yjiliang,ydanwei,e){
                
                this.yaoming.push(yname+' '+yjiliang+ydanwei)
                this.conntr = ''
                $(".yyseach").hide()
                $("body").css('overflow','auto');
                console.log(this.yaoming)
              },
              // yincang(){
              //   setTimeout(function(){
              //     $(".yyseach").hide()
              //   },1)

              // },
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
          if (data.length>0) {
            $(".yyseach").show()
            $("body").css('overflow','hidden');
            that.yp=data
          }else{
            $(".yyseach").hide()
            $("body").css('overflow','auto');
          }
        }})
      },
      gradeChange(){ 
        this.conntr = $("#pid  option:selected").text()
      },
      submit(){
        var that=this;
        if (that.time1 == '') {
          Toast('请选择时间！');
          return;
        }
        if (that.yaoming == '') {
          Toast('请选择用药建议！');
          return;
        }
        if (that.sleep == '') {
          Toast('请选择睡眠建议！');
          return;
        }
        if (that.other == '') {
          Toast('请填写其他建议！');
          return;
        }
        if (that.fkcont == '') {
          Toast('请填写日志内容！');
          return;
        }
        var params = {
          data:{
            "dakaData":that.dateFormat(that.time1),
            "content":that.yaoming.toString(),
            "sleep":that.sleep,
            "diet":that.yinshi,
            "state":that.zhuangtai,
            "diagnosis":that.sleep,
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
  shanchu(index){
    this.yaoming.splice(index,1)
    console.log(this.yaoming)
  },
},
activated() {
  var id = this.$route.params.id

  this.get_daka(id);
},
beforeRouteLeave(to,from,next){//记录离开时的位置
  $(".yyseach").hide()
  $("body").css('overflow','auto');
  next()
},
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
  background: #34DBDA;
}
.aui-list-item {
  border-bottom: 1px solid #eee;
  font-size:14px;
}
.aui-list-item-label{
  color:#34DBDA;
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
  color:#34DBDA;
  font-weight: bold;
}
.mx-calendar-content .cell.actived {
  background-color: #34DBDA;
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
  line-height: 1rem;
}
.aui-btn:active {
  color: #fff;
  background-color: #34DBDA;
}
.sleepYS{
  background: #34DBDA; color:#fff;
}
.yyseach{
  /*position: absolute;*/
  float: left;
  border: 1px solid #e5e5e5;
  border-top: none;
  /*bottom: 0px;*/
  height: 12rem;
  width: 100%;
  padding-left: 3.5rem; 
  background: #fff;
  overflow-y: auto;
  z-index: 99999999;

}
.yyseach li{
  /*border-bottom: 1px solid #e5e5e5;*/
  line-height:1.5rem;
  padding-left: 1rem;
  font-size: 0.7rem;
  color: #aaa;
}


.ybiaoqian{
  width:28.5%;
  border: 1px solid #eee;
  background: #eee;
  color: #0f0f0f;
  text-align:center;
  border-radius:5%;
  display:inline-block;
  position: relative;
  top: 19px;
  margin-bottom: 1rem;
  margin-left:0.5rem;
  font-size: 0.6rem;
  line-height: 1.7rem
}
.quxiaoyao{
  background: red;
  border-radius: 50%;
  position: absolute;
  right: -5px;
  top: -12px;
  width: 1rem;
  height: 1rem;
  color: #fff;
  line-height: 22px;
  font-weight: 900;
  font-size: 0.5rem;
}
</style>

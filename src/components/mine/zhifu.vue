<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'打卡记录'"></myHeader>

    <div class="aui-content aui-content-padded" >
     <li class="aui-list-header">
      患者用药记录
    </li>
    <ul class="aui-list aui-select-list">

      <li class="aui-list-item" v-for="item in dakaijilu">
       <!-- <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i> -->
       <span style="rem;color:#666">{{dateFormat(item.createdAt)}}患者服用{{item.content}}</span>
       <!-- <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i> -->
     </li>

   </ul>
   
 </div>
 <div class="aui-content aui-content-padded" >
   <li class="aui-list-header">
    患者情绪记录
  </li>
  <ul class="aui-list aui-select-list">

    <li class="aui-list-item" v-for="item in dakaijilu">
     <!-- <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i> -->
     <span style="color:#666">{{dateFormat(item.createdAt)}} {{item.other}}</span>
     <!-- <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i> -->
   </li>
 </ul>

</div>
<div class="aui-content aui-content-padded" >
 <li class="aui-list-header">
  睡眠记录
</li>
<ul class="aui-list aui-select-list">

  <li class="aui-list-item" v-for="item in dakaijilu">
   <!-- <i class="aui-iconfont aui-icon-display" style="font-size:22px"></i> -->
   <span style="color:#666">{{dateFormat(item.createdAt)}} {{item.sleep}}</span>
   <!-- <i class="aui-iconfont aui-icon-camera" style="font-size:18px"></i> -->
 </li>
</ul>

</div>
<div class="aui-content aui-margin-b-15">
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
  <textarea class="text " placeholder="反馈内容" v-model="fkcont"></textarea>
</div>
<!-- <ul class="yyseach" style="display: none">
  <li v-for='item in yp' @click="touchend(item.name,item.bzyl,item.unit)">{{item.name}} {{item.bzyl}}{{item.unit}}</li>
</ul> -->
<div class="exitBg my-middle">
  <div class="aui-btn aui-btn-success aui-btn-block aui-btn-sm" @click="fkyjBTN">确 定</div>
</div>
</div>
</div>

</template>

<script>
import Calendar from '../vue-calendar-component/index';
import $ from '../public/jquery';
import { Toast } from 'mint-ui';
export default {
  name: 'geqian',
  data() {
    return {
     dakaijilu:[],
     conntr:'',
     sleep:'',
     other:'',
     fkcont:'',
     yp:[],
     dakaijiluid:[]
   }
 },
 methods: {

   get_dakaishuju(){
    var that = this
    var filter = {
      "fields": {"id":true,"createdAt":true,"content":true,"sleep":true,"other":true},
      "order": "createdAt DESC",
      "where": {
        "brid":sessionStorage.getItem("hz_id"),
      // "status":1
    },
    // "skip":start,
    // "limit":that.pageSize,
    // "include":"patientidPointer",
    // "includefilter":{"my_user":{"fields":['id','realname',]}}
  };
  that.ajax({
    url: "dakalist?filter="+encodeURIComponent(JSON.stringify(filter)),
    method: "get",
    success: function(data) {
     console.log(data)
     if (data) {
      that.dakaijilu=data;
      for (var i = 0; i < data.length; i++) {
        that.dakaijiluid.push(data[i].id) 
      }

    }
  }
});
},
opennext(){

},
openform1(){
 this.$router.push({path:'/fankui'})
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
  gradeChange(){ 
    this.conntr = $("#pid  option:selected").text()
  },
// 建议
sleepBTN(e){
  console.log($(e.target).html())
  $(e.target).addClass("sleepYS").siblings().removeClass("sleepYS");
  this.sleep = $(e.target).html()
},
fkyjBTN(){
  // console.log(this.dakaijiluid)
  var that = this
  if (that.conntr == '') {
    Toast('请输入用药建议！');
    return
  }
  if (that.sleep == '') {
    Toast('请选择建议！');
    return
  }
  if (that.other == '') {
    Toast('请输入其他建议！');
    return
  }
  var params ={
    data:{
      'brid':sessionStorage.getItem("hz_id"),
      'brname':that.realname,
      'did':window.localStorage.getItem("userId"),
      'dname':window.localStorage.getItem("userName"),
      'fk':that.fkcont,
      'content':that.conntr,
      'sleep':that.sleep,
      'other':that.other,
      "_method":"PUT"
    }
  }
  for (var i = 0; i < that.dakaijiluid.length; i++) {
    var url = 'dakalist/'+that.dakaijiluid[i]
    that.ajax({url,method:"post",params,success:function(data){
      console.log(data)
      
      Toast('反馈成功！');
    }})
  }
  that.$router.go(-1);
  
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
  this.conntr = yname+' '+yjiliang+ydanwei
  $(".yyseach").hide()
  $("body").css('overflow','auto');
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
    console.log(data)
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
},
mounted () {
 console.log('挂载好了')
 this.get_dakaishuju()


},
created:function() {

},
   beforeRouteLeave(to,from,next){//记录离开时的位置
    $(".yyseach").hide()
    $("body").css('overflow','auto');
    next()
  },
  watch:{

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
  color:#34DBDA;
  border:1px solid #34DBDA;
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
.aui-btn-success {
  background: #34DBDA;
  width:fill-available;
  width:-webkit-fill-available;
}
.aui-list-item {
  border-bottom: 1px solid #eee !important;
  font-size:14px;
}
.aui-list-item-label{
  color:#34DBDA !important;
}
.aui-list-item-input input {
  font-size:14px;
}
.exitBg {
  height: 5rem;
  padding: 0 0.5rem;
}
.aui-list-header {
  font-size:14px;
  color:#34DBDA;
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
</style>

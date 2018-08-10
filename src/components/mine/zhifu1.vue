<template>
  <div style="background-color: white; min-height: 105%;">
    <myHeader :title="'患者详情'"></myHeader>

    <section class="aui-content-padded">
      <p><div class="aui-label">预约时间：{{yy_data?yy_data:''}} 线上诊疗</div></p>
      <!-- <p><div class="aui-label">诊&ensp;室&ensp;号：900001</div></p> -->
      <p><div class="aui-label">姓&ensp;&ensp;&ensp;&ensp;名：{{realname?realname:''}}</div></p>
      <p><div class="aui-label">性&ensp;&ensp;&ensp;&ensp;别：{{sex?sex:''}}</div></p>
      <p><div class="aui-label">年&ensp;&ensp;&ensp;&ensp;龄：{{age?age:''}}</div></p>
      <!-- <p><div class="aui-label">病&ensp;&ensp;&ensp;&ensp;种：抑郁科</div></p> -->
      <p><div class="aui-label aui-label-danger aui-label-outlined">{{bl_con}}</div></p>
      <div class="aui-list-item-inner">
        <div class="aui-list-item-title">病情图片附件：</div>
        <div class="aui-row aui-row-padded">
          <div class="aui-col-xs-4" v-for="item in bl_img">
            <img v-preview="item" :src="item" preview-title-enable="false" preview-nav-enable="true"/>
          </div>
          
        </div>
      </div>
    </section>
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              用药建议
            </div>
            <div class="aui-list-item-input" >
              <input type="text" placeholder="请输入用药建议" v-model="conntr" @click="yongyao" v-on:input="sjgb"> 
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
            <div class="aui-list-item-input"  style="padding-right:0px">
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
      <div class="aui-btn aui-btn-danger aui-btn-block" @click='fkyjBTN'>反馈意见</div>
    </div>
    <!-- <ul class="yyseach" style="display: none">
      <li v-for='item in yp' @click="touchend(item.name,item.bzyl,item.unit)">{{item.name}} {{item.bzyl}}{{item.unit}}</li>
    </ul> -->

    <lg-preview></lg-preview>
  </div>
</template>

<script>
import md5 from '../public/md5'
import $ from '../public/jquery';
import { Toast } from 'mint-ui';
export default {
  name: 'register',
  data() {
    return {
      userData:[],
      yy_data:'',
      realname:'',
      sex:'',
      age:'',
      bl_con:'',
      bl_img:[],
      conntr:'',
      sleep:'',
      other:'',
      fkcont:'',
      yp:[]

    }
  },
  methods: {

    closewin:function() {
      var _this = this;
      _this.$router.backRoute();
    },
    gradeChange(){ 
      this.conntr = $("#pid  option:selected").text()
    },
    sleepBTN(e){
      // console.log($(e.target).html())
      $(e.target).addClass("sleepYS").siblings().removeClass("sleepYS");
      this.sleep = $(e.target).html()
    },
    openRegisterProtocol() {
      this.$router.pushRoute({name:"registerProtocol"});
    },
      // 查询数据
      getMy_user() {
        // alert(sessionStorage.getItem("hz_id"))
        var that = this;
        that.yy_data = sessionStorage.getItem("JZTime")
        var filter = {
          "fields": {"id":true,"realname":true,"sex":true,"age":true},
          "where": {
            "id":sessionStorage.getItem("hz_id"),
          },
          "include":"cash",
          "includefilter":{"bingli":{"fields":['id','bl_con','bl_img']}}
        };
        that.ajax({
          url: "my_user?filter="+encodeURIComponent(JSON.stringify(filter)),
          // url: "my_user/5b615a25f5f5bbad6b43a3a3/cash",
          method: "get",
          success: function(data) {
            console.log(data)
            if (data) {
              that.realname = data[0].realname?data[0].realname:'';
              that.sex = data[0].sex?data[0].sex:'';
              that.age = data[0].age?data[0].age:'';
              
              // console.log(data[0].cash[0])
              if (data[0].cash[0]) {
                that.bl_con = data[0].cash[0].bl_con?data[0].cash[0].bl_con:'';
                that.bl_img = data[0].cash[0].bl_img;
                sessionStorage.setItem("bl_id",data[0].cash[0].id)
              }else{
                that.bl_con="未填写"
                that.bl_img=""
              }
              
            }
            
          }
        });
      },
      get_dakailist(){
        var that = this ;
        var filter={
          "where":{
            "brid":sessionStorage.getItem("hz_id")
          }
        };
        var url = "dakalist?filter="+encodeURIComponent(JSON.stringify(filter));
        that.ajax({url,method:"get",success:function(data){
          // console.log(data)
          that.conntr = data[0].content;
          that.sleep = data[0].sleep;
          that.other = data[0].other;
        }
      })
      },
      fkyjBTN(){
        var that = this
        var params ={
          data:{
            'brid':sessionStorage.getItem("hz_id"),
            'brname':that.realname,
            'did':window.localStorage.getItem("userId"),
            'dname':window.localStorage.getItem("userName"),
            'fk':that.fkcont,
            'yongyao':that.conntr,
            'sleep':that.sleep,
            'other':that.other,
            'bl_id':sessionStorage.getItem("bl_id"),
          }
        }
        var url = 'fankui'
        that.ajax({url,method:"post",params,success:function(data){
          console.log(data)
          that.$router.push({path:'/zhenshi'})
          Toast('反馈成功！');
        }})
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
          // console.log(data)
          if (data.length>0) {
            $(".yyseach").show()
            that.yp=data
          }else{
            $(".yyseach").hide()
          }
        }})
      },
    },
    mounted(){

      // this.get_dakailist()
    },
    activated() {
      this.getMy_user()
    },
  }
  </script>

  <style scoped>
  .logo {
    width: 4rem;
    margin: 1.8rem auto 0;
  }
  .iptBox {
    margin:2.25rem auto 0;
    width:17.25rem;
  }
  .aui-btn-danger {
    background-color: #27B5B1 !important;
    margin-top: 1.5rem;
  }
  section .aui-list-item-inner {
    border:1px solid #eee;
    margin:0.3rem 0;
    padding:0.5rem;
  }
  .aui-list-item-title {
    font-size: 12px;
    color:#666;
    margin-bottom: 0.3rem;
  }
  .aui-label {
    white-space: pre-wrap;
    text-align: left;
    line-height: 1rem;
    padding:0.5rem;
    margin: 0.3rem 0;
    width:100%;
    background: #eee;
  }
  .aui-label-danger {
    border-color: #ccc;
  }
  .aui-label-outlined.aui-label-danger, .aui-label-outlined.aui-label-danger:after{
    border-color: #ccc;
    background:transparent;
    color:#666;
  }
  img {
   width: 100%;
   height: 100%;
 }
 .aui-btn-block {
  margin:0.5rem;
  width:auto;
  height:2rem;
  line-height: 2rem;
  font-size: 14px;
  letter-spacing: 0.1rem;
}
.aui-btn-success {
  background: #28B8A1;
  width:fill-available;
  width:-webkit-fill-available;
}
.aui-list-item {
  border-bottom: 1px solid #eee !important;
  font-size:14px;
}
.aui-list-item-label{
  color:#28B8A1 !important;
}
.aui-list-item-input input {
  font-size:14px;
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

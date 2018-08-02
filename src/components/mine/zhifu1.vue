<template>
  <div style="background-color: white; min-height: 105%;">
    <myHeader :title="'患者详情'"></myHeader>

    <section class="aui-content-padded">
      <p><div class="aui-label">预约时间：2018-06-19 17：00 - 17：30 线上诊疗</div></p>
      <p><div class="aui-label">诊&ensp;室&ensp;号：900001</div></p>
      <p><div class="aui-label">姓&ensp;&ensp;&ensp;&ensp;名：张三</div></p>
      <p><div class="aui-label">性&ensp;&ensp;&ensp;&ensp;别：男</div></p>
      <p><div class="aui-label">年&ensp;&ensp;&ensp;&ensp;龄：23</div></p>
      <p><div class="aui-label">病&ensp;&ensp;&ensp;&ensp;种：抑郁科</div></p>
      <p><div class="aui-label aui-label-danger aui-label-outlined">病情描述：一天中的大部分时间意志消沉，几乎每天如此，通过两种方式得到证明，一个是主观表达（如感到空虚、无助、悲伤等），另一个是别人的观察（爱哭泣等）。青少年表现为情绪的莫名急躁。</div></p>
      <div class="aui-list-item-inner">
        <div class="aui-list-item-title">病情图片附件：</div>
        <div class="aui-row aui-row-padded">
          <div class="aui-col-xs-4">
            <img v-preview="'static/image/myim1.jpeg'" :src="'static/image/myim1.jpeg'" preview-title-enable="false" preview-nav-enable="true"/>
          </div>
          <div class="aui-col-xs-4">
            <img v-preview="'static/image/myim1.jpeg'" :src="'static/image/myim1.jpeg'" preview-title-enable="false" preview-nav-enable="true"/>
          </div>
          <div class="aui-col-xs-4">
            <img v-preview="'static/image/myim1.jpeg'" :src="'static/image/myim1.jpeg'" preview-title-enable="false" preview-nav-enable="true"/>
          </div>
          <div class="aui-col-xs-4">
            <img v-preview="'static/image/myim1.jpeg'" :src="'static/image/myim1.jpeg'" preview-title-enable="false" preview-nav-enable="true"/>
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
            <div class="aui-list-item-input">
              <input type="text" placeholder="请输入用药建议">
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              睡眠建议
            </div>
            <div class="aui-list-item-input">
              <input type="text" placeholder="请输入睡眠建议">
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              其他建议
            </div>
            <div class="aui-list-item-input">
              <input type="text" placeholder="请输入其他建议">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <textarea class="text " placeholder="反馈内容"></textarea>
      <div class="aui-btn aui-btn-danger aui-btn-block">反馈意见</div>
    </div>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
import md5 from '../public/md5'
export default {
  name: 'register',
  data() {
    return {
        mobile:'',//手机号
        code:'',//验证码
        password:'',//密码
        isshowCount:false,//是否显示
        codeMsg:'获取验证码',//获取验证码按钮文本
        time:60,//获取验证码倒计时
      }
    },
    methods: {
      closewin:function() {
        var _this = this;
        _this.$router.backRoute();
      },
      
      openRegisterProtocol() {
        this.$router.pushRoute({name:"registerProtocol"});
      },
      // 查询数据
      getMy_user() {
        var that = this;
        var filter = {
          "fields": {"id":true,"startdate":true,"enddate":true,"servicetime":true,"servieceid":true,"patientid":true},
          "order": "createdAt DESC",
          "where": {
            "info":1,
          },
          "include":"patientidPointer",
          "includefilter":{"my_user":{"fields":['id','realname',]}}
        };
        that.ajax({
          url: "appointment?filter="+encodeURIComponent(JSON.stringify(filter)),
          method: "get",
          success: function(data) {
            
          }
        });
      },
      
      
    },
    activated() {

    }
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
</style>

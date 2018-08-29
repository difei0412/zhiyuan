<template>
	<div style="background-color: #fff; min-height: 100%;">
    <myHeader :title="'登录'"></myHeader>

    <div>
      <div class="logo">
       <img src="static/image/logo.png" />
       <center><span class="app-name">知源医生端</span></center>
     </div>
     <div class="aui-content aui-margin-b-15 aui-margin-t-15">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <img data-v-6d71e44c="" src="static/image/mobileatByFoot.png" alt="" style="height:1.1rem">
            </div>
            <div class="aui-list-item-input">
              <input type="text" placeholder="请输入手机号" v-model="loginuser">
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
             <img src="static/image/pswatByFoot.png" alt="" width="18" />
           </div>
           <div class="aui-list-item-input">
            <input type="password" placeholder="请输入密码" v-model = 'password'>
          </div>
        </div>
      </li>
      <li class="submit-box">
        <div class="aui-btn aui-btn-danger aui-btn-block" @click="btn_login">登 录</div>
        <div class="aui-btn aui-btn-block aui-btn-outlined" style="margin-top:15px;color:#a2a8ae;border-color:#a2a8ae;" @click="openRegister">注 册</div>
      </li>
      <li>
        <div class="forget-pass"><span @click="openForgetPsw">找回密码？</span></div>
      </li>

    </ul>
  </div>
</div>

</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
export default {
  name: 'login',  
  data() {
    return {
      loginuser : '',
      password : '',
      toast: null,
      vuegConfig: {
        disable: false,
        forwardAnim: 'fadeInRight',
        duration: '.3',
        backAnim: 'fadeInLeft'
      }
    }
  },
  methods: {
    openRegister(){
      this.$router.push({name:'register'});
    },
    openForgetPsw(){
      this.$router.push({name:'forgetPsw'});
    },
    btn_login:function() {
      if (!myreg.test(this.loginuser)) {
        Toast('请输入正确的手机号！');
        return ;
      } 
      if(!this.password) {
        this.$MessageBox.alert('请输入密码');
        return
      }
       var that = this;
        that.toast.loading({
         title:"加载中",
         duration:2000
       },function(ret){

       });
      setTimeout(function(){
        that.loginAjax();
      }, 70);
    },
    loginAjax:function() {
        var that = this;
				//查询账号是否存在
				var url1 = 'expert/count?filter={"where":{"mobile":' + that.loginuser + '}}';
				var method = 'get';
				that.ajax({url:url1,method,
					success:function(data) {
            //账号存在进入登录接口（查）
            if (data.count!==0) {
              var url2 = "expert?filter[where][mobile]=" + that.loginuser;
              url2 += '&filter[where][password]=' + ('zhiyuan_'+that.password);
              // url2 += '&filter[where][info]=1';
              url2 += '&filter[fields][password]=false'
              that.ajax({url:url2, method,
                success:function(data) {
                that.toast.hide();
                if (JSON.stringify(data) == '[]') {
                  that.$MessageBox.alert('账号或者密码错误');
                } else {
                  window.localStorage.setItem('userMobile',data[0].mobile);
                  window.localStorage.setItem('userId',data[0].id);
                  window.localStorage.setItem('userName',data[0].name);
                  var tmp = {};
                  tmp.id=data[0].id;
                  tmp.tx=data[0].tx;
                  tmp.username=data[0].username;
                  tmp.name=data[0].name;
                  tmp.mobile=data[0].mobile;
                  tmp.timelist = data[0].timelist;
                  tmp = JSON.stringify(tmp);
                  window.sessionStorage.setItem('userinfo_obj',tmp);
                  if (api) {
                    //推送绑定用户
                    var push = api.require('push');
                    push.bind({
                      userName: data[0].name,
                      userId: data[0].id
                    }, function(ret, err){
                      if( ret ){
                        // alert( data[0].id);
                      }else{
                        alert( JSON.stringify( err) );
                      }
                    });
                  }
                  that.$router.push({name:"index"});
                }
              }
            });
						} else { //账号不存在
							that.$MessageBox.alert('该账号未注册');
              that.toast.hide();
						}
					}
				})
			}
		},
    mounted(){
      this.toast = new auiToast();

    },
		activated() {
			this.loginuser = window.localStorage.getItem('userMobile');
			this.password = '';
			if (window.localStorage.getItem('userId')) {
				this.$router.back();
			}
		}
	}
  </script>

  <style scoped>
  .logo {
    width: 4rem;
    margin: 1.8rem auto 0;
  }
  .iptBox {
    margin:1.5rem auto 0;
    width:17.25rem;
  }
  .aui-btn-danger {
    background-color: #34DBDA !important;
    margin-top: 0.6rem;
  }
  .app-name {
    color:rgb(233,98,80);
    /*color:#34DBDA;*/
    font-weight: bold;
    font-family: "微软雅黑";
    letter-spacing: 0.1rem;
    font-size: 14px;

  }
  .aui-content {
    margin-top:2rem !important;
  }
  .aui-list-item {
    border-bottom: 1px solid #eee;
    padding:0.3rem 0.6rem;
  }
  .submit-box {
    padding:1rem 0.8rem 0.5rem;
  }
  .submit-box a{
    color:#f22a2a;
  }
  .aui-font-size-14 {
    padding-top:2rem;
    text-align: center;
  }

  .aui-btn-danger,.aui-btn-outlined {
    margin-top: 1rem;
    height:2rem;
    line-height: 2rem;
    font-size: 14px;
  }
  .aui-btn-outlined {
    border: 1px solid #ccc !important;
  }
  .forget-pass {
    font-size:12px;
    text-align:right;
    line-height:2.1rem;
    margin-right: 1rem;
    color:#f60;
  }
  </style>

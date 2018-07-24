<template>
	<div style="background-color: #fff; min-height: 100%;">
    <myHeader :title="'登录'"></myHeader>

    <div>
      <div class="logo">
         <img src="static/image/logo.png" />
           <center><span class="app-name">知源医生端</span></center>
      </div>
      <div class="iptBox aui-list aui-form-list">
        <div class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <img src="../../../static/image/mobileatByFoot.png" alt="" width="18" />
            </div>
            <div class="aui-list-item-input">
              <input type="tel" v-model="loginuser" placeholder="手机号">
            </div>
          </div>
        </div>
        <div class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <img src="../../../static/image/pswatByFoot.png" alt="" width="18" />
            </div>
            <div class="aui-list-item-input">
              <input type="password" v-model="password" placeholder="请输入密码">
            </div>
          </div>
        </div>
        <div style="font-size:0.7rem;text-align:right;line-height:2.1rem;"><span @click="openForgetPsw">忘记密码？</span></div>
        <div class="aui-btn aui-btn-danger aui-btn-block" @click="btn_login">登 录</div>
        <div class="aui-btn aui-btn-block aui-btn-outlined" style="margin-top:15px;color:#a2a8ae;border-color:#a2a8ae;" @click="openRegister">注 册</div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'login',
		data() {
      return {
        loginuser : '',
        password : ''
      }
    },
    methods: {
      openRegister(){
        this.$router.pushRoute({name:'register'});
      },
      openForgetPsw(){
        this.$router.pushRoute({name:'forgetPsw'});
      },
      btn_login:function() {
        if(!/^1[34578]\d{9}$/.test(this.loginuser)) {
          this.$MessageBox.alert('请输入正确的手机号');
          return
        }
        if(!this.password) {
          this.$MessageBox.alert('请输入密码');
          return
        }
        this.loginAjax();
      },
      loginAjax:function() {
        var that = this;

				//查询账号是否存在
				var url1 = 'f_user/count?filter={"where":{"User_name":' + that.loginuser + '}}';
				var method = 'get';
				that.ajax({url:url1,method,
					success:function(data) {
            //账号存在进入登录接口（查）
            if (data.count!==0) {
              var url2 = "f_user?filter[where][User_name]=" + that.loginuser;
              url2 += '&filter[where][password]=' + that.password;
              url2 += '&filter[where][info]=1';
              url2 += '&filter[fields][password]=false'
              that.ajax({url:url2, method,
               success:function(data) {
                if (JSON.stringify(data) == '[]') {
                  that.$MessageBox.alert('账号或者密码错误');
                } else {
                  window.localStorage.setItem('userMobile',data[0].User_name);
                  window.localStorage.setItem('userId',data[0].id);
                  that.$router.backRoute();
                }
              }
            });
						} else { //账号不存在
							that.$MessageBox.alert('该账号未注册');
						}
					}
				})
			}
		},
		activated() {
			this.loginuser = window.localStorage.getItem('userMobile');
			this.password = '';
			if (window.localStorage.getItem('userId')) {
				this.$router.backRoute();
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
    background-color: #28B8A1 !important;
    margin-top: 0.6rem;
  }
</style>

<template>
	<div style="background-color: white; min-height: 100%;">
    	<myHeader :title="'找回密码'"></myHeader>

    	<div>
    		<div class="aui-content aui-margin-b-15 aui-margin-t-15">
			    <ul class="aui-list aui-form-list">
			        <li class="aui-list-item">
			            <div class="aui-list-item-inner">
			                <div class="aui-list-item-label-icon">
			                    <img data-v-6d71e44c="" src="/static/img/mobileatByFoot.ffcc54a.png" alt="" width="18">
			                </div>
			                <div class="aui-list-item-input">
			                    <input type="text" placeholder="请输入手机号">
			                </div>
			                <div class="aui-font-size-12" style="color:#f22a2a;padding-right:0;width:160px;text-align:center;border-left:1px solid #fafafa;" v-if="isshowCount"><span>{{time}}</span>s后重新获取</div>
    					<div class="aui-font-size-12" style="color:#f22a2a;padding-right:0;width:160px;text-align:center;border-left:1px solid #fafafa;" v-else @click="getCodeBefore(1)">{{codeMsg}}</div>
			            </div>
			        </li>
			        <li class="aui-list-item">
			            <div class="aui-list-item-inner">
			                <div class="aui-list-item-label-icon">
			                    <img data-v-6d71e44c="" src="/static/img/mobileatByFoot.ffcc54a.png" alt="" width="18">
			                </div>
			                <div class="aui-list-item-input">
			                    <input type="text" placeholder="请输入验证码">
			                </div>
			            </div>
			        </li>
			        <li class="aui-list-item">
			            <div class="aui-list-item-inner">
			                <div class="aui-list-item-label-icon">
			                    <img src="../../../static/image/pswatByFoot.png" alt="" width="18" />
			                </div>
			                <div class="aui-list-item-input">
			                    <input type="password" placeholder="请输入新密码">
			                </div>
			            </div>
			        </li>
			        <li class="aui-list-item">
			            <div class="aui-list-item-inner">
			                <div class="aui-list-item-label-icon">
			                   <img src="../../../static/image/pswatByFoot.png" alt="" width="18" />
			                </div>
			                <div class="aui-list-item-input">
			                    <input type="password" placeholder="请输入确认密码">
			                </div>
			            </div>
			        </li>
				</ul>
				<div class="aui-btn aui-btn-danger aui-btn-block" @click="getCodeBefore(2)">找回密码</div>
			</div>
    	</div>
    </div>
</template>

<script>
	import md5 from '../public/md5'
	
	export default {
		name: 'forgetPsw',
		data() {
			return {
				userId:"",
				mobile:'',//手机号
				code:'',//验证码
				password:'',//密码
				isshowCount:false,//是否显示
				codeMsg:'获取验证码',//获取验证码按钮文本
				time:60//获取验证码倒计时
			}
		},
		methods: {
			//重新获取验证码倒计时函数
			countDown() {
				var that = this;
				var timer = setInterval(function(){
					if(that.time<=0){
						that.codeMsg = "重新获取";
						that.isshowCount = false;
						that.time = 60;
						clearInterval(timer);
						return
					}
					that.time--;
				},1000)
			},
			//获取验证码之前先检测账号是否已注册
			getCodeBefore(type) {
				var that = this;

				if(!/^1[34578]\d{9}$/.test(that.mobile)) {
					this.$MessageBox.alert('请输入正确的手机号');
					return
				}
				//查表是否存在此账号
				var url1 = 'f_user?filter={"where":{"User_name":' + that.mobile + '}}';
				that.ajax({url:url1,method:'GET',
					success:function(data){
						if (JSON.stringify(data)=="[]") {
							that.$MessageBox.alert('该账号未注册，请前往注册！');
							return
						} else {
							that.userId = data[0].id;
							if (type=="1") {
								that.getCode();
							} else {
								that.fgtpsw_btn();
							}
						}
					}
				})
			},
			//获取验证码
			getCode() {
				var that = this;
				that.isshowCount = true;
				that.countDown();
				var sign = "jsjy" + that.mobile + "cgyc";
				sign = md5(sign);
				sign = sign.toUpperCase();
				var url = 'http://101.200.169.185/getTtSMSCode?mobile=' + that.mobile + '&sign=' + sign;
				that.$http.get(url).then(function(response){
					if(response.data.code=="200"){
						that.checkIfCode(response.data.smsCode);
					}
				}).catch(function(error){

				})
			},
			//数据库检查是否存在此手机号所收验证码
			checkIfCode(code) {
				var that = this;
				var url = 'code?filter={"where":{"mobile":'+ that.mobile +'}}';
				var method = "GET";
				that.ajax({url,method,
					success:function(response){
						if(response.length==0) {
							that.storeCode(code);
						}else {
							that.updateCode(code,response[0].id)
						}
					},
					error:function(data){}
				})
			},
			//如果不存在，直接保存
			storeCode(code) {
				var that = this;
				var url = "code";
				var method = "POST";
				var params = {
					"data":{
						"mobile":that.mobile,
						"status":"0",
						"code":code
					}
				}
				that.ajax({url,method,params,
					success:function(response){
					},
					error:function(data){}
				})
			},
			//如果存在，将此手机号code字段更改为最新
			updateCode(code,id) {
				var that = this;
				var url = "code/" + id;
				var method = "POST";
				var params = {
					"data":{
						"code":code,
						"_method":"PUT"
					}
				}
				that.ajax({url,method,params,
					success:function(response){
					},
					error:function(data){}
				})
			},
			fgtpsw_btn() {
				if(!/^1[34578]\d{9}$/.test(this.mobile)) {
					this.$MessageBox.alert('请输入正确的手机号');
					return
				}
				if(!this.code) {
					this.$MessageBox.alert('请输入验证码');
					return
				}
				if(!this.password) {
					this.$MessageBox.alert('请输入密码');
					return
				}
				this.fgtpswAjax();
			},
			fgtpswAjax() {
				var that = this;
				that.$Indicator.open();
				//查表得到验证码
				var url = 'code?filter={"where":{"mobile":'+ that.mobile +'}}';
				var method = "GET";
				that.ajax({url,method,
					success:function(response){
						if(response.length>0){
							var code = response[0].code;
							var time = new Date(response[0].updatedAt);
							time = time.getTime();
							var now = new Date().getTime();
							var shix = now-time;
							if(code==that.code&&shix<600000){
								//修改密码
								var url2 = "f_user/" + that.userId;
								var params = {
									"data": {
										"password": that.password,
										"_method":"PUT"
									}
								}
								that.ajax({url:url2,method:'POST',params,
									success:function(data){
										if(data){
											that.$Indicator.close();
											that.$MessageBox.alert("修改成功！").then(function(){
												that.$router.backRoute();
											})
										}
									}
								})
							} else {
								that.$Indicator.close();
								that.$MessageBox.alert("验证码验证失败或者过期！");
							}
						} else {
							that.$Indicator.close();
							that.$MessageBox.alert("验证码验证失败或者过期！");
						}
					},
					error:function(data){}
				})
			},
		},
		activated() {
			this.userId = "";
			this.mobile = "";
			this.code = "";
			this.password = "";
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
		background-color: #f22a2a !important;
		margin-top: 1.5rem;
	}
	.aui-list .aui-list-item-inner {
		margin-right: 0;
	}
	 .aui-list-item {
	    border-bottom: 1px solid #eee;
	    padding:0.3rem 0.6rem;
	}
	.aui-btn-danger {
	    background-color: #28B8A1 !important;
	    margin:5rem 1rem 0;
	    height:2rem;
	    line-height: 2rem;
	    font-size: 14px;
	    width:auto;
	}
</style>

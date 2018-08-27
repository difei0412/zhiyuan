<template>
	<div style="background-color: white; min-height: 100%;">
		<myHeader :title="'注册'"></myHeader>

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
								<input type="text" placeholder="请输入手机号" v-model = "mobile">
							</div>
							<div class="aui-font-size-12" style="color:#f22a2a;padding-right:0;width:160px;text-align:center;border-left:1px solid #fafafa;" v-if="isshowCount"><span>{{time}}</span>s后重新获取</div>
							<div class="aui-font-size-12" style="color:#f22a2a;padding-right:0;width:160px;text-align:center;border-left:1px solid #fafafa;" v-else @click="getCodeBefore">{{codeMsg}}</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label-icon">
								<img data-v-6d71e44c="" src="static/image/mobileatByFoot.png" alt="" style="height:1.1rem">
							</div>
							<div class="aui-list-item-input">
								<input type="text" placeholder="请输入验证码" v-model= 'code'>
							</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label-icon">
								<img src="static/image/pswatByFoot.png" alt="" width="18" />
							</div>
							<div class="aui-list-item-input">
								<input type="password" placeholder="请输入密码" v-model='password'>
							</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label-icon">
								<img src="static/image/pswatByFoot.png" alt="" width="18" />
							</div>
							<div class="aui-list-item-input">
								<input type="password" placeholder="请输入确认密码" v-model='passwordZ'>
							</div>
						</div>
					</li>

					<li class="submit-box">
						<div class="aui-font-size-14 aui-margin-10">用户注册即代表同意“<a @click="openRegisterProtocol">用户协议和隐私条款</a>”</div>
						<div class="aui-btn aui-btn-danger aui-btn-block" @click="register_btn1">注 册</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
import md5 from '../public/md5'
import $ from '../public/jquery.js'
import { Toast } from 'mint-ui';
export default {
	name: 'register',
	data() {
		return {
				mobile:'',//手机号
				code:'',//验证码
				password:'',//密码
				passwordZ:'',//密码
				isshowCount:false,//是否显示
				codeMsg:'获取验证码',//获取验证码按钮文本
				time:60,//获取验证码倒计时
				codeid:"",
				vuegConfig: {
<<<<<<< HEAD
		            disable: false,
		            forwardAnim: 'fadeInRight',
		            duration: '.3',
		            backAnim: 'fadeInRight'
		        },
		        toast: null,
=======
					disable: false,
					forwardAnim: 'fadeInRight',
					duration: '.3',
					backAnim: 'fadeInRight'
				}
>>>>>>> fff32103e93b8ad3789f9e40dbda76e5206b790f
			}
		},
		methods: {
			//打开注册协议
			register_btn1(){
				
				var that = this

				if (that.mobile == '') {
					Toast('请输入手机号！');
					return
				}
				if (!myreg.test(that.mobile)) {
					Toast('请输入正确的手机号！');
					return ;
				} 
				if (that.code=='') {
					Toast('请输入验证码！');
					return
				}
				if (that.password=='') {
					Toast('请输入密码！');
					return
				}
				if (that.passwordZ == '') {
					Toast('请再次输入密码！');
					return
				}else{
					if (that.password == that.passwordZ) {
						var url = 'expert?filter={"where":{"mobile":' + that.mobile + '}}';
						that.ajax({url:url,method:'GET',
							success:function(data){
								console.log(data)
								if (data!=''&&data !=[]&&data!=undefined&&data!=null) {
									Toast("该账号已注册！")
								}else{
									var url1 = 'verycode?filter={"where":{"mobile":"' + that.mobile + '","code":"'+that.code+'"}}';
									console.log(url1)
									var params = {
										data:{
											"mobile":that.mobile,
											"password":that.password,
											"status":'0'
										}

									};
									that.ajax({url:url1,method:'GET',
										success:function(data){
											console.log(data)
											if (data!=''&&data !=[]&&data!=undefined&&data!=nul) {
												that.codeid = data[0].id

												if (data!=''&&data !=[]&&data!=undefined&&data!=null) {
													var url2 = 'expert';
													that.ajax({url:url2,method:'post',params,success:function(data){
														var params = {
															data:{
																status: "1",
																_method: "PUT"
															}
														}
														var url3 = 'verycode/'+that.codeid;
														console.log(url3)
														that.ajax({url:url3,method:'post',params,success:function(data){
															if (data) {
																Toast("注册成功！")
																that.$router.push({name:"login"});
															}else{
																Toast("注册失败！")
															}
														}})

													}

												})
												}else{
													Toast("验证码无效，请重新输入！")
												}
											}else{
												Toast("验证码无效，请重新输入！")
											}
											


										}
									})
								}


							}
						})



						

					}else{
						Toast('密码不一致，请重新输入！');

					}
				}
				
				
				// this.$router.push({name:"xiayibu"});
			},
			openRegisterProtocol() {
				this.$router.push({name:"registerProtocol"});
			},
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
			getCodeBefore() {
				var that = this;
				

				if (that.mobile == '') {
					Toast('请输入手机号！');
					return
				}else{
					if (!myreg.test(that.mobile)) {
						Toast('请输入正确的手机号！');
						return ;
					} 
					//查表是否存在此账号
					var url1 = 'expert?filter={"where":{"mobile":' + that.mobile + '}}';
					that.ajax({url:url1,method:'GET',
						success:function(data){
							// console.log(data)
							if(data != 0&&data != []&&data != '') {
								that.$MessageBox.alert('该账号已注册');
								return
							}else {
								that.getCode();
								var url = 'http://zhiyuan.btisl.com/sendmessage?mobile='+that.mobile

								$.ajax({
									url: url,
									type: 'get',
									dataType: 'json',
											// data: {mobile: that.mobile},
										})
								.done(function(data) {
									console.log(data[0].code);
									if (data[0].code == '0000') {
										Toast(data[0].msg)
									}else if(data[0].code == '0001'){
										Toast(data[0].msg)
									}

								})
								.fail(function() {
									console.log("error");
								})
								.always(function() {
									console.log("complete");
								});
							}

						}
					})


				}



			// that.getCode();
		},
			//获取验证码
			getCode() {
				var that = this;
				// if(!/^1[34578]\d{9}$/.test(that.mobile)) {
				// 	this.$MessageBox.alert('请输入正确的手机号');
				// 	return
				// }
				that.isshowCount = true;
				that.countDown();
				// var sign = "jsjy" + that.mobile + "cgyc";
				// sign = md5(sign);
				// sign = sign.toUpperCase();
				// var url = 'http://101.200.169.185/getTtSMSCode?mobile=' + that.mobile + '&sign=' + sign;
				// that.$http.get(url).then(function(response){
				// 	if(response.data.code=="200"){
				// 		that.checkIfCode(response.data.smsCode);
				// 	}
				// }).catch(function(error){

				// })
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
			register_btn() {
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
				var that = this;
				that.toast.loading({
			       title:"加载中",
			       duration:2000
			     },function(ret){

			     });
				this.registerAjax();
			},
			registerAjax() {
				var that = this;
				that.$Indicator.open();
				//查表得到验证码
				var url = 'code?filter={"where":{"mobile":'+ that.mobile +'}}';
				var method = "GET";
				that.ajax({url,method,
					success:function(response){
						if(response.length>0){
							that.toast.hide();
							var code = response[0].code;
							var time = new Date(response[0].updatedAt);
							time = time.getTime();
							var now = new Date().getTime();
							var shix = now-time;
							if(code==that.code&&shix<600000){
								//注册（增）
								var url2 = "f_user?filter[fields][password]=false";
								var params = {
									"data": {
										"User_name": that.mobile,
										"password": that.password,
										"Name": that.mobile,
										"Tx": "../../../static/image/xitong@3x.png",
										"info": 1
									}
								}
								that.ajax({url:url2,method:'POST',params,
									success:function(data){
										if(data){
											that.$Indicator.close();
											window.localStorage.setItem('userMobile',data.User_name);
											window.localStorage.setItem('userId',data.id);
											that.getSubscribe(data.id);
										}
									}
								})
							} else {
								that.toast.hide();
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
			//查表获取默认订阅
			getSubscribe(id) {
				var that = this;
				var filter = "filter[where][status]=0";
				filter += "&filter[where][up]=0";
				filter += "&filter[where][to]=index";
				filter += "&filter[skip]=0";
				filter += "&filter[limit]=5000";
				var url = "news_info?" + filter;
				var method = "GET";
				that.ajax({url,method,
					success:function(response){
						if(response.length>0){
							that.addSubscribe(id,response);
						}
					},
					error:function(error){
					}
				})
			},
			//给新用户添加默认订阅
			addSubscribe(id, arr) {
				var that = this;
				var requests = [];
				for(var i = 0;i<arr.length;i++){
					var json = {};
					json.path = "/mcm/api/user_dingyue";
					json.method = "POST";
					var body = {};
					body.user_id = id;
					body.info = arr[i].id;
					json.body = body;
					requests.push(json);
				}
				var url = "batch/";
				var method = "POST";
				var params = {
					"data":{
						"requests":requests
					}
				}
				that.ajax({url,method,params,
					success:function(response){
						that.$Indicator.close();
						that.$router.back();
					}
				})
			}
		},
		activated() {
			this.mobile = '';
			this.code = '';
			this.password = '';
		},
		mounted() {
			this.toast = new auiToast();
		}
	}
	</script>

	<style scoped>
	.logo {
		width: 4.5rem;
		margin: 1.8rem auto 0;
	}
	.iptBox {
		margin:2.25rem auto 0;
		width:17.25rem;
	}
	.aui-btn-danger {
		background-color: #34DBDA !important;
		margin-top: 1rem;
		height:2rem;
		line-height: 2rem;
		font-size: 14px;
	}
	.aui-list .aui-list-item-inner {
		margin-right: 0;
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
	.aui-list-item-input input{
		font-size: 14px !important;
		color:#333;
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
	</style>

<template>
	<div style="background-color: white; min-height: 105%;">
    	<myHeader :title="'预约信息'"></myHeader>

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
		<p><div class="aui-btn aui-btn-danger aui-btn-block">接受预约</div></p>
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
			//打开注册协议
			register_btn1(){
               this.$router.pushRoute({name:"xiayibu"});
			},
			openRegisterProtocol() {
				this.$router.pushRoute({name:"registerProtocol"});
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

				//查表是否存在此账号
				var url1 = 'f_user/count?filter={"where":{"User_name":' + that.mobile + '}}';
				that.ajax({url:url1,method:'GET',
					success:function(data){
						if(data.count!==0) {
							that.$MessageBox.alert('该账号已注册');
							return
						}else {
							that.getCode();
						}
					}
				})
			},
			//获取验证码
			getCode() {
				var that = this;
				if(!/^1[34578]\d{9}$/.test(that.mobile)) {
					this.$MessageBox.alert('请输入正确的手机号');
					return
				}
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
						that.$router.backRoute();
					}
				})
			}
		},
		activated() {
			this.mobile = '';
			this.code = '';
			this.password = '';
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
	.aui-list-item-inner {
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
		margin:0.7rem;
		width:auto;
		height:2rem;
		line-height: 2rem;
		font-size: 14px;
		letter-spacing: 0.1rem;
	}
</style>

<template>
	<div class="aui-content" style="background-color: white; min-height: 100%; padding-top: 2.25rem; padding-bottom: 2.6rem;">
		<!-- 头像 -->
		<div class="head">
			<div class="user_info" v-if="userId" @click="openUserInfo">
				<div class="my-middle">
					<img :src="userInfo.tx?userInfo.tx:'static/image/user.png'" class="headImage">
				</div>
				<div class="my-middle text">
					<ul>
						<li class="nick" v-text="userInfo.name?userInfo.name:userInfo.username"></li>
						<li>
							<span v-if="!userInfo.timelist || userInfo.timelist == ''" class="label">没有任何信息！</span>
							<span v-else class="label" v-text="'成就简介：'+userInfo.timelist.substr(0,30)"></span>
						</li>
					</ul>
				</div>
			</div>
			<div class="user_info" v-else @click="openLogin">
				<div class="my-middle">
					<span class="login btn">登录</span>
				</div>
				<div class="my-middle" @click.stop="openRegister">
					<span class="register btn">注册</span>
				</div>
			</div>
			<div class="my-middle">
				<img class="right" src="static/image/in@3x.png">
			</div>
		</div>

		<!-- 收藏、历史、推送 -->
		

		<!-- 其他 -->
		<div class="other">
			<div class="other_list" @click="openyuyue()">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/guahao@2x.png" class="icon_img">
				</div>
				<span>挂号记录</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="other_list" @click="openRouter('xinli')">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/zixun@2x.png" class="icon_img">
				</div>
				<span>心理咨询</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="other_list" @click="openRouter('aboutUs')">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/dashang@2x.png" class="icon_img">
				</div>
				<span>打赏记录</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="other_list" @click="openRouter('yqsr')">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/huizhen@2x.png" class="icon_img">
				</div>
				<span>会诊收入</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="other_list" @click="openRouter('yqlist')">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/yaoqing@2x.png" class="icon_img">
				</div>
				<span>会诊邀请</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			
			<div class="other_list" @click="openfankuilist()">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/fankui@2x.png" class="icon_img">
				</div>
				<span>线上反馈清单</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			
			<div class="other_list" @click="openRouter('manageTiezi')">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/tiezimanage@2x.png" class="icon_img">
				</div>
				<span>帖子管理</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="other_list" @click="opendaka()">
				<div class="other_img my-middle" style="margin-left:11px">
					<img src="static/image/pingjia@2x.png" class="icon_img">
				</div>
				<span>患者评价查看</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
		</div>

		<!-- 退出 -->
		<div class="exitBg my-middle" v-if="userId">
			<!-- <div class="exit" >退出登录</div> -->
			<div class="aui-btn aui-btn-danger aui-btn-block" @click="exitBtn">退出登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'content3',
		data() {
			return {
				userId:'',
				userInfo:'',
				vuegConfig: {
	                disable: false,
	                forwardAnim: 'fadeInRight',
	                duration: '.3',
	                backAnim: 'fadeInLeft'
	             }
			}
		},
		methods: {
			openfankuilist(){
              this.$router.push({name:"fankuilist"});
		    },
		    openyuyue(){
              this.$router.push({name:"yuyue"});
		    },
		    opendaka(){
             this.$router.push({name:"daka"});  
		    },
			isLogin() {
				if (this.userId) {
					return true;
				} else {
					this.$router.push({name:"login"});
					return false;
				}
			},
			openUserInfo() {
				this.$router.push({name:"userInfo"});
			},
			openLogin() {
				this.$router.push({name:"login"});
			},

			openRegister() {
				this.$router.push({name:"register"});
			},
			openRouter(meth) {
				if (meth == "aboutUs" || this.isLogin()) {
					this.$router.push({name:meth});
				}
			},
			getUserInfo() {
				var that = this;
				var filter = {
	              fields:{"id":true,"tx":true,"name":true,"username":true,"timelist":true},
	              where:{
	                id:that.userId
	              },
	              limit:1
	            };
				var url = "expert?filter="+encodeURIComponent(JSON.stringify(filter));
				var method = "GET";
				that.ajax({url,method,
					success:function(data){
						if(data.length>0){
						  var tmp = {};
		                  tmp.id=data[0].id;
		                  tmp.tx=data[0].tx;
		                  tmp.username=data[0].username;
		                  tmp.name=data[0].name;
		                  tmp.timelist=data[0].timelist;
		                  tmp = JSON.stringify(tmp);
		                  window.localStorage.setItem('userinfo_obj',tmp);
		                  that.userInfo = data[0];
		                }
					}
				})
			},
			exitBtn() {
				var that = this;
				that.$MessageBox.confirm("确定退出？").then(function(){
					window.localStorage.removeItem('userId');
					that.userId = "";
					that.menuindex = 1;
					that.$router.push({"path":"/login"});
				})
			}
		},
		mounted() {
			
		},
		activated() {
			var userId = window.localStorage.getItem('userId');
			if(userId){
				this.userId = userId?userId:'';
				if(window.localStorage.getItem('userinfo_obj')){
					var tmp = window.localStorage.getItem('userinfo_obj');
					this.userInfo = JSON.parse(tmp);
				}else{
					this.getUserInfo()
				}
			}else{
				this.$router.push({path:'/'});
			}
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
	.btn {
		display: block;
		height: 1.3rem;
		line-height: 1.3rem;
		width: 4rem;
		font-size: 0.65rem;
		border: 0.05rem solid #34DBDA;
		border-radius: 0.65rem;
		text-align: center;
		color: #34DBDA;
	}
	.login {
		margin-left: 0.7rem;
	}
	.register {
		margin-left: 0.9rem;
	}

	.head {
		width: 100%;
		height: 5rem;
		background-color: white;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
	}
	.user_info {
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
		flex: 1;
    	-webkit-box-flex: 1;
    	-webkit-flex: 1;
	}
	.headImage {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 3.5rem;
		margin-left: 0.7rem;
	}
	.text {
		flex: 1;
    	-webkit-box-flex: 1;
    	-webkit-flex: 1;
	}
	.head ul {
		line-height: 1.3rem;
		margin: 0 0.8rem;
	}
	ul .nick {
		font-size: 0.8rem;
		letter-spacing: 0.1rem;
	}
	ul li .label {
		margin-top: 10px;
		font-size: 0.6rem;
		height: 0.75rem;
		line-height: 0.75rem;
		color: gray;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all;
		text-align: justify;
	}
	.right {
		height: 0.8rem;
		margin: 0 0.7rem;
	}

	.collect_history_push {
		box-sizing: content-box;
   		-moz-box-sizing: content-box;
   		-webkit-box-sizing: content-box;
		height: 3.1rem;
		width: 100%;
		background-color: white;
		border-top: 0.68rem solid rgb(250, 250, 250);
		border-bottom: 0.68rem solid rgb(250, 250, 250);
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
		text-align: center;
	}
	.collect_history_push span {
		font-size: 0.63rem;
		display: block;
		color: #0F0F0F;
	}
	.collect_history_push img {
		display: block;
		width: 1.4rem;
		margin: 0.5rem auto 0.1rem;
	}
	.collect, .history, .push {
		width: calc(100% / 3);
	}

	.other_list {
		height: 2.4rem;
		width: 100%;
		background-color: white;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
		box-sizing: content-box;
   		-moz-box-sizing: content-box;
   		-webkit-box-sizing: content-box;
   		border-bottom: 1px solid #eee;
	}
	.other_list:nth-child(3) {
		border-bottom: 1px solid #eee;
	}
	.other_img img {
		display: block;
		width: 0.95rem;
		margin-left: 0.7rem;
	}
	.other_list span {
		margin-left: 0.7rem;
		font-size: 0.7rem;
		color: #0F0F0F;
		height: 2.5rem;
		line-height: 2.5rem;
		flex: 1;
    	-webkit-box-flex: 1;
    	-webkit-flex: 1;
	}

	.exitBg {
		height: 8rem;
	}
	.aui-btn-block {
		margin:0.7rem;
		width:fill-available !important;
		width:-webkit-fill-available !important;
		height:2rem;
		line-height: 2rem;
		font-size: 14px;
		letter-spacing: 0.1rem;
		background: #34DBDA !important;
	}
	.icon_img{
		height:1.1rem !important;
		width:auto !important;
		margin-left:0 !important;
	}
</style>

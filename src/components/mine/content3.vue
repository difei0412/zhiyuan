<template>
	<div class="aui-content" style="background-color: white; min-height: 100%; padding-top: 2.25rem; padding-bottom: 2.6rem;">
		<!-- 头像 -->
		<div class="head">
			<div class="user_info" v-if="userId" @click="openUserInfo">
				<div class="my-middle">
					<img :src="userInfo.Tx?userInfo.Tx:'../../../static/image/xitong@3x.png'" class="headImage">
				</div>
				<div class="my-middle text">
					<ul>
						<li class="nick">
							{{userInfo.Name}}
						</li>
						<li>
							<span v-if="!userInfo.Qm || userInfo.Qm == ''" class="label">这个人很懒，什么都没有留下...</span>
							<span v-else class="label">{{userInfo.Qm}}</span>
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
					<i class="aui-iconfont aui-icon-image" style="font-size:22px"></i>
				</div>
				<span>挂号记录</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			
			<div class="other_list" @click="opendaka()">
				<div class="other_img my-middle" style="margin-left:11px">
					<i class="aui-iconfont aui-icon-video" style="font-size:22px"></i>
				</div>
				<span>患者评价查看</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="other_list" @click="openRouter('aboutUs')">
				<div class="other_img my-middle" style="margin-left:11px">
					<i class="aui-iconfont aui-icon-question" style="font-size:22px"></i>
				</div>
				<span>线上反馈清单</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="other_list" @click="openRouter('aboutUs')">
				<div class="other_img my-middle" style="margin-left:11px">
					<i class="aui-iconfont aui-icon-question" style="font-size:22px"></i>
				</div>
				<span>打赏记录</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
		</div>

		<!-- 退出 -->
		<div class="exitBg my-middle" v-if="userId">
			<div class="exit" @click="exitBtn">退出登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'content3',
		data() {
			return {
				userId:'',
				userInfo:''
			}
		},
		methods: {
		    openyuyue(){
              this.$router.pushRoute({name:"yuyue"});
		    },
		    opendaka(){
             this.$router.pushRoute({name:"daka"});  
		    },
			isLogin() {
				if (this.userId) {
					return true;
				} else {
					this.$router.pushRoute({name:"login"});
					return false;
				}
			},
			openUserInfo() {
				this.$router.pushRoute({name:"userInfo"});
			},
			openLogin() {
				this.$router.pushRoute({name:"login"});
			},

			openRegister() {
				this.$router.pushRoute({name:"register"});
			},
			openRouter(meth) {
				if (meth == "aboutUs" || this.isLogin()) {
					this.$router.pushRoute({name:meth});
				}
			},
			openDetail(index) {
				if (this.isLogin()) {
					this.$router.pushRoute({name:"colOrHisOrPush", params:{index:index}});
				}
			},
			getUserInfo() {
				var that = this;
				var userId = window.localStorage.getItem('userId');
				that.userId = userId?userId:'';
				var url = "f_user/" + userId;
				var method = "GET";
				that.ajax({url,method,
					success:function(data){
						that.userInfo = data;
					}
				})
			},
			exitBtn() {
				var that = this;
				that.$MessageBox.confirm("确定退出？").then(function(){
					window.localStorage.removeItem('userId');
					that.userId = "";
				})
			}
		},
		activated() {
			this.getUserInfo()
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
		border: 0.05rem solid #28B8A1;
		border-radius: 0.65rem;
		text-align: center;
		color: #28B8A1;
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
   		border-bottom: 0.1rem solid rgb(250, 250, 250);
	}
	.other_list:nth-child(3) {
		border-bottom: 0.68rem solid rgb(250, 250, 250);
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
	.exit {
		height: 2rem;
		line-height: 2rem;
		border-radius: 1rem;
		font-size: 0.78rem;
		color: #f22a2a;
		background-color: rgb(240, 240, 240);
		width: 7.5rem;
		margin: 0 auto;
		text-align: center;
	}
</style>

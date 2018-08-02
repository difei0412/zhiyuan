<template>
	<div style="background-color: #fff;">
		<myHeader :title="'详情'"></myHeader>

		<div v-if="message.id && message.id != ''" style="padding-bottom: 3rem; background-color: white;">
			<div class="title">
				{{message.title}}
			</div>
			<div class="aui-info aui-padded-l-15 aui-padded-r-15">
				<div tapmode="hover" class="aui-info-item">
					<img :src="message.issue_img" style="width: 1.75rem; height: 1.75rem;" class="aui-img-round" />
					<div style="display: block; margin-left: 15px;">
						<p class="aui-font-size-14" style="color: #222">{{message.nickname}}</p>
						<p class="aui-font-size-12 aui-margin-r-5">{{time(message.createdAt, 0)}}</p>
					</div>
				</div>
			</div>
			<div class="content" v-html="message.Content">
			</div>
			<div class="zan-box">
				<div class="zan" @click="supportClick(message.id, 'news', 0)">
					<img src="static/image/baizan.png" alt="">
					<span>{{commontNum(message.appreciate)}}</span>
				</div>
			</div>
			
			<!-- 分割 -->
			<div style="height:15px;background-color:#fafafa"></div>

			<!-- 评论 -->
			<div class="hot-pinglun">
				<p class="top">热门评论</p>

				<ul v-if="commontData.length > 0" class="pinglun-container">
					<li class="pinglun-box" v-for="(item, index) in commontData">
						<div class="aui-info aui-padded-l-15 aui-padded-r-15">
							<div class="aui-info-item">
								<img :src="item.user_id.Tx" style="width: 1.75rem; height: 1.75rem;" class="aui-img-round" />
								<div style="display:block;margin-left:15px;">
									<p class="aui-font-size-14" style="color:#222">{{item.user_id.Name}}</p>
									<p class="aui-font-size-12">
										<span class="aui-margin-r-5" style="color:a2a8ae">{{time(item.createdAt, 0)}}</span>
									</p>
								</div>
							</div>
							<div class="aui-info-item" @click="supportClick(item.id, 'pinglun', index)">
								<img v-if="(userId && userId != '') ? supportDic.login.pinglun[item.id] == userId : supportDic.noLogin.pinglun[item.id] == '1'" style="height: 18px; margin-right: 5px;" src="static/image/yizan.png" alt="" />
								<img v-else style="height: 18px; margin-right: 5px;" src="static/image/dian.png" alt="" />
								<p style="color: #a2a8ae; height: 18px; line-height: 18px;">{{commontNum(item.support_num)}}</p>
							</div>
						</div>
						<div class="aui-info aui-padded-l-15 aui-padded-r-15">
							<div class="aui-info-item">
								<div style="width:1.75rem;height:1.75rem;margin-right:15px"></div>
							</div>
							<div style="flex:1;display:block">
								<p class="pinglun-content" style="color:#222">
									{{item.content}}
								</p>
							</div>
						</div>
					</li>
				</ul>
				<div v-else class="shafa">
					<img src="static/image/sofa@3x.png" />
					<span>评论还是空的快来抢沙发吧！</span>
				</div>
			</div>
		</div>
		
		<div v-if="message.id && message.id != ''">
			<div class="commentDiv">
				<div class="text my-middle" @click="commentClick">
					<input class="textChild" v-model="inputText" ref="input" type="text" name="" placeholder="我也来吐槽一下..." />
				</div>

				<div v-if="!isComment" class="commentNum my-middle" @click="goToCommentList">
					<img src="static/image/pinglun.png">
				</div>
				<div v-if="!isComment" class="collectBtn my-middle" @click="collectClick">
					<img v-if="!coollectId || coollectId == ''" src="static/image/collect.png">
					<img v-else src="static/image/collect_select.png">
				</div>
				<div v-if="isComment" class="submit" @click="submitComment">发布</div>
			</div>
		</div>
		<div v-if="isComment" style="background-color: rgba(1, 1, 1, .2); position: fixed; top: 0; left: 0; height: calc(100% - 3rem); width: 100%;" @click="endComment" @touchmove.prevent></div>
	</div>
</template>

<script>
	import Vue from "vue";
	import $ from '../public/jquery';

	export default {
		name: 'content',
		data () {
			return {
				message: {},
				supportDic: {},
				commontData: [],
				userId: '',
				coollectId: "",
				inputText: "",
				sessionName: 'scrollForArticle',
				isComment: false
			}
		},
		methods:{
			goToCommentList() {
				this.addScrollPlace(this.sessionName);
				this.$router.push({name:"commentList", params:{id:this.$route.params.id}});
			},
			isSupport() {
				var that = this;

				that.supportDic = JSON.parse(window.localStorage.getItem('supportDic'));
				if (!that.userId) {
					return;
				}

				var filter = 'filter[skip]=0'
				filter += '&filter[limit]=5000'
				var url = "support?" + filter;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						var dic = that.supportDic.login;
						dic.news = {};
						dic.pinglun = {};
						for (var i = 0; i < data.length; i++) {
							var tempDic = data[i];
							dic[tempDic.type][tempDic.record_id] = tempDic.user_id;
						}
						that.supportDic.login = dic;
						window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic))
					}
				});
			},
			supportClick(id, type, index) {
				var that = this;

				if (!that.userId) {
					if (that.supportDic.noLogin[type][id] == '1') {
						that.$MessageBox.alert('您已经赞过了！');
						return;
					}
					that.supportDic.noLogin[type][id] = '1';
					that.supportDic = Object.assign({}, that.supportDic);
					window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
					that.$MessageBox.alert('点赞成功');
					that.addSupportNum(id, type, index);
					return;
				}
				if (that.supportDic.login[type][id] == that.userId) {
					that.$MessageBox.alert('您已经赞过了！');
					return;
				}

				var url = "support/";
				var method = "POST";
				var params = {
					"data" : {
						"_method" : "PUT",
						"user_id" : that.userId,
						"record_id" : id,
						"type" : type
					}
				}
				that.ajax({url, method, params,
					success:function(data) {
						that.supportDic.login[type][id] = that.userId;
						that.supportDic = Object.assign({}, that.supportDic);
						window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
						that.$MessageBox.alert('点赞成功');
						that.addSupportNum(id, type, index);
					}
				});
			},
			addSupportNum(id, type, index) {
				var that = this;

				var url = "";
				if (type == "news") {
					url = "news/" + id;
				} else if (type == "pinglun") {
					url = "news_pinglun/" + id;
				}

				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						var tempNum = "";
						if (type == "news") {
							tempNum = data.appreciate;
						} else if (type == "pinglun") {
							tempNum = data.support_num;
						}

						if (!tempNum || tempNum == '') {
							tempNum = "0";
						}
						var num = parseInt(tempNum)
						num ++;

						var method = "POST";
						var params = {};
						if (type == "news") {
							params = {
								"data" : {
									"_method" : "PUT",
									"appreciate" : num.toString()
								}
							}
						} else if (type == "pinglun") {
							params = {
								"data" : {
									"_method" : "PUT",
									"support_num" : num.toString()
								}
							}
						}
						that.ajax({url, method, params,
							success:function(data) {
								if (type == "news") {
									that.message.appreciate = data.appreciate;
								} else if (type == "pinglun") {
									that.commontData[index].support_num = data.support_num;
								}
							}
						});
					}
				});
			},
			getCommentData() {
				var that = this

				var filter = 'filter[where][status]=0'
				filter += '&filter[where][Newsid]=' + that.$route.params.id
				filter += '&filter[include][user_idPointer]'
				filter += '&filter[order]=support_num DESC'
				filter += '&filter[order]=createdAt DESC'
				filter += '&filter[skip]=0'
				filter += '&filter[limit]=3'
				var url = "news_pinglun?" + filter;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						that.commontData = [];
						for (var i = 0; i< data.length; i++) {
							that.commontData.push(data[i]);
						}
					}
				});
			},
			submitComment() {
				var that = this;

				if (that.inputText == '') {
					that.$MessageBox.alert('请输入评论内容！');
					return;
				}

				var url = "news_pinglun/";
				var method = "POST";
				var params = {
					"data" : {
						"_method" : "PUT",
						"user_id" : that.userId,
						"Newsid" : that.$route.params.id,
						"content" : that.inputText,
						"support_num" : "0",
						"status" : "0"
					}
				}
				that.ajax({url, method, params,
					success:function(data) {
						that.inputText = "";
						that.isComment = false;
						that.$refs.input.blur();
						that.$MessageBox.alert('评论成功，请在评论列表内查看');
						that.getCommentData();
						that.addCommentNum();
					},
					error:function(errorData) {
						that.isComment = false;
						that.$refs.input.blur();
						that.$MessageBox.alert('评论失败，请重试');
					}
				});
			},
			addCommentNum() {
				var that = this;

				var method = "GET";
				var url = 'news/' + that.$route.params.id
				that.ajax({url, method,
					success:function(data) {
						var tempNum = data.comment_num;
						if (!tempNum || tempNum == '') {
							tempNum = "0";
						}
						var num = parseInt(tempNum)
						num ++;

						var method = "POST";
						var url = 'news/' + that.$route.params.id
						var params = {
							"data" : {
								"_method" : "PUT",
								"comment_num" : num.toString()
							}
						}
						that.ajax({url, method, params});
					}
				});
			},
			endComment() {
				var that = this

				that.isComment = false;
				Vue.nextTick(function(){
					that.$refs.input.blur()
				})
			},
			commentClick() {
				var that = this

				if (!that.userId) {
					that.$router.push({name:"login"});
					return;
				}

				that.isComment = true;
				Vue.nextTick(function(){
					that.$refs.input.focus()
				})
			},
			userIsRead() {
				var that = this;

				if (that.userId) {
					var filter = 'filter[where][news]=' + that.$route.params.id;
					filter += '&filter[where][user_id]=' + that.userId;
					filter += '&filter[where][type]=history';
					var url = "user_record?" + filter;
					var method = "GET";
					that.ajax({url, method,
						success:function(data) {
							if (data.length == 0) {
								that.adduserRead();
							} else {
								that.addUserReadNum(data[0].id, data[0].read_num);
							}
						}
					});
				}
			},
			addUserReadNum(id, num) {
				var that = this;

				if (!num || num == '') {
					num = "0";
				}
				var read_num = parseInt(num);
				read_num ++
				
				var url = "user_record/" + id;
				var method = "POST";
				var params = {
					"data" : {
						"_method" : "PUT",
						"read_num" : read_num.toString()
					}
				}
				that.ajax({url, method, params});
			},
			adduserRead() {
				var that = this;

				var url = "user_record/";
				var method = "POST";
				var params = {
					"data" : {
						"_method" : "PUT",
						"user_id" : that.userId,
						"news" : that.$route.params.id,
						"read_num" : "0",
						"type" : "history"
					}
				}
				that.ajax({url, method, params});
			},
			getData() {
				var that = this;

				var filter = 'filter[where][id]=' + that.$route.params.id;
				var url = "news?" + filter;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						that.message = data[0];
						that.scrollToPostition(that.sessionName);
					}
				});
			},
			isCollect() {
				var that = this;

				if (!that.userId) {
					return;
				}

				var filter = 'filter[where][news]=' + that.$route.params.id;
				filter += '&filter[where][user_id]=' + that.userId;
				filter += '&filter[where][type]=collect';
				var url = "user_record?" + filter;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						if (data.length == 0) {
							that.coollectId = '';
						} else {
							that.coollectId = data[0].id;
						}
					}
				});
			},
			collectClick() {
				var that = this;

				if (!that.userId) {
					that.$router.push({name:"login"});
					return;
				}

				if (that.coollectId && that.coollectId != '') {
					that.deleteCollect();
					return;
				}

				var url = "user_record/";
				var method = "POST";
				var params = {
					"data" : {
						"_method" : "PUT",
						"user_id" : that.userId,
						"news" : that.$route.params.id,
						"type" : "collect"
					}
				}
				that.ajax({url, method, params,
					success:function(data) {
						that.coollectId = data.id;
						that.$MessageBox.alert('收藏成功');
					}
				});
			},
			deleteCollect() {
				var that = this;

				var url = "user_record/" + that.coollectId;
				var method = "POST";
				var params = {
					"data" : {
						"_method" : "DELETE"
					}
				}
				that.ajax({url, method, params,
					success:function(data) {
						that.coollectId = '';
						that.$MessageBox.alert('取消收藏成功');
					}
				});
			},
        	scrollToPostition(name) {
        		// 滚动到指定位置
        		Vue.nextTick(function() {
        			var tempSession = sessionStorage.getItem(name);
        			if (tempSession) {
        				$(document).scrollTop(tempSession);
        			}
        		})
        	},
        	addScrollPlace(name) {
        		// 缓存滚动位置
        		Vue.nextTick(function() {
        			var tempSession = sessionStorage.getItem(name);
        			if (tempSession) {
        				sessionStorage.setItem(name, $(document).scrollTop());
        			}
        		})
        	},
        	addSession(name) {
        		// 添加缓存
        		sessionStorage.setItem(name, 0);
        	}
        },
		activated() {
			this.coollectId = "";
			this.inputText = "";
			this.isComment = false;
			this.message = {};
			this.userId = window.localStorage.getItem('userId');
			this.getData();
			this.isCollect();
			this.getCommentData();
			this.userIsRead();
			this.isSupport();
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == 'index' || to.name == 'colOrHisOrPush' || to.name == 'search') {
				this.addSession(this.sessionName);
			}
			next(true);
		},
		created() {
			this.addSession(this.sessionName);
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
	.shafa img {
		display: block;
		margin: 0 auto;
		width: 30%;
		margin-top: 1.3rem;
	}
	.shafa span {
		display: block;
		width: 100%;
		text-align: center;
		color: #a2a8ae;
		font-size: 0.7rem;
		margin-top: 1.2rem;
		margin-bottom: 1.5rem;
	}
	.title {
		padding: 15px 13px;
		font-size: 18px;
		line-height: 25px;
		color: #0f0f0f;
	}
	.aui-info {
		padding: 0;
	}
	.content {
		border-bottom: 1px solid #fafafa;
		padding: 10px;
	}
	.zan-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.zan {
		display: inline-block;
		margin: 15px auto 15px;
		padding: 0 30px;
		height: 40px;
		border-radius: 20px;
		background: #f22a2a;
		overflow: hidden;
	}
	.zan img, .zan span {
		display: block;
		float: left;
		color: #fff;
		line-height: 40px;
	}
	.zan img {
		width: 18px;
		margin-top: 10px;
		margin-right: 5px;
	}
	.top {
		text-align: center;
		line-height: 30px;
		font-size: 16px;
		height: 60px;
		padding: 15px 0;
	}
	.pinglun-content {
		line-height: 25px;
		font-size: 15px;
		text-align: justify;
		max-height: 75px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.pinglun-box {
		margin-bottom: 15px;
	}
	.commentDiv {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3rem;
		background-color: white;
		border-top: 1px solid #eee;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
	}
	.text {
		height: 100%;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		margin-left: 0.5rem;
	}
	.textChild {
		display: block;
		font-size: 0.75rem;
		color: #a2a8ae;
		height: 2rem;
		line-height: 2rem;
		width: 100%;
		border: 1px solid #ddd;
		background-color: #fafafa;
		padding-left: 0.7rem;
		border-radius: 1rem;
	}
	.submit {
		width: 3rem;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		font-size: 0.75rem;
		color: #a2a8ae;
	}
	input::-webkit-input-placeholder {
		color: #a2a8ae;
	}
	.commentNum {
		margin: auto 0.5rem auto 1rem;
	}
	.commentNum img {
		width: 1.3rem;
	}
	.collectBtn {
		margin: auto 1rem auto 0.5rem;
	}
	.collectBtn img {
		width: 1.3rem;
	}
</style>

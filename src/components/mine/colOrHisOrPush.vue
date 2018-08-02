<template>
	<div>
		<myHeader :title="'收藏/历史'"></myHeader>

		<div class="titleBg">
			<ul class="title">
				<li v-for="(item, index) in titleArr" :key="'title' + index" @click="clickAtIndex(index)">
					<span :class="{'nav_active':atIndex == index}">{{item}}</span>
				</li>
			</ul>
		</div>

		<div class="aui-content" style="padding-top: 1.5rem;">
			<!-- 标题 -->
			<div class="mark" v-if="atIndex == 0 && todyNumForCol > 0">今天收藏了{{todyNumForCol}}篇文章</div>
			<div class="mark" v-else-if="atIndex == 1 && todyNumForHis > 0">今天阅读了{{todyNumForHis}}篇文章</div>
			<div class="mark" v-else-if="atIndex == 2 && todyNumForPush > 0">今天推送了{{todyNumForPush}}篇文章</div>

			<ul class="aui-list aui-media-list">
				<li v-for="(item, index) in dat[type]">
					<!-- 单图 -->
					<div v-if="item.news && item.news.info == 0 && item.news.imgcount && item.news.imgcount < 3" class="aui-list-item" @click="openArticle('text', item.news.id)">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-inner">
								<div class="aui-list-item-text">
									<div class="aui-list-item-title aui-ellipsis-2">{{item.news.title}}</div>
								</div>
								<div class="aui-info aui-padded-b-0" style="position:absolute;bottom:0">
									<div class="aui-info-item aui-font-size-12" >
										<span class="aui-margin-r-15">{{item.news.nickname}}</span>
										<span>{{commontNum(item.news.comment_num)}}条评论</span>
										<span @click.stop="deleteItem(item.id)" class="aui-margin-l-15">删除</span>
									</div>
								</div>
							</div>
							<div class="aui-list-item-media">
								<div class="img-noVide-container">
									<img :src="item.news.img" />
								</div>
							</div>
						</div>
					</div>

        			<!-- 多图 -->
        			<div v-if="item.news && item.news.info == 0 && item.news.imgcount && item.news.imgcount >= 3" tapmode="hover" class="aui-list-item" @click="openArticle('text', item.news.id)">
        				<div class="aui-list-item-inner">
        					<div class="aui-list-item-title aui-ellipsis-2">{{item.news.title}}</div>
        					<div class="aui-row aui-row-padded aui-margin-t-5 aui-padded-t-10">
        						<div class="aui-col-xs-4">
        							<div class="img-noVide-container">
        								<img :src="item.news.img" />
									</div>
        						</div>
        						<div class="aui-col-xs-4">
        							<div class="img-noVide-container">
        								<img :src="item.news.img1" />
									</div>
        						</div>
        						<div class="aui-col-xs-4">
        							<div class="img-noVide-container">
        								<img :src="item.news.img2" />
									</div>
        						</div>
        					</div>
        				</div>
        				<div class="aui-info  aui-padded-b-0">
        					<div class="aui-info-item aui-font-size-12">
        						<span class="aui-margin-r-15">{{item.news.nickname}}</span>
        						<span class="aui-margin-r-15">{{commontNum(item.news.comment_num)}}条评论</span>
        						<span>{{time(item.createdAt, 0)}}</span>
        						<span @click.stop="deleteItem(item.id)" class="aui-margin-l-15">删除</span>
        					</div>
        				</div>
        			</div>

        			<!-- 视频 -->
        			<div v-if="item.news && item.news.info == 1" tapmode="hover" class="aui-list-item" @click="openArticle('video', item.news.id)">
        				<div class="aui-list-item-inner">
        					<div class="aui-list-item-title aui-ellipsis-2">{{item.news.title}}</div>
        					<div class="aui-row aui-row-padded aui-margin-t-5 aui-padded-t-10">
        						<div class="aui-col-xs-12">
        							<div class="img-container">
        								<img :src="item.news.img" />
									</div>
        							<div class="H-position-center-all my-middle" style="width: 40px; height: 40px; background-color: rgba(1, 1, 1, .4); border-radius: 20px; -webkit-border-radius: 20px; z-index: 9;">
        								<img src="static/image/bofang.png" style="max-width: 15px; display: block; margin-left: 15px;" />
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="aui-info aui-padded-b-0">
        					<div class="aui-info-item aui-font-size-12">
        						<span class="aui-margin-r-15">{{item.news.nickname}}</span>
        						<span class="aui-margin-r-15">{{commontNum(item.news.comment_num)}}条评论</span>
        						<span>{{time(item.createdAt, 0)}}</span>
        						<span @click.stop="deleteItem(item.id)" class="aui-margin-l-15">删除</span>
        					</div>
        				</div>
        			</div>

        			<div v-if="item.showMore && atIndex == 0" class="mark">更早</div>
        			<div v-if="item.showMore && atIndex == 1" class="mark">更早</div>
        			<div v-if="item.showMore && atIndex == 2" class="mark">更早</div>
        		</li>
        	</ul>
        </div>
    </div>
</template>

<script>
	import $ from '../public/jquery'
	import Vue from 'vue'

	export default {
		name: 'colOrHisPush',
		data() {
			return {
				titleArr: ["我的收藏", "阅读历史", "推送历史"],
				atIndex: 0,
				todyNumForCol: 0,
				todyNumForHis: 0,
				todyNumForPush: 0,
				type: "",
				dat: {},
				userId: "",
				sessionName: 'scrollForCol'
			}
		},
		methods: {
			deleteItem(id) {
				var that = this;
				that.addScrollPlace(that.sessionName, that.atIndex.toString());

				that.$MessageBox.confirm("确定删除？").then(function(){
					var url = "user_record/" + id;
					var method = "POST";
					var params = {
						"data" : {
							"_method" : "DELETE"
						}
					}
					that.ajax({url, method, params,
						success:function(data) {
							that.getList(true);
						}
					});
				})
			},
			clickAtIndex(index) {
				var that = this

				if (that.atIndex != index) {
					that.addScrollPlace(that.sessionName, that.atIndex.toString());
				}

				if (index == 0) {
					that.type = "collect";
				} else if (index == 1) {
					that.type = "history";
				} else if (index == 2) {
					that.type = "push";
				}

				if (that.dat[that.type] == undefined) {
					that.getList(true);
				} else if (that.atIndex == index) {
					that.getList(true);
					that.scrollToTop(that.sessionName, index.toString());
				}
				that.atIndex = index;
				sessionStorage.selectItemIndex = that.atIndex;
				that.scrollToPostition(that.sessionName, that.atIndex.toString());
			},
			scrollToTop(name, key) {
        		// 滚动到头部
        		var tempSession = sessionStorage.getItem(name);
        		if (tempSession) {
        			var tempDic = JSON.parse(tempSession);
        			if (tempDic && tempDic[key]) {
        				tempDic[key] = 0;
        				sessionStorage.setItem(name, JSON.stringify(tempDic));
        			}
        		}
        	},
        	scrollToPostition(name, key) {
        		// 滚动到指定位置
        		Vue.nextTick(function() {
        			var tempSession = sessionStorage.getItem(name);
        			if (tempSession) {
        				var tempDic = JSON.parse(tempSession);
        				if (tempDic[key] || tempDic[key] == 0) {
        					$(document).scrollTop(tempDic[key]);
        				}
        			}
        		})
        	},
        	addScrollPlace(name, key) {
        		// 缓存滚动位置
        		Vue.nextTick(function() {
        			var tempSession = sessionStorage.getItem(name);
        			if (tempSession) {
        				var tempDic = JSON.parse(tempSession);
        				tempDic[key] = $(document).scrollTop();
        				sessionStorage.setItem(name, JSON.stringify(tempDic));
        			}
        		})
        	},
        	addSession(name) {
        		// 添加缓存
        		var dic = {};
        		sessionStorage.setItem(name, JSON.stringify(dic));
        	},
        	openArticle:function(type, id) {
        		this.addScrollPlace(this.sessionName, this.atIndex.toString());
        		if (type == 'text') {
					this.$router.push({name:'articleDetaile', params:{id:id}})
				} else if (type == 'video') {
					this.$router.push({name: 'videoDetaile', params:{id:id}})
				}
			},
			getList(isRef) {
				var that = this;

				// 今天的个数
				var nowDate = that.time(new Date(), 1);
				var filt = {
					"where" : {
						"updatedAt" : {
							"gt" : nowDate
						},
						"type" : that.type,
						"user_id" : that.userId
					}
				}
				var url = "user_record/count?filter=" + encodeURIComponent(JSON.stringify(filt));
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						if (that.atIndex == 0) {
							that.todyNumForCol = data.count;
						} else if (that.atIndex == 1) {
							that.todyNumForHis = data.count;
						} else if (that.atIndex == 2) {
							that.todyNumForPush = data.count;
						}
						var todyNum = data.count;

						// 列表数据
						var filter = {
							"include" : ["newsPointer"],
							"order": "createdAt DESC",
							"where" : {
								"type" : that.type,
								"user_id" : that.userId
							}
						}
						var url = "user_record?filter=" + encodeURIComponent(JSON.stringify(filter));
						var method = "GET";
						that.ajax({url, method,
							success:function(data) {
								if (!that.dat.hasOwnProperty(that.type)) {
									that.dat[that.type] = [];
									that.dat = Object.assign({}, that.dat);
								}

								var templist = that.dat[that.type];
								if (isRef) {
									templist = [];
								}
								var more = {"showMore" : 1};

								// 移除更多
								for (var i = 0; i < templist.length; i ++) {
									if (JSON.stringify(templist[i]) == JSON.stringify(more)) {
										templist.splice(i, 1);
										break;
									}
								}
								for (var i = 0; i < data.length; i ++) {
									if (data[i].news && data[i].news.Status == 0) {
										templist.push(data[i]);
									}
								}
								// 添加“更多”
								if (templist.length > todyNum && todyNum > 0) {
									templist.splice(todyNum, 0, more);
								}
								that.dat[that.type] = templist;

								that.scrollToPostition(that.sessionName, that.atIndex.toString());
							}
						});
					}
				});
			}
		},
		activated() {
			this.dat = {};
			this.userId = window.localStorage.getItem('userId');
			if (sessionStorage.selectItemIndex) {
				this.atIndex = sessionStorage.selectItemIndex;
			} else {
				this.atIndex = this.$route.params.index;
			}
			this.clickAtIndex(this.atIndex);
		},
		created() {
			this.addSession(this.sessionName);
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == "index") {	
				sessionStorage.removeItem("selectItemIndex")
				this.addSession(this.sessionName);
			}
			next(true);
		}
	}
</script>

<style scoped>
	.img-container {
		width: 100%;
		height: 0px;
		padding-bottom: calc(100% * 695 / 1240.0);
		overflow:hidden;
		margin: 0;
		position:relative;
	}
	.img-container img {
		position:absolute;
		width: 100%;
		height: 100%;
	}
	.img-noVide-container {
		width: 100%;
		height: 0px;
		padding-bottom: calc(100% * 245 / 375.0);
		overflow:hidden;
		margin: 0;
		position:relative;
	}
	.img-noVide-container img {
		position:absolute;
		width: 100%;
		height: 100%;
	}
	.titleBg {
		position: fixed;
		top: 2.25rem;
		left: 0;
		z-index: 10;
		width: 100%;
		box-sizing: content-box;
   		-moz-box-sizing: content-box;
   		-webkit-box-sizing: content-box;
   		border-bottom: 1px solid rgb(250, 250, 250);
	}
	.title {
		background-color: white;
		height: 1.5rem;
		line-height: 1.5rem;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
	}
	.title li {
		width: calc(100% / 3);
		text-align: center;
		color: #0f0f0f;
	}
	.title li span {
		display: inline-block;
		height: 1.4rem;
		line-height: 1.4rem;
		font-size: 0.65rem;
	}
	.nav_active {
        color: #f61a1b;
        border-bottom: 1px solid #f61a1b;
    }
	.mark {
		font-size: 0.7rem;
		color: #a2a8ae;
		height: 2.3rem;
		line-height: 2.3rem;
		padding-left: 0.7rem;
		background-color: rgb(250, 250, 250);
	}
	.aui-active {
		border-bottom: 2px solid #f22a2a;
		color: #f22a2a;
	}
	.aui-list .aui-list-item-media {
		width: 6rem;
	}
	.my-middle {
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-align: center;
		display: box;
		box-orient: horizontal;
		box-align: center;
	}
	.H-position-center-all {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}
</style>
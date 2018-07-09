<template>
	<div style="height: 100%; background: #fff;">
		<header class="aui-bar aui-bar-nav" style="position: fixed; display: flex; display: -webkit-flex;">
			<div class="aui-pull-left" @click="closewin">
				<img src="../../../static/image/fanhui@3x.png" alt="" style="height: 1.25rem;" />
			</div>
			<div style="flex: 1;">
				<input class="my-search H-position-center-all" ref="input" type="search" name="" value="" placeholder="搜你想搜的">
			</div>
			<div class="aui-pull-right aui-btn" @click="search">
				搜索
			</div>
		</header>

		<div v-if="!showResult" class="lishibox" style="padding-top:2.25rem">
			<div class="lishitop">
				<p class="lishileft">历史搜索</p>
				<p class="removelishibtn" @click="clearLishi">清空历史搜索</p>
			</div>
			<div class="lishi_item_box">
				<div v-if="lishiKeyword.length > 0" class="lishi_item" v-for="(item, index) in lishiKeyword" @click="tapthis">{{item}}</div>
				<div v-if="lishiKeyword.length == 0">
					暂无
				</div>
			</div>
		</div>

		<ul v-if="showResult" class="aui-list aui-media-list" style="padding-top:2.25rem">
			<li v-if="list.length > 0" v-for="(item, index) in list">
				<!-- 单图 -->
				<div v-if="item && item.info == 0 && item.imgcount && item.imgcount < 3" class="aui-list-item" @click="openArticle('text', item.id)">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title aui-ellipsis-2">{{item.title}}</div>
							</div>
							<div class="aui-info aui-padded-b-0" style="position:absolute;bottom:0">
								<div class="aui-info-item aui-font-size-12" >
									<span class="aui-margin-r-15">{{item.nickname}}</span>
									<span>{{commontNum(item.comment_num)}}条评论</span>
								</div>
							</div>
						</div>
						<div class="aui-list-item-media">
							<div class="img-noVide-container">
								<img :src="item.img" />
							</div>
						</div>
					</div>
				</div>

				<!-- 多图 -->
				<div v-if="item && item.info == 0 && item.imgcount && item.imgcount >= 3" tapmode="hover" class="aui-list-item" @click="openArticle('text', item.id)">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-title aui-ellipsis-2">{{item.title}}</div>
						<div class="aui-row aui-row-padded aui-margin-t-5 aui-padded-t-10">
							<div class="aui-col-xs-4">
								<div class="img-noVide-container">
									<img :src="item.img" />
								</div>
							</div>
							<div class="aui-col-xs-4">
								<div class="img-noVide-container">
									<img :src="item.img1" />
								</div>
							</div>
							<div class="aui-col-xs-4">
								<div class="img-noVide-container">
									<img :src="item.img2" />
								</div>
							</div>
						</div>
					</div>
					<div class="aui-info  aui-padded-b-0">
						<div class="aui-info-item aui-font-size-12">
							<span class="aui-margin-r-15">{{item.nickname}}</span>
							<span class="aui-margin-r-15">{{commontNum(item.comment_num)}}条评论</span>
							<span>{{time(item.createdAt, 0)}}</span>
						</div>
					</div>
				</div>

				<!-- 视频 -->
				<div v-if="item && item.info == 1" tapmode="hover" class="aui-list-item" @click="openArticle('video', item.id)">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-title aui-ellipsis-2">{{item.title}}</div>
						<div class="aui-row aui-row-padded aui-margin-t-5 aui-padded-t-10">
							<div class="aui-col-xs-12">
								<div class="img-container">
									<img :src="item.img" />
								</div>
								<div class="H-position-center-all my-middle" style="width: 40px; height: 40px; background-color: rgba(1, 1, 1, .4); border-radius: 20px; -webkit-border-radius: 20px; z-index: 9;">
									<img src="static/image/bofang.png" style="max-width: 15px; display: block; margin-left: 15px;" />
								</div>
							</div>
						</div>
					</div>
					<div class="aui-info aui-padded-b-0">
						<div class="aui-info-item aui-font-size-12">
							<span class="aui-margin-r-15">{{item.nickname}}</span>
							<span class="aui-margin-r-15">{{commontNum(item.comment_num)}}条评论</span>
							<span>{{time(item.createdAt, 0)}}</span>
						</div>
					</div>
				</div>
			</li>
			<div v-if="list.length == 0" style="padding: 10px 0 0 15px;">
				无结果
			</div>
		</ul>

	</div>
</template>

<script>
	import $ from '../public/jquery'

	export default {
		name: 'search',
		data() {
			return {
				showResult: false,
				list: [],
				lishiKeyword: []
			}
		},
		methods:{
			openArticle:function(type, id) {
				if (type == 'text') {
					this.$router.pushRoute({name: 'articleDetaile', params:{id:id}})
				} else if (type == 'video') {
					this.$router.pushRoute({name: 'videoDetaile', params:{id:id}})
				}
			},
			closewin:function() {
				this.$router.backRoute();
			},
			search:function() {
				var keyword = this.$refs.input.value
				if (keyword == "") {
					this.showResult = false
					this.list = []
					this.getLishiKeyword()
					return
				}

				this.getList(keyword)

				var localStorageTemp = window.localStorage.lishiKeyword;
				if (localStorageTemp) {
					var temp = JSON.parse(localStorageTemp);
					if ($.inArray(keyword, temp) != -1) {
						temp.splice($.inArray(keyword,temp),1);
						temp.unshift(keyword)
						window.localStorage.lishiKeyword = JSON.stringify(temp)
					} else {
						temp.unshift(keyword)
						window.localStorage.lishiKeyword = JSON.stringify(temp)
					}
				} else {
					var arr = [];
					arr.unshift(keyword)
					window.localStorage.lishiKeyword = JSON.stringify(arr)
				}
			},
			tapthis:function(event) {
				this.$refs.input.value = event.target.innerText
				this.search()
			},
			getList:function(text) {
				var that = this
				var filter = 'filter[where][Status]=0'
				filter += '&filter[where][title][like]='+text
				filter += '&filter[skip]=0'
				filter += '&filter[limit]=5000'
				var url = "news?" + filter;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						that.showResult = true;
						if (data.length > 0) {
							that.list = data
						} else {
							that.list = []
						}
					}
				});
			},
			getLishiKeyword:function() {
				var temp = []
				var localStorageTemp = window.localStorage.lishiKeyword;
				if (localStorageTemp) {
					var temp = JSON.parse(localStorageTemp)
				}
				this.lishiKeyword = temp
			},
			clearLishi:function() {
				window.localStorage.lishiKeyword = JSON.stringify([])
				this.getLishiKeyword()
			}
		},
		activated:function() {
			this.getLishiKeyword()
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == "index") {
				this.$refs.input.value = "";
				this.showResult = false;
				this.list = [];
			}
			next(true);
		}
	}
</script>

<style scoped>
	body {
		background: #fff;
	}
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
	.H-position-center-all {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}
	.aui-bar-nav {
		background-color: #28B8A1;;
	}
	.my-search {
		width: 10.8rem;
		display: block;
		height: 24px;
		line-height: 24px !important;
		padding: 3px 0px 3px 35px;
		border-radius: 12px;
		background: #fff url(../../../static/image/search@3x.png) no-repeat 10px 3px;
		background-size: 20px 20px;
		font-size: 14px;
		line-height: 20px;
	}
	.aui-btn:active {
		color: #fff;
	}
	.lishibox {
		width:calc(100% - 30px);
		overflow: hidden;
		margin-left: 15px;
	}
	.lishitop {
		overflow: hidden;
	}
	.lishileft {
		float: left;
		height:30px;
		line-height:30px;
		margin-top:12px;
		font-size: 15px;
		color: #666666;
	}
	.removelishibtn {
		float: right;
		height:30px;
		line-height:30px;
		margin-top:12px;
		font-size: 14px;
		color: #666666;
	}
	.lishi_item_box {
		overflow: hidden;
		width:100%;
	}
	.lishi_item {
		padding:0 15px;
		height:35px;
		border:1px solid #eeeeee;
		border-radius: 2px;
		float: left;
		line-height:35px;
		text-align: center;
		color: #999999;
		overflow: hidden;
		margin: 0 5px 10px;
	}
	.my-middle {
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-align: center;
		display: box;
		box-orient: horizontal;
		box-align: center;
	}
	.aui-list .aui-list-item-media {
		width: 6rem;
	}
	input::-webkit-input-placeholder {
		color: #a2a8ae;
	}
</style>

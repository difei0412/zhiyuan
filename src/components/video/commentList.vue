<template>
	<div>
		<myHeader :title="'评论列表'"></myHeader>

		<ul v-if="commontData.length > 0">
			<li class="pinglun-box" v-for="(item, index) in commontData">
				<div class="aui-info aui-padded-l-15 aui-padded-r-15" style="padding-top: 0; padding-bottom: 0;">
					<div class="aui-info-item">
						<img :src="item.user_id.Tx" style="width: 1.75rem; height: 1.75rem;" class="aui-img-round" />
						<div style="display:block;margin-left:15px;">
							<p class="aui-font-size-14" style="color:#222">{{item.user_id.Name}}</p>
							<p class="aui-font-size-12">
								<span class="aui-margin-r-5" style="color:a2a8ae">{{time(item.createdAt, 0)}}</span>
							</p>
						</div>
					</div>
					<div class="aui-info-item" @click="supportClick(item.id, index)">
						<img v-if="(userId && userId != '') ? supportDic.login.pinglun[item.id] == userId : supportDic.noLogin.pinglun[item.id] == '1'" style="height: 18px; margin-right: 5px;" src="../../../static/image/yizan.png" alt="" />
						<img v-else style="height: 18px; margin-right: 5px;" src="../../../static/image/dian.png" alt="" />
						<p style="color: #a2a8ae; height: 18px; line-height: 18px;">{{commontNum(item.support_num)}}</p>
					</div>
				</div>
				<div class="aui-info aui-padded-l-15 aui-padded-r-15" style="padding-top:0;padding-bottom:0">
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
	</div>
</template>

<script>
	export default {
		name: "commentList",
		data() {
			return {
				commontData: [],
				supportDic: {},
				userId: ""
			}
		},
		methods: {
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
			supportClick(id, index) {
				var that = this;

				if (!that.userId) {
					if (that.supportDic.noLogin["pinglun"][id] == '1') {
						that.$MessageBox.alert('您已经赞过了！');
						return;
					}
					that.supportDic.noLogin["pinglun"][id] = '1';
					that.supportDic = Object.assign({}, that.supportDic);
					window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
					that.$MessageBox.alert('点赞成功');
					that.addSupportNum(id, index);
					return;
				}
				if (that.supportDic.login["pinglun"][id] == that.userId) {
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
						"type" : "pinglun"
					}
				}
				that.ajax({url, method, params,
					success:function(data) {
						that.supportDic.login["pinglun"][id] = that.userId;
						that.supportDic = Object.assign({}, that.supportDic);
						window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
						that.$MessageBox.alert('点赞成功');
						that.addSupportNum(id, index);
					}
				});
			},
			addSupportNum(id, index) {
				var that = this;

				var url = "news_pinglun/" + id;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						var tempNum = tempNum = data.support_num;
						if (!tempNum || tempNum == '') {
							tempNum = "0";
						}
						var num = parseInt(tempNum)
						num ++;

						var method = "POST";
						var params = {
							"data" : {
								"_method" : "PUT",
								"support_num" : num.toString()
							}
						}
						that.ajax({url, method, params,
							success:function(data) {
								that.commontData[index].support_num = data.support_num;
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
				filter += '&filter[limit]=5000'
				var url = "news_pinglun?" + filter;
				var method = "GET";
				that.ajax({url, method,
					success:function(data) {
						for (var i = 0; i< data.length; i++) {
							that.commontData.push(data[i]);
						}
					}
				});
			}
		},
		activated() {
			this.commontData = [];
			this.userId = window.localStorage.getItem('userId');
			this.getCommentData();
			this.isSupport();
		}
	}
</script>

<style scoped>
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
		background-color: white;
		padding: 15px 0 10px 0;
		margin-bottom: 1px;
	}
</style>
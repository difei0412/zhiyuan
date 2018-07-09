<template>
	<div>
		<myHeader :title="'消息通知'"></myHeader>
		<div v-if="list.length>0">
			<div class="deleteBtn" v-if="!isSelect" @click="setting">删除</div>
			<div class="cancelBtn" v-else @click="cancel">取消</div>
		</div>

		<div>
			<div v-for="(item, index) in list" v-if="item!==undefined">

				<div class="list" @click="openDetail(item,index)" v-if="!isSelect">
					<div class="my-middle" v-if="!isSelect">
						<img src="static/image/xitong@3x.png">
					</div>
					<div class="content my-middle" :class="{'active':item.read_status == '1'}">
						<span>{{item.title}}</span>
					</div>
				</div>

				<label class="list" v-else>
					<div class="content my-middle" :class="{'active':item.read_status == '1'}">
						<span>{{item.title}}</span>
					</div>
					<div class="my-middle" v-if="isSelect" @click.stop style="padding:0 20px;">
						<input type="checkbox" name="name" value="" class="aui-checkbox" v-model="deleteList[index]">
					</div>
				</label>

			</div>

			<div class="aui-btn aui-btn-danger aui-btn-block" style="width:80%;margin:2.25rem auto;" v-if="isSelect&&list.length>0" @click="deletBtn">删 除</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'messageNotify',
		data() {
			return {
				userId:'',
				list: [],
				isSelect:false,
				deleteList:[]
			}
		},
		methods: {
			setting(){
				this.isSelect = true;
			},
			cancel() {
				for(var i = 0;i<this.deleteList.length;i++) {
					this.deleteList[i] = false;
				}
				this.isSelect=false;
			},
			openDetail(item,index) {
				if(item.read_status==1) {
					window.location.href = item.link;
				}
				var that = this;
				var url = "user_notice/" + item.id;
				var method = "POST";
				var params = {
					"data":{
						"_method":"PUT",
						"read_status":"1"
					}
				}
				that.ajax({url,method,params,
					success:function(response){
						that.list[index]["read_status"] = 1;
						window.location.href = item.link;
					}
				})
			},
			deletBtn() {
				var that = this;
				var remainArr = [];
				var remainArr1 = [];
				var requests = [];
				for(var i = 0;i<that.deleteList.length;i++) {
					if(that.deleteList[i]){
						var json = {};
						json.method = "DELETE";
						json.path = "/mcm/api/user_notice/" + that.list[i].id;
						requests.push(json);
					}else {
						remainArr.push(that.list[i]);
						remainArr1.push(false);
					}
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
						that.list = remainArr;
						that.deleteList = remainArr1;
					}
				})
			},
			getData() {
				var that = this;
				var filter = {
					"include":["info_idPointer"],
					"where":{
						"user_id":that.userId
					}
				}
				var url = "user_notice?filter=" + encodeURIComponent(JSON.stringify(filter));
				var method = "GET";
				that.ajax({url,method,
					success:function(response){
						for(var i = 0;i<response.length;i++) {
							if(response[i].info_id.status == 1) {
								var json = {};
								var isSelect = false;
								json.id = response[i].id;
								json.info_id = response[i].info_id.id;
								json.read_status = response[i].read_status;
								json.link = response[i].info_id.link;
								json.title = response[i].info_id.title;
								that.list.push(json);
								that.deleteList.push(isSelect);
							}
						}
					}
				})
			}
		},
		activated() {
			this.userId = window.localStorage.getItem("userId");
			this.isSelect = false;
			this.list = [];
			this.deleteList = [];
			this.getData();
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
		padding: 0 0.7rem;
	}
	.list {
		height: 3.7rem;
		width: 100%;
		background-color: white;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-flow: row;
		flex-flow: row;
		margin-bottom: 1px;
	}
	.content {
		flex: 1;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
	}
	.list span {
		display: block;
		font-size: 0.7rem;
		max-height: 2rem;
		line-height: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.list img {
		display: block;
		width: 1.9rem;
	}
	.active {
		color: #a2a8ae;
	}
	.deleteBtn,.cancelBtn {
		width: 2.25rem;
		height: 2.25rem;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 11;
		color: #fff;
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		display: box;
		box-orient: horizontal;
		box-pack: center;
		box-align: center;
	}
	.aui-checkbox:checked {
		background-color: #f22a2a;
		border-color: #f22a2a;
	}
</style>

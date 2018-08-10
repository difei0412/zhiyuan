<template>
	<div style="background-color: #eee; min-height: 100%;">
		<myHeader :title="'医生信息'"></myHeader>

		<div>
			<form action="http://d.apicloud.com/mcm/api/file" id="imagform0" method="post" enctyp="multipart/form-data">
				<label class="list" for="file">
					<span class="title flex">头像</span>
					<div class="my-middle">
						<img class="headImage" :src="userInfo.tx?userInfo.tx:'../../../static/image/xitong@3x.png'">
					</div>
					<div class="my-middle">
						<img class="right" src="static/image/in@3x.png">
					</div>
				</label>
				<input type="file"  class="uploadFile" name="file" id="file" @change="setImagePreview" hidden/>
				<input type="hidden" height="50px" width="90px" id="type">
				<input type="hidden" height="50px" width="90px" id="filename">
			</form>
			<div class="list" @click="openNickUsername">
				<span class="title flex">用户名</span>
				<span class="title color">{{userInfo.username?userInfo.username:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="list" @click="openNickname">
				<span class="title flex">医生姓名</span>
				<span class="title color">{{userInfo.name?userInfo.name:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="list" @click="openIDCard" style="margin-bottom:0;border-bottom:1px solid #eee;">
				<span class="title flex">身份证号</span>
				<span class="title color">{{userInfo.IDCard | hideMiddle}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="list" @click="openAge">
				<span class="title flex">年龄</span>
				<span v-if="userInfo.age" class="title color">{{userInfo.age}}</span>
				<span v-else class="title color">未设置</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="list" @click="sex = true">
				<span class="title flex">性别</span>
				<span class="title color">{{userInfo.sex?userInfo.sex:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<mt-actionsheet :actions="sex1" v-model="sex"></mt-actionsheet> <!-- 就值医院选择器 -->

			<div class="list" @click="xueliVisible = true">
				<span class="title flex">学历</span>
				<span class="title color">{{userInfo.xueli?userInfo.xueli:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<mt-actionsheet :actions="xueliActions" v-model="xueliVisible"></mt-actionsheet><!-- 学历选择器 -->

			<div class="list">
				<span class="title flex">就职医院</span>
				<div class="aui-list-item-input">
                    <select style="color:#a2a8ae;font-size:0.65rem;direction:rtl" v-model="yiyuan" @change="save_yiyuan">
                        <option value="" disabled="disabled">未设置</option>
                        <option v-if="yiyuanarr" v-for="item in yiyuanarr" v-text="item.hospital" :value="item.id"></option>
                    </select>
                </div>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="list">
				<span class="title flex">职级</span>
				<div class="aui-list-item-input">
                    <select style="color:#a2a8ae;font-size:0.65rem;direction:rtl" v-model="zhiji" @change="save_zhiji">
                        <option value="" disabled="disabled">未设置</option>
                        <option v-if="zhijiarr" v-for="item in zhijiarr" v-text="item.zhicheng" :value="item.id"></option>
                    </select>
                </div>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="list">
				<span class="title flex">科室</span>
				<div class="aui-list-item-input">
                    <select style="color:#a2a8ae;font-size:0.65rem;direction:rtl" v-model="keshi" @change="save_keshi">
                        <option value="" disabled="disabled">未设置</option>
                        <option v-if="keshiarr" v-for="item in keshiarr" v-text="item.keshi" :value="item.id"></option>
                    </select>
                </div>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="list">
				<span class="title flex">主治</span>
				<span class="title color flex text-show-row-1" style="position:relative;right:-8rem;z-index:2">{{(zhuzhi.length>0)?zhuzhi.join(','):'未设置'}}</span>
				<div class="aui-list-item-input" style="background-color:rgba(0,0,0,0);position:relative;z-index:3">
                    <select style="color:#a2a8ae;font-size:0.65rem;direction:rtl;width:8rem;background:transparent;height:100%;color:rgba(0,0,0,0)" v-model="zhuzhi" @change="save_speciality" multiple="true" id="select-btn">
                        <option value="" disabled="disabled">未设置</option>
                        <option v-if="zhuzhiarr" v-for="item in zhuzhiarr" v-text="item.keyword" :value="item.keyword"></option>
                    </select>
                </div>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

			<div class="list" @click="openSign">
				<span class="title">成就简介</span>
				<span class="title color flex text-show-row-1">{{userInfo.timelist?userInfo.timelist:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="list" @click="openSign2">
				<span class="title">资质认证</span>
				<span class="title color flex text-show-row-1" v-if="userInfo.file_list">已上传</span>
				<span class="title color flex text-show-row-1" v-else>未设置</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import $ from '../public/jquery'
import sha from '../public/request'
import areaJson from '../public/address'
export default {
	name: 'userInfo',
	data() {
		return {
			userId:'',
			userInfo:'',
			xueliActions:[{
				name:'大专',
				method:this.xueli
			},
			{
				name:'本科',
				method:this.xueli
			},
			{
				name:'硕士',
				method:this.xueli
			},
			{
				name:'博士',
				method:this.xueli
			}],
			sex1:[{
				name:'男',
				method:this.updateSex1
			},
			{
				name:'女',
				method:this.updateSex2
			}],
			xueliVisible:false,
			sex:false,
			zhuzhi: ['被害妄想症','失眠'],
			zhuzhiarr: [],
			keshi: '',
			keshiarr: [],
			zhiji: '',
			zhijiarr: [],
			yiyuan: '',
			yiyuanarr: []
		}
	},
	filters: {
		hideMiddle(val) {
			if (val) {
				return val.substring(0,3)+'****'+val.substring(val.length-3)
			}else{
				return "未设置"
			}
			
		}
	},
	methods: {
		//将图片上传到数据库file表
		setImagePreview() {
			var that = this;
			var url =  "file";
			var method = "POST";
			var formData = new FormData($("#imagform0")[0]);
			var params = {
				data : formData,
				/**
				 * 必须false才会避开jQuery对 formdata 的默认处理
				 * XMLHttpRequest会对 formdata 进行正确的处理
				 */
				 processData : false,
				/**
				 *必须false才会自动加上正确的Content-Type
				 */
				 contentType : false,
				}
				that.ajax({url,method,params,
					success:function(response){
						if(response.url) {
							window.localStorage.removeItem('userinfo_obj');
							that.userInfo.tx = response.url;
							that.updateTx(that.userInfo.tx);
						}
					},
					error:function(error){
						that.$MessageBox.alert('图片上传错误，请重新上传！')
					}
				})
			},
		//将图片url更新到用户表函数
		updateTx(imgurl) {

			var that = this;
			var url = "expert/" + that.userId;
			var method = "POST";
			var params = {
				"data":{
					"tx":imgurl,
					"_method":"PUT"
				}
			}
			that.ajax({url,method,params,
				success:function(response){
				}
			})
		},
		//时间转换为本地时间格式
		formatDate(now) {
			var year = now.getFullYear();
			var month = now.getMonth()+1;
			month = month<10?"0"+month:month;
			var date = now.getDate();
			date = date<10?"0"+date:date;
			return year+"-"+month+"-"+date;
		},
		//打开昵称输入框
		openNickUsername() {
			var that = this;
			that.$MessageBox.prompt('请输入用户名','').then(function(response){
				if(!response.value) {
					that.$MessageBox.alert("请输入用户名");
					return
				}
				if(response.value.length>7) {
					that.$MessageBox.alert("请输入最长7位用户名");
					return
				}
				that.updateInfo("username",response.value)
			}).catch(function(error){
			});
		},
		//打开姓名输入框
		openNickname() {
			var that = this;
			that.$MessageBox.prompt('请输入姓名','').then(function(response){
				if(!response.value) {
					that.$MessageBox.alert("请输入姓名");
					return
				}
				if(response.value.length>7) {
					that.$MessageBox.alert("请输入最长7位姓名");
					return
				}
				that.updateInfo("name",response.value)
			}).catch(function(error){
			});
		},
		// 打开身份证输入框
		openIDCard() {
			var that = this;
			that.$MessageBox.prompt('请输入身份证号','').then(function(response){
				if(!response.value) {
					that.$MessageBox.alert("请输入身份证号");
					return
				}
				that.updateInfo("IDCard",response.value)
			}).catch(function(error){
			});
		},
		// 打开年龄输入框
		openAge() {
			var that = this;
			that.$MessageBox.prompt('请输入年龄','').then(function(response){
				if(!response.value) {
					that.$MessageBox.alert("请输入年龄");
					return
				}
				that.updateInfo("age",response.value)
			}).catch(function(error){
			});
		},
		//打开成就简介输入框
		openSign() {
			this.$router.push({path:'/geqian'})
		},
		//打开资质认证上传
		openSign2() {
			this.$router.push({path:'/zizhi'})
		},
		//打开日期选择器
		openBirthday() {
			this.$refs.datePicker.open();
			this.datePickerValue = "2000-01-01";
		},
		//日期选择器确认回调函数
		chooseDate(){
			var date = new Date(this.datePickerValue);
			date = this.formatDate(date);
			this.updateInfo("birthday",date)
		},
		//打开邮箱输入框
		openEmail() {
			var that = this;
			that.$MessageBox.prompt('请输入邮箱').then(function(response){
				if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(response.value)){
					that.updateInfo("email",response.value)
				}else {
					that.$MessageBox.alert("邮箱格式不正确！")
				}
			}).catch(function(error){
			});
		},
		//打开地区选择器
		openAreaPicker(){
			this.areaVisible = true;
			this.areaPicker.setSlotValues(0, areaJson.address);
		},
		onAreaChange(picker,values){
			this.areaPicker = picker;
			this.areaValues = values;
			if(values[0]){
				var arr1 = values[0].city;
				picker.setSlotValues(1, arr1);
				var arr2 = values[1].district;
				picker.setSlotValues(2, arr2);
				this.pro = values[0].name;
				this.city = values[1].name;
				this.area = values[2].name;
			}else {
				this.pro = '河北';
				this.city = '秦皇岛市';
				this.area = '北戴河区';
			}
		},
		canclearea(){
			this.areaVisible = false;
		},
		selectarea(){
			this.areaVisible = false;
			this.updateInfo("address",this.pro + this.city + this.area);
		},
		//更新用户信息通用函数
		updateInfo(key,value) {

			var that = this;
			var url = "expert/" + that.userId;
			var method = "POST";
			var params = {
				"data":{
					"_method":"PUT"
				}
			}
			params.data[key] = value;
			console.log(params)
			that.ajax({url,method,params,
				success:function(data){
					window.localStorage.removeItem('userinfo_obj');
					that.userInfo = data;
				}
			})
		},
		//更改性别为男
		updateSex1() {

			var that = this;
			var url = "expert/" + that.userId;
			var method = "POST";
			var params = {
				"data":{
					"sex":"男",
					"_method":"PUT"
				}
			}
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		//更改性别为女
		updateSex2() {

			var that = this;
			var url = "expert/" + that.userId;
			var method = "POST";
			var params = {
				"data":{
					"sex":"女",
					"_method":"PUT"
				}
			}
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		//更改学历
		xueli(e) {
			
			var that = this;
			var url = "expert/" + that.userId;
			var method = "POST";
			var params = {
				"data":{
					"xueli":e.name,
					"_method":"PUT"
				}
			}
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		// 更改医院
		save_yiyuan() {
			var that = this;
			var url = "expert/" + that.userId;

			var method = "POST";
			var params = {
				"data":{
					"hospital":that.yiyuan,
					"_method":"PUT"
				}
			}
			
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		// 查询医院
		yiyuan_list() {
			var that = this;
			var filter = {
				"fields":{"id":true,"hospital":true}
			};
			that.ajax({
				url:'hospital?filter='+encodeURIComponent(JSON.stringify(filter)),
				method: 'get',
				success:function(data){
					that.yiyuanarr = data;
				}
			})
		},
		//更改职称
		save_zhiji() {
			var that = this;
			var url = "expert/" + that.userId;
			var holder = '';
			for(var i=0;i<that.zhijiarr.length;i++) {
				if(that.zhijiarr[i]['id']==that.zhiji){
					holder = that.zhijiarr[i]['zhicheng']; 
				}
			}
			var method = "POST";
			var params = {
				"data":{
					"holderid":that.zhiji,
					"holder":holder,
					"_method":"PUT"
				}
			}
			
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		//职称列表
		zhiji_list() {
			var that = this;
			var filter = {
				"fields":{"id":true,"zhicheng":true},
				"order": 'paixu ASC'
			};
			that.ajax({
				url:'zhicheng?filter='+encodeURIComponent(JSON.stringify(filter)),
				method: 'get',
				success:function(data){
					that.zhijiarr = data;
				}
			})
		},
		// 科室列表
		keshi_list() {
			var that = this;
			var filter = {
				"fields":{"id":true,"keshi":true}
			};
			that.ajax({
				url:'keshi?filter='+encodeURIComponent(JSON.stringify(filter)),
				method: 'get',
				success:function(data){
					that.keshiarr = data;
				}
			})
		},
		//更改科室
		save_keshi() {
			var that = this;
			var url = "expert/" + that.userId;
			var method = "POST";
			var params = {
				"data":{
					"office":that.keshi,
					"_method":"PUT"
				}
			}
			
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		// 查询主治列表
		speciality() {
			var that = this;
			var filter = {
				"fields":{"id":true,"keyword":true},
				"where": {
					"bankuai": '主治关键词'
				}
			};
			that.ajax({
				url:'keyword?filter='+encodeURIComponent(JSON.stringify(filter)),
				method: 'get',
				success:function(data){
					that.zhuzhiarr = data;
				}
			})
		},
		save_speciality() {
			var that = this;
			var url = "expert/" + that.userId;

			var method = "POST";
			var tmp = JSON.stringify(that.zhuzhi);
			var params = {
				"data":{
					"speciality":tmp,
					"_method":"PUT"
				}
			}
			
			that.ajax({url,method,params,
				success:function(data){
					that.userInfo = data;
				}
			})
		},
		//获取用户信息函数
		getUserInfo() {

			var that = this;
			// that.$MessageBox.alert("资料补全后，等待审核通过方可操作平台");
			var userId = window.localStorage.getItem('userId');
			that.userId = userId?userId:'';
			var url = 'expert/'+that.userId;
			var method = "GET";
			that.ajax({url,method,
				success:function(data){
					that.userInfo = data;
					that.zhuzhi = that.userInfo.speciality?JSON.parse(that.userInfo.speciality):[];
					that.keshi = that.userInfo.office?that.userInfo.office:'';
					that.zhiji = that.userInfo.holderid?that.userInfo.holderid:'';
					that.yiyuan = that.userInfo.hospital?that.userInfo.hospital:'';
				}
			})
		}
	},
	mounted() {
		this.speciality();
		this.keshi_list();
		this.zhiji_list();
		this.yiyuan_list();
	},
	activated() {
		this.getUserInfo();
	},
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
.list {
	height: 2.5rem;
	width: 100%;
	background-color: white;
	display: flex;
	display: -webkit-flex;
	-webkit-flex-flow: row;
	flex-flow: row;
	margin-bottom: 1px;
}
.title {
	margin-left: 0.7rem;
	font-size: 0.65rem;
	color: #0F0F0F;
	height: 2.5rem;
	line-height: 2.5rem;
}
.headImage {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 1.25rem;
}
.color {
	color: #a2a8ae;
}
.flex {
	flex: 1;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
}
.list:nth-child(1) {
	height: 4.5rem;
}
.list:nth-child(1) span {
	height: 4.5rem;
	line-height: 4.5rem;
}
.list:nth-child(1), .list:nth-child(3), .list:nth-child(4) {
	margin-bottom: 10px;
}
.right {
	height: 0.8rem;
	margin: 0 0.7rem;
}
.text {
	display: block;
	height: 2.5rem;
	line-height: 2.5rem;
	margin: 0 0.7rem;
	text-align: right;
	font-size: 0.65rem;
}
input::-webkit-input-placeholder {
	color: #a2a8ae;
	font-size: 0.65rem;
}
.text-show-row-1 {
	text-align: right;
	overflow: hidden; text-overflow: ellipsis; display: box; display: -webkit-box; word-wrap: break-word; white-space: normal !important; -webkit-box-orient: vertical;line-clamp: 1; -webkit-line-clamp: 1;
}
.mint-popup-area {
	width: 100%;
}
#select-btn option{
	color: rgba(0,0,0,0);
    background: rgba(0,0,0,0);
}
#select-btn option:checked {
	color: rgba(0,0,0,0);
    background: rgba(0,0,0,0);	
} 
</style>

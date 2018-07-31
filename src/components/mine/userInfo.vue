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
			<!-- <div class="list" @click="hospitalVisible = true">
				<span class="title flex">就职医院</span>
				<span class="title color">{{userInfo.hospital?userInfo.hospital:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<mt-actionsheet :actions="hospitalActions" v-model="hospitalVisible"></mt-actionsheet>就值医院选择器 -->

			<div class="list" @click="hospital">
				<span class="title flex">就职医院</span>
				<span class="title color">{{userInfo.hospital?userInfo.hospital:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<div class="list" @click="zhijiVisible = true">
				<span class="title flex">职级</span>
				<span class="title color">{{userInfo.holder?userInfo.holder:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<mt-actionsheet :actions="zhijiActions" v-model="zhijiVisible"></mt-actionsheet><!-- 职级选择器 -->


			<div class="list" @click="office = true">
				<span class="title flex">科室</span>
				<span class="title color">{{userInfo.office?userInfo.office:'未设置'}}</span>
				<div class="my-middle">
					<img class="right" src="static/image/in@3x.png">
				</div>
			</div>
			<mt-actionsheet :actions="officeDate" v-model="office"></mt-actionsheet><!-- 科室选择器 -->

			<div class="list" @click="speciality">
				<span class="title flex">主治</span>
				<span class="title color">{{userInfo.speciality?userInfo.speciality:'未设置'}}</span>
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
				<span class="title color flex text-show-row-1">{{userInfo.zizhi?userInfo.zizhi:'未设置'}}</span>
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
			hospitalActions:[{
				name:'知源精神病医院',
				method:this.updateSex1
			},
			{
				name:'人民医院',
				method:this.updateSex2
			}],
			sex1:[{
				name:'男',
				method:this.updateSex1
			},
			{
				name:'女',
				method:this.updateSex2
			}],
			zhijiActions:[{
				name:'主任医师',
				method:this.zhicheng
			},
			{
				name:'副主任医师',
				method:this.zhicheng
			},
			{
				name:'主治医师',
				method:this.zhicheng
			},
			{
				name:'住院医师',
				method:this.zhicheng
			}],
			officeDate:[{
				name:'精神科',
				method:this.officeClick
			},
			{
				name:'心理科',
				method:this.officeClick
			}],
			xueliVisible:false,
			hospitalVisible:false,
			zhijiVisible:false,
			sex:false,
			office:false,
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
			that.$MessageBox.prompt('请输入用户名').then(function(response){
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
		//打开就职医院输入框
		hospital() {
			var that = this;
			that.$MessageBox.prompt('请输入医院名称').then(function(response){
				if(!response.value) {
					that.$MessageBox.alert("请输入医院名称");
					return
				}
				// if(response.value.length>7) {
				// 	that.$MessageBox.alert("请输入最长7位姓名");
				// 	return
				// }
				that.updateInfo("hospital",response.value)
			}).catch(function(error){
			});
		},
		//打开姓名输入框
		openNickname() {
			var that = this;
			that.$MessageBox.prompt('请输入姓名').then(function(response){
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
			that.$MessageBox.prompt('请输入身份证号').then(function(response){
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
			that.$MessageBox.prompt('请输入年龄').then(function(response){
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
			this.$router.pushRoute({path:'/geqian'})
		},
		//打开资质认证上传
		openSign2() {
			this.$router.pushRoute({path:'/zizhi'})
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
		//更改职称
		zhicheng(e) {
			// alert(e.name)
			var that = this;
			var url = "expert/" + that.userId;

			var method = "POST";
			var params = {
				"data":{
					"holder":e.name,
					"_method":"PUT"
				}
			}
			
			that.ajax({url,method,params,
				success:function(data){
					console.log(data)
					that.userInfo = data;
				}
			})
		},
		//更改科室
		officeClick(e) {
			// alert(e.name)
			var that = this;
			var url = "expert/" + that.userId;

			var method = "POST";
			var params = {
				"data":{
					"office":e.name,
					"_method":"PUT"
				}
			}
			
			that.ajax({url,method,params,
				success:function(data){
					console.log(data)
					that.userInfo = data;
				}
			})
		},
		//打开主治输入框
		speciality() {
			var that = this;
			that.$MessageBox.prompt('请输入主治关键词').then(function(response){
				if(!response.value) {
					that.$MessageBox.alert("请输入主治管检测");
					return
				}
				// if(response.value.length>7) {
				// 	that.$MessageBox.alert("请输入最长7位用户名");
				// 	return
				// }
				that.updateInfo("speciality",response.value)
			}).catch(function(error){
			});
		},
		//获取用户信息函数
		getUserInfo() {

			var that = this;
			// that.$MessageBox.alert("资料补全后，等待审核通过方可操作平台");
			var userId = window.localStorage.getItem('userId');
			that.userId = userId?userId:'';
			var url = 'expert/'+that.userId;
			// alert(url)
			var method = "GET";
			that.ajax({url,method,
				success:function(data){
					// console.log(data)
					that.userInfo = data;
				}
			})
		}
	},
	activated() {
		this.getUserInfo();
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
</style>

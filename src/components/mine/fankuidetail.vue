<template>
	<div style="background-color: white; min-height: 105%;">
		<myHeader :title="'反馈详情'"></myHeader>

		<section class="aui-content-padded">
			<p><div class="aui-label">就诊时间：{{dateFormat(jztime)}} 线上诊疗</div></p>
			<!-- <p><div class="aui-label">诊&ensp;室&ensp;号：900001</div></p> -->
			<p><div class="aui-label">姓&ensp;&ensp;&ensp;&ensp;名：{{brname}}</div></p>
			<p><div class="aui-label">性&ensp;&ensp;&ensp;&ensp;别：{{brsex}}</div></p>
			<p><div class="aui-label">年&ensp;&ensp;&ensp;&ensp;龄：{{brage}}</div></p>
			<!-- <p><div class="aui-label">病&ensp;&ensp;&ensp;&ensp;种：抑郁科</div></p> -->
			<p><div class="aui-label aui-label-danger aui-label-outlined">病情描述：{{brcont}}</div></p>
			<div class="aui-list-item-inner">
				<div class="aui-list-item-title">病情图片附件：</div>
				<div class="aui-row aui-row-padded">
					<div class="aui-col-xs-4" v-for="item in bl_img">
						<img v-preview="item" :src="item" preview-title-enable="false" preview-nav-enable="true"/>
					</div>
					
				</div>
			</div>
			<p><div class="aui-label aui-label-danger aui-label-outlined">反馈意见：{{fk}}</div></p>
		</section>
		<p><div class="aui-btn aui-btn-danger aui-btn-block" @click="closewin">确认</div></p>
		<lg-preview></lg-preview>
	</div>
</template>

<script>
import md5 from '../public/md5'
export default {
	name: 'register',
	data() {
		return {
			bl_img:[],
			jztime:'',
			brname:'',
			brsex:'',
			brage:'',
			brcont:'',
			fk:''
		}
	},
	methods: {
		closewin:function() {
			var _this = this;
			_this.$router.back();
		},
			// 获取病例信息和用户信息
			get_bl(id){
				var that = this;
				var filter = {
					"fields":{"brid":true,"brname":true,"createdAt":true,"fk":true,"bl_id":true},
					"where":{
						"id":id
					},
					"include":["bridPointer"],
					"includefilter":{"my_user":{"fields":['id','sex','age']}}
				};
				var url = 'fankui?filter='+encodeURIComponent(JSON.stringify(filter))
				that.ajax({url,methods:'get',success:function(data){
					console.log(data)
					that.jztime = data[0].createdAt;
					that.brname = data[0].brname;
					that.brsex = data[0].brid.sex;
					that.brage = data[0].brid.age;
					that.fk = data[0].fk
					that.get_blimg(data[0].bl_id)
				}})
			},
			get_blimg(id){
				
				var that = this;
				var url = 'bingli/'+id;
				that.ajax({url,methods:'get',success:function(data){
					that.bl_img = data.bl_img;
					that.brcont = data.bl_con
					console.log(data)
				}})
			},
			   //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
			   dateFormat:function(time) {
			   	var date=new Date(time);
			   	var year=date.getFullYear();
              /* 在日期格式中，月份是从0开始的，因此要加0
               * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
               * */
               var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
               var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
               var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
               var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
               var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
              // 拼接
              return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
          },

      },
      mounted(){

      },
      activated() {
      	var id = this.$route.params.id;
      	this.get_bl(id)

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

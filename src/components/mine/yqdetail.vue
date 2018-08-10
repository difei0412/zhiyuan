<template>
	<div style="background-color: white; min-height: 105%;">
    	<myHeader :title="'会诊信息'"></myHeader>
    	<lg-preview></lg-preview>
    	<section class="aui-content-padded">
    		<p><div class="aui-label" v-text="'会诊主题：'+(showData.title?showData.title:'')"></div></p>
    		<p><div class="aui-label" v-text="'会诊费用：'+(showData.price?showData.price:0)+'元'"></div></p>
    		<p><div class="aui-label aui-label-danger aui-label-outlined">
    			<p>会诊内容：</p>
    			<div v-html="showData.content"></div>
    		</div></p>
		</section>
		<p><div class="aui-btn aui-btn-danger aui-btn-block" @click="receive" v-show="showData.status==0">接受会诊</div></p>
    </div>
</template>

<script>
	import $ from '../public/jquery'
	export default {
		name: 'register',
		data() {
			return {
				showData: {},
				toast: null,
			}
		},
		methods: {
			// 帖子数据
          findData(id){
            var that = this;
            that.ajax({
              url:'news/'+id,
              method:"get",
              success: function(data){
                if(JSON.stringify(data)!='{}'){
                  that.showData = data;
                }
              }
            });
          },
          receive() {
          	var that = this;
          	var id = this.$route.params.id;
          	var params = {
          		"data":{
          			"status": 1,
          			"_method":"PUT"
          		}
          	};
          	 that.toast.loading({
                 title:"加载中",
                 duration:2000
            },function(ret){
            });
            that.ajax({
              url:'news/'+id,
              method:"post",
              params,
              success: function(data){
              	that.toast.hide();
                if(JSON.stringify(data)!='{}'){
                  that.toast.success({
                      title:"接受成功",
                      duration:2000
                  });
                  setTimeout(function(){
                    that.$router.back();
                  }, 2000);
                } else {
                	that.toast.fail({
	                      title:"接受失败",
	                      duration:2000
	                });
                }
              },
              error: function() {

              }
            });
          }
		},
		mounted() {
			this.toast = new auiToast();
		},
		activated() {
			var id = this.$route.params.id;
			this.findData(id);
			this.$nextTick(() => {
	            $(document).scrollTop(0);
            })
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
		min-height: 15rem;
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

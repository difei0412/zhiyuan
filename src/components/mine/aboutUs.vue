<template>
	<div style="background-color: white; min-height: 100%;">
		<myHeader :title="'关于我们'"></myHeader>

		<div>
			 <img src="static/image/logo.jpg" />
        <center><span style="color:#3F51B5;margin-top:10px;font-size:17px">知源病人端</span></center>
		</div>

		<div class="text">
			<span>
				XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.
			</span>
		</div>
		<div class="record">
			<span>
				Copyright©2017 北京保通科讯网络技术有限公司
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "aboutUs",
		data() {
			return {
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.logo {
		width: 5rem;
		height: 5rem;
		margin: 2rem auto 0;
	}
	.jianbao_red {
		height: 1rem;
		margin: 0.5rem auto 0;
	}
	.text {
		color: #0f0f0f;
		font-size: 0.75rem;
		margin: 2rem 0.6rem 0;
		text-indent: 1.5rem;
	}
	.record {
		color: #aaaaaa;
		position: fixed;
		bottom: 0.8rem;
		left: 0;
		font-size: 0.75rem;
		text-align: center;
		width: 100%;
		height: 0.8rem;
	}
</style>
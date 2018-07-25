import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Mint from 'mint-ui'
import myAjax from './components/public/VueAjax'
import fun from './components/public/fun'
import 'mint-ui/lib/style.css'
import { Toast,MessageBox,Indicator } from 'mint-ui'

import index from './components/index'
import layout from './components/layout'
import myHeader from './components/public/myHeader'

// 首页
import articleDetaile from './components/home/articleDetaile' //图文详情
import search from './components/home/search' //搜索
import mylable from './components/home/mylable' //标签

// 视频
import videoDetaile from './components/video/videoDetaile' //视频详情
import commentList from './components/video/commentList' //评论列表

// 我的
import register from './components/mine/register' //注册
import guahao from './components/mine/guahao' //挂号
import zhifu from './components/mine/zhifu' //挂号支付
import zhenshi from './components/mine/zhenshi' //线上诊室
import zhenshilist from './components/mine/zhenshilist.vue'  //线上诊室下一步
import mingyilist from './components/mine/mingyilist.vue'  //线上诊室下一步
import zhifu1 from './components/mine/zhifu1'  //线上诊室下一步
import shipin from './components/mine/shipin'  //线上诊室下一步
import jianhu from './components/mine/jianhu'  //监护权
import jianhu_detail from './components/mine/jianhu_detail'  //住房患者监控
import fankui from './components/mine/fankui'//反馈与跟踪意见
import zhifu2  from './components/mine/zhifu2'  //用户支付
import newsdetail  from './components/mine/newsdetail'  //新闻详情
import  imlist   from './components/mine/imlist'   //即时通讯大夫列表
import  im from './components/mine/im'   //即时通讯路由
import  luntan from  './components/mine/luntan'   //论坛
import  fatie from  './components/mine/fatie'   //发帖
import  tiezi from  './components/mine/tiezi'   //发帖
import  yuyue from  './components/mine/yuyue'   //
import  erweima from  './components/mine/erweima'   //
import  daka from  './components/mine/daka'   //
import  xiayibu from  './components/mine/xiayibu'   //
import login from './components/mine/login' //用户登录
import registerProtocol from './components/mine/registerProtocol.vue' //注册协议
import forgetPsw from './components/mine/forgetPsw' //忘记密码
import mingyi from './components/mine/mingyi' //忘记密码
import userInfo from './components/mine/userInfo' //用户信息
import colOrHisOrPush from './components/mine/colOrHisOrPush' //收藏、历史、推送
import messageNotify from './components/mine/messageNotify' //消息通知
import contactUs from './components/mine/contactUs' //用户反馈
import aboutUs from './components/mine/aboutUs' //关于我们
import geqian from './components/mine/geqian' //修改个性签名
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
import yuyueinfo from './components/mine/yuyueinfo' // 病人预约详细信息
import vuePicturePreview from 'vue-picture-preview' // 图片预览
import jinghuatie from './components/mine/jinghuatie' // 精华帖
import fankuilist from './components/mine/fankuilist' // 反馈清单
import fankuidetail from './components/mine/fankuidetail' // 反馈详情
import zizhi from './components/mine/zizhi' // 资质认证
import tongzhi from './components/mine/tongzhi' // 消息通知

Vue.use(vuePicturePreview)
Vue.use(vueEventCalendar, {locale: 'en'})

Vue.use(VueRouter)
Vue.use(Mint)
Vue.use(myAjax)
Vue.use(fun)
Vue.component('myHeader', myHeader)

// back push replace
VueRouter.prototype.backRoute = function() {
　　this.back()
}
VueRouter.prototype.pushRoute = function(obj) {
　　this.push(obj)
}
VueRouter.prototype.replaceRoute = function(obj) {
　　this.replace(obj)
}

Vue.prototype.$http = axios
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Indicator = Indicator

let router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			name: 'mylable',
			path: '/mylable',
			component: mylable
		},
		{
			name: 'search',
			path: '/search',
			component: search
		},
		{
			name: 'articleDetaile',
			path: '/articleDetaile/:id',
			component: articleDetaile
		},
		{
			name: 'videoDetaile',
			path: '/videoDetaile/:id',
			component: videoDetaile
		},
		{
			name: 'commentList',
			path: './commentList/:id',
			component: commentList
		},
		{
			name: 'userInfo',
			path: '/userInfo',
			component: userInfo
		},
		{
			name: 'colOrHisOrPush',
			path: '/colOrHisOrPush/:index',
			component: colOrHisOrPush
		},
		{
			name: 'messageNotify',
			path: '/messageNotify',
			component: messageNotify
		},
		{
			name: 'contactUs',
			path: '/contactUs',
			component: contactUs
		},
		{
			name: 'aboutUs',
			path: '/aboutUs',
			component: aboutUs
		},
		{
			name: 'login',
			path: '/login',
			component: login
		},
		{
			name: 'register',
			path: '/register',
			component: register
		},
		{
			name: 'registerProtocol',
			path: '/registerProtocol',
			component: registerProtocol
		},
		{
			name: 'forgetPsw',
			path: '/forgetPsw',
			component: forgetPsw
		},
		{
			name: 'geqian',
			path: '/geqian',
			component: geqian
		},
		{
			name: 'mingyi',
			path: '/mingyi',
			component: mingyi
		},
		{
			name: 'guahao',
			path: '/guahao',
			component: guahao
		},
		{
			name: 'zhifu',
			path: '/zhifu',
			component: zhifu
		},
		{
			name: 'zhenshi',
			path: '/zhenshi',
			component: zhenshi
		},
		{
			name: 'zhenshilist',
			path: '/zhenshilist',
			component: zhenshilist
		},
		{
			name: 'mingyilist',
			path: '/mingyilist',
			component: mingyilist
		},
		{
			name: 'zhifu1',
			path: '/zhifu1',
			component: zhifu1
		},
		{
			name: 'shipin',
			path: '/shipin',
			component: shipin
		},
			{
			name: 'jianhu',
			path: '/jianhu',
			component: jianhu
		},
		{
			name: 'jianhu_detail',
			path: '/jianhu_detail',
			component: jianhu_detail
		},
		{
			name: 'fankui',
			path: '/fankui',
			component: fankui
		},
		{
			name: 'zhifu2',
			path: '/zhifu2',
			component: zhifu2
		},
		{
			name: 'newsdetail',
			path: '/newsdetail',
			component: newsdetail
		},
		{
			name: 'imlist',
			path: '/imlist',
			component: imlist
		},
		{
			name: 'im',
			path: '/im',
			component: im
		},
		{
			name: 'luntan',
			path: '/luntan',
			component: luntan
		},
		{
			name: 'fatie',
			path: '/fatie',
			component: fatie
		},
		{
			name: 'tiezi',
			path: '/tiezi',
			component: tiezi
		},
		 {
			name: 'yuyue',
			path: '/yuyue',
			component: yuyue
		},
		 {
			name: 'erweima',
			path: '/erweima',
			component: erweima
		},
		 {
			name: 'daka',
			path: '/daka',
			component: daka
		},
		 {
			name: 'xiayibu',
			path: '/xiayibu',
			component: xiayibu
		},
		 {
			name: 'yuyueinfo',
			path: '/yuyueinfo',
			component: yuyueinfo
		},
		{
			name: 'jinghuatie',
			path: '/jinghuatie',
			component: jinghuatie
		},
		{
			name: 'fankuilist',
			path: '/fankuilist',
			component: fankuilist
		},
		{
			name: 'fankuidetail',
			path: '/fankuidetail',
			component: fankuidetail
		},
		{
			name: 'zizhi',
			path: '/zizhi',
			component: zizhi
		},
		{
			name: 'tongzhi',
			path: '/tongzhi',
			component: tongzhi
		},
	]
})

new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { layout }
})

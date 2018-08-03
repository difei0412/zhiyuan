import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Mint from 'mint-ui'
import myAjax from './components/public/VueAjax'
import fun from './components/public/fun'
import 'mint-ui/lib/style.css'
import { Toast,MessageBox,Indicator } from 'mint-ui'
// 富文编辑器
import "font-awesome.css/css/font-awesome.css"
import initRichText from './common/initHTMLEditor';  
initRichText();

import index from './components/index'
import layout from './components/layout'
import myHeader from './components/public/myHeader'

// 首页
// import articleDetaile from './components/home/articleDetaile' //图文详情

// 我的
import register from './components/mine/register' //注册
import zhifu from './components/mine/zhifu' //挂号支付
import zhenshi from './components/mine/zhenshi' //线上诊室
import mingyilist from './components/mine/mingyilist.vue'  //线上诊室下一步
import zhifu1 from './components/mine/zhifu1'  //线上诊室下一步
import jianhu from './components/mine/jianhu'  //监护权
// import  imlist   from './components/mine/imlist'   //即时通讯大夫列表
// import  im from './components/mine/im'   //即时通讯路由
import  luntan from  './components/mine/luntan'   //论坛
import  fatie from  './components/mine/fatie'   //发帖
import  fatie2 from  './components/mine/fatie2'   //发帖
import  tiezi from  './components/mine/tiezi'   //发帖
import  yuyue from  './components/mine/yuyue'   //
import  daka from  './components/mine/daka'   //
import login from './components/mine/login' //用户登录
import registerProtocol from './components/mine/registerProtocol.vue' //注册协议
import forgetPsw from './components/mine/forgetPsw' //忘记密码
import userInfo from './components/mine/userInfo' //用户信息
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
import rizhiedit from './components/mine/rizhiedit' // 日志编辑

// vueg
import vueg from 'vueg'
import 'vueg/css/transition-min.css'

Vue.use(vuePicturePreview)
Vue.use(vueEventCalendar, {locale: 'en'})

Vue.use(VueRouter)
Vue.use(Mint)
Vue.use(myAjax)
Vue.use(fun)
Vue.component('myHeader', myHeader)

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
			name: 'userInfo',
			path: '/userInfo',
			component: userInfo
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
			name: 'jianhu',
			path: '/jianhu',
			component: jianhu
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
		},{
			name: 'fatie2',
			path: '/fatie2',
			component: fatie2
		},
		{
			name: 'tiezi',
			path: '/tiezi/:id',
			component: tiezi
		},
		 {
			name: 'yuyue',
			path: '/yuyue',
			component: yuyue
		},
		 {
			name: 'daka',
			path: '/daka',
			component: daka
		},
		 {
			name: 'yuyueinfo',
			path: '/yuyueinfo',
			component: yuyueinfo
		},
		{
			name: 'jinghuatie',
			path: '/jinghuatie',
			component: jinghuatie,
			meta: { keepAlive: true },//当前的.vue文件需要缓存
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
		{
			name: 'rizhiedit',
			path: '/rizhiedit',
			component: rizhiedit
		},
	]
})

Vue.use(vueg,router);

new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { layout }
})

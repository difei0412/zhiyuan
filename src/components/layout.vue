<template style="background: #ffffff;">
  <!-- <transition :name="transitionName"> -->
    <keep-alive>
      <router-view style="min-height: 100%;"></router-view>
    </keep-alive>
    <!-- </transition> -->
  </template>

  <script>
  export default {
    name: 'layout',
    data () {
      return {
        api: '',
        transitionName: '',
        push_info: {},
        yindao:0
      }
    },
    methods: {
      // 监听推送数据
      jiating(){
        var socketManager = api.require('socketManager');
        socketManager.createSocket({
          host: '192.168.1.100',
          port: 8282
        }, function(ret, err) {
          if (ret) {
            alert(JSON.stringify(ret));
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      // 查询推送消息
      findData(id){
        var that = this;
        that.ajax({
          url:'message_push/'+id,
          method:"get",
          success: function(data){
            if(JSON.stringify(data)!='{}'){
              that.push_info = data;
            }
          }
        });
      },
      // 字符串去除HTML标签
      delHtmlTag(str){
        var msg  = str;
        msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, '') //去除行尾空格
        msg = msg.replace(/&nbsp;/ig, ' '); //去掉npsp
        msg = msg.replace(/&amp;nbsp;/ig, ' '); //去掉npsp
        msg = msg.replace(/[\r\n]/g," ");//去掉回车换行
        msg = msg.replace(/\s+/g," ");//去掉回车换行
        return msg;
      },
    },
    activated(){
      this.jianting();
    },
    mounted(){
       // this.$router.push({path:'/tongzhidetail/5b7ce580159c52774d73693e'})
       var that = this;
       setTimeout(function(){
        if (api) {
            // 关闭启动页
            api.removeLaunchView({
              animation: {
                type: 'fade',
                duration: 500
              }
            });
            //设置监听
            var push = api.require('push');
            push.setListener(function(ret,err){
              if(ret){
                if(ret.data[0]){
                  that.findData(ret.data[0]);
                }
                var content = '未知内容';
                if(that.push_info.desc){
                  content = that.delHtmlTag(that.push_info.desc).substr(0,20)+'...';
                }
                
                api.notification({
                  notify: {
                    title:that.push_info.theme?that.push_info.theme:'未知标题',
                    extra:that.push_info.id?that.push_info.id:'',
                    content:content,
                  },
                }, function(ret, err) {
                });
              }
            });
            // 状态栏通知点击事件
            api.addEventListener({
              name:'noticeclicked'
            },function(ret,err){
              that.$router.push({path:'/tongzhidetail/'+ret.value})
            });
          }
        }, 100);
     },
   }
   </script>

   <style>
   @import '../../static/css/aui.css';
   #vueg-background {
    position: fixed !important;
    background: #eee !important;
  }
  .aui-list .aui-list-item {
    border-bottom: 1px solid #eee;
  }
  </style>

  <style scoped>
  .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    transition: all .3s ease;
    -webkit-transition: all .3s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .slide-left-enter, .slide-right-leave-active {
    z-index: 30;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  .slide-right-enter {
    opacity: 0;
  }
  .slide-right-enter, .slide-left-leave-active {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  .slide-left-enter-to, .slide-right-leave-to {
    position: fixed;
  }
  </style>

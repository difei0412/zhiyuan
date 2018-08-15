<template style="background: #ffffff;">
    <!-- <transition :name="transitionName"> -->
      <keep-alive>
        <router-view style="min-height: 100%;" v-transition="true"></router-view>
      </keep-alive>
    <!-- </transition> -->
</template>

<script>
  import '../../static/css/aui.css';
  export default {
    name: 'layout',
    data () {
      return {
        api: '',
        transitionName: '',
      }
    },
    methods: {
      // keyback() {
      //   var that = this
      //   try {
      //     that.api = api
      //     if (that.$route.path == '/') { // 安卓退出
      //       that.api.sendEvent({
      //         name: 'changerouter',
      //       });
      //     } else { //安卓返回
      //       that.api.sendEvent({
      //         name: 'changerouter1',
      //       });
      //       that.api.addEventListener({
      //         name: 'keyback1'
      //       }, function(ret, err) {
      //         that.$router.back();
      //       });
      //     }
      //   }
      //   catch(error) {
      //   }
      // },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      // '$route'(to, from) {
      //   var isBack = this.$router.isBack  // 监听路由变化时的状态为前进还是后退
      //   if (isBack == "1") {
      //     this.transitionName = 'slide-right'
      //   } else if (isBack == "2") {
      //     this.transitionName = 'slide-left'
      //   } else if (isBack == "0") {
      //     this.transitionName = ''
      //   }
      //   this.$router.isBack = "0"
      //   this.keyback();
      // }
    }
  }
</script>

<style>
  @import '/static/css/aui.css';
    #vueg-background {
      position: fixed !important;
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

<template style="background: #ffffff;">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  import '../../static/css/aui.css';

  export default {
    name: 'layout',
    data() {
      return {
      }
    }
  }
</script>

<style>
  .mint-indicator-mask {
    z-index: 9999;
  }
</style>

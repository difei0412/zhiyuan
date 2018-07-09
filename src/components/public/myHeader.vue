<template>
  <div>
    <div class="aui-bar"></div>
    <header class="aui-bar aui-bar-nav">
      <div class="aui-pull-left" @click="closewin">
        <img src="static/image/fanhui@3x.png">
      </div>
      <div class="aui-title">{{title}}</div>
    </header>
  </div>
</template>

<script>
  export default {
    name:'myHeader',
    props: {
      title: String,
    },
    data() {
      return {
      }
    },
    methods: {
      closewin:function() {
        var _this = this;
        _this.$router.backRoute();
      }
    }
  }
</script>

<style scoped>
  .aui-pull-left img {
    margin-top: 0.5rem;
    height: 1.25rem;
  }
  .aui-bar-nav {
    background-color: #28B8A1;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index:99999999999
  }
</style>

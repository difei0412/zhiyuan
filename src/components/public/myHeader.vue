<template>
  <div>
    <div class="aui-bar"></div>
    <header class="aui-bar aui-bar-nav">
      <div class="aui-pull-left" @click="$router.back();">
        <img src="static/image/fanhui@3x.png" style="height:1.1rem;margin-top:0.55rem">
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

    }
  }
</script>

<style scoped>
  .aui-pull-left img {
    margin-top: 0.5rem;
    height: 1.25rem;
  }
  .aui-bar-nav {
    background-color: #34DBDA;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index:1500
  }
</style>

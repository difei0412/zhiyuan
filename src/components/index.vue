<template>
  <div style="height: 100%;" id="app">
    <header class="aui-bar aui-bar-nav" style="z-index:999999" v-if="menuindex == 0">
      <div style="position:relative;">
        <div>诊疗中心</div>
        <div style="position:absolute;right:1rem;top:0rem;"><i class="aui-iconfont aui-icon-info" @click="opentongzhi()"></i></div>
      </div>
    </header>
    <header class="aui-bar aui-bar-nav" v-if="menuindex == 1">病患沟通</header>
    <header class="aui-bar aui-bar-nav" v-if="menuindex == 2">个人中心</header>

    <keep-alive>
      <content1 ref="content1" v-if="menuindex==0"></content1>
      <content2 ref="content2" v-if="menuindex==1"></content2>
      <content3 v-if="menuindex==2"></content3>
    </keep-alive>

    <footer class="aui-bar aui-bar-tab">
      <div class="aui-bar-tab-item aui-active" @click="openmenu(0)">
        <center>
          <i class="aui-iconfont aui-icon-home"></i>
        </center>
        <div class="aui-bar-tab-label">诊疗中心</div>
      </div>
      <div class="aui-bar-tab-item" @click="openmenu(1)">
        <center>
        <i class="aui-iconfont aui-icon-comment"></i>
        </center>
        <div class="aui-bar-tab-label">病患沟通</div>
      </div>
      <div class="aui-bar-tab-item" @click="openmenu(2)">
        <center>
          <i class="aui-iconfont aui-icon-my"></i>
        </center>
        <div class="aui-bar-tab-label">个人中心</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import content1 from './home/content'
  import content2 from './video/content2'
  import content3 from './mine/content3'
  import Vue from 'vue'

  export default {
    name: 'index',
    data() {
      return {
        menuindex: 0
      }
    },
    components: {
      content1,
      content2,
      content3
    },
    methods: {
      opentongzhi() {
        this.$router.pushRoute({name:"tongzhi"});
      },
      goToSearch() {
        this.$router.pushRoute({name:"search"});
      },
      openmenu:function(index) {
        var that = this
        if (that.menuindex == 0) {
          
        } else if (that.menuindex == 1) {
          that.$refs.content2.childMethod()
        }
        that.menuindex = index

        var footeritem = document.getElementsByClassName("aui-bar-tab-item")
        var iconcls = document.getElementsByClassName("iconcls")
        for (var i = 0; i < footeritem.length; i ++) {
          footeritem[i].className = 'aui-bar-tab-item'
          
        }

        footeritem[index].className = 'aui-bar-tab-item aui-active'
        
      }
    },
    created() {
      var supportDic = window.localStorage.getItem('supportDic');
      if (!supportDic) {
        var dic = {
          "login" : {
            "news" : {},
            "pinglun" : {}
          },
          "noLogin" : {
            "news" : {},
            "pinglun" : {}
          }
        }
        window.localStorage.setItem('supportDic', JSON.stringify(dic));
      }
    }
  }
</script>

<style scoped>
  .aui-bar-nav {
    background: #28B8A1;
    text-align: center;
    position: fixed;
    float: left;
    margin-left: 0px;
    width: 100%;
    top: 0px;
    z-index: 99999;
  }
  .aui-bar-tab .aui-active {
    color: #28B8A1;
  }
  .iconcls {
    max-height: 22px;
  }
  .logo {
    float: left;
    max-height: 0.9rem;
    margin-left: 10px;
    margin-top: 0.675rem;
  }
  .search {
    float: right;
    max-width:90%;
    margin-right:5%;
    margin-top:5px
   
  }
  .aui-searchbar {
    width: 60%;
    float: right;
    margin-right: 22px;
    margin-top: -22px;
    height: 100%;
    background: none
  }
  footer {
    border-top: 1px solid #eee;
    box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
  }
  .H-flexbox-vertical {
    display: box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-flow: column;
    flex-flow: column;
    height: 100%;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .H-flex-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
</style>

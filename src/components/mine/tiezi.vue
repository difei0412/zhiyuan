<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'帖子详情'"></myHeader>
       <div class="aui-content aui-content-padded" >
         <h3 class="aui-list-header" v-text="showData.ttopic"></h3>
         <ul class="aui-list aui-select-list">
            <li class="aui-list-item">
                <div class="aui-content aui-content-padded ">
                   <div class="aui-content" v-html="showData.tcontents"></div>
                </div>
            </li>
          </ul>
          <div style="margin-top:0.5rem;">
              <img :src="showData.tx" class="aui-list-img-sm" style="height:2.5rem;float:left;">
              <div style="color:#28B8A1;height:2.5rem;line-height:2.5rem;float:left; margin-left:0.5rem" v-text="showData.holder+'：'+showData.name"></div>
              <div style="clear:both"></div>
          </div>
      </div>

       <div class="aui-content">
        <!-- <div class="aui-col-xs-6">
            <span><i class="aui-iconfont aui-icon-laud"></i><span class="zan-num">(12)</span></span>
            <span><i class="aui-iconfont aui-icon-laud zan-icon2"></i><span class="zan-num">(12)</span></span>
        </div> -->
        <div class="aui-col-xs-12">
           <i class="aui-iconfont aui-pull-right aui-icon-weibo"></i>
           <i class="aui-iconfont aui-pull-right aui-icon-wechat-circle"></i>
           <i class="aui-iconfont aui-pull-right aui-icon-wechat"></i>
        </div>
       </div>

       <!-- <hr style="background:#eee;height:1px;margin:0.5rem 0"/> -->

   <div class="aui-searchbar" id="search">
      <div class="aui-searchbar-input aui-border-radius">
          <i class="aui-iconfont aui-icon-pencil"></i>
          <form action="javascript:search();">
              <input type="search" placeholder="请输入您的评价" id="search-input" style="">
          </form>

      </div>
      <i class="aui-iconfont aui-icon-comment"><div class="aui-badge">3</div></i>
  </div>

  <div class="aui-content aui-margin-b-15 pinglun-list">
    <ul class="aui-list aui-media-list">
        <li class="aui-list-header">
            精彩评论 (11)
        </li>
        <li class="aui-list-item aui-list-item-arrow">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner">
                    <div class="aui-info aui-padded-l-10 aui-padded-r-10">
                        <div class="aui-info-item">
                            <img src="static/image/demo1.jpeg" class="aui-img-round" />
                            <div class="user-nick">杨诺依</div>
                        </div>
                        <div class="aui-info-item"> <span class="user-zan-num">2018年04月12日 12:12</span></div>
                    </div>
                    <div class="aui-list-item-text aui-ellipsis-2">
                        这里是内容区域，新版中的列表布局可以很轻松的帮助开发者完成常见列表样式。
                    </div>
                </div>
            </div>
        </li>
        <li class="aui-list-item aui-list-item-arrow">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner">
                    <div class="aui-info aui-padded-l-10 aui-padded-r-10">
                        <div class="aui-info-item">
                            <img src="static/image/demo1.jpeg" class="aui-img-round" />
                            <div class="user-nick">杨诺依</div>
                        </div>
                        <div class="aui-info-item"> <span class="user-zan-num">2018年04月12日 12:12</span></div>
                    </div>
                    <div class="aui-list-item-text aui-ellipsis-2">
                        这里是内容区域，新版中的列表布局可以很轻松的帮助开发者完成常见列表样式。
                    </div>
                </div>
            </div>
        </li>
        <li class="aui-list-item aui-list-item-arrow">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner">
                    <div class="aui-info aui-padded-l-10 aui-padded-r-10">
                        <div class="aui-info-item">
                            <img src="static/image/demo1.jpeg" class="aui-img-round" />
                            <div class="user-nick">杨诺依</div>
                        </div>
                        <div class="aui-info-item"> <span class="user-zan-num">2018年04月12日 12:12</span></div>
                    </div>
                    <div class="aui-list-item-text aui-ellipsis-2">
                        这里是内容区域，新版中的列表布局可以很轻松的帮助开发者完成常见列表样式。
                    </div>
                </div>
            </div>
        </li>
        <li class="aui-list-item aui-list-item-arrow">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner">
                    <div class="aui-info aui-padded-l-10 aui-padded-r-10">
                        <div class="aui-info-item">
                            <img src="static/image/demo1.jpeg" class="aui-img-round" />
                            <div class="user-nick">杨诺依</div>
                        </div>
                        <div class="aui-info-item"> <span class="user-zan-num">2018年04月12日 12:12</span></div>
                    </div>
                    <div class="aui-list-item-text aui-ellipsis-2">
                        这里是内容区域，新版中的列表布局可以很轻松的帮助开发者完成常见列表样式。
                    </div>
                </div>
            </div>
        </li>
        
   </ul>
  </div>  
  
    <div style="height:2.5rem"></div>     

    </div>
  
</template>

<script>
    export default {
        name: 'geqian',
        data() {
            return {
               id: '',
               showData: {} 
            }
        },
        methods: {
          // 帖子数据
          findData(id){
            var that = this;
            that.ajax({
              url:'tiezi/'+id,
              method:"get",
              success: function(data){
                if(JSON.stringify(data)!='{}'){
                  that.showData = data;
                  that.ajax({
                    url:'expert/'+data.tuid,
                    method:"get",
                    success:function(data2){
                      that.showData.tx = data2.tx;
                      that.showData.name = data2.name;
                      that.showData.holder = data2.holder;
                    }
                  })
                }
              }
            });
          },
          // 评论
          pinglunData() {

          }
        },
         mounted () {
            var id = this.$route.params.id;
            this.findData(id);
         },
        created:function() {
        },
        deactivated(){
          this.$destroy(true);
        },
        // beforeRouteEnter(to,from,next){
        //   next(vm => {
        //     var id = vm.$route.params.id;
        //     vm.findData(id);
        //   });
        // },
    }
</script>

<style scoped>
    .my-middle {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-align: center;
        display: box;
        box-orient: horizontal;
        box-align: center;
    }
    .text {
        width: 16.75rem;
        height: 7rem;
        margin: 0.7rem auto 0;
        padding: 0.3rem;
        font-size: 0.7rem;
        color: #0f0f0f;
        background-color: rgb(250, 250, 250);
        letter-spacing: 0.1rem;
    }
    .exitBg {
        height: 5rem;
    }
    .exit {
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        color: #f22a2a;
        background-color: rgb(240, 240, 240);
        width: 7.5rem;
        margin: 0 auto;
        text-align: center;
    }
  h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}

.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #0fc37c;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}

.mark1 {
  background-color: red;
}

.mark2 {
  background-color: blue;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
.myred{
    height:15px;
    width:55px;
    background:red;
    position:relative;
    float:left;
    margin-left:20px;
    margin-top:10px
}
.myblue{
    height:15px;
    width:55px;
    background:blue;
    position:relative;
    float:left;
    margin-left:20px;
    margin-top:10px
}
.button1{
     border:1px solid #d1d1d1;
     background:#fff;
     height:30px;
     width:67px;
     color:#d1d1d1;
     border-radius:15px

}
.mybiaoqian900{
    color:#27B5B1;
    border:1px solid #27B5B1;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:60px;
    margin-left:10px
}
.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
.aui-list-header {
  font-weight: bold;
}
.aui-list .aui-list-item {
  padding: 0;
  color:#666;
  font-size:14px;
  text-indent: 2em;
}
.aui-icon-weibo,.aui-icon-wechat-circle,.aui-icon-wechat {
  font-size:24px;
  margin-right:1rem;
}
.aui-icon-laud {
  font-size:22px;
  margin-left:1rem;
}
span.zan-num {
  font-size:12px;
  margin-left:0.2rem;
  color:#666;
}
.zan-icon2 {
  margin-left: 0.3rem;
}
#search {
  width:100%;
  background:#28B8A1;
  position: fixed;
  left:0;
  bottom:0;
  z-index: 99999999;
  height:2.5rem;
}
.aui-searchbar-input {
  height:1.6rem;
  line-height: 1.6rem;
}
.aui-searchbar-input input {
  width:100%;
}
.aui-icon-comment {
  color:#fff !important;
  font-size:20px;
  margin-right:0.5rem;
  position: relative;
}
.aui-badge {
  position: absolute;
  top:-0.3rem;
  left:-0.3rem;
}
.aui-list .aui-list-item {
  border:0px solid #fafafa;
}
.pinglun-list {
  margin-top:0.8rem;
}
.aui-list-item-inner {
  margin-right: 0;
}
.aui-img-round {
  width:2rem;
  height:2rem;
}
.user-nick {
  color:#333;
  margin-left:0.5rem;
}
.aui-info-item {
  text-indent: 0;
}
.aui-info-item .aui-icon-laud {
  margin-left: 0.3rem
}
.user-zan-num {
  margin-right: 1rem;
  font-size: 12px;
}
.aui-list-item-text {
  text-indent: 0rem;
  padding:0 1rem;
}
.user-zan-num .aui-icon-laud {
  font-size:18px !important;
}
.aui-padded-l-10 {
  padding-left: 1rem !important;
}
.aui-padded-r-10 {
  padding-right: 0rem !important;
}

.aui-list-item-arrow {
  padding-bottom: 0.5rem !important;
  border-bottom: 1px solid #eee !important;
}
</style>

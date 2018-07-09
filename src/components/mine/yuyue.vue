<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'预约记录'"></myHeader>
      <div class="aui-tab" id="tab">
    <div class="aui-tab-item aui-active" v-if="myindex==0" @click="selectmenu(0)">普通挂号</div>
    <div class="aui-tab-item " v-if="myindex!=0" @click="selectmenu(0)">普通挂号</div> 
     <div class="aui-tab-item aui-active" v-if="myindex==1" @click="selectmenu(1)">知名专家</div>
    <div class="aui-tab-item " v-if="myindex!=1" @click="selectmenu(1)">知名专家</div> 
      <div class="aui-tab-item aui-active" v-if="myindex==2" @click="selectmenu(2)">知名专家</div>
    <div class="aui-tab-item " v-if="myindex!=2" @click="selectmenu(2)">在线问诊</div> 
</div>
   <div  v-if="myindex==0">
   
<div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu1()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">已支付</button>
                    </div>
                </div>
            </li>
              <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">未支付</button>
                    </div>
                </div>
            </li>
             <li class="aui-list-item aui-list-item-middle"  @click="openzhifu1()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">已支付</button>
                    </div>
                </div>
            </li>
              <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">未支付</button>
                    </div>
                </div>
            </li>
           
        </ul>
    </div>
   </div>
   <div  v-if="myindex==1">
   
<div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu1()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">已支付</button>
                    </div>
                </div>
            </li>
              <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">未支付</button>
                    </div>
                </div>
            </li>
             <li class="aui-list-item aui-list-item-middle"  @click="openzhifu1()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">已支付</button>
                    </div>
                </div>
            </li>
              <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">未支付</button>
                    </div>
                </div>
            </li>
           
        </ul>
    </div>
   </div>
   <div  v-if="myindex==2">
   
   </div>
   <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle"  @click="openzhifu1()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">已支付</button>
                    </div>
                </div>
            </li>
              <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">未支付</button>
                    </div>
                </div>
            </li>
             <li class="aui-list-item aui-list-item-middle"  @click="openzhifu1()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">已支付</button>
                    </div>
                </div>
            </li>
              <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">林洪大夫</div>
                             <div class="aui-list-item-right" style="color:blue">2018-12-31号下午三点的号</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:11px">
                           排号 120
                        </div>
                        <button class="l1">未支付</button>
                    </div>
                </div>
            </li>
           
        </ul>
    </div>
    </div>

</template>

<script>
    export default {
        name: 'geqian',
        data() {
            return {
               myindex:0,
            }
        },
        methods: {
          //获取用户信息函数
          selectmenu:function(index){
            this.myindex=index
          },
           openzhifu:function(){
            this.$router.push({path:'/zhifu'})
           },
            openzhifu1:function(){
            this.$router.push({path:'/erweima'})
           }

        },
        activated() {
          
        },
         created() {
   
   
  },
        components: {
             
              }
    }
</script>

<style >
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
.l1{
    color:#27B5B1;
    border:1px solid #27B5B1;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:60px;
    margin-left:10px
}
</style>

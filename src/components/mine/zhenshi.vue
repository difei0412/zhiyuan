<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'门诊患者跟踪'"></myHeader>
    <div class="aui-tab" id="tab">
      <div class="aui-tab-item aui-active" v-if="myindex==0" @click="selectmenu(0)">门诊患者在线</div>
      <div class="aui-tab-item " v-if="myindex!=0" @click="selectmenu(0)">门诊患者在线</div> 
      <div class="aui-tab-item aui-active" v-if="myindex==1" @click="selectmenu(1)">患者打卡</div>
      <div class="aui-tab-item " v-if="myindex!=1" @click="selectmenu(1)">患者打卡</div> 
    </div>
    <div  v-if="myindex==0">
      <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">

          <li class="aui-list-item aui-list-item-middle"  @click="openzhifu2()" v-for="item in userData" v-if="item.status==0&&item.info==1">
           <div class="aui-media-list-item-inner">
            <div class="aui-list-item-media" style="width: 3rem;">
              <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
            </div>
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-text" style="margin-left:11px">
                <div class="aui-list-item-title aui-font-size-14">患者：{{item.realname}}</div>
              </div>
              <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                预约：2018-06-19 17：00 - 17：30 线上诊疗
              </div>
              <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                诊疗时间：30分钟
              </div>
              <div class="aui-list-item-text" style="margin-left:11px">
                <div class="order-status">查看详情</div>
              </div>
            </div>
          </div>
        </li>




      </ul>
    </div>
  </div>
  <div  v-if="myindex==1">
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-media-list">

       <li class="aui-list-item aui-list-item-middle"  @click="openzhifu()">
         <div class="aui-media-list-item-inner">
          <div class="aui-list-item-media" style="width: 3rem;">
            <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
          </div>
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div class="aui-list-item-text" style="margin-left:11px">
              <div class="aui-list-item-title aui-font-size-14">患者：林洪生</div>
            </div>
            <div class="aui-list-item-text yuding-time" style="margin-left:11px">
              病房号：90000001
            </div>
            <div class="aui-list-item-text yuding-time" style="margin-left:11px">
              住院时间：2018-05-10 下午12:30
            </div>
            <div class="aui-list-item-text" style="margin-left:11px">
              <div class="order-status">打卡记录</div>
            </div>
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
            <div class="aui-list-item-title aui-font-size-14">患者：林洪生</div>
          </div>
          <div class="aui-list-item-text yuding-time" style="margin-left:11px">
            病房号：90000001
          </div>
          <div class="aui-list-item-text yuding-time" style="margin-left:11px">
            住院时间：2018-05-10 下午12:30
          </div>
          <div class="aui-list-item-text" style="margin-left:11px">
            <div class="order-status">打卡记录</div>
          </div>
        </div>
      </div>
    </li>

  </ul>
</div>
</div>
</div>

</template>

<script>
export default {
  name: 'geqian',
  data() {
    return {
     myindex:0,
     userData:[],
   }
 },
 methods: {
          //获取用户信息函数
          selectmenu:function(index){

            this.myindex=index

          },
          openzhifu:function(){
            this.$router.pushRoute({path:'/zhifu'})
          },
          openzhifu2:function(){
            this.$router.pushRoute({path:'/zhifu1'})
          },
           // 首次加载获取用户信息
           getMy_user(){
            var that = this
            var url = 'my_user'
            var method = 'GET';
            that.ajax({url,method,success:function(data){
              that.userData = data
            }})

          },

        },
        activated() {
          this.getMy_user()
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
      width:50px;
      margin-left:10px
    }
    .order-status {
      width:100%;
      text-align: right;
      color:rgb(255, 152, 0);
      font-size:14px;
    }
    .aui-list-item-inner.aui-list-item-arrow {
      padding-right: 0rem;
      margin-right: 0rem;
    }
    .yuding-time {
      font-size:12px !important;
      color:#666;
      margin:0.15rem 0;
    }
    </style>

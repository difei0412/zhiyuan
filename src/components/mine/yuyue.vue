<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'挂号信息'"></myHeader>
        <div class="price-total">
          <span v-text="'费用合计：￥'+total_price"></span>
        </div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top:4.5rem;" ref="myscroller">
        <ul class="aui-list aui-media-list">
           
            <li class="aui-list-item aui-list-item-middle" v-if="tieziArr" v-for="item in tieziArr">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img :src="item.patientid.Tx?item.patientid.Tx:'static/image/1.jpg'" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14" v-text="'患者：'+(item.patientid.realname?item.patientid.realname:item.username)"></div>
                             <div class="aui-list-item-right" style="color:#34DBDA" v-text="'付款：￥'+item.price"></div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px" v-text="'预约：'+(item.startdate+' - '+item.enddate)+(' '+item.serviceid.servicename)">
                            预约：2018-06-19 17：00 - 17：30 线上诊疗
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="order-status" v-html="item.status"></div>
                        </div>
                    </div>
                </div>
            </li>
           
        </ul>
        </scroller>
    </div>
  
</template>

<script>
    import $ from '../public/jquery'
    import Vue from 'vue'
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)
    export default {
        name: 'geqian',
        data() {
            return {
               tieziArr: [],
               currentPage: 1,
               pageSize:4,
               isLoadFinish:false, //是否加载完全部数据   
               total_num:0,
               total_price:0
            }
        },
        methods: {
          // 查询数据
          showList() {
              var that = this;
              var start = (that.currentPage-1)*that.pageSize;
              var filter = {
                "order": "createdAt DESC",
                "where": {
                  "info": '0',
                  "status": {'inq': ["1","2"]},
                  "expertid": window.localStorage.getItem('userId')
                },
                "skip":start,
                "limit":that.pageSize,
                "include":["patientidPointer","serviceidPointer"],
                "includefilter":{"my_user":{"fields":['id','username','realname','Tx']},"service":{"fields":['id','servicename']}}
              };
              that.ajax({
                url: "appointment?filter="+encodeURIComponent(JSON.stringify(filter)),
                method: "get",
                success: function(data) {
                  if(data.length<that.pageSize){
                    if(data.length>0){
                      for(var i=0;i<data.length;i++){
                        if(data[i].status=='1'){
                          data[i].status = '待完成';
                        } else {
                          data[i].status = '<span style="color:green;">完成</span>';
                        }
                        that.tieziArr.push(data[i]);
                      }
                    }
                    that.isLoadFinish = true;
                  } else {
                    for(var i=0;i<data.length;i++){
                      if(data[i].status=='1'){
                        data[i].status = '待完成';
                      } else {
                        data[i].status = '<span style="color:green;">完成</span>';
                      }
                      that.tieziArr.push(data[i]);
                    }
                  }
                }
              });
           },
           // 总记录数
           totalnum() {
              var that = this;
              var filter = {
                "where": {
                  "info": '0',
                  "status": {'inq': ["1","2"]},
                  "expertid": window.localStorage.getItem('userId')
                }
              };
              that.ajax({
                url: "appointment/count?filter="+encodeURIComponent(JSON.stringify(filter)),
                method: "get",
                success: function(data) {
                  that.total_num = data.count;
                }
              });
           },
           // 总价格
           totalPrice() {
              var that = this;
              var filter = {
                "where": {
                  "info": '0',
                  "status": {'inq': ["1","2"]},
                  "expertid": window.localStorage.getItem('userId')
                },
                "limit": that.total_num
              };
              that.ajax({
                url: "appointment?filter="+encodeURIComponent(JSON.stringify(filter)),
                method: "get",
                success: function(data) {
                  that.total_price = 0;
                  for(var i=0;i<data.length;i++){
                    that.total_price += (data[i].price?parseFloat(data[i].price):0);
                  }
                }
              });
           },
           // 上拉加载更多
           infinite(done) {
             var that = this;
             setTimeout(function(){
                  if(!that.isLoadFinish){
                    that.currentPage++;
                    that.showList();
                  }
                  if(that.isLoadFinish){ // 加载完毕
                    done(true);
                    return;
                  } else {
                    done();
                  }
              }, 500)
            },
            // 下拉刷新
            refresh(done) {
                var that = this;
                setTimeout(function(){
                    that.currentPage = 1;
                    that.tieziArr = [];
                    that.isLoadFinish = false;
                    that.showList();
                    that.totalnum();
                    that.totalPrice();
                    done();
                }, 500);
            },
          },
          mounted() {
            var that = this;
            this.totalnum();
            this.showList();
            this.totalPrice();
          },
          deactivated(){
            this.$destroy(true);
          },

    }
</script>

<style scoped>
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
      font-size:12px;
      color:#666;
      margin:0.3rem 0;
    }
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

.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
.l1{
    color:#34DBDA;
    border:1px solid #34DBDA;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:60px;
    margin-left:10px
}
.price-total {
  position: relative;
  left:0;
  font-size:14px;
  color:#f60;
  height:2rem;
  line-height: 2rem;
  text-align: right;
  padding:0 0.7rem;
  border-bottom: 1px solid #eee;
  z-index: 1000;
  background: #fff;
}
.aui-list .aui-list-item-right, .aui-list-item-title-row em {
  top:0;
}
</style>
<style>
  ._v-container{
    z-index: 0;
    padding-bottom: 2rem;
  }
  ._v-container ._v-content .loading-layer {
    height:100px !important;
  }
</style>

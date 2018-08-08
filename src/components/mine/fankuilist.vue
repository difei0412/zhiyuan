<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'反馈清单'"></myHeader>
    <scroller :on-refresh="refresh" :on-infinite="infinite1" style="padding-top:2.5rem;height:auto !important" ref="myscroller"> 
      <ul class="aui-list aui-media-list">

        <li class="aui-list-item aui-list-item-middle"  @click="openzhifu(item.id)" v-for="item in tieziArr">
          <div class="aui-media-list-item-inner">
            <div class="aui-list-item-media" style="width: 3rem;">
              <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
            </div>
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-text" style="margin-left:11px">
                <div class="aui-list-item-title aui-font-size-14">患者：{{item.brname}}</div>
              </div>
              <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                就诊：{{dateFormat(item.createdAt)}} 线上诊疗
              </div>
              <div class="aui-list-item-text yuding-time"  style="margin-left:11px">
                反馈内容：{{item.fk}}
              </div>
              <div class="aui-list-item-text" style="margin-left:11px">
                <div class="order-status">查看详情</div>
              </div>
            </div>
          </div>
        </li>

      </ul>
    </scroller>
  </div>

</template>

<script>
import Calendar from '../vue-calendar-component/index';
export default {
  name: 'geqian',
  data() {
    return {
      tieziArr: [],
      // dakatieziArr: [],
      currentPage: 1,
      pageSize:8,
     isLoadFinish:false, //是否加载完全部数据
     arr2: ['2018-7-3'],
     arr: [
     {
      date: '2018-07-04',
      className: 'mark1'
    },
    {
      date: '2018/7/5',
      className: 'mark1'
    },
    {
      date: '2018/7/6',
      className: 'mark2'
    }
    ]     
  }
},
methods: {
  openzhifu:function(id){
    this.$router.push({path:'/fankuidetail/'+id})
  },
  // 查询数据
  getMy_user() {

    var that = this;
    that.tieziArr = [];
    // console.log(that.myindex)
    var start = (that.currentPage-1)*that.pageSize;
    console.log('ok');
    var filter = {
      "fields": {"id":true,"brname":true,"fk":true,'brid':true,'createdAt':true},
      "where":{
        "did":window.localStorage.getItem("userId")
      },
      "order": "createdAt DESC",
      "skip":start,
      "limit":that.pageSize,
      "include":"bridPointer",
      "includefilter":{"my_user":{"fields":['id','Tx',]}}
    };
    that.ajax({
      url: "fankui?filter="+encodeURIComponent(JSON.stringify(filter)),
      method: "get",
      success: function(data) {
       console.log(data)
       if (data) {
        if(data.length<that.pageSize){
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              that.tieziArr.push(data[i]);
            }
          }
          that.isLoadFinish = true;
        } else {
          for(var i=0;i<data.length;i++){
            that.tieziArr.push(data[i]);
          }
        }

        sessionStorage.removeItem("hz_list");
        var tempDic = {};
        tempDic['data'] = that.tieziArr;
        tempDic['page'] = that.currentPage;
        sessionStorage.setItem("hz_list", JSON.stringify(tempDic));
      }
    }
  });


  },


  // 上拉加载更多
  infinite1(done) {
    console.log('shanglajiazai')
            // done(true);return;
            var that = this;
            setTimeout(function(){
              if(!that.isLoadFinish){
                that.currentPage++;
                that.getMy_user();
              }
              if(that.isLoadFinish){
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
                // that.dakatieziArr = [];
                that.isLoadFinish = false;
                that.getMy_user();
                done();
              }, 500);
            },
            //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
            dateFormat:function(time) {
              var date=new Date(time);
              var year=date.getFullYear();
              /* 在日期格式中，月份是从0开始的，因此要加0
               * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
               * */
               var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
               var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
               var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
               var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
               var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
              // 拼接
              return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            },

          },
          mounted(){
            this.getMy_user()
          },
          activated() {

          },

          created() {


          },
          components: {
            Calendar
          }
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
          margin:0.15rem 0;
          white-space: nowrap; 
          text-overflow:ellipsis; 
          overflow:hidden; 
          -webkit-box-orient: vertical;
          display: block;
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
        color:#27B5B1;
        border:1px solid #27B5B1;
        border-radius:8px;
        font-size:12px;
        background:#fff;
        width:60px;
        margin-left:10px
      }
      .aui-list .aui-list-item-right, .aui-list-item-title-row em {
        top:0;
      }
      </style>

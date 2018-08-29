<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'住院日志'"></myHeader>

    <!--         <Calendar ref="Calendar" style="margin-top:1rem;"></Calendar> -->
    <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top:2.5rem;" ref="myscroller">
    <ul class="aui-list aui-media-list">

      <li class="aui-list-item aui-list-item-middle"  @click="openzhifu(item.id)" v-for="item in zyarr">
        <div class="aui-media-list-item-inner">
          <div class="aui-list-item-media" style="width: 3rem;">
            <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
          </div>
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div class="aui-list-item-text" style="margin-left:11px">
              <div class="aui-list-item-title aui-font-size-14">患者：{{item.brname}}</div>
            </div>
            <div class="aui-list-item-text yuding-time" style="margin-left:11px">
              病房号：{{item.InpatientWard}}
            </div>
            <div class="aui-list-item-text yuding-time" style="margin-left:11px">
              住院时间：{{dateFormat(item.createdAt)}}
            </div>
            <div class="aui-list-item-text" style="margin-left:11px">
              <div class="order-status">编写住院日志</div>
            </div>
          </div>
        </div>
      </li>
      <li class="aui-list-item aui-list-item-middle" style="border-bottom:0px solid #eee" v-show="zyarr.length == 0">
        <img src="static/image/no.png" style="width:80%;margin:0.5rem auto">
      </li>
    </ul>
    </scroller>
  </div>
  
</template>

<script>
export default {
  name: 'geqian',
  data() {
    return {
      zyarr:[],
      isLoadFinish:false, //是否加载完全部数据
      currentPage: 1,
      pageSize:4,
      vuegConfig: {
        disable: false,
        forwardAnim: 'fadeInRight',
        duration: '.3',
        backAnim: 'fadeInLeft'
      }    
    }
  },
  methods: {
    openzhifu:function(id){
     this.$router.push({path:'/rizhiedit/'+id})
   },
    // 查询数据
    showList() {
        var that = this;
        var start = (that.currentPage-1)*that.pageSize;
        var filter = {
          "fields":{'id':true,'brname':true,'createdAt':true,'InpatientWard':true},
          "order": "createdAt DESC",
          "where":{
            "did":window.localStorage.getItem("userId"),
            "info":"2"
          },
          "skip":start,
          "limit":that.pageSize
        };
        that.ajax({
          url: "genzong?filter="+encodeURIComponent(JSON.stringify(filter)),
          method: "get",
          success: function(data) {
            if(data.length<that.pageSize){
              if(data.length>0){
                for(var i=0;i<data.length;i++){
                  that.zyarr.push(data[i]);
                }
              }
              that.isLoadFinish = true;
            } else {
              for(var i=0;i<data.length;i++){
                that.zyarr.push(data[i]);
              }
            }
          }
        });
     },
   get_zhuyuan(){
    var that = this;
    var filter = {
      "fields":{'id':true,'brname':true,'createdAt':true,'InpatientWard':true},
      "order": "createdAt DESC",
      "where":{
        "did":window.localStorage.getItem("userId"),
        "info":"2"
      }
    }
    var url = "genzong?filter="+encodeURIComponent(JSON.stringify(filter));
    that.ajax({url,method:'get',success:function(data){
      console.log(data)
      that.zyarr = data
    }})
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
            that.zyarr = [];
            that.isLoadFinish = false;
            that.showList();
            done();
        }, 500);
    },


},
activated() {
  this.showList()
},
created() {


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
  margin:0.15rem 0;
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
.wh_container {
  border-top:1px solid #ccc;
  border-bottom:1px solid #ccc;
}
</style>

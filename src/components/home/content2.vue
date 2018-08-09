<template style="background: #ffffff;">
  <div>
    <div class="aui-content luntan-box">
        <div class="aui-col-xs-12 luntan-active" @click="openRouter">
            <i class="aui-iconfont aui-icon-display"></i>
            <div class="luntan-text">患者交流论坛</div>
            <div class="luntan-jiantou">
              <img class="right" src="static/image/in@3x.png">
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
     <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-media-list">
              <li class="aui-list-header">
                 最新帖子
                 <div>
                  <i class="aui-iconfont aui-icon-refresh" style="margin-right:5px"></i>
                  <span @click="nextPageData">换一批</span>
              </div>
              </li>
              
              <div v-if="tieziArr" v-for="item in tieziArr" @click="opentiezi(item.id)">
                <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-inner">
                           
                            <div class="aui-list-item-text aui-ellipsis-2" style="color:#000" v-text="item.ttopic">
                              
                            </div>
                            <div class="aui-list-item-text aui-ellipsis-2 doctor-answer" v-text="item.tcontents+'...'">
                              
                            </div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item doctor-box">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media">
                            <img :src="item.tuid.tx?item.tuid.tx:'static/image/user.png'" class="aui-img-round">
                        </div>
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-text doctor">
                                <div class="aui-list-item-title" v-text="item.tuid.name+' '+item.tuid.holder"> </div>
                                <div class="aui-list-item-right"><div class="aui-label">优质问答</div></div>
                            </div>
                        </div>
                    </div>
                </li>
              </div>
              
              <li class="aui-list-item"></li>
            
          </ul>

      </div>
  </div>
</template>

<script>
  import $ from '../public/jquery'
  import Vue from 'vue'

  export default {
    name: 'content2',
    data () {
      return {
        userId: "",
        mylist : [],
        myIndex : -1,
        supportDic: {},
        sessionName: 'scrollForVideo',
        tieziArr: [],
        currentPage: 1,
        pageSize:4,
        isLoadFinish:false, //是否加载完全部数据
        toast: null
      }
    },
    methods: {
      openRouter() {
        if(window.localStorage.getItem('userId')){
          this.$router.push({name:'luntan'})
        }else{
          this.$router.push({name:'login'})
        }
      },
      openRouter1() {
        this.$router.push({name:'imlist'})
      },
      opentiezi(id){
         this.$router.push({path:'/tiezi/'+id})
      },
      openwenda(){
      this.$router.push({name:'imlist'})
      },
       openluntan(){
      this.$router.push({name:'luntan'})
      },
      toVideoDetail(id) {
        this.$router.push({name:'videoDetaile', params:{id:id}})
      },
      openChild:function(index, isAnamition) {
        var that = this

        if (that.myIndex != index) {
          var temp = that.myIndex;
          if (temp == -1) {
            temp = 0;
          }
          that.addScrollPlace(that.sessionName, that.mylist[temp].id);
        }

        // 标题滚动动画
        var time = 0
        if (isAnamition) {
          time = 300
        }
        that.scrollTitle(index, time);

        if (that.mylist[index].list == undefined) {
          that.getList(index, true);
        } else if (that.myIndex == index) {
          that.getList(index, true);
          that.scrollToTop(that.sessionName, that.mylist[index].id);
        }
        that.myIndex = index;
        that.scrollToPostition(that.sessionName, that.mylist[that.myIndex].id);
      },
      scrollToTop(name, key) {
        // 滚动到头部
        var tempSession = sessionStorage.getItem(name);
        if (tempSession) {
          var tempDic = JSON.parse(tempSession);
          if (tempDic && tempDic[key]) {
            tempDic[key] = 0;
            sessionStorage.setItem(name, JSON.stringify(tempDic));
          }
        }
      },
      scrollToPostition(name, key) {
        // 滚动到指定位置
        Vue.nextTick(function() {
          var tempSession = sessionStorage.getItem(name);
          if (tempSession) {
            var tempDic = JSON.parse(tempSession);
            if (tempDic[key] || tempDic[key] == 0) {
              $(document).scrollTop(tempDic[key]);
            }
          }
        })
      },
      addScrollPlace(name, key) {
        // 缓存滚动位置
        Vue.nextTick(function() {
          var tempSession = sessionStorage.getItem(name);
          if (tempSession) {
            var tempDic = JSON.parse(tempSession);
            tempDic[key] = $(document).scrollTop();
            sessionStorage.setItem(name, JSON.stringify(tempDic));
          }
        })
      },
      addSession(name) {
        // 添加缓存
        var dic = {};
        sessionStorage.setItem(name, JSON.stringify(dic));
      },
      getList(index, isRef) {
        var that = this;
        var id = that.mylist[index].id;

        var filter = '';
        if (id == "-1") {
          filter += 'filter[where][Status]=0'
          filter += '&filter[where][to]=index'
          filter += '&filter[where][info]=1'
          filter += '&filter[order]=id desc'
          filter += '&filter[skip]=0'
          filter += '&filter[limit]=5000'
        } else {
          filter += 'filter[where][Status]=0'
          filter += '&filter[where][Info_id]=' + id
          filter += '&filter[skip]=0'
          filter += '&filter[limit]=5000'
        }

        // 列表数据
        var url = "news?" + filter
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            var tDic = that.mylist[index];
            if (tDic.list == undefined) {
              tDic.list = [];
              that.mylist.splice(index, 1, tDic);
            }

            var templist = that.mylist[index].list;
            if (isRef) {
              templist = [];
            }

            for (var i = 0; i < data.length; i ++) {
              templist.push(data[i]);
            }

            var dic = that.mylist[index];
            dic.list = templist;
            that.mylist.splice(index, 1, dic);
          }
        });
      },
      scrollTitle(index, time) {
        this.$nextTick(() => {

        })
      },
      initdata:function() {

      },
      isSupport() {

      },
      supportClick(id, index) {

      },
      addSupportNum(id, index) {
        var that = this;

        var url = "news/" + id;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            var tempNum = data.appreciate;
            if (!tempNum || tempNum == '') {
              tempNum = "0";
            }
            var num = parseInt(tempNum)
            num ++;

            var method = "POST";
            var params = {
              "data" : {
                "_method" : "PUT",
                "appreciate" : num.toString()
              }
            }
            that.ajax({url, method, params,
              success:function(data) {
                that.mylist[that.myIndex].list[index].appreciate = data.appreciate;
                that.mylist = Object.assign([], that.mylist);
              }
            });
          }
        });
      },
      childMethod() {
        var temp = this.myIndex;
        if (temp == -1) {
          temp = 0;
        }
        if (this.mylist.length > 0) {
          this.addScrollPlace(this.sessionName, this.mylist[temp].id);
        }
      },
      // 查询数据
      showList() {
          var that = this;
          var start = (that.currentPage-1)*that.pageSize;
          var filter = {
            "fields": {"id":true,"ttopic":true,"tcontents":true,"tuid":true},
            "order": "createdAt DESC",
            "where": {
              "tflag":0,
              "if_delete": "1",
              "tType":{"inq":[0,1,2]}
            },
            "skip":start,
            "limit":that.pageSize,
            "include":"tuidPointer",
            "includefilter":{"expert":{"fields":['id','name','holder','tx']}}
          };
          that.ajax({
            url: "tiezi?filter="+encodeURIComponent(JSON.stringify(filter)),
            method: "get",
            success: function(data) {
              if(data.length<1 && (that.currentPage == 1)){
                return;
              } else if(data.length<1) {
                that.currentPage=1;
                that.showList();
                return;
              }
              that.tieziArr=[];
              if(data.length<that.pageSize){
                if(data.length>0){
                  for(var i=0;i<data.length;i++){
                    data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                    data[i]['tcontents'] = data[i]['tcontents'].substr(0,45);
                    that.tieziArr.push(data[i]);
                  }
                }
                that.isLoadFinish = true;
              } else {
                for(var i=0;i<data.length;i++){
                  data[i]['tcontents'] = that.delHtmlTag(data[i]['tcontents']);
                  data[i]['tcontents'] = data[i]['tcontents'].substr(0,45);
                  that.tieziArr.push(data[i]);
                }
              }
              // sessionStorage.removeItem("all_tiezi_data");
              // var tempDic = {};
              // tempDic['data'] = that.tieziArr;
              // tempDic['page'] = that.currentPage;
              // sessionStorage.setItem("all_tiezi_data", JSON.stringify(tempDic));
            }
          });
       },
       // 字符串去除HTML标签
       delHtmlTag(str){
        return str.replace(/<[^>]+>/g,"");
       },
       nextPageData() {
        var that = this;
         this.currentPage++;
         that.toast.loading({
             title:"加载中",
             duration:2000
         },function(ret){
             setTimeout(function(){
              that.showList();
              that.toast.hide();
           }, 500);
         });
       }
    },
    mounted(){
      this.toast = new auiToast();
      var that = this;
      this.showList();
      // if(sessionStorage.getItem("all_tiezi_data")!=null){
      //   var tmp = JSON.parse(sessionStorage.getItem("all_tiezi_data"));
      //   this.tieziArr = tmp['data'];
      //   this.currentPage = tmp['page'];
      // }else{
      //   this.showList();
      // }
    },
    activated() {
      if (this.myIndex != -1) {
        this.scrollTitle(this.myIndex, 0);
        this.scrollToPostition(this.sessionName, this.mylist[this.myIndex].id);
      }

      this.userId = window.localStorage.getItem('userId');
      this.isSupport();
    },
    created:function() {
      this.addSession(this.sessionName);
      this.initdata()
    },
  }
</script>

<style scoped>
  .aui-grid {
    margin-top:2.25rem;
  }
  .img-container {
    width: 100%;
    height: 0px;
    padding-bottom: calc(100% * 695 / 1240.0);
    overflow:hidden;
    margin: 0;
    position:relative;
  }
  .img-container img {
    position:absolute;
    width: 100%;
    height: 100%;
  }
  .shawdow {
    background: -moz-linear-gradient(top, rgba(76,76,76,1) 0%, rgba(19,19,19,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(76,76,76,1) 0%,rgba(19,19,19,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(76,76,76,1) 0%,rgba(19,19,19,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#00131313',GradientType=0 ); /* IE6-9 */
  }
  .headTitle {
    position: fixed;
    width: 100%;
    height: 2rem;
    top: 2.25rem;
    left: 0;
    z-index: 10;
    overflow: hidden;
    background-color: white;
    box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    border-bottom: 1px solid #eee;
  }
  .head {
    float: left;
    width: 100%;
    height: calc(2rem + 10px);
    line-height: 2rem;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .head::-webkit-scrollbar {
    display: none;
  }
  .head li {
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
    padding: 0 10px;
    position: relative;
  }
  .carve {
    position: absolute;
    width: 100%;
    top: 0.5rem;
    left: 0;
    height: 1rem;
    line-height: 1rem;
    box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    border-right: 1px solid #eee;
  }
  .head li span {
    display: inline-block;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.8rem;
  }
  .head li:nth-last-child(1) :nth-child(1) {
    border-right: none;
  }
  .nav_active {
    color: #f22a2a;
    border-bottom: 3px solid #f22a2a;
  }
  .aui-active {
    border-bottom: 2px solid #f22a2a;
    color: #f22a2a;
  }
  .newstitle {
    position: absolute;
    margin-top: 0.75rem;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100%;
  }
  .newstitle span {
    font-size: 0.8rem;
    max-height: 2rem;
    line-height: 1rem;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .zan {
    height: 15px;
    display: block;
    margin-right: 5px;
  }
  .zan1 {
    height: 15px;
    display: block;
    margin-right: 5px;
    margin-left: 10px;
  }
  .my-middle {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    display: box;
    box-orient: horizontal;
    box-align: center;
  }
  .H-position-center-all {
    position: absolute;
    top: calc(50% + 0.75rem);
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .aui-list-item-media {
  width:2rem !important;
  height:2rem !important;
  border-radius: 1rem;
  border: 1px solid #eee;
  overflow: hidden;
}
.aui-list-item-media img {
  min-height: 2rem;
  min-width: 2rem;
}
.doctor {
  height:2.2rem;
  line-height: 2.2rem;
  padding-left:0.7rem;
}
.doctor .aui-list-item-title {
  color:#666;
}
.doctor-box {
  padding-top:0rem;
}
.doctor-answer {
  margin-top:0.5rem;
}
.aui-label {
  top:-0.1rem;
}
.luntan-box{
  height:5.25rem;
  width:100%;
  padding-top:2.25rem;
}
.aui-icon-display{
  font-size:25px;
  float:left;
  margin:0.6rem 0.5rem 0 1rem;
}
.luntan-text{
  float:left;
  margin:1rem 0 0 0;
  font-size:14px;
  color:#28B8A1;
}
.luntan-jiantou{
  float:right;
  width:0.5rem;
  height:0.5rem;
  margin:1.1rem 1rem 0 0;
}
.luntan-active{
  height:3rem;
}
.aui-list-item-inner{
    margin-right:0;
  }
  .aui-list-item-title {
    font-size: 0.6rem;
  }
</style>

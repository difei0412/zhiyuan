<template>
    <div style="background-color: white; min-height: 100%;" v-cloak>
        <myHeader :title="'帖子详情'"></myHeader>
      <div v-show="isLoadFinish" class="content-box">
       <div class="aui-content aui-content-padded">
         <h3 class="aui-list-header" v-text="showData.ttopic"></h3>
            <div class="aui-content aui-content-padded content-box-2">
                <div v-html="showData.tcontents"></div>
            </div>
          <div style="margin-top:0.5rem;">
              <img :src="showData.tx" class="aui-list-img-sm" style="width:2.5rem;height:2.5rem;float:left;border-radius:1.25rem;">
              <div style="color:#34DBDA;height:2.5rem;line-height:2.5rem;float:left; margin-left:0.5rem" v-text="showData.name"></div>
              <div style="clear:both"></div>
          </div>
      </div>

   <div class="aui-searchbar" id="search">
      <div class="aui-searchbar-input aui-border-radius">
          <i class="aui-iconfont aui-icon-pencil"></i>
          <form action="javascript:search();">
              <input type="search" placeholder="请输入您的评论" id="search-input" style="" v-model="content">
          </form>

      </div>
      <div class="aui-btn aui-btn-warning" @click="saveData">提交</div>
      <!-- <i class="aui-iconfont aui-icon-comment"><div class="aui-badge">3</div></i> -->
  </div>

  <div class="aui-content aui-margin-b-15 pinglun-list">
    <ul class="aui-list aui-media-list">
        <li class="aui-list-header" style="background:#eee">
            精彩评论 ({{plnum}})
        </li>
        <li class="aui-list-item aui-list-item-arrow" v-if="pldata.length>0" v-for="item in pldata">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner">
                    <div class="aui-info aui-padded-l-10 aui-padded-r-10">
                        <div class="aui-info-item">
                            <img :src="item.face?item.face:'static/image/user.png'" class="aui-img-round" />
                            <div class="user-nick" v-text="item.username?item.username:''"></div>
                        </div>
                        <div class="aui-info-item"> <span class="user-zan-num" v-text="dateFormat(item.createdAt)"></span></div>
                    </div>
                    <div class="aui-list-item-text aui-ellipsis-2" v-text="item.rcontent">
                        
                    </div>
                </div>
            </div>
        </li>
        <li class="aui-list-item aui-list-item-arrow" v-if="pldata.length<=0">
          <div class="aui-media-list-item-inner">
            <div class="aui-list-item-inner no-pinglun">暂无评论</div>
          </div>
        </li>
        
   </ul>
  </div>  
  
    <div style="height:2.5rem"></div>     
  </div>

    </div>
  
</template>

<script>
    import $ from '../public/jquery'
    export default {
        name: 'geqian',
        data() {
            return {
               id: '',
               showData: {},
               plnum:0,
               pldata: [],
               userinfo: {},
               content: '',
               toast: null,
               isLoadFinish:false,
               // 敏感词变量定义
              words:"",
              tblRoot:{},
              //敏感词文件
              file:"static/keyword/sensitiveWords.txt",
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
                  if(data.tType==2){
                    var filter = {
                      fields:{"id":true,"Tx":true,"realname":true,"linkmethod":true},
                      where:{
                        id:data.brid
                      }
                    };
                    that.ajax({
                      url:'my_user?filter='+encodeURIComponent(JSON.stringify(filter)),
                      method:"get",
                      success:function(data2){
                        if(data2.length>0){
                          that.showData.tx = data2[0].Tx?data2[0].Tx:'static/image/user.png';
                          that.showData.name = '患者：';
                          that.showData.name += data2[0].realname?data2[0].realname:data2[0].linkmethod;
                        }
                      }
                    })
                  }else if(data.tType==3){
                    that.showData.tx = 'static/image/user.png';
                    that.showData.name = '知源医院';
                  }else{
                    var filter = {
                      fields:{"id":true,"tx":true,"name":true,"holder":true,"mobile":true},
                      where:{
                        id:data.tuid
                      }
                    };
                    that.ajax({
                      url:'expert?filter='+encodeURIComponent(JSON.stringify(filter)),
                      method:"get",
                      success:function(data2){
                        if(data2.length>0){
                          that.showData.tx = data2[0]['tx']?data2[0]['tx']:'static/image/user.png';
                          that.showData.name = data2[0]['holder']?(data2[0]['holder']+'：'):"";
                          that.showData.name += data2[0]['name']?data2[0]['name']:data2[0]['mobile'];
                        }
                      }
                    })
                  }
                }
              }
            });
          },
          // 评论数据显示
          pinglunData(id) {
            var that=this;
            var filter = {
              "order":"createdAt DESC",
              "where": {
                "rtid":id
              },
              "limit":that.plnum
            };
            that.ajax({
              url: 'gentie?filter='+encodeURIComponent(JSON.stringify(filter)),
              method:'get',
              success: function(data) {
                that.pldata = data;
              }
            });
          },
          pinglunnum(id){
            var that=this;
            var filter = {
              "where": {
                "rtid":id
              }
            };
            that.ajax({
              url: 'gentie/count?filter='+encodeURIComponent(JSON.stringify(filter)),
              method:'get',
              success: function(data) {
                that.plnum = data['count'];
              }
            });
          },
          //去左右空格;
          trim(s){
            return s.replace(/(^\s*)|(\s*$)/g, "");
          },
          saveData() { // 跟帖回复保存
            var that = this;
            var id = window.localStorage.getItem('userId');
            if(!id){
              this.$router.push({path:'/login'});
              return;
            }
            if(that.trim(that.content) == ''){
              that.toast.fail({
                  title:"请输入评论内容",
                  duration:2000
              });
              return;
            }
            this.handle(this.content);
          },
          // 改变主贴是否恢复isreply状态改变
          changeIsreply(){
            var that = this;
            var params = {
              "data":{
                'isreply':'1',
                '_method':'put'
              }
            }
            that.ajax({
              url:'tiezi/'+that.showData.id,
              method:'post',
              params,
              success(data){

              }
            });
          },
          // 当前登录用户信息
          userFind() {
            var that = this;
            var id = window.localStorage.getItem('userId');
            var filter = {
              fields:{"id":true,"tx":true,"name":true},
              where:{
                id:id
              },
              limit:1
            };
            that.ajax({
              url: 'expert?filter='+encodeURIComponent(JSON.stringify(filter)),
              method:'get',
              success: function(data) {
                if(data.length>0){
                  that.userinfo = data[0];
                }
              }
            });
          },
          // 时间格式转换,不传参获取当前时间日期
          dateFormat(date) {
            date = date||null;
            if(date == null){
              var dateObj = new Date();
            } else {
              var dateObj = new Date(date);
            }
            var year = dateObj.getFullYear();
            var month = dateObj.getMonth()+1;
            var day = dateObj.getDate();
            var hour = dateObj.getHours();
            var minute = dateObj.getMinutes();
            var second = dateObj.getSeconds();
            if(month<=9){
              month = "0" + month;
            }
            if(day<=9){
              day = "0" + day;
            }
            if(hour<=9){
              hour = "0" + hour;
            }
            if(minute<=9){
              minute = "0" + minute;
            }
            if(second<=9){
              second = "0" + second;
            }
            var newDay = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            return newDay;
          },
          // ------------------------- 敏感词检测  start---------------------------
          //载入敏感词组
          load (file,callback) {
             file=file||this.file;
             var objHttp;
             if (window.ActiveXObject) {
                 objHttp = new ActiveXObject("Microsoft.XMLHTTP");
             }else {
                 objHttp = new XMLHttpRequest();
                 objHttp.overrideMimeType("text/xml");
             }

             objHttp.onreadystatechange = function () {
                 if (objHttp.readyState != 4)
                     return;
                 this.words = objHttp.responseText;
                 callback(objHttp.responseText);
             };

             objHttp.open("GET", file, true);
             objHttp.send(null);
          },
          //将关键字生成一颗树
          makeTree (callback) {
              var that = this;
              if(this.words==""){
                  this.load(this.file,function (words) {
                      var strKeys = words;
                      var arrKeys = strKeys.split("");
                      var tblCur = that.tblRoot = {};
                      var key;

                      for (var i = 0, n = arrKeys.length; i < n; i++) {
                          key = arrKeys[i];
                          //完成当前关键字
                          if (key == ';'){
                              tblCur.end = true;
                              tblCur = that.tblRoot;
                              continue;
                          }
                          //生成子节点
                          if (key in tblCur)
                              tblCur = tblCur[key];
                          else
                              tblCur = tblCur[key] = {};
                      }

                      //最后一个关键字没有分割符
                      tblCur.end = true;
                      callback(that.tblRoot);
                  });
              }else{
                  callback(that.tblRoot);
              }
          },
          //标记出内容中敏感词的位置
          searchWords (content,root) {
              var tblCur,p, v,i = 0,arrMatch = [];
              var n = content.length;
              while (i < n) {
                  tblCur = root;
                  p = i;
                  v = 0;

                  for (; ;) {
                      if (!(tblCur = tblCur[content.charAt(p++)])) {
                          i++;
                          break;
                      }
                      //找到匹配敏感字
                      if (tblCur.end)
                          v = p;
                  }
                  //最大匹配
                  if (v){
                      arrMatch.push(i - 1, v);
                      i = v;
                  }
              }
              return arrMatch;
          },
          //标记敏感字
           handle (strContent) {
               var that = this;
               var mid,arrMatch,strHTML,arrHTML = [],p = 0;
               this.makeTree(function (data) {
                   arrMatch = that.searchWords(strContent,data);
                   // for (var i = 0, n = arrMatch.length; i < n; i += 2) {
                   //     mid = arrMatch[i];
                   //     arrHTML.push(strContent.substring(p, mid),
                   //         "[",
                   //         strContent.substring(mid, p = arrMatch[i + 1]),
                   //         "]");
                   // }
                   arrHTML.push(strContent.substring(p));
                   strHTML = arrHTML.join("").replace(/\n/g, "<br>");
                   that.content = strHTML;
                   if(arrMatch.length>0){
                      that.toast.fail({
                            title:"内容禁止含有敏感词",
                            duration:2000
                      });
                   }else{
                      // 无敏感词，保存帖子
                      var params = {
                        "data":{
                          'rtid':that.showData.id,
                          'rsid':that.showData.tsid,
                          'rcontent':that.content,
                          'rtime':that.dateFormat(),
                          'ruid': that.userinfo.id,
                          'username': that.userinfo.name,
                          'face': that.userinfo.tx
                        }
                      }
                      that.toast.loading({
                           title:"加载中",
                           duration:2000
                       },function(ret){
                       });
                      setTimeout(function(){
                        that.ajax({
                          url:'gentie',
                          method:'post',
                          params,
                          success(data){
                            that.toast.hide();
                            if(JSON.stringify(data)!='{}') {
                              that.changeIsreply();
                              that.content = "";
                              that.plnum++;
                              that.pldata.unshift(data);
                              that.toast.success({
                                  title:"评论成功",
                                  duration:2000
                              });
                            }else{
                              that.toast.fail({
                                  title:"评论失败",
                                  duration:2000
                              });
                            }
                          }
                        });
                       }, 500);
                   }
               });
           },
           // ------------------------- 敏感词检测  end---------------------------
        },
         mounted () {
           var that = this;
           this.$nextTick(() => {
              setTimeout(function(){
                $(document).scrollTop(0);
                var id = that.$route.params.id;
                that.toast = new auiToast();
                that.findData(id);
                that.pinglunnum(id);
                that.pinglunData(id);
                that.userFind();
                //that.toast.hide();
                that.isLoadFinish = true;
              },0);
           })
         },
        deactivated(){
          this.$destroy(true);
        },
    }
</script>

<style scoped>
    [v-cloak] {
      display: none;
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
.mybiaoqian900{
    color:#34DBDA;
    border:1px solid #34DBDA;
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
  background:#34DBDA;
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
.aui-btn-warning {
  margin-right:0.5rem;
}
.no-pinglun {
  text-align: center;
  text-indent: 0rem;
  margin-top: 1rem;
}
.content-box {
  height:100%;
}
.content-box-2 {
  color:#666;
  font-size:0.7rem;
  line-height: 1.2rem;
}
</style>

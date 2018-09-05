<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'帖子编辑'"></myHeader>
        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-form-list">
              <li class="aui-list-item box-title">
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-input">
                          <input type="text" v-model="ttopic" placeholder="请您输入帖子标题">
                      </div>
                  </div>
              </li>
              <li class="aui-list-item box-title">
                 <div class="aui-list-item-inner">
                    <div class="aui-list-item-input">
                        <select style="color:#424242;font-size:0.65rem;" v-model="tsid">
                            <option value="0" disabled="true">请选择版块</option>
                            <option :value="item.id" v-if="bankuaiarr" v-for="item in bankuaiarr" v-text="item.sname"></option>
                        </select>
                    </div>
                </div>
              </li>
              <li class="aui-list-item">
                <div class="aui-list-item-inner textarea-box">
                    <div class="aui-list-item-input">
                        <!-- <textarea placeholder="请您输入帖子内容！" class="textareacls" ></textarea> -->
                        <vue-html5-editor :content="content" 
                          @change="updateData" style="width:100%"></vue-html5-editor>
                        <div style="height:1rem;"></div>
                    </div>
                </div>
              </li>
            </ul>
          </div>
            <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #34DBDA;bottom:0px;position:fixed;border:none;border-radius:0rem;"  @click="saveData">修改</button>
    </div>
  
</template>

<script>
    import $ from '../public/jquery';
    import Calendar from '../vue-calendar-component/index';
    export default {
        name: 'geqian',
        data() {
            return {
              ttopic: '',
               content: '请输入帖子内容',
               toast: null,
               tsid: '0',
               bankuaiarr: [],
               vuegConfig: {
                  disable: false,
                  forwardAnim: 'fadeInUp',
                  duration: '.3',
                  backAnim: 'fadeInUp'
              },
              // 敏感词变量定义
              words:"",
              tblRoot:{},
              //敏感词文件
              file:"static/keyword/sensitiveWords.txt",
            }
        },
        methods: {
          updateData(e = ''){  
            this.content = e;  
          },
          // 帖子数据
          findData(id){
            var that = this;
            that.ajax({
              url:'tiezi/'+id,
              method:"get",
              success: function(data){
                if(JSON.stringify(data)!='{}'){
                  that.ttopic = data.ttopic;
                  that.content = data.tcontents;
                  if(data.tsid){
                    that.tsid = data.tsid;
                  }else{
                    that.tsid = '0';
                  }
                }
              }
            });
          },
          saveData() {
            var that = this;
            if(this.ttopic==''){
              that.toast.fail({
                  title:"请输入帖子标题",
                  duration:2000
              });
              return;
            }
            if(this.tsid=='0'){
              that.toast.fail({
                  title:"请选择版块",
                  duration:2000
              });
              return;
            }
            if(this.content=='' || this.content=="请输入帖子内容"){
              that.toast.fail({
                  title:"请输入帖子内容",
                  duration:2000
              });
              return;
            }
            this.handle(this.content);
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
          // 查询板块
          bankuai_list() {
            var that = this;
            var filter = {
              "fields":{"id":true,"sname":true}
            };
            that.ajax({
              url:'bankuai?filter='+encodeURIComponent(JSON.stringify(filter)),
              method: 'get',
              success:function(data){
                that.bankuaiarr = data;
              }
            })
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
                   for (var i = 0, n = arrMatch.length; i < n; i += 2) {
                       mid = arrMatch[i];
                       arrHTML.push(strContent.substring(p, mid),
                           "<span style='color:red'>",
                           strContent.substring(mid, p = arrMatch[i + 1]),
                           "</span>");
                   }
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
                      var id = that.$route.params.id;
                      var params = {
                        "data":{
                          "ttopic":that.ttopic,
                          "tsid": that.tsid,
                          "tcontents":that.content,
                          "_method":"PUT"
                        }
                      }
                      that.toast.loading({
                           title:"加载中",
                           duration:2000
                      },function(ret){
                      });
                      setTimeout(function(){
                          that.ajax({
                            url:'tiezi/'+id,
                            method:"post",
                            params,
                            success: function(res){
                              that.toast.hide();
                              if(JSON.stringify(res)!='{}'){
                                // 刷新列表缓存
                                if(sessionStorage.getItem("managertiezi_list")){
                                  var tmp = JSON.parse(sessionStorage.getItem("managertiezi_list"));
                                  for(var i=0;i<tmp['data'].length;i++){
                                    if(tmp['data'][i].id == id){
                                      tmp['data'][i].ttopic = that.ttopic;
                                      tmp['data'][i].tcontents = that.delHtmlTag(that.content).substr(0,50);
                                    }
                                  }
                                  sessionStorage.setItem("managertiezi_list", JSON.stringify(tmp));
                                }

                                setTimeout(function(){
                                  that.ttopic = "";
                                  that.content = "";
                                  that.$router.back();
                                }, 2000);
                                that.toast.success({
                                    title:"修改成功",
                                    duration:2000
                                });
                              }else{
                                that.toast.fail({
                                    title:"修改失败",
                                    duration:2000
                                });
                              }
                            }
                          })
                       }, 500);
                   }
               });
           },
           // ------------------------- 敏感词检测  end---------------------------
           // 字符串去除HTML标签
           delHtmlTag(str){
              var msg  = str;
              msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
              msg = msg.replace(/[|]*\n/, '') //去除行尾空格
              msg = msg.replace(/&nbsp;/ig, ' '); //去掉npsp
              msg = msg.replace(/&amp;nbsp;/ig, ' '); //去掉npsp
              msg = msg.replace(/[\r\n]/g," ");//去掉回车换行
              msg = msg.replace(/\s+/g," ");//去掉回车换行
              return msg;
            },
        },
       mounted() {
          this.toast = new auiToast();
          this.bankuai_list();
          var id = this.$route.params.id;
          this.findData(id);
          this.$nextTick(() => {
            $(document).scrollTop(0);
          })
       },
       deactivated(){
          this.$destroy(true);
        },
        components: {
          Calendar
        }
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
.l1{
    color:#34DBDA;
    border:1px solid #34DBDA;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:50px;
    margin-left:10px
}
.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:0;
  margin-top:20px;
  height:95px;

}
.aui-list-item-input input,.aui-list-item-input textarea{
  font-size:14px;
}
.textarea-box {
  margin-right: 0rem;
}
.textarea-box .aui-list-item-input {
  padding:0;
}
.vue-html5-editor{
  z-index: 2000 !important;
}
.box-title{
  border-bottom: 1px solid #eee;
}
.aui-toast{
  z-index: 9999 !important;
}
</style>

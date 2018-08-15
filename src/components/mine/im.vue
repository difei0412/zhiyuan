<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'与刘国旗患者聊天'"></myHeader>
        
        <section class="aui-chat">
            <div class="aui-chat-header">2016年7月13日</div>
            <div class="aui-chat-item aui-chat-left">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        Hello AUI 2.0!
                    </div>
                    <div class="aui-chat-status aui-chat-status-refresh">
                        <i class="aui-iconfont aui-icon-correct aui-text-success"></i>
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-right">
                <div class="aui-chat-media">
                    <img src="static/image/demo1.jpeg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">流浪男</div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        你好！
                    </div>
                    <div class="aui-chat-status">
                        <i class="aui-iconfont aui-icon-info aui-text-danger"></i>
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-left">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        <img src="static/image/bingfang.jpeg" />
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-right">
                <div class="aui-chat-media">
                    <img src="static/image/demo1.jpeg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">流浪男</div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        以前拍摄的牛背山星空
                    </div>
                </div>
            </div>
            <div class="aui-chat-item aui-chat-left">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        <img src="static/image/bingfang.jpeg" />
                    </div>
                </div>
            </div>

             <div class="aui-chat-item" v-for="item in chatarr" v-if="chatarr" v-bind:class="item.type==1?'aui-chat-right':'aui-chat-left'">
                <div class="aui-chat-media">
                    <img src="static/image/12.jpg" />
                </div>
                <div class="aui-chat-inner">
                    <div class="aui-chat-name">AUI <span class="aui-label aui-label-warning">2.0</span></div>
                    <div class="aui-chat-content">
                        <div class="aui-chat-arrow"></div>
                        <div v-html="item.content"></div>
                    </div>
                </div>
            </div>
          <div class="aui-chat-item init-box-height" v-bind:class="[isBox?'box-tool':'box-tool2']"></div>
        </section>

        <!-- 聊天工具栏 -->
         <div class="bottom-fxied">
            <div class="fxied-barnav">
                <div class="fxied-right clearfix">
                    <span class="key" @click="hideEmoji"></span>
                    <span class="keyboard" @click="showEmoji"></span>
                    <!-- <i class="aui-iconfont aui-icon-info keyboard" @click="showEmoji"></i>
                    <i class="aui-iconfont aui-icon-plus more_ways_icon" @click="showMoreBox"></i> -->
                     <!-- <i class="aui-iconfont aui-icon-info keyboard" @click="showEmoji"></i> -->
                     <i class="aui-iconfont aui-icon-plus more_ways_icon" @click="showMoreBox"></i>
                    <!-- <span class="more_ways_icon"></span> -->
                </div>
                <div class="fxied-left">
                    <!-- <div class="mui-scroll-wrapper" id="ChatContent">
                        <div class="mui-scroll"> -->
                            <!-- <input class="ChatContent" id="ChatContenttext" contenteditable="true"> -->
                            <!-- <input class="ChatContent" id="ChatContenttext" type="text" style="margin: 0"> -->
                            <textarea name="textarea" id="ChatContenttext" cols="30" rows="1" placeholder="输入聊天内容" v-model="chatcontent"></textarea>
                    <!--     </div>
                    </div> -->
                </div>
                <div class="more_ways"><span class="send-info" @click="sendTextMessage">发送</span></div>
            </div>
            <div class="more_ways_foo">
                <span class="ways_icon1"><input id="showPreview" type="file"></span>
                <span class="ways_icon2"><input type="file" accept="image/gif,image/jpeg,image/png,image/gif" capture="camcorder"></span>
                <span class="ways_icon3"><input type="file" ></span>
                <span class="ways_icon4"></span>
            </div>
            <div class="regretlist">
                <div class="mui-scroll-wrapper emojbox" id="EmojViewScroll">
                    <div class="mui-scroll">
                        <div class="drawingEmoj clearfix">
                            <div v-if="emojilistarr" v-for="item in emojilistarr" class="emoji-content" @click="setEmojiText" v-html="item"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <audio src="/static/voice/83766.mp3" id="tishi-audio"></audio>
        <!-- 聊天工具栏 -->

    </div>
  
</template>

<script>
import $ from "../public/jquery"
import Calendar from '../vue-calendar-component/index';
    export default {
        name: 'geqian',
        data() {
            return {
              emojilistarr: [],
              isBox:false,
              appkey: "z3v5yqkbz1kn0",
              token: "chLxBOtTfP9UD5sKKA8A0LDTuZQGF9BEDUGAmIPb1p8RrYzfENEK/eVHpY5nDPdogprBKhyAgFKjwxZcplvrFw==",     
              toid: "",
              chatcontent: '', // 聊天内容
              chatarr: [],
              audiosrc:''
            }
        },
        methods: {
          openzhifu:function(){
           this.$router.push({path:'/mingyi'})
          },
          RongVideoSms:function(){
              var Emojiconfig = {
                  size: 32,
              };
              RongIMLib.RongIMEmoji.init(Emojiconfig);
              var EmojiList = RongIMLib.RongIMEmoji.list;
              var EmojiHtml = "";
              for(var i=0;i<EmojiList.length;i++){
                  this.emojilistarr.push(EmojiList[i].node.outerHTML);
              }

              $(".drawingEmoj .rong-emoji-content").css({
                  "font-size":"1px !important;"
              })

          },
          setEmojiText:function(e){
            this.chatcontent = this.chatcontent + $(e.currentTarget).find("span").attr("name");
          },
          showEmoji(e) {
                $(".fxied-right .key").show();
                $(e.currentTarget).hide();
                $(".regretlist").slideDown();
                $(".more_ways_foo").slideUp();
                $("#ChatContenttext").blur();
                this.isBox = true;
                this.scrollMax();
          },
          hideEmoji(e) {
            $(".more_ways_foo,.regretlist").slideUp();
            $(e.currentTarget).hide();
            $(".keyboard").show();
            // setTimeout(function() {
            //     $("#ChatContenttext").focus();
            // },20);
            this.isBox = false;
            this.scrollMax();
          },
          showMoreBox() {
            var status = $('.more_ways_foo').is(':hidden');
            if(status){
              this.isBox = true;
            } else {
              this.isBox = false;
            }
            $(".more_ways_foo").slideToggle();
            $(".regretlist").slideUp();
            $(".fxied-right .key").hide();
            $(".keyboard").show();
            $("#ChatContenttext").blur();
            this.scrollMax();
          },
          scrollMax() {
            setTimeout(function() {
              var scrollH = parseInt($(document).height()) + 230;
              $('body,html').animate({scrollTop:scrollH},400);
            }, 20); 
          },
          // -------------------------- 即使聊天监听 ----------------------------
          init() {
            var that = this;
            RongIMClient.init(this.appkey);

            // 设置连接监听状态 （ status 标识当前连接状态 ）// 连接状态监听器
            RongIMClient.setConnectionStatusListener({
                onChanged: function(status) {
                    switch (status) {
                        //链接成功
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                        //正在链接
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                        //重新链接
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        that.connectStatus = 'no';
                        that.connectServ();
                        break;
                        //其他设备登陆
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登陆');
                        break;
                        //网络不可用
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        that.connectStatus = 'no';
                        that.connectServ();
                        break;
                    }
                }
            });
            // 消息监听器
            RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived:
                function(message) {
                    // 判断消息类型
                    switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        
                        // <-------------------------- 收到文本消息处理开始位置 ------------------------->
                        // 接受消息显示
                        var tmpcontent = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
                        that.chatarr.push({"type":2,"content":tmpcontent});
                        setTimeout(function() {
                          var scrollH = parseInt($(document).height()) + 230;
                          $('body,html').animate({scrollTop:scrollH},70);
                        }, 20);
                        $('#tishi-audio')[0].play();
                      // <-------------------------- 收到文本消息处理结束位置 ------------------------->

                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载                
                        // message.content.content 格式为 AMR 格式的 base64 码
                        RongIMLib.RongIMVoice.preLoaded(message.content.content);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        
                      // <-------------------------- 收到图片消息处理开始位置 ------------------------->
                        var content = message.content.content;
                        console.log(message);
                        var html = '<li class="clearfix"><span class="userpic youPic" style="background:url(\''+message.content.extra.face+'\') no-repeat center/100%"></span><div class="UserCommInfo YouChatInfo"><img src="'+content+'" alt="" style="display:block;width:100%"/></div></li>';
                      $('.chat-info-list').append(html);
                      setTimeout(function(){
                          var height = $(".chat-info-list").height();
                          $('.viewport').scrollTop(height);
                      },10);
                      // <-------------------------- 收到图片消息处理结束位置 ------------------------->

                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                        // 自定义消息
                        // do something...
                    }
                }
            });

            that.connectServ()
          },
          connectServ: function() {
            var that = this;
            // 连接融云服务器。
            RongIMClient.connect(that.token, {
                onSuccess: function(userId) {
                    console.log("Login successfully." + userId);
                },
                onTokenIncorrect: function() {
                    console.log('token无效');
                },
                onError: function(errorCode) {
                    var info = '';
                    switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                    }
                    alert(errorCode);
                }
            });
          },
          // -------------------------- 即使聊天监听 ----------------------------
          sendTextMessage() { // 发布文本消息
            var that = this;
            var msg = new RongIMLib.TextMessage({
                content: RongIMLib.RongIMEmoji.symbolToEmoji(that.chatcontent)
            });
            // 发送消息显示
            var tmpcontent = RongIMLib.RongIMEmoji.symbolToHTML(this.chatcontent);
            this.chatarr.push({"type":1,"content":tmpcontent});
            setTimeout(function(){
              var scrollH = parseInt($(document).height()) + 230;
              $('body,html').animate({scrollTop:scrollH},70);
            }, 20);
            //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
            //var msg = RongIMLib.TextMessage.obtain("hello");
            var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
            var targetId = that.toid; // 目标 Id  注意id的值 必须是已经传给我融云 并且生成了token的
            RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
                onSuccess: function(message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log("success");
                },
                onError: function(errorCode, message) {
                    var info = '';
                    switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default:
                        info = x;
                        break;
                    }
                    console.log('发送失败:' + info);
                }
            });
          },
          
        },
        activated() {
          
        },
        created() {
   
        },
        mounted() {
          this.toid = this.$route.query.uid;
          this.token = this.$route.query.token;
          this.token = this.token.replace(/\ /g,'+');
          this.RongVideoSms();
          this.init();
        },
        watch:{
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
.aui-chat .aui-chat-right .aui-chat-content {
  background: rgb(158,234,106);
}
.aui-chat .aui-chat-right .aui-chat-arrow {
  background: rgb(158,234,106);
}
.aui-chat .aui-chat-media {
  height:2rem !important;
}
.aui-chat .aui-chat-media img {
  height:100%;
}

/* ############### 聊天工具栏 ################*/
.bottom-fxied {
    left: 0px;
    bottom: 0rem;
    width: 100%;
    display: block;
    position: fixed;
    min-height:2.5rem;
}
.bottom-fxied .fxied-barnav {
    padding: 0.3rem 0;
    background: #34DBDA;
    position: relative;
}

/*聊天页面*/
.bottom-fxied .ChatContent{
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    margin-top: 9px;
    min-height: 27px;
    line-height: 20px;
    transition: all 0.3s ease 0s;
}
.bottom-fxied .more_ways{
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    width: 55px;
    height: 50px;
}
.bottom-fxied .more_ways .send-info{
    border-radius: 4px;
    background: #a8b0bd;
    text-align: center;
    line-height: 1.9rem;
    font-size: 14px;
    color: #fff;
    display: block;
    margin-right:0.3rem;
    margin-top:0.3rem;
}
.bottom-fxied .fxied-left{
    margin-right: 62px;
    margin-left: 90px;
    background: #fff;
    position: relative;
    border-radius: 4px;
    height:1.9rem;
    border-radius: 0.3rem;
}
.bottom-fxied .fxied-left textarea {
  height:1.9rem;
  padding:0.5rem 0.5rem;
  font-size: 14px;
  border-radius: 0.3rem;
}
.bottom-fxied .fxied-right{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: #34DBDA;
    height:2.5rem;
}
.bottom-fxied .fxied-right span{
    display: block;
    float: left;
    width: 50%;
    height: 50px;
}
.bottom-fxied .fxied-right .keyboard{
    background: url(/static/image/xiaolian.png) no-repeat;
    position: relative;
    left:0.8rem;
    top:0.4rem;
    font-size: 23px;
    color:#fff;
    width:32px;
    height:32px;
}
.bottom-fxied .fxied-right .key{
    background: url(/static/image/key.png) no-repeat center center;
    position: relative;
    left:0.8rem;
    top:0.4rem;
    font-size: 23px;
    color:#fff;
    width:32px;
    height:32px;
    display: none;
}
.bottom-fxied .more_ways_foo{
    background: #e6e7ea;
    padding:22px 25px;
    border-top:1px solid #cbcccf;
    text-align: center;
    height: 9rem;
    display: none;
}
.bottom-fxied .more_ways_foo span{
    border: 1px solid #cbcccf;
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-right: 23px;
    position: relative;
    overflow: hidden;
}
.bottom-fxied .more_ways_foo span input{
    display: block;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.more_ways_foo .ways_icon1{
    background:#f6f6f8 url(/static/image/syimg.png) no-repeat;
    background-position: -308px -122px;
}
.more_ways_foo .ways_icon2{
    background:#f6f6f8 url(/static/image/syimg.png) no-repeat;
    background-position: -250px -122px;
}
.more_ways_foo .ways_icon3{
    background:#f6f6f8 url(/static/image/syimg.png) no-repeat;
    background-position: -192px -121px;
}
.more_ways_foo .ways_icon4{
    background:#f6f6f8 url(/static/image/syimg.png) no-repeat;
    background-position: -138px -120px;
}
.more_ways_foo .ways_icon1,.more_ways_foo .ways_icon2,.more_ways_foo .ways_icon3,.more_ways_foo .ways_icon4{
    background-size: 360px 225px;
}

@media screen and (min-width: 5px) and (max-width: 350px) {
    .bottom-fxied .more_ways_foo{
        padding: 15px 10px;
    }
    .bottom-fxied .more_ways_foo span{
        margin-right: 15px;
    }
    .more_ways_foo span:last-child{margin-right: 0;}
}
@media screen and (min-width: 350px) and (max-width: 375px) {
    .bottom-fxied .more_ways_foo{
        padding: 15px 10px;
    }
    .bottom-fxied .more_ways_foo span{
        margin-right: 21px;
    }
    .more_ways_foo span:last-child{margin-right: 0;}
}
@media screen and (min-width: 400px) and (max-width: 450px) {
    .bottom-fxied .more_ways_foo span{
        margin-right: 31px;
    }
}
@media screen and (min-width: 450px) and (max-width: 500px) {
    .bottom-fxied .more_ways_foo span{
        margin-right: 40px;
    }
}
@media screen and (min-width: 500px) and (max-width: 600px) {
    .bottom-fxied .more_ways_foo span{
        margin-right: 55px;
    }
}
@media screen and (min-width: 600px) and (max-width: 1280px) {
    .bottom-fxied .more_ways_foo span{
        margin-right: 70px;
    }
}
.more_ways_foo span:last-child{margin-right: 0;}
.bottom-fxied .regretlist{
    height: 9rem;
    overflow: hidden;
    display: none;
    position: relative;
    background: #fff;
}
.regretlist .drawingEmoj{
    padding: 5px 10px;
}
.chat-info-list li{
    position: relative;
    padding: 20px 15px;
        min-height: 89px;
}
.chat-info-list .userpic{
    border-radius: 100%;
    height: 50px;
    width: 50px;
    position: absolute;
    top: 20px;
    z-index: 99;
}
.chat-info-list .myPic{
    right: 15px;
}
.chat-info-list .youPic{
    left: 15px;
}
.UserCommInfo{
    padding: 14px;
    max-width: 100%;
    border-radius: 5px;
    font-size: 18px;
    position: relative;
}
.MyChatInfo{
    float: right;
    margin-right: 65px;
    background: #9eea6a;
}
.YouChatInfo{
    background: #ddd;
    margin-left: 65px;
    float: left;
}
.UserCommInfo:before{
    content: "";
    position: absolute;
    top: 10px;
    width: 0;
    height: 0px;
    border-top: 15px solid transparent;
}
.MyChatInfo:before{
    right: -9px;
    border-left: 10px solid #9eea6a;
}
.YouChatInfo:before{
    left: -9px;
    border-right: 10px solid #ddd;
}
.emoji-content{
    float: left;
    width: 12.5%;
    text-align: center;
    height: 36px;
    margin-top: 10px;
}
.regretlist .Emojbtnbar{
    position: absolute;
    bottom: 0;
    background: #ddd;
    left: 0;
    right: 0;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    z-index: 2;
    color: #fff;
}
.Emojbtnbar .mui-icon-closeempty{
    font-weight: 600;
    font-size: 38px;
    height: 45px;
    line-height: 45px;
    width: 55px;
    text-align: center;
    background: #a8b0bd;
    float: right;
}
.Emojbtnbar .title{
    text-align: center;
    height: 45px;
    color: #333;
    line-height: 45px;
    font-size: 16px;
}
.drawingEmoj .emoji-content img{
    display: block;
    width: 36px;
    height: 36px;
    margin: 0 auto;
}
.bottom-fxied .aui-icon-plus {
  left:0.8rem;
  top:0.3rem;
  font-size: 25px;
  color:#fff;
}
.bottom-fxied .aui-icon-plus {
  left:1.3rem;
}
.mui-scroll-wrapper {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
}
.emojbox {
    overflow-y: scroll;
}
.init-box-height {
  height:2.5rem;
  width:100%;
}
.box-tool {
  height:11.5rem;
  width: 100%;
  animation:mymove 0.4s linear 0s 1;
  -webkit-animation:mymove 0.4s linear 0s 1; /* Safari 和 Chrome */ 
}
.box-tool2 {
  height:2.5rem;
  width: 100%;
  animation:mymove_two 0.4s linear 0s 1;
  -webkit-animation:mymove_two 0.4s linear 0s 1; /* Safari 和 Chrome */ 
}
 @keyframes mymove
{
   0%{height:2.5rem;}
   10%{height:3.4rem;}
   20%{height:4.3rem;}
   30%{height:5.2rem;}
   40%{height:6.1rem;}
   50%{height:7rem;}
   60%{height:7.9rem;}
   70%{height:8.8rem;}
   80%{height:9.7rem;}
   90%{height:10.6rem;}
   100%{height:11.5rem;}
 }
  @keyframes mymove_two
{
   0%{height:11.5rem;}
   10%{height:10.6rem;}
   20%{height:9.7rem;}
   30%{height:8.8rem;}
   40%{height:7.9rem;}
   50%{height:7rem;}
   60%{height:6.1rem;}
   70%{height:5.2rem;}
   80%{height:4.3rem;}
   90%{height:3.4rem;}
   100%{height:2.5rem;}
 }
/* ############### 聊天工具栏 ################*/
</style>

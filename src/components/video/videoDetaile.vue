<template>
  <div id="box" style="background-color: #ffffff;">
    <myHeader :title="'详情'"></myHeader>
    
    <div v-if="message.id && message.id != ''" style="padding-bottom: 3rem; background-color: white;">
      <!-- 视频 -->
      <video id="example_video_1" class="video-js vjs-default-skin" controls autoplay preload="none" data-setup="{}" style="width:100%" :poster="message.img">
        <source :src="message.img1" type="video/mp4" />
      </video>

      <div>
        <div class="title-box aui-info aui-padded-l-15 aui-padded-r-15" style="padding-bottom: 0;" @click="showContentClick">
          <p class="title aui-info-item aui-font-size-16" style="color : #222; padding-right : 30px;">
            {{message.title}}
          </p>
          <div class="aui-info-item" style="width : 20px;">
            <img style="min-width: 20px;" :class="{routate:!showContent}" src="../../../static/image/top.png" alt="">
          </div>
        </div>
        <div class="aui-padded-l-15 aui-padded-r-15" @click="showContentClick">
          <p style="color : #a2a8ae; font-size : 13px;">原创 | {{commontNum(read_num)}}次播放</p>
        </div>

        <!-- 内容 -->
        <div v-if="showContent" class="aui-padded-l-15 aui-padded-r-15">
          <p class="aui-margin-t-10" style="color : #a2a8ae; font-size : 13px;">{{time(message.createdAt, 0)}} 发布</p>
          <p class="aui-margin-t-10" style="padding-right : 30px; color : #a2a8ae; font-size : 13px;">{{message.Content}}</p>
        </div>

        <!-- 点赞 -->
        <div v-if="message.id && message.id != ''" class="aui-info-item aui-font-size-12" style="border-bottom : 1px solid #fafafa;" @click="supportClick(message.id, 'news', 0)">
          <span class="aui-margin-l-15 aui-padded-t-10 aui-padded-b-10">
            <img v-if="(userId && userId != '') ? supportDic.login.news[message.id] == userId : supportDic.noLogin.news[message.id] == '1'" style="height: 18px; margin-right: 5px;" src="../../../static/image/yizan.png" alt="" />
            <img v-else style="height: 18px; margin-right: 5px;" src="../../../static/image/dian.png" alt="" />
            <p style="color: #a2a8ae; height: 18px; line-height: 18px;">{{commontNum(message.appreciate)}}</p>
          </span>
        </div>

        <!-- 作者 -->
        <div class="aui-info aui-padded-l-15 aui-padded-r-15" style="border-bottom:1px solid #fafafa;">
          <div tapmode="hover" class="aui-info-item">
            <img :src="message.issue_img" style="width:1.75rem; height: 1.75rem;" class="aui-img-round" />
            <div style="display:block;margin-left:15px;">
              <p class="aui-font-size-14" style="color:#222">{{message.nickname}}</p>
            </div>
          </div>
        </div>

        <!-- 推荐 -->
        <ul class="aui-list aui-media-list">
          <li v-for="(item, index) in recommend" tapmode="hover" class="aui-list-item" @click="toVideoDetail(item.id)" v-if="!showRecommend ? (index < 2) : (index < recommend.length)">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title aui-ellipsis-2">{{item.title}}</div>
                </div>
                <div class="aui-info aui-padded-b-0" style="position:absolute;bottom:0">
                  <div class="aui-info-item aui-font-size-12" >
                    <span class="aui-margin-r-15">{{item.nickname}}</span>
                    <span>{{commontNum(item.comment_num)}}条评论</span>
                  </div>
                </div>
              </div>
              <div class="aui-list-item-media">
                <div class="img-container">
                  <img :src="item.img" />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div style="padding : 15px; display : flex; align-items : center; justify-content : center" v-if="recommend.length > 0 && !showRecommend" @click="showAllRecommend">
          <span style="color : #555; font-size : 14px; margin-right : 15px;">查看更多</span>
          <img style="width : 16px;" src="../../../static/image/bottom.png" alt="">
        </div>

        <!-- 分割 -->
        <div style="height:10px; background : #fafafa;"></div>

        <!-- 评论 -->
        <ul v-if="commontData.length > 0" class="pinglun-container aui-padded-t-15">
          <li class="pinglun-box" v-for="(item, index) in commontData">
            <div class="aui-info aui-padded-l-15 aui-padded-r-15" style="padding-top:0;padding-bottom:0">
              <div class="aui-info-item">
                <img :src="item.user_id.Tx" style="width: 1.75rem; height: 1.75rem;" class="aui-img-round" />
                <div style="display:block;margin-left:15px;">
                  <p class="aui-font-size-14" style="color:#222">{{item.user_id.Name}}</p>
                  <p class="aui-font-size-12">
                    <span class="aui-margin-r-5" style="color:a2a8ae">{{time(item.createdAt, 0)}}</span>
                  </p>
                </div>
              </div>
              <div class="aui-info-item" @click="supportClick(item.id, 'pinglun', index)">
                <img v-if="(userId && userId != '') ? supportDic.login.pinglun[item.id] == userId : supportDic.noLogin.pinglun[item.id] == '1'" style="height: 18px; margin-right: 5px;" src="../../../static/image/yizan.png" alt="" />
                <img v-else style="height: 18px; margin-right: 5px;" src="../../../static/image/dian.png" alt="" />
                <p style="color: #a2a8ae; height: 18px; line-height: 18px;">{{commontNum(item.support_num)}}</p>
              </div>
            </div>
            <div class="aui-info aui-padded-l-15 aui-padded-r-15" style="padding-top:0;padding-bottom:0">
              <div class="aui-info-item">
                <div style="width:1.75rem;height:1.75rem;margin-right:15px"></div>
              </div>
              <div style="flex:1;display:block">
                <p class="pinglun-content" style="color:#222">
                  {{item.content}}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="shafa">
          <img src="static/image/sofa@3x.png" />
          <span>评论还是空的快来抢沙发吧！</span>
        </div>
      </div>
    </div>

    <div v-if="message.id && message.id != ''">
      <div class="commentDiv">
        <div class="text my-middle" @click="commentClick">
          <input class="textChild" v-model="inputText" ref="input" type="text" name="" placeholder="我也来吐槽一下..." />
        </div>

        <div v-if="!isComment" class="commentNum my-middle" @click="goToCommentList">
          <img src="static/image/pinglun.png">
        </div>
        <div v-if="!isComment" class="collectBtn my-middle" @click="collectClick">
          <img v-if="!coollectId || coollectId == ''" src="static/image/collect.png">
          <img v-else src="static/image/collect_select.png">
        </div>
        <div v-if="isComment" class="submit" @click="submitComment">发布</div>
      </div>
    </div>
    <div v-if="isComment" style="background-color: rgba(1, 1, 1, .2); position: fixed; top: 0; left: 0; height: calc(100% - 3rem); width: 100%;" @click="endComment" @touchmove.prevent></div>
  </div>
</template>

<script>
  import $ from '../public/jquery';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  import Vue from 'vue';

  export default {
    name: 'videoDetaile',
    data() {
      return {
        message: {},
        supportDic: {},
        recommend: [],
        commontData: [],
        userId: '',
        coollectId: "",
        inputText: "",
        read_num: "1",
        showContent: false,
        showRecommend: false,
        isComment: false
      }
    },
    methods: {
      goToCommentList() {
        this.$router.pushRoute({name:"commentList", params:{id:this.$route.params.id}});
      },
      isSupport() {
        var that = this;

        that.supportDic = JSON.parse(window.localStorage.getItem('supportDic'));
        if (!that.userId) {
          return;
        }

        var filter = 'filter[skip]=0'
        filter += '&filter[limit]=5000'
        var url = "support?" + filter;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            var dic = that.supportDic.login;
            dic.news = {};
            dic.pinglun = {};
            for (var i = 0; i < data.length; i++) {
              var tempDic = data[i];
              dic[tempDic.type][tempDic.record_id] = tempDic.user_id;
            }
            that.supportDic.login = dic;
            window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic))
          }
        });
      },
      supportClick(id, type, index) {
        var that = this;

        if (!that.userId) {
          if (that.supportDic.noLogin[type][id] == '1') {
            that.$MessageBox.alert('您已经赞过了！');
            return;
          }
          that.supportDic.noLogin[type][id] = '1';
          that.supportDic = Object.assign({}, that.supportDic);
          window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
          that.$MessageBox.alert('点赞成功');
          that.addSupportNum(id, type, index);
          return;
        }
        if (that.supportDic.login[type][id] == that.userId) {
          that.$MessageBox.alert('您已经赞过了！');
          return;
        }

        var url = "support/";
        var method = "POST";
        var params = {
          "data" : {
            "_method" : "PUT",
            "user_id" : that.userId,
            "record_id" : id,
            "type" : type
          }
        }
        that.ajax({url, method, params,
          success:function(data) {
            that.supportDic.login[type][id] = that.userId;
            that.supportDic = Object.assign({}, that.supportDic);
            window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
            that.$MessageBox.alert('点赞成功');
            that.addSupportNum(id, type, index);
          }
        });
      },
      addSupportNum(id, type, index) {
        var that = this;

        var url = "";
        if (type == "news") {
          url = "news/" + id;
        } else if (type == "pinglun") {
          url = "news_pinglun/" + id;
        }

        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            var tempNum = "";
            if (type == "news") {
              tempNum = data.appreciate;
            } else if (type == "pinglun") {
              tempNum = data.support_num;
            }

            if (!tempNum || tempNum == '') {
              tempNum = "0";
            }
            var num = parseInt(tempNum)
            num ++;

            var method = "POST";
            var params = {};
            if (type == "news") {
              params = {
                "data" : {
                  "_method" : "PUT",
                  "appreciate" : num.toString()
                }
              }
            } else if (type == "pinglun") {
              params = {
                "data" : {
                  "_method" : "PUT",
                  "support_num" : num.toString()
                }
              }
            }
            that.ajax({url, method, params,
              success:function(data) {
                if (type == "news") {
                  that.message.appreciate = data.appreciate;
                } else if (type == "pinglun") {
                  that.commontData[index].support_num = data.support_num;
                }
              }
            });
          }
        });
      },
      getCommentData() {
        var that = this

        var filter = 'filter[where][status]=0'
        filter += '&filter[where][Newsid]=' + that.$route.params.id
        filter += '&filter[include][user_idPointer]'
        filter += '&filter[order]=support_num DESC'
        filter += '&filter[order]=createdAt DESC'
        filter += '&filter[skip]=0'
        filter += '&filter[limit]=3'
        var url = "news_pinglun?" + filter;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            that.commontData = [];
            for (var i = 0; i< data.length; i++) {
              that.commontData.push(data[i]);
            }
          }
        });
      },
      submitComment() {
        var that = this;

        if (that.inputText == '') {
          that.$MessageBox.alert('请输入评论内容！');
          return;
        }

        var url = "news_pinglun/";
        var method = "POST";
        var params = {
          "data" : {
            "_method" : "PUT",
            "user_id" : that.userId,
            "Newsid" : that.$route.params.id,
            "content" : that.inputText,
            "support_num" : "0",
            "status" : "0"
          }
        }
        that.ajax({url, method, params,
          success:function(data) {
            that.inputText = "";
            that.isComment = false;
            that.$refs.input.blur();
            that.$MessageBox.alert('评论成功，请在评论列表内查看');
            that.getCommentData();
            that.addCommentNum();
          },
          error:function(errorData) {
            that.isComment = false;
            that.$refs.input.blur();
            that.$MessageBox.alert('评论失败，请重试');
          }
        });
      },
      addCommentNum() {
        var that = this;

        var method = "GET";
        var url = 'news/' + that.$route.params.id
        that.ajax({url, method,
          success:function(data) {
            var tempNum = data.comment_num;
            if (!tempNum || tempNum == '') {
              tempNum = "0";
            }
            var num = parseInt(tempNum)
            num ++;

            var method = "POST";
            var url = 'news/' + that.$route.params.id
            var params = {
              "data" : {
                "_method" : "PUT",
                "comment_num" : num.toString()
              }
            }
            that.ajax({url, method, params});
          }
        });
      },
      endComment() {
        var that = this

        that.isComment = false;
        Vue.nextTick(function(){
          that.$refs.input.blur()
        })
      },
      commentClick() {
        var that = this

        if (!that.userId) {
          that.$router.pushRoute({name:"login"});
          return;
        }

        that.isComment = true;
        Vue.nextTick(function(){
          that.$refs.input.focus()
        })
      },
      toVideoDetail(id) {
        this.$router.replaceRoute({name:'videoDetaile', params:{id:id}})
      },
      showContentClick() {
        this.showContent = !this.showContent;
      },
      showAllRecommend() {
        this.showRecommend = !this.showRecommend;
      },
      getRecommend() {
        var that = this;

        var requests = []
        for (var i = 0; i < that.message.recommend.length; i ++) {
          var json = {}
          json.method = 'GET'
          json.path = '/mcm/api/news/' + that.message.recommend[i]
          requests.push(json)
        }
        var params = {
          "data" : {
            "requests" : requests
          }
        }
        var url = "batch/";
        var method = "POST";
        that.ajax({url, method, params,
          success:function(data) {
            that.recommend = [];
            for (var i = 0; i < data.length; i ++) {
              if (data[i].id != that.$route.params.id) {
                that.recommend.push(data[i]);
              }
            }
          }
        });
      },
      userIsRead() {
        var that = this;

        if (that.userId) {
          var filter = 'filter[where][news]=' + that.$route.params.id;
          filter += '&filter[where][user_id]=' + that.userId;
          filter += '&filter[where][type]=history';
          var url = "user_record?" + filter;
          var method = "GET";
          that.ajax({url, method,
            success:function(data) {
              if (data.length == 0) {
                that.adduserRead();
              } else {
                that.read_num = data[0].read_num;
                that.addUserReadNum(data[0].id);
              }
            }
          });
        }
      },
      addUserReadNum(id) {
        var that = this;

        if (!that.read_num || that.read_num == '') {
          that.read_num = "1";
        }
        var tempRead_num = parseInt(that.read_num);
        tempRead_num ++;
        that.read_num = tempRead_num.toString();
        
        var url = "user_record/" + id;
        var method = "POST";
        var params = {
          "data" : {
            "_method" : "PUT",
            "read_num" : tempRead_num.toString()
          }
        }
        that.ajax({url, method, params});
      },
      adduserRead() {
        var that = this;

        var url = "user_record/";
        var method = "POST";
        var params = {
          "data" : {
            "_method" : "PUT",
            "user_id" : that.userId,
            "news" : that.$route.params.id,
            "read_num" : "1",
            "type" : "history"
          }
        }
        that.ajax({url, method, params});
      },
      getData() {
        var that = this;

        var filter = 'filter[where][id]=' + that.$route.params.id;
        var url = "news?" + filter;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            that.message = data[0];
            that.getRecommend();

            Vue.nextTick(function() {
              $("#example_video_1").height($(window).width() / 16 * 9)
              videojs('#example_video_1');
            })
          }
        });
      },
      isCollect() {
        var that = this;

        if (!that.userId) {
          return;
        }

        var filter = 'filter[where][news]=' + that.$route.params.id;
        filter += '&filter[where][user_id]=' + that.userId;
        filter += '&filter[where][type]=collect';
        var url = "user_record?" + filter;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            if (data.length == 0) {
              that.coollectId = '';
            } else {
              that.coollectId = data[0].id;
            }
          }
        });
      },
      collectClick() {
        var that = this;

        if (!that.userId) {
          that.$router.pushRoute({name:"login"});
          return;
        }

        if (that.coollectId && that.coollectId != '') {
          that.deleteCollect();
          return;
        }

        var url = "user_record/";
        var method = "POST";
        var params = {
          "data" : {
            "_method" : "PUT",
            "user_id" : that.userId,
            "news" : that.$route.params.id,
            "type" : "collect"
          }
        }
        that.ajax({url, method, params,
          success:function(data) {
            that.coollectId = data.id;
            that.$MessageBox.alert('收藏成功');
          }
        });
      },
      deleteCollect() {
        var that = this;

        var url = "user_record/" + that.coollectId;
        var method = "POST";
        var params = {
          "data" : {
            "_method" : "DELETE"
          }
        }
        that.ajax({url, method, params,
          success:function(data) {
            that.coollectId = '';
            that.$MessageBox.alert('取消收藏成功');
          }
        });
      },
      public() {
        this.coollectId = "";
        this.inputText = "";
        this.showContent = false;
        this.showRecommend = false;
        this.isComment = false;
        this.message = {};
        this.userId = window.localStorage.getItem('userId');
        this.getData();
        this.isCollect();
        this.getCommentData();
        this.userIsRead();
        this.isSupport();
      }
    },
    mounted() {
      this.public();
    },
    watch: {
      '$route'(to, from) {
        if (to.name == 'videoDetaile' && (from.name == 'videoDetaile' || from.name == 'index' || from.name == 'colOrHisOrPush' || from.name == 'search')) {
          this.public();
        } else if (from.name == 'commentList') {
          this.getCommentData();
          this.isSupport();
        }
      }
    }
  }
</script>

<style scoped>
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
  .my-middle {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    display: box;
    box-orient: horizontal;
    box-align: center;
  }
  .shafa img {
    display: block;
    margin: 0 auto;
    width: 30%;
    margin-top: 1.3rem;
  }
  .shafa span {
    display: block;
    width: 100%;
    text-align: center;
    color: #a2a8ae;
    font-size: 0.7rem;
    margin-top: 1.2rem;
    margin-bottom: 1.5rem;
  }
  .routate {
    transform: rotate(-180deg);
  }
  .commentDiv {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background-color: white;
    border-top: 1px solid #eee;
    display: flex;
    display: -webkit-flex;
    -webkit-flex-flow: row;
    flex-flow: row;
  }
  .text {
    height: 100%;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin-left: 0.5rem;
  }
  .textChild {
    display: block;
    font-size: 0.75rem;
    color: #a2a8ae;
    height: 2rem;
    line-height: 2rem;
    width: 100%;
    border: 1px solid #ddd;
    background-color: #fafafa;
    padding-left: 0.7rem;
    border-radius: 1rem;
  }
  .submit {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 0.75rem;
    color: #a2a8ae;
  }
  input::-webkit-input-placeholder {
    color: #a2a8ae;
  }
  .commentNum {
    margin: auto 0.5rem auto 1rem;
  }
  .commentNum img {
    width: 1.3rem;
  }
  .collectBtn {
    margin: auto 1rem auto 0.5rem;
  }
  .collectBtn img {
    width: 1.3rem;
  }
  .aui-list .aui-list-item-media {
    width: 6rem;
  }
  .pinglun-content {
    line-height: 25px;
    font-size: 15px;
    text-align: justify;
    max-height: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .pinglun-box {
    margin-bottom: 15px;
  }
</style>

<style>
  .vjs-big-play-button {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
</style>

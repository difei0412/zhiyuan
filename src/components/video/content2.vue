<template style="background: #ffffff;">
  <div>
  <div class="aui-content aui-margin-b-15" >
        <ul class="aui-list aui-media-list" style="margin-top:50px">
           
            <li class="aui-list-item aui-list-item-middle"  @click="openwenda()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                     <i class="aui-iconfont aui-icon-question" style="font-size:35px;color:#28B8A1"></i>
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">即时回答</div>
                            
                        </div>
                        <div class="aui-list-item-text">
                            找大夫问病
                        </div>
                    </div>
                </div>
            </li>
          <li class="aui-list-item aui-list-item-middle" @click="openluntan()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                      <i class="aui-iconfont aui-icon-info" style="font-size:35px;color:#28B8A1"></i>
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">医疗论坛</div>
                            
                        </div>
                        <div class="aui-list-item-text">
                           按科室快速找对医生 对症咨询
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
     <div class="aui-content aui-margin-b-15" @click="opentiezi">
          <ul class="aui-list aui-media-list">
              <li class="aui-list-header">
                 最新帖子
                 <div class="aui-col-xs-3">
                  <i class="aui-iconfont aui-icon-refresh" style="margin-left:15px"></i>
                  <p>换一批</p>
              </div>
              </li>
              <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                              患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2">
                            您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round" style="max-width:70px">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right">08:00</div>
                          </div>
                          <div class="aui-list-item-text">
                              XXXXXXXXXXXX治疗
                          </div>
                      </div>
                  </div>
                 
              </li>
               <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                              患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2">
                            您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round" style="max-width:70px">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right">08:00</div>
                          </div>
                          <div class="aui-list-item-text">
                              XXXXXXXXXXXX治疗
                          </div>
                      </div>
                  </div>
                 
              </li>
             <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                              患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2">
                            您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round" style="max-width:70px">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right">08:00</div>
                          </div>
                          <div class="aui-list-item-text">
                              XXXXXXXXXXXX治疗
                          </div>
                      </div>
                  </div>
                 
              </li>
             <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                              患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2">
                            您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round" style="max-width:70px">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right">08:00</div>
                          </div>
                          <div class="aui-list-item-text">
                              XXXXXXXXXXXX治疗
                          </div>
                      </div>
                  </div>
                 
              </li>
             <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                              患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2">
                            您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round" style="max-width:70px">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right">08:00</div>
                          </div>
                          <div class="aui-list-item-text">
                              XXXXXXXXXXXX治疗
                          </div>
                      </div>
                  </div>
                 
              </li>
            
            
          </ul>

      </div>
  </div>
</template>

<script>
  import $ from '../public/jquery'
  import Vue from 'vue'

  export default {
    name: 'content',
    data () {
      return {
        userId: "",
        mylist : [],
        myIndex : -1,
        supportDic: {},
        sessionName: 'scrollForVideo'
      }
    },
    methods: {
      opentiezi(){
        this.$router.pushRoute({name:'tiezi'})
      },
      openwenda(){
      this.$router.pushRoute({name:'imlist'})
      },
       openluntan(){
      this.$router.pushRoute({name:'luntan'})
      },
      toVideoDetail(id) {
        this.$router.pushRoute({name:'videoDetaile', params:{id:id}})
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
          var navItem = $('.head');
          var Left = $('.head').scrollLeft();
          var Len = (navItem.width()) / 2;
          var navSpan = $('.head li').eq(index).offset().left;
          navItem.animate({ 'scrollLeft': navSpan + Left - Len + 35}, time, function() {
          });
        })
      },
      initdata:function() {
        var that = this;
        var filter = 'filter[where][status]=0'
        filter += '&filter[where][to]=noindex'
        filter += '&filter[skip]=0'
        filter += '&filter[limit]=5000'
        var url = "news_info?" + filter;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            // 添加推荐
            var tempDic = {
              "Info_name" : "推荐",
              "id" : "-1"
            }
            data.unshift(tempDic);

            for (var i = 0; i < data.length; i++) {
              that.mylist.push(data[i]);
            }

            that.openChild(0, false);
          }
        });
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
      supportClick(id, index) {
        var that = this;

        if (!that.userId) {
          if (that.supportDic.noLogin["news"][id] == '1') {
            that.$MessageBox.alert('您已经赞过了！');
            return;
          }
          that.supportDic.noLogin["news"][id] = '1';
          that.supportDic = Object.assign({}, that.supportDic);
          window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
          that.$MessageBox.alert('点赞成功');
          that.addSupportNum(id, index);
          return;
        }
        if (that.supportDic.login["news"][id] == that.userId) {
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
            "type" : 'news'
          }
        }
        that.ajax({url, method, params,
          success:function(data) {
            that.supportDic.login["news"][id] = that.userId;
            that.supportDic = Object.assign({}, that.supportDic);
            window.localStorage.setItem('supportDic', JSON.stringify(that.supportDic));
            that.$MessageBox.alert('点赞成功');
            that.addSupportNum(id, index);
          }
        });
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
      }
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
</style>

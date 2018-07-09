<template>
  <div>
    <myHeader :title="'切换栏目'"></myHeader>
    <div class="done" @click="done">
      <img src="static/image/down.png">
    </div>

    <div class="myback">
      <div v-if="mylist.length > 0" class="mytitle">
        <span style="color: #a2a8ae; margin-left: 10px;">切换栏目</span>
      </div>

      <div v-if="mylist.length > 0" class="lanmu">
        <button v-for="(item, index) in mylist" class="mybutton" :class="{'mybutton_active':item.ischeck == true}" @click="changecolor(index)">{{item.Info_name}}</button>
      </div>

      <div v-if="mylist2.length > 0" class="mytitle">
        <span style="color: #a2a8ae; margin-left: 10px;">点击添加更多栏目</span>
      </div>

      <div v-if="mylist2.length > 0" class="lanmu1">
        <button v-for="(item, index) in mylist2" class="mybutton" :class="{'mybutton_active':item.ischeck == 1}" @click="changecolor2(index)">{{item.Info_name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'content',
    data() {
      return {
        mylist : [],
        mylist2 : [],
        mySelectList : [],
        userId: ""
      }
    },
    methods:{
      initdata:function() {
        // 所有数据
        var that = this;
        var filter = 'filter[where][status]=0'
        filter += '&filter[where][to]=index'
        filter += '&filter[skip]=0'
        filter += '&filter[limit]=5000'
        var url = "news_info?" + filter;
        var method = "GET";
        that.ajax({url, method,
          success:function(data) {
            var dat = data;

            // 个人数据
            var filter1 = 'filter[where][user_id]=' + that.userId
            filter1 += '&filter[skip]=0'
            filter1 += '&filter[limit]=5000'
            var url = "user_dingyue?" + filter1;
            var method = "GET";
            that.ajax({url, method,
              success:function(data) {
                that.mySelectList = data;
                for (var i = 0; i < dat.length; i++) {
                  var dic = dat[i];
                  dic.isOperate = true
                  dic.ischeck = false
                  for (var j = 0; j < that.mySelectList.length; j++) {
                    if (that.mySelectList[j].info == dic.id) {
                      dic.ischeck = true
                      break;
                    }
                  }
                  if (dic.up == "0") {
                    that.mylist.push(dic);
                  } else {
                    that.mylist2.push(dic);
                  }
                }
              }
            });
          }
        });
      },
      done() {
        var that = this;

        var temp = true;
        for (var i = 0; i < that.mylist.length; i ++) {
          if (that.mylist[i].ischeck) {
            temp = false;
            break;
          }
        }
        for (var i = 0; temp && i < that.mylist2.length; i ++) {
          if (that.mylist2[i].ischeck) {
            temp = false;
            break;
          }
        }
        if (temp) {
          that.$MessageBox.alert("请至少选择一条栏目！")
          return;
        }

        // 开始加载
        that.$Indicator.open();

        if (that.mySelectList.length == 0) {
          that.addData();
          return;
        }

        var requests = []
        for (var i = 0; i < that.mySelectList.length; i++) {
          var json = {}
          json.method = 'DELETE'
          json.path = '/mcm/api/user_dingyue/' + this.mySelectList[i].id
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
            that.addData();
          },
          error:function(errorData) {
            // 结束加载
            that.$Indicator.close();
          }
        });
      },
      addData() {
        var that = this;

        var requests = []
        for (var i = 0; i < that.mylist.length; i ++) {
          if (that.mylist[i].ischeck) {
            var json = {}
            json.method = 'POST'
            json.path = '/mcm/api/user_dingyue/'
            var body = {}
            body.user_id = that.userId
            body.info = that.mylist[i].id
            json.body = body
            requests.push(json)
          }
        }
        for (var i = 0; i < that.mylist2.length; i ++) {
          if (that.mylist2[i].ischeck) {
            var json = {}
            json.method = 'POST'
            json.path = '/mcm/api/user_dingyue/'
            var body = {}
            body.user_id = that.userId
            body.info = that.mylist2[i].id
            json.body = body
            requests.push(json)
          }
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
            // 结束加载
            that.$Indicator.close();
            that.$router.backRoute();
          },
          error:function(errorData) {
            // 结束加载
            that.$Indicator.close();
          }
        });
      },
      changecolor:function(index) {
        this.mylist[index].ischeck = !this.mylist[index].ischeck
      },
      changecolor2:function(index) {
        this.mylist2[index].ischeck = !this.mylist2[index].ischeck
      }
    },
    activated() {
      this.mylist = []
      this.mylist2 = []
      this.userId = window.localStorage.getItem('userId');
      this.initdata()
    }
  }
</script>

<style scoped>
  .done {
    position: fixed;
    top: 0.775rem;
    right: 0.7rem;
    height: 0.7rem;
    z-index: 10;
  }
  .done img {
    height: 100%;
  }
  .myback {
    background-color: #eee;
  }
  .mytitle {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    background-color: #eee;
  }
  .lanmu {
    padding: 10px 0 25px;
    width: 100%;
    height: auto;
    float: left;
    left: 0px;
    background-color: white;
  }
  .lanmu1 {
    margin-top: 45px;
    width: 100%;
    height: auto;
    float: left;
    left:0px;
  }
  .mybutton {
    background: #fbfbfb;
    height: 40px;
    width: calc((100% - 40px) / 3);
    border: none;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
  }
  .mybutton_active {
    background: #e75248;
    color: #ffffff;
  }
</style>

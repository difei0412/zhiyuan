<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'成就简介'"></myHeader>

        <div style="padding:0 0.5rem">
            <textarea v-model="geqian" class="text " placeholder="请输入您的成就简介"></textarea>
            <div class="exitBg my-middle">
              <div class="aui-btn aui-btn-success aui-btn-block aui-btn-sm" @click="submit">确 定</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'geqian',
        data() {
            return {
                geqian: '',
                vuegConfig: {
                  disable: false,
                  forwardAnim: 'fadeInRight',
                  duration: '.3',
                  backAnim: 'fadeInRight'
               }
            }
        },
        methods: {
          //获取用户信息函数
      		getUserInfo() {
      			var that = this;
      			var userId = window.localStorage.getItem('userId');
      			var url = "expert/" + userId;
      			var method = "GET";
      			that.ajax({url,method,
      				success:function(data){
      					that.geqian = data.timelist?data.timelist:'';
      				}
      			})
      		},
          submit() {
            var that = this;
            var userId = window.localStorage.getItem('userId');
      			var url = "expert/" + userId;
      			var method = "POST";
      			var params = {
      				"data":{
      					"timelist":that.geqian,
      					"_method":"PUT"
      				}
      			}
      			that.ajax({url,method,params,
      				success:function(data){
                window.localStorage.removeItem('userinfo_obj')
      					that.$MessageBox.alert("修改成功！");
                that.$router.back();
      				}
      			})
          }
        },
        activated() {
          this.getUserInfo();
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
        height: 7rem;
        margin: 0.7rem auto 0;
        padding: 0.5rem;
        font-size: 0.7rem;
        color: #0f0f0f;
        background-color: rgb(250, 250, 250);
        letter-spacing: 0.1rem;
        border:1px solid #eee;
    }
    .exitBg {
        height: 5rem;
        /*padding: 0 0.5rem;*/
    }
    .aui-btn-success {
      background: #28B8A1;
    }
</style>

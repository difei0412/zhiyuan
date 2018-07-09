<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'修改签名'"></myHeader>

        <div>
            <textarea v-model="geqian" class="text " maxlength="30" placeholder="请输入您的个性签名"></textarea>
            <div class="exitBg my-middle">
                <div class="exit" @click="submit">修改</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'geqian',
        data() {
            return {
                geqian: ''
            }
        },
        methods: {
          //获取用户信息函数
      		getUserInfo() {
      			var that = this;
      			var userId = window.localStorage.getItem('userId');
      			var url = "f_user/" + userId;
      			var method = "GET";
      			that.ajax({url,method,
      				success:function(data){
      					that.geqian = data.Qm?data.Qm:'';
      				}
      			})
      		},
          submit() {
            var that = this;
            var userId = window.localStorage.getItem('userId');
      			var url = "f_user/" + userId;
      			var method = "POST";
      			var params = {
      				"data":{
      					"Qm":that.geqian,
      					"_method":"PUT"
      				}
      			}
      			that.ajax({url,method,params,
      				success:function(data){
      					that.$MessageBox.alert("修改成功！");
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
</style>

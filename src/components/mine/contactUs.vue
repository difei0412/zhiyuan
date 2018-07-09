<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'反馈'"></myHeader>

        <div>
            <textarea v-model="feedBackText" class="text " maxlength="200" placeholder="你的提议和意见..."></textarea>
            <div class="exitBg my-middle">
                <div class="exit" @click="submit">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contactUs',
        data() {
            return {
                feedBackText: ''
            }
        },
        methods: {
          submit() {
            var that = this;
            if(!that.feedBackText) {
              that.$MessageBox.alert("请输入内容！")
              return
            }
            var url = "user_fankui";
            var method = "POST";
            var params = {
              "data":{
                "content":that.feedBackText,
                "user_id":window.localStorage.getItem("userId")
              }
            }
            that.ajax({url,method,params,isKeep:true,
              success:function(response){
                that.$MessageBox.alert("反馈成功").then(function(){
                  that.feedBackText = "";
                })
              },
              error:function(error){

              }
            })
          }
        },
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

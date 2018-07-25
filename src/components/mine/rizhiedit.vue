<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'编写住院日志'"></myHeader>

        <div class="date-box">
          <date-picker v-model="time1" type="datetime" :confirm="confirm" confirm-text="确认" :editable="editable" :format="format"></date-picker>
        </div>

        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-form-list">
              <li class="aui-list-item">
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-label">
                          用药建议
                      </div>
                      <div class="aui-list-item-input">
                          <input type="text" placeholder="请输入用药建议">
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-label">
                          睡眠建议
                      </div>
                      <div class="aui-list-item-input">
                          <input type="text" placeholder="请输入睡眠建议">
                      </div>
                  </div>
              </li>
              <li class="aui-list-item">
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-label">
                          其他建议
                      </div>
                      <div class="aui-list-item-input">
                          <input type="text" placeholder="请输入其他建议">
                      </div>
                  </div>
              </li>
            </ul>
        </div>
        <div>
            <textarea class="text " placeholder="请输入日志内容"></textarea>
            <div class="exitBg my-middle">
              <div class="aui-btn aui-btn-success aui-btn-block aui-btn-sm" @click="submit">确 定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker'
    export default {
        name: 'geqian',
        components:{DatePicker},
        data() {
            return {
                confirm:true,
                editable:false,
                format:'YYYY-MM-DD  HH:mm:ss',
                time1: '',
                time2: '',
                time3: '',
                shortcuts: [
                  {
                    text: '今天',
                    onClick: () => {
                      this.time3 = [ new Date(), new Date() ]
                    }
                  }
                ],
                timePickerOptions:{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30'
                }
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
        padding: 0 0.5rem;
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
    .aui-btn-success {
      background: #28B8A1;
    }
    .aui-list-item {
      border-bottom: 1px solid #eee;
      font-size:14px;
    }
    .aui-list-item-label{
      color:#28B8A1;
    }
    .aui-list-item-input input {
      font-size:14px;
    }
    .date-box {
      padding:0 0.5rem;
    }
</style>
<style>
    .mx-datepicker {
      border:1px solid #eee;
      width:100%;
      margin: 0.5rem auto;
      display: block;
      background: #eee;
    }
    .mx-input-wrapper input {
      padding:0 0.5rem !important;
      text-align: center !important;
      color:#666 !important;
    }
    .mx-calendar-icon,.mx-input-icon {
      background: #eee;
    }
    .mx-datepicker-popup,.mx-calendar,.mx-calendar-content {
      width:100%;
    }
    .mx-panel-date td.today {
      color:#28B8A1;
      font-weight: bold;
    }
    .mx-calendar-content .cell.actived {
      background-color: #28B8A1;
    }
</style>

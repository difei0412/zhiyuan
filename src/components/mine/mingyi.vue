<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'线上诊室'"></myHeader>
        <ul class="aui-list aui-media-list">
          
            <li class="aui-list-item aui-list-item-middle"  @click="openinfo()">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-list-img-sm" style="max-widht:30px">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="aui-list-item-title aui-font-size-14">患者：林洪生</div>
                             <div class="aui-list-item-right" style="color:blue">付款：￥19.00</div>
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            预约：2018-06-19 17：00 - 17：30 线上诊疗
                        </div>
                        <div class="aui-list-item-text yuding-time" style="margin-left:11px">
                            诊疗时间：30分钟
                        </div>
                         <div class="aui-list-item-text" style="margin-left:11px">
                            <div class="order-status">待完成</div>
                        </div>
                    </div>
                </div>
            </li>
           
        </ul>
        <section class="aui-content" style="border-top:1px solid #ccc">
          <div class="aui-card-list">
            <div class="aui-card-list-header">
                设置计时器
            </div>
            <div class="aui-card-list-content-padded ">
                  <div class="aui-row aui-row-padded">
                      <div class="aui-col-xs-12">
                           <span class="font-djs">设定倒计时</span><div class="aui-label aui-label-success">12:08:23  <i class="aui-iconfont aui-icon-calendar"></i></div>
                      </div>
                  </div>
            </div>
              <div class="aui-card-list-footer">
                <div class="aui-col-xs-12">
                  <div class="aui-btn aui-btn-success">完成</div>
                  <div class="aui-btn">取消</div>
                </div>
              </div>
        </div>
      </section>
    </div>
</template>

<script>
import Calendar from '../vue-calendar-component/index';
    export default {
        name: 'geqian',
        data() {
            return {
             arr2: ['2018-7-3'],
                      arr: [
                {
                  date: '2018-07-04',
                  className: 'mark1'
                },
                {
                  date: '2018/7/5',
                  className: 'mark1'
                },
                {
                  date: '2018/7/6',
                  className: 'mark2'
                }
              ]     
            }
        },
        methods: {
          openinfo() {
            this.$router.push({path:'/yuyueinfo'})
          },
          //获取用户信息函数
           openim:function(){
          this.$router.push({path:'/im'})
           },
      	   clickDay(data) {
         // alert(data)
    },
    changeDate(data) {
      function format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
    this.arr = [
      {
        date: format(new Date(), 1),
        className: 'mark1'
      },
      {
        date: format(new Date(), 2),
        className: 'mark1'
      },
      {
        date: format(new Date(), 13),
        className: 'mark2'
      }
    ];
//  alert(JSON.stringify(this.arr))
    this.arr2 = [format(new Date(), 23)]
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }
        },
        activated() {
          
        },
         created() {
    function format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
    this.arr = [
      {
        date: format(new Date(), 1),
        className: 'mark1'
      },
      {
        date: format(new Date(), 2),
        className: 'mark1'
      },
      {
        date: format(new Date(), 13),
        className: 'mark2'
      }
    ];
//  alert(JSON.stringify(this.arr))
    this.arr2 = [format(new Date(), 23)]
   
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
    color:#27B5B1;
    border:1px solid #27B5B1;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:50px;
    margin-left:10px
}
.order-status {
      width:100%;
      text-align: right;
      color:rgb(255, 152, 0);
      font-size:14px;
    }
    .aui-list-item-inner.aui-list-item-arrow {
      padding-right: 0rem;
      margin-right: 0rem;
    }
    .yuding-time {
      font-size:12px;
      color:#666;
      margin:0.15rem 0;
    }
.aui-label-success {
  margin-left:0.5rem;
}
.aui-card-list {
  border:1px solid #eee;
  margin:0.5rem 0.3rem;
  border-radius:0.5rem;
}
.aui-card-list-content-padded {
  border-top:1px solid #eee;
  border-bottom: 1px solid #eee;
}
.aui-card-list-header {
  font-size: 14px;
  color:#666;
}
.font-djs {
  color:#666;
}
.aui-btn {
  float:right;
}
.aui-btn-success {
  margin-left:0.3rem;
}
</style>

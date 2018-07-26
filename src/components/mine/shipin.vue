<template>
    <div style="background-color: white; height: 100%;">
    <br>
    <br>
    <br>
        <div style="width:100%;text-align:center;height:80px;background:#fff"><img src="static/image/1.jpg" style="margin:0 auto;margin-top:40px;height:90px;width:90px;border-radius:90px"></div>
        <div style="text-align:center;margin-top:30px;font-size:20px">您在与林洪生大夫在线问诊</div>
        <div style="text-align:center;margin-top:30px;font-size:15px">诊室号：90001</div>
        <div style="text-align:center;width:100%;float:left;margin-left:0px;position:relative;margin-top:120px">
              <button class="myred2" @click="closewin()"><i class="aui-iconfont aui-icon-phone" style="font-size:30px"></i></button>
              <button class="myred1" @click="closewin()"><i class="aui-iconfont aui-icon-video" style="font-size:33px"></i></button>
        </div>
        <div style="text-align:center;margin-top:30px;font-size:20px;color:#fb4747">倒计时问诊：30分钟</div>
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
           closewin:function() {
        var _this = this;
        _this.$router.backRoute();
      },
           //获取用户信息函数
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
.myred2{
  background:#fb4747;
  height:40px;
  line-height:40px;
  width:120px;
  color:#fff;
  border:none;
  border-radius:15px;
  
}
.myred1{
  background:green;
  height:40px;
  width:120px;
  color:#fff;
  border:none;
  border-radius:15px;
  margin-top:10px;
  line-height:40px;
 
}
</style>

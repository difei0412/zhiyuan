<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'名医风采'"></myHeader>
        <ul class="aui-list aui-media-list" style=" background-color: #28B8A1;">
          
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-img-round ">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14" style="color:#ffffff;margin-left:11px">林洪生大夫</div>
                            <div class="aui-list-item-right"><button class="button1">关注</button></div>
                        </div>
                        <div class="aui-list-item-text" style="color:#ffffff;margin-left:11px">
                            身心科专家
                        </div>
                        <div class="aui-list-item-text" style="color:#ffffff;margin-left:11px">
                            沈阳知源精神卫生诊疗中心
                        </div>
                        <div class="aui-list-item-text" style="color:#f8f8f8;margin-left:11px">
                            个人简介：为了患者更健康奋斗终身
                        </div>
                    </div>
                </div>
            </li>
           
        </ul>
        <div class="aui-grid" style="border-bottom:1px solid #ddd">
            <div class="aui-row">
                <div class="aui-col-xs-4" style="border-right:1px solid #ddd">
                    <i class="aui-iconfont " style="font-size:18px">11年</i>
                    <div class="aui-grid-label">从业经验</div>
                </div>
                <div class="aui-col-xs-4" style="border-right:1px solid #ddd">
                    <i class="aui-iconfont " style="font-size:18px">2000次</i>
                    <div class="aui-grid-label">回答次数</div>
                </div>
                  <div class="aui-col-xs-4" style="border-right:1px solid #ddd;color:#FF9800">
                    <i class="aui-iconfont " style="font-size:18px">4.9分</i>
                    <div class="aui-grid-label"><i class="aui-iconfont aui-icon-star"  style="font-size:12px"></i><i class="aui-iconfont aui-icon-star" style="font-size:12px"></i><i class="aui-iconfont aui-icon-star" style="font-size:12px"></i><i class="aui-iconfont aui-icon-star" style="font-size:12px"></i><i class="aui-iconfont aui-icon-star" style="font-size:12px"></i></div>
                </div>
                
            </div>
        </div>

        <div class="row" >
        <div style="border:1px solid #000;height:25px;width:25px;text-align:center;border-radius:25px;float:left;margin-left:11px;top:20px;position:relative">
                <i class="aui-iconfont aui-icon-correct" style="color:#000;font-size:12px;margin-top:-5px"></i>
               
            </div>  <span style="margin-top:20px;postion:relative;float:left;margin-left:12px">医师认证</span>
         </div>   
           <div class="aui-grid" >
              <span style="float:left;margin-left:12px;margin-top:10px">擅长疾病</span>
            <div class="aui-row" style="margin-top:30px">
           <button class="l1">神经病</button><button class="l1">神经病</button><button class="l1">神经病</button><button class="l1">神经病</button><button class="l1">神经病</button><button class="l1">神经病</button>
                
            </div>
        </div>

      <Calendar ref="Calendar" :markDateMore="arr"  v-on:isToday="clickToday" agoDayHide=1530115200 v-on:choseDay="clickDay" v-on:changeMonth="changeDate" style="margin-top:60px"></Calendar>
      <div>
      <div class="aui-grid" >
        <div class="myred"></div><span style="margin-top:5px;position:relative;float:left;margin-left:10px">号满</span>
         <div class="myblue"></div><span style="margin-top:5px;position:relative;float:left;margin-left:10px">可以预约</span>
      </div>  
      </div> 
      <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-media-list">
        
        <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media">
                        <img src="static/image/demo1.jpeg" style="width:2rem" class="aui-img-round">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text"  style="margin-left:-30px">
                            <div class="aui-list-item-title">患者问</div>
                            <div class="aui-list-item-right">08:00</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:-30px">
                            我女儿今年20岁，因为高考落榜想自杀，睡不着觉，这怎么办？
                        </div>
                        <div class="aui-info aui-margin-t-5" style="padding:0">
                            <div class="aui-info-item" style="margin-left:-30px">
                                <img src="static/image/1.jpg" style="width:1rem" class="aui-img-round"><span class="aui-margin-l-5">林洪生大夫</span>
                                </div>
                            <div class="aui-info-item">2015-07-14 10:31</div>
                        </div>

                    </div>

                </div>
            </li>
             <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media">
                        <img src="static/image/demo1.jpeg" style="width:2rem" class="aui-img-round">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text"  style="margin-left:-30px">
                            <div class="aui-list-item-title">患者问</div>
                            <div class="aui-list-item-right">08:00</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:-30px">
                            我女儿今年20岁，因为高考落榜想自杀，睡不着觉，这怎么办？
                        </div>
                        <div class="aui-info aui-margin-t-5" style="padding:0">
                            <div class="aui-info-item" style="margin-left:-30px">
                                <img src="static/image/1.jpg" style="width:1rem" class="aui-img-round"><span class="aui-margin-l-5">林洪生大夫</span>
                                </div>
                            <div class="aui-info-item">2015-07-14 10:31</div>
                        </div>

                    </div>

                </div>
            </li>
             <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media">
                        <img src="static/image/demo1.jpeg" style="width:2rem" class="aui-img-round">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text"  style="margin-left:-30px">
                            <div class="aui-list-item-title">患者问</div>
                            <div class="aui-list-item-right">08:00</div>
                        </div>
                        <div class="aui-list-item-text" style="margin-left:-30px">
                            我女儿今年20岁，因为高考落榜想自杀，睡不着觉，这怎么办？
                        </div>
                        <div class="aui-info aui-margin-t-5" style="padding:0">
                            <div class="aui-info-item" style="margin-left:-30px">
                                <img src="static/image/1.jpg" style="width:1rem" class="aui-img-round"><span class="aui-margin-l-5">林洪生大夫</span>
                                </div>
                            <div class="aui-info-item">2015-07-14 10:31</div>
                        </div>

                    </div>

                </div>
            </li>
         </ul>   
         </div>
         <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-header"  style="background:#fff;boorder-bottom:1px solid #ddd">
                所在医院科室介绍
            </li>
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                     <i class="aui-iconfont aui-icon-edit" style="font-size:25px"></i>
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text" style="margin-left:0px">
                            <div class="aui-list-item-title aui-font-size-14">知源精神卫生诊疗中心</div>
                           
                        </div>
                        <div class="aui-list-item-text">
                            身心科  联系电话：022-28124671
                        </div>
                    </div>
                </div>
            </li>
            
        </ul>
    </div>
    <div class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #28B8A1" @click="openim">在线提问</div>
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
</style>

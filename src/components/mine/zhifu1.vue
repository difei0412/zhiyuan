<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'线上诊疗支付'"></myHeader>
         <ul class="aui-list aui-media-list" >
          
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img src="static/image/1.jpg" class="aui-img-round ">
                    </div>
                    <div class="aui-list-item-inner aui-list-item-arrow">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14" style="color:#000;margin-left:11px">林洪生大夫</div>
                           
                        </div>
                        <div class="aui-list-item-text" style="color:#000;margin-left:11px">
                            身心科专家
                        </div>
                        <div class="aui-list-item-text" style="color:#000;margin-left:11px">
                            沈阳知源精神卫生诊疗中心
                        </div>
                        <div class="aui-list-item-text" style="color:#000;margin-left:11px">
                            个人简介：为了患者更健康奋斗终身
                        </div>
                    </div>
                </div>
            </li>
           
        </ul>
     <div>
      
      </div> 
      <div style="color:#fb4747;margin-left:11px" >您选择是2018年6月22日下午龙洪生大夫的线上诊疗</div>
      <div class="aui-card-list">
            <div class="aui-card-list-header">
                <div><span class="aui-text-danger"> 请选择支付方式</span></div>
               
            </div>
            <div class="aui-card-list-content">
                <ul class="aui-list aui-media-list">
                    <li class="aui-list-item aui-list-item-middle">
                        <div class="aui-media-list-item-inner">
                            <div class="aui-list-item-media" style="width: 3rem;">
                                <img src="static/image/zhifubao.jpeg" >
                            </div>
                            <div class="aui-list-item-inner aui-list-item-arrow">
                                <div class="aui-list-item-text" style="margin-left:11px">
                                    <div class="aui-list-item-title aui-font-size-14">支付宝</div>
                                   
                                </div>
                                
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item aui-list-item-middle">
                        <div class="aui-media-list-item-inner">
                            <div class="aui-list-item-media" style="width: 3rem;">
                                <img src="static/image/weixin.jpg" >
                            </div>
                            <div class="aui-list-item-text" style="margin-left:11px;color:#000">
                                微信支付
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="aui-card-list">
            <div class="aui-card-list-header">
                <div><span class="" style="color:#000"> 挂号费用合计：</span></div>
               
            </div>
            <li class="aui-list-item aui-list-item-middle">
             <input type="text" value="120元" style="text-align:center;border-bottom:1px solid #666;color:red">           
           </li>
            
        </div>
         <div class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: red" @click="next">进入诊室</div>
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
        
         next(){
             this.$router.push({path:'/shipin'})  
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

<style >
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

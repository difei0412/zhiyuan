<template>
    <div style="background-color: white; min-height: 100%;">
        <myHeader :title="'监护权确认'"></myHeader>
        <ul class="aui-list aui-form-list">
        <li class="aui-list-header">患者信息填写</li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                  住院者姓名
                </div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入姓名">
                </div>
            </div>
        </li>
          <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                 身份证号
                </div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入身份证号">
                </div>
            </div>
        </li>
         <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
               与本人关系
                </div>
                 <div class="aui-list-item-input">
                    <label><input class="aui-radio" type="radio" name="demo1" checked>夫妻

 </label>
                    <label><input class="aui-radio" type="radio" name="demo1"> 父母</label>
                     <label><input class="aui-radio" type="radio" name="demo1"> 子女</label>
                     <label><input class="aui-radio" type="radio" name="demo1"> 兄弟姐妹</label>
                      <label><input class="aui-radio" type="radio" name="demo1"> 其他</label>
                </div>
            </div>
        </li>
       </ul> 
            <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #28B8A1;"  @click="opennext()">确认监护权</button>
            <div class="aui-content aui-content-padded ">
              <center>隐私协议</center>
               <div class="aui-content">不过病患隐私权并非无限上纲，基于公共卫生及大众利益考量，病患隐私必须有一定的规范。如何平衡各国政府的公共卫生利益、第三人利益及个人隐私利益的冲突问题，便是维护病人隐私的最大挑战。原则上视其利益何者较为重大而定，必须个别认定。例如中华人民共和国的传染病防治法第三十七条第一项及第二项规定，医师诊治病人或医师、法医师检验尸体，发现传染病或疑似传染病时，应视实际情况立即采行必要之感染控制措施，并报告该管主管机关。病人情况有异动时，亦同。第三类传染病应于1 周内完成，必要时中央主管机关得调整之。另外中华民国的传染病防治法第三十八条也规定，医师以外医事人员执行业务，发现传染病病人、疑似传染病病人，或因而致死之尸体时，应即报告医师或依规定报告。 医疗（事）机构应指定专责人员负责督促所属医事人员依规定办理。这些规定都是对病患隐私的限制的例子，西方国家也有类似的规定。</div>
            </div>
            <div class="aui-list-item-inner">
                  
                    <div class="aui-list-item-input" style="margin-left:11px">是否同意隐私协议
                        <input type="checkbox" class="aui-switch" checked="">
                    </div>
                </div>
                <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #28B8A1;"  @click="opennext()">进入患者监护</button>
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
        
         
         opennext(){
             this.$router.push({path:'/jianhu_detail'}) 
         }
   
   
        },
        activated() {
          
        },
       created() {
   
   
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
.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
</style>

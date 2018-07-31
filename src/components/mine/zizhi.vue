<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'资质认证'"></myHeader>
    <div class="aui-list-item-inner">
      <div class="aui-row aui-row-padded">
        <form action="http://d.apicloud.com/mcm/api/file" id="imagform0" method="post" enctyp="multipart/form-data">
          <div class="aui-col-xs-4 pic-box">
            <img v-preview="'static/image/12.jpg'" :src="'static/image/12.jpg'" preview-title-enable="false" preview-nav-enable="false"/>
            <span @click="delpic()">删除</span>
          </div>
          <div class="aui-col-xs-4 pic-box">
            <img v-preview="'static/image/bingfang.jpeg'" :src="'static/image/bingfang.jpeg'" preview-title-enable="false" preview-nav-enable="false"/>
            <span @click="delpic()">删除</span>
          </div>
          <div class="aui-col-xs-4 pic-box">
            <img v-preview="'static/image/12.jpg'" :src="'static/image/12.jpg'" preview-title-enable="false" preview-nav-enable="false"/>
            <span @click="delpic()">删除</span>
          </div>
          <div class="aui-col-xs-4 pic-box">
            <img v-preview="'static/image/12.jpg'" :src="'static/image/12.jpg'" preview-title-enable="false" preview-nav-enable="false"/>
            <span @click="delpic()">删除</span>
          </div>
          <div class="aui-col-xs-4 pic-box">
            <img v-preview="'static/image/12.jpg'" :src="'static/image/12.jpg'" preview-title-enable="false" preview-nav-enable="false"/>
            <span @click="delpic()">删除</span>
          </div>
          <div class="aui-col-xs-4 pic-box">
            <img v-preview="'static/image/12.jpg'" :src="'static/image/12.jpg'" preview-title-enable="false" preview-nav-enable="false"/>
            <span @click="delpic()">删除</span>
          </div>
        </form>
      </div>
    </div>
    <div> 
      <div class="aui-col-xs-3" style="height:80px;width:80px;background:#ddd;text-align:center;line-height:80px;margin-left:11px;margin-top:15px" @click='shangchuan'>
       <input type="file"  class="uploadFile" name="file" id="file" @change="setImagePreview" hidden/>
       <input type="hidden" height="50px" width="90px" id="type">
       <input type="hidden" height="50px" width="90px" id="filename">
       <i class="aui-iconfont aui-icon-plus" style="font-size:30px;color:#666"></i>

     </div>
     <span style="float:left;font-size:12px;margin-left:0.5rem;margin-top:44px">医生的资格证学历证以及身份证可上传9张</span>
   </div>
   <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #28B8A1;bottom:0px;position:fixed;border:none;border-radius:0rem;"  @click="opennext()">确认提交</button>
   <lg-preview></lg-preview>
 </div>

</template>

<script>
import Calendar from '../vue-calendar-component/index';
import $ from '../public/jquery';
var fileObj = []
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
  //出发file
  shangchuan(){
    $("#file").click()
  },
  //将图片上传到数据库file表
  setImagePreview() {
    var that = this;
    var formData = new FormData($("#imagform0")[0]);
    // fileObj.push(formData)
    // console.log(fileObj)

    console.log(formData)
  },


    //将图片url更新到用户表函数
    updateTx(imgurl) {

      var that = this;
      var url = "expert/" + that.userId;
      var method = "POST";
      var params = {
        "data":{
          "tx":imgurl,
          "_method":"PUT"
        }
      }
      that.ajax({url,method,params,
        success:function(response){
        }
      })
    },
          // 删除图片
          delpic(obj) {
            var el = event.currentTarget;
            $(el).parent().remove();
          },
          opennext(){
            // for (var i = 0; i < fileObj.length; i++) {
              this.setImagePreview1(fileObj)
              // console.log(fileObj[i])
              
            // }
            
          },
           //将图片上传到数据库file表
           setImagePreview1(formData) {
            console.log(formData)
            var that = this;
            var url =  "file";
            var method = "POST";
      // var formData = new FormData($("#imagform0")[0]);
      var params = {
        data : formData,
        /**
         * 必须false才会避开jQuery对 formdata 的默认处理
         * XMLHttpRequest会对 formdata 进行正确的处理
         */
         processData : false,
        /**
         *必须false才会自动加上正确的Content-Type
         */
         contentType : false,
       }
       that.ajax({url,method,params,
        success:function(response){
          console.log(response)
          // if(response.url) {
            // that.userInfo.tx = response.url;
            // that.updateTx(that.userInfo.tx);
          // }
        },
        error:function(error){
          that.$MessageBox.alert('图片上传错误，请重新上传！')
        }
      })
     },
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
.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
.aui-list-item-input input,.aui-list-item-input textarea{
  font-size:14px;
}
.aui-row-padded {
  padding:0 0.5rem;
}
.pic-box {
  margin:0.1rem 0rem;
  position: relative;
}
.pic-box:nth-child(1){
  margin:0.5rem 0 0.1rem;
}
.pic-box:nth-child(2){
  margin:0.5rem 0 0.1rem;
}
.pic-box:nth-child(3){
  margin:0.5rem 0 0.1rem;
}
.pic-box img{
  width:100%;
  height:5.5rem;
  margin:0;
  padding:0;
}
.pic-box span {
  position: absolute;
  left:0;
  bottom:0;
  font-size:12px;
  width:-webkit-fill-available;
  width:fill-available;
  height:1.2rem;
  background: rgba(0,0,0,0.5);
  color:#fff;
  margin:0.125rem !important;
  text-align: center;
  line-height: 1.2rem;
}

</style>

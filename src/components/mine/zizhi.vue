<template>
  <div style="background-color: white; min-height: 100%;">
    <myHeader :title="'资质认证'"></myHeader>
    <div class="aui-list-item-inner">
      <div class="aui-row aui-row-padded">
        <!-- <form action="http://d.apicloud.com/mcm/api/file" id="imagform0" method="post" enctyp="multipart/form-data" -->
          <div id="photo">
           <div class="aui-col-xs-4 pic-box" v-for='(item,index) in filesobj'>
            <img v-preview='item' :src='item'  preview-title-enable="false" preview-nav-enable="false" :id='index'/>
            <span @click="delpic()">删除</span>
          </div>

        </div>



        <!-- </form> -->
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
   <button class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="background-color: #34DBDA;bottom:0px;position:fixed;border:none;border-radius:0rem;"  @click="opennext()">确认提交</button>
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
     toast: null,
     dataUrl:'',
     filesobj:[],    
     vuegConfig: {
      disable: false,
      forwardAnim: 'fadeInRight',
      duration: '.3',
      backAnim: 'fadeInRight'
    }
  }
},
methods: {
  //getimg
  getImg(){
    var that = this;
      // that.$MessageBox.alert("资料补全后，等待审核通过方可操作平台");
      var userId = window.localStorage.getItem('userId');
      that.userId = userId?userId:'';
      var url = 'expert/'+that.userId;
      // alert(url)
      var method = "GET";
      that.ajax({url,method,
        success:function(data){

          that.filesobj = data.file_list
          //console.log(that.filesobj)
        }
      })
    },
  //出发file
  shangchuan(){

    if ($("#photo").children().length >= 9) {
      this.$MessageBox.alert('最多只能上传9张照片')
      return
    }
    $("#file").click()
  },
  //将图片上传到数据库file表
  setImagePreview(e) {
    var that = this;
    // var formData = new FormData($("#imagform0")[0]);
    // fileObj.push(formData)
    // console.log(fileObj)
    
    var files = e.target.files;
    var file = files[0];
    e.currentTarget.value= '';
    var reader = new FileReader();
    reader.readAsDataURL(file);
    $(reader).load(function () {
      // $('#photo').children("img").attr("src", this.result);
      // fileObj.push(this.result)
      // // that.dataUrl = this.result
      // that.filesobj=fileObj
      // that.filesobj.push(this.result);　　
      // console.log("压缩前：" + this.result.length / 1024  );　
      // 
      // 
      // 
      // 
      //图片压缩初稿　
      if((this.result.length / 1024) < 2048){
        console.log("图片小于2m不需要压缩")
        that.filesobj.push(this.result);　
      }else{
        console.log("图片大于2m需要压缩")
        // 调用函数处理图片 　　　　　　　　　　　　　　　　
        that.dealImage(this.result, {
          // 注意：在pc端可以用绝对路径或相对路径，移动端最好用绝对路径（因为用take photo后的图片路径，我没有试成功（如果有人试成功了可以分享一下经验））
          width : 200
        }, function(base){
          //直接将获取到的base64的字符串，放到一个image标签中就可看到测试后的压缩之后的样式图了
           // document.getElementById("transform").src = base;
           console.log("压缩后：" + base.length / 1024 );　　
           that.filesobj.push(base);　　
         })
      //console.log(that.filesobj)
      

    }
  })

  },

// 压缩
dealImage(path, obj, callback){
 var img = new Image();
 img.src = path;
 img.onload = function(){
  var that = this;
  // 默认按比例压缩
  var w = that.width,
  h = that.height,
  scale = w / h;
  w = obj.width || w;
  h = obj.height || (w / scale);
  var quality = 1;  // 默认图片质量为0.7
  //生成canvas
  var canvas = document.createElement('canvas');
  // canvas.style.background = "red"
  var ctx = canvas.getContext('2d');
  // 创建属性节点
  var anw = document.createAttribute("width");
  anw.nodeValue = w;
  var anh = document.createAttribute("height");
  anh.nodeValue = h;
  canvas.setAttributeNode(anw);
  canvas.setAttributeNode(anh); 
  ctx.drawImage(that, 0, 0, w, h);
  // 图像质量
  if(obj.quality && obj.quality <= 1 && obj.quality > 0){
   quality = obj.quality;
 }
  // quality值越小，所绘制出的图像越模糊
  var base64 = canvas.toDataURL('image/jpeg', quality );
  // 回调函数返回base64的值
  callback(base64);
}
},



    //将图片url更新到用户表函数
    updateTx(imgurl) {

      var that = this;
      var url = "expert/" + window.localStorage.getItem('userId');
      var method = "POST";
      var params = {
        "data":{
          "file_list":imgurl,
          "_method":"PUT"
        }
      }
      that.toast.loading({
       title:"加载中",
       duration:2000
     },function(ret){
     });
      //console.log(url)
      that.ajax({url,method,params,
        success:function(res){
          that.toast.hide();
          if(JSON.stringify(res)!='{}'){
            setTimeout(function(){
              that.$router.back();
            }, 2000);
            that.toast.success({
              title:"提交成功",
              duration:2000
            });
          }else{
            that.toast.fail({
              title:"提交失败",
              duration:2000
            });
          }
        },
        error:function() {
          that.toast.fail({
            title:"提交失败",
            duration:2000
          });
        }
      })
    },
          // 删除图片
          delpic(obj) {
            var el = event.currentTarget;
            this.filesobj.splice($(el).prevAll().attr('id'),1)
            //console.log(this.filesobj)
            // $(el).parent().remove();
          },
          opennext(){
            this.updateTx(this.filesobj);
          },

        },
        activated() {
          this.filesobj = [];
          this.getImg()
        },
        created() {
          this.toast = new auiToast();
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
      color:#34DBDA;
      border:1px solid #34DBDA;
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

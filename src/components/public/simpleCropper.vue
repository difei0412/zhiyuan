<template> 
 <div class="v-simple-cropper"> 
 <slot> 
  <button @click="upload">上传图片</button> 
 </slot> 
 <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange"> 
 <div class="v-cropper-layer" ref="layer"> 
  <div class="layer-header"> 
  <button class="cancel" @click="cancelHandle">取消</button> 
  <button class="confirm" @click="confirmHandle">裁剪</button> 
  </div> 
  <img ref="cropperImg"> 
 </div> 
 </div> 
</template> 
  
<script> 
import Cropper from 'cropperjs' 
import 'cropperjs/dist/cropper.min.css' 
export default { 
 name: 'v-simple-cropper', 
 toast: null,
 props: { 
 initParam: Object, 
 successCallback: { 
  type: Function, 
  default: () => {} 
 } 
 }, 
 data () { 
   return { 
    cropper: {}, 
    filename: '' 
   } 
 }, 
 mounted () { 
  this.toast = new auiToast();
  this.init(); 
 }, 
 methods: { 
 // 初始化裁剪插件 
 init () { 
  let cropperImg = this.$refs['cropperImg'] 
  this.cropper = new Cropper(cropperImg, { 
  aspectRatio: 1 / 1, 
  dragMode: 'move' 
  }) 
 }, 
 // 点击上传按钮 
 upload () { 
  this.$refs['file'].click() 
 }, 
 // 选择上传文件 
 uploadChange (e) {
  let file = e.target.files[0] 
  this.filename = file['name'] 
  let URL = window.URL || window.webkitURL 
  this.$refs['layer'].style.display = 'block' 
  this.cropper.replace(URL.createObjectURL(file)) 
 }, 
 // 取消上传 
 cancelHandle () { 
  this.cropper.reset() 
  this.$refs['layer'].style.display = 'none' 
  this.$refs['file'].value = '' 
 }, 
 // 确定上传 
 confirmHandle () { 
  let cropBox = this.cropper.getCropBoxData() 
  let scale = this.initParam['scale'] || 1 
  let cropCanvas = this.cropper.getCroppedCanvas({ 
  width: cropBox.width * scale, 
  height: cropBox.height * scale 
  }) 

  var that = this;
  that.toast.loading({
       title:"处理中...",
       duration:2000
  },function(ret){
  });
  setTimeout(function(){
     cropCanvas.toBlob(function(blob){
      let formData = new FormData() 
      //formData.append('fileType', this.initParam['fileType']) 
      formData.append('file', blob)
      var url =  "file";
      var method = "POST";
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
        success:function(res){
          that.toast.hide();
          if(res.url) {
            that.successCallback(res) 
            that.cancelHandle() 
          }
        },
        error:function(error){
          that.toast.hide();
          that.$MessageBox.alert('图片上传错误，请重新上传！')
        }
      })
    });
  }, 70);
  //let imgData = cropCanvas.toDataURL('image/jpeg') 
  // let formData = new FormData() 
  //formData.append('fileType', this.initParam['fileType']) 
  // formData.append('file', imgData) 
  // formData.append('signId', this.$localStorage('signId')) 
  // formData.append('originalFilename', this.filename) 


  // window.$axios(this.initParam['uploadURL'], formData, { 
  // method: 'post', 
  // headers: {'Content-Type': 'multipart/form-data'} 
  // }).then(res => { 
  // this.successCallback(res.data) 
  // this.cancelHandle() 
  // }) 
 } 
 } 
} 
</script> 
  
<style scoped> 
.v-simple-cropper .file {
  display: none;
}
.v-simple-cropper .v-cropper-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99999;
  display: none;
}
.v-simple-cropper .v-cropper-layer .layer-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  background: #fff;
  width: 100%;
  height: .8rem;
  padding: 0 .2rem;
  box-sizing: border-box;
  height:2.25rem;
  line-height: 2.25rem;
}
.v-simple-cropper .v-cropper-layer .cancel,
.v-simple-cropper .v-cropper-layer .confirm {
  line-height: .8rem;
  font-size: .28rem;
  background: inherit;
  height:2.25rem;
  border: 0;
  outline: 0;
  float: left;
  font-size:0.65rem;
  font-weight: bold;
}
.v-simple-cropper .v-cropper-layer .confirm {
  float: right;
}
.v-simple-cropper .v-cropper-layer img {
  position: inherit!important;
  border-radius: inherit!important;
  float: inherit!important;
}
 
</style> 
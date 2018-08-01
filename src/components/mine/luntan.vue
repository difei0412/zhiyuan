<template>
    <div style="background-color: white; min-height: 100%;">
        <div>
          <div class="aui-bar"></div>
          <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left" @click="closewin">
              <img src="static/image/fanhui@3x.png">
            </div>
            <div class="aui-title">论坛</div>
            <div class="fatie-btn"><a href="javascript:;" @click="openfatie()">发帖</a></div>
          </header>
        </div>
    <section class="aui-refresh-content">
     <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <!-- <li class="aui-list-header">
               最新帖子
               <div>
                  <i class="aui-iconfont aui-icon-refresh" style="margin-right:5px"></i>
                  <span>换一批</span>
              </div>
            </li> -->
            <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none" @click="opentiezi()">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                            患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2 doctor-answer">
                            医师：您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item doctor-box">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text doctor">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right"><div class="aui-label">优质问答</div></div>
                          </div>
                      </div>
                  </div>
                 
              </li>
              <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none" @click="opentiezi()">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                            患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2 doctor-answer">
                            医师：您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item doctor-box">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text doctor">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right"><div class="aui-label">优质问答</div></div>
                          </div>
                      </div>
                  </div>
                 
              </li>
              <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none" @click="opentiezi()">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                            患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2 doctor-answer">
                            医师：您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item doctor-box">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text doctor">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right"><div class="aui-label">优质问答</div></div>
                          </div>
                      </div>
                  </div>
                 
              </li>
              <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none" @click="opentiezi()">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                            患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2 doctor-answer">
                            医师：您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item doctor-box">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text doctor">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right"><div class="aui-label">优质问答</div></div>
                          </div>
                      </div>
                  </div>
                 
              </li>
              <li class="aui-list-item aui-list-item-arrow" style="border-bottom:none" @click="opentiezi()">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-inner">
                         
                          <div class="aui-list-item-text aui-ellipsis-2" style="color:#000">
                            患者问：医生您好！我在初中时因为过马路时被小轿车撞到脚部导致骨折，近两年腿部经常感...
                          </div>
                          <div class="aui-list-item-text aui-ellipsis-2 doctor-answer">
                            医师：您好！很荣幸帮助你！根据您的描述，您可能是因为初中时的车祸导致了骨质问题，你最好先去医院进行拍...
                          </div>
                      </div>
                  </div>
              </li>
              <li class="aui-list-item doctor-box">
                  <div class="aui-media-list-item-inner">
                      <div class="aui-list-item-media">
                          <img src="static/image/sofa@3x.png" class="aui-img-round">
                      </div>
                      <div class="aui-list-item-inner">
                          <div class="aui-list-item-text doctor">
                              <div class="aui-list-item-title">XXXXX  主治医师  </div>
                              <div class="aui-list-item-right"><div class="aui-label">优质问答</div></div>
                          </div>
                      </div>
                  </div>
                 
              </li>
          
          
        </ul>

    </div>
  </section>
    </div>

</section>

    </div>
  
</template>

<script>
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
          openfatie(){
           this.$router.pushRoute({path:'/fatie'})
          },
          openzhifu:function(){
           this.$router.pushRoute({path:'/mingyi'})
          },
          opentiezi(){
          this.$router.pushRoute({path:'/tiezi'})
          },
          closewin:function() {
            var _this = this;
            _this.$router.backRoute();
          }
          
        },
        activated() {
          
        },
       created() {
   
   
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

.textareacls{
  width:90%;
  position:relative;
  float:left;
  margin-left:5%;
  margin-top:20px;
  height:95px;

}
.l1{
    color:#27B5B1;
    border:1px solid #27B5B1;
    border-radius:8px;
    font-size:12px;
    background:#fff;
    width:60px;
    margin-left:10px
}

.aui-list-item-media {
  width:2rem !important;
  height:2rem !important;
  border-radius: 1rem;
  border: 1px solid #eee;
  overflow: hidden;
}
.aui-list-item-media img {
  min-height: 2rem;
  min-width: 2rem;
}
.doctor {
  height:2.2rem;
  line-height: 2.2rem;
  padding-left:0.7rem;
}
.doctor .aui-list-item-title {
  color:#666;
}
.doctor-box {
  padding-top:0rem;
}
.doctor-answer {
  margin-top:0.5rem;
}
.aui-label {
  top:-0.1rem;
}
 .aui-pull-left img {
    margin-top: 0.5rem;
    height: 1.25rem;
  }
  .aui-bar-nav {
    background-color: #28B8A1;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index:99999999999
  }
  .fatie-btn {
    position:absolute;
    right:0.7rem;
    top:0;
  }
  .fatie-btn a {
    font-size:14px;
  }
</style>

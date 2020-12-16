<template>
  <div class="threedcontent">
    <div class="header">
      <img src="../../../assets/image/searchPicturePC/addHeaderBg.png" />
      <!--顶部个人信息-->
      <div class="userInfo">{{ userName }}，您好</div>
      <!--花型管理按钮-->
      <!-- <div class="headerBtn flowerBtn" @click="goToManage">花型管理</div> -->
      <!--返回按钮-->
      <div class="headerBtn" @click="goToList">返回模型列表</div>
    </div>
    <!-- 3D展示详情页 -->
    <div class="kuai">
      <div
        style="width: 1200px; margin: auto; position: relative"
        class="juzhong1200"
      >
        <div class="zh1">
          <div style="positon: relative">
            <img class="zhimgp" :src="picture" alt />
            <div class="pointBox1">
              <span class="top" @click="directionClick('top')"></span>
              <div class="infeed">
                <span class="left" @click="directionClick('left')"></span>
                <span class="right" @click="directionClick('right')"></span>
              </div>
              <span class="bottom" @click="directionClick('bottom')"></span>
            </div>
            <div class="jiahao" @click="jiahaof">
              <img
                width="22px"
                height="22px"
                src="../../../assets/image/3d/jiahao.png"
                alt
              />
            </div>
            <div class="lineBox1">
              <div class="line1">
                <span
                  id="daxiao"
                  @mousedown="pull($event)"
                  @mouseup="push($event)"
                >
                  <span
                    class="case"
                    style="
                      font-size: 12px;
                      text-align: center;
                      line-height: 20px;
                    "
                    >{{ ratio }}</span
                  >
                </span>
              </div>
            </div>
            <div class="jianhao" @click="jianhaof">
              <img
                width="22px"
                height="4px"
                src="../../../assets/image/3d/jianhao.png"
                alt
              />
            </div>
          </div>
        </div>
        <div class="zh2">
          <span class="zhtext">上下偏移量</span>
          <input
            type="number"
            @blur="inputClicky"
            @keyup.enter="inputClicky"
            v-model="rotateY"
            step="0.1"
            min="0"
            max="1"
            class="zhinput"
          />
        </div>
        <div class="zh3">
          <span class="zhtext">左右偏移量</span>
          <input
            type="number"
            @blur="inputClickx"
            @keyup.enter="inputClickx"
            v-model="rotateX"
            step="0.1"
            min="0"
            max="1"
            class="zhinput"
          />
        </div>
        <button class="zhb1" @click="down">
          <img
            src="../../../assets/image/3d/daochu2.png"
            style="margin-left: 7px"
            alt
          />
          <span style="margin-left: 7px">导出图片</span>
        </button>
      </div>
    </div>
    <Jump v-if="showJump" :title="err" :change="change"></Jump>
    <!-- <Loading v-if="showLoading"></Loading> -->
  </div>
</template>
<script>
import Jump from "../../components/Jump";
// import Loading from "../../components/Loading";
let date = new Date();
export default {
  name: "Content",
  components: {
    Jump
  },
  data () {
    return {
      userName: '',
      err: "",
      height: "",
      navIndex: 0,
      url: "",
      id: "",
      str: "",
      showJump: false,
      // 操作的图片
      picture: '',
      cnt: 1,
      rotateX: "",
      rotateY: "",
      ratio: '1.0',
      // 如果首页已加载花型则接收来着首页的花型参数
      imageUrl: "",
      // baseUrl: 'http://47.111.6.13:10000/test/', //线下
      // baseUrl: 'http://192.168.1.151:9911/', //线下
      baseUrl: 'https://yc.jiangmiantex.com/jiangjin',//线上
    };
  },
  methods: {
    jumpclosef () {
      this.showJump2 = false;
    },
    inputClicky () {
      let self = this;
      if (parseFloat(this.rotateY) > 1 || parseFloat(this.rotateY) < 0) {
        this.showJump = true;
        this.err = "偏移量范围在0-1之间";
        this.rotateY = 0;
        setTimeout(function () {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        let o = {};
        o.rotateY = this.rotateY;
        o.rotateX = this.rotateX;
        o.ratio = this.ratio;
        this.compose(o);
      }
    },
    inputClickx () {
      let self = this;
      if (parseFloat(this.rotateX) > 1 || parseFloat(this.rotateX) < 0) {
        this.showJump = true;
        this.err = "偏移量范围在0-1之间";
        this.rotateX = 0;
        setTimeout(function () {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        let o = {};
        o.rotateX = this.rotateX;
        o.rotateY = this.rotateY;
        o.ratio = this.ratio;
        this.compose(o);
      }
    },
    pull (event) {
      var prevent;
      var self = this;
      var event = event || window.event;
      var _target = event.target;
      var startx = event.clientX;
      var starty = event.clientY;
      var roundX = startx - event.target.offsetLeft;
      var roundY = starty - event.target.offsetTop;
      var width = document.documentElement.clientWidth;
      var height = window.innerHeight;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      document.onmousemove = function (ev) {
        var event = ev || window.event;
        var scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (
          event.clientY < 0 ||
          event.clientX < 0 ||
          event.clientY > height
        ) {
          return false;
        }
        var endx = event.clientX - roundX;
        var endy = event.clientY - roundY;
        if (endx < 0 || endx > 280) {
          if (endx < 0) {
            self.ratio = 2;
          } else {
            self.ratio = 0.1;
          }
          self.push();
        } else {
          _target.style.left = endx + "px";
          prevent = 1 - endx / 280;
          if (prevent <= 0.05) {
            prevent = 0.05;
          }
          self.ratio = (prevent * 2).toFixed(2);
        }
        if (endx < -13 && endx > 13) {
          document.onmousemove = null;
          document.onmouseup = null;
          var o = {};
          o.ratio = self.ratio;
          o.rotateX = self.rotateX;
          o.rotateY = self.rotateY;
          self.compose(o);
        }
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
        let self = this;
        var o = {};
        o.ratio = self.ratio;
        o.rotateX = self.rotateX;
        o.rotateY = self.rotateY;
        self.compose(o);
      };
    },
    jiahaof () {
      let self = this;
      if (self.flag) {
        var daxiao = document.getElementById("daxiao");
        if (self.ratio > 1.9) {
          self.ratio = 2;
        } else if (self.ratio < 0.11) {
          self.ratio = 0.2;
        } else {
          self.ratio = self.ratio + 0.1;
        }
        let endx = 140 * (2 - self.ratio);
        daxiao.style.left = endx + "px";
        var o = {};
        o.ratio = self.ratio;
        o.rotateX = self.rotateX;
        o.rotateY = self.rotateY;
        self.compose(o);
      }
    },
    jianhaof () {
      let self = this;
      if (self.flag) {
        var daxiao = document.getElementById("daxiao");
        if (self.ratio > 2.0) {
          self.ratio = 1.9;
        } else if (self.ratio < 0.21) {
          self.ratio = 0.1;
        } else {
          self.ratio = self.ratio - 0.1;
        }
        let endx = 140 * (2 - self.ratio);
        daxiao.style.left = endx + "px";
        var o = {};
        o.ratio = self.ratio;
        o.rotateX = self.rotateX;
        o.rotateY = self.rotateY;
        self.compose(o);
      }
    },
    move (event) { },
    push () { },
    delLook () {
      this.vip = 1;
    },
    // 方向键点击
    directionClick (direction) {
      let self = this;
      let o = {};
      let speed = 0.05;
      if (!this.rotateX) {
        this.rotateX = 0.0;
      }
      if (!this.rotateY) {
        this.rotateY = 0.0;
      }
      this.rotateX = parseFloat(this.rotateX);
      this.rotateY = parseFloat(this.rotateY);
      if (direction == "top") {
        let num = parseFloat(this.rotateY - speed).toFixed(2);
        if (num < 0) {
          this.rotateY = 0.8;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        } else {
          this.rotateY = num;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        }
      } else if (direction == "left") {
        let num = parseFloat(this.rotateX - speed).toFixed(2);
        if (num < 0) {
          this.rotateX = 0.8;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        } else {
          this.rotateX = num;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        }
      } else if (direction == "right") {
        let num = parseFloat(this.rotateX + speed).toFixed(2);
        if (num >= 1) {
          this.rotateX = 0.2;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        } else {
          this.rotateX = num;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        }
      } else if (direction == "bottom") {
        let num = parseFloat(this.rotateY + speed).toFixed(2);
        if (num > 1) {
          this.rotateY = 0.2;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        } else {
          this.rotateY = num;
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        }
      }
    },
    // 图片点击
    listClick (index) {
      this.flag = 1;
      this.num = index;
      this.num2 = -1;
      if (this.navIndex == 0) {
        this.backImg = this.list[index].preview;
      } else if (this.navIndex == 1) {
        this.backImg = this.list[index].app3dFlowerTypeJygModel.preview;
      } else if (this.navIndex == 2) {
        this.backImg = this.list[index].indentSubsidiaryModels[0].picture1;
      }
      let o = {};
      o.rotateY = this.rotateY;
      o.rotateX = this.rotateX;
      o.ratio = this.ratio;
      this.imageUrl = this.backImg;//shj20191113
      // this.picture=this.backImg;
      this.compose(o);

    },
    // 图片合成接口
    compose (o) {
      let _this = this;
      let template = JSON.parse(localStorage.getItem('template'));
      let obj = {
        back: template.backgroudImage,
        cloth: template.clotheThumbnail,
        pic: this.imageUrl,
        width: template.width,
        height: template.height
      }
      if (o) {
        // 缩放
        if (o.ratio) {
          obj.radio = o.ratio;
        } else {
          obj.radio = 1;
        }
        // 左右偏移
        if (o.rotateX) {
          obj.rotateX = o.rotateX;
        } else {
          obj.rotateX = 1;
        }
        // 上下偏移
        if (o.rotateY) {
          obj.rotateY = o.rotateY
        } else {
          obj.rotateY = 1;
        }
      }
      if (this.imageUrl) {
        this.$post('/compose', obj).then((data) => {
          _this.picture = data.wwwFileBaseUrl + data.data;
        })
      } else {

      }
    },
    // 保存图片到本地
    down () {
      let _this = this;
      let template = JSON.parse(localStorage.getItem('template'));
      let obj = {
        back: template.thumbnail,
        cloth: template.clotheImage,
        pic: this.imageUrl,
        radio: +this.ratio,
        width: template.width,
        height: template.height,
        type: 1
      }
      if (this.rotateY) {
        obj.rotateY = this.rotateY;
      } else {
        obj.rotateY = 1;
      }
      if (this.rotateX) {
        obj.rotateX = this.rotateX;
      } else {
        obj.rotateX = 1;
      }
      this.$post('/compose', obj).then((res) => {
        let url = _this.baseUrl + '/file?path=' + res.data;
        window.open(url, "_blank")
      })
    },
    getHeight () {
      this.height = document.offsetHeight - 74 + "px";
    },
    // 返回
    goToList () {
      this.$router.push({
        name: 'ThreeD',
        params: {
          image: this.$route.params.image
        }
      });
    },
    // 上一页
    prev () {
      let self = this;
      if (this.cnt > 1) {
        this.cnt--;
        if (this.navIndex == 0) {
          this.classifyClick(this.str);
        } else if (this.navIndex == 1) {
          this.getDesign();
          this.getShop();
        } else if (this.navIndex == 2) {
        }
      } else {
        this.showJump = true;
        this.err = "已经是第一页了";
        setTimeout(function () {
          self.showJump = false;
          self.err = "";
        }, 1500);
      }
    },
    // 下一页
    next () {
      let self = this;
      if (this.cnt < this.pageNumber) {
        this.cnt++;
        if (this.navIndex == 0) {
          this.classifyClick(this.str);
        } else if (this.navIndex == 1) {
          this.getDesign();
          this.getShop();
        } else if (this.navIndex == 2) {
        }
      } else {
        this.showJump = true;
        this.err = "已经是最后一页了";
        setTimeout(function () {
          self.showJump = false;
          self.err = "";
        }, 1500);
      }
    }
  },
  mounted () {
    this.getHeight();
    this.userName = JSON.parse(localStorage.getItem("userInfo")).name;
    this.picture = JSON.parse(localStorage.getItem('template')).resultImage,
      this.imageUrl = localStorage.getItem('image');
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  height: auto;
  position: relative;
  text-align: center;
  margin-bottom: -4px;
}
.header img {
  width: 100%;
}
.headerBtn {
  width: 108px;
  height: 29px;
  border: 1px solid #ffffff;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  position: absolute;
  top: 58px;
  right: 113px;
  border-radius: 4px;
  text-align: center;
  line-height: 29px;
  cursor: pointer;
}
.flowerBtn {
  right: 210px;
}
.userInfo {
  position: absolute;
  top: 21px;
  right: 113px;
  display: flex;
  align-items: right;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #ffffff;
}
button {
  cursor: pointer;
}
.fanhui {
  cursor: pointer;
}
.top {
  cursor: pointer;
}
.left {
  cursor: pointer;
}
.bottom {
  cursor: pointer;
}
.right {
  cursor: pointer;
}
.payChecked {
  border: 1px solid #8e8e8e !important;
}
.whitebox2 {
  width: 98px;
  height: 98px;
  margin: 15px auto 0;
  border: none;
}
.whitebox {
  width: 358px;
  height: 142px;
  background: #ffffff;
  margin: 7px auto 0;
  border-radius: 3px;
}
.whitebox1 {
  text-align: center;
}
.whitebox3 {
  background: #fb6413;
  border-radius: 4px;
  width: 140px;
  height: 42px;
  color: white;
  border: 0;
  margin-top: 5px;
  font-size: 14px;
}
.leftTitle {
  height: 32px;
  line-height: 32px;
}
.typeImgArea {
  display: flex;
  text-align: center;
  justify-content: center;
}
.box1 .boxTitle {
  line-height: 38px;
}
.boxTitle {
  font-size: 14px;
  text-align: left;
  vertical-align: middle;
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  color: #242424;
  margin-left: 57px;
  margin-bottom: 16px;
}
input {
  outline: none;
}
.lineBox1 {
  position: absolute;
  left: 9%;
  bottom: 6.8%;
}
.jiahao {
  position: absolute;
  left: 3%;
  bottom: 5%;
  /* background: #ffffff; */
  border-radius: 50%;
  width: 28px;
  height: 28px;
}
.jianhao {
  position: absolute;
  left: 67%;
  bottom: 5.6%;
  /* background: #ffffff; */
  border-radius: 50%;
  width: 28px;
  height: 28px;
  /* background-size: 28px 1px; */
}
.jianhao > img {
  position: relative;
  top: 3px;
}
.line1 {
  width: 300px;
  height: 4px;
  position: relative;
  background: #ffe300;
  border-radius: 4px;
}
.line1 > span {
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #ffed5c;
  box-shadow: 0 5px 15px 0 rgba(27, 27, 78, 0.1);
}
.line1 > span:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
}
.line1 > span:hover .case {
  display: block;
  font-size: 10px;
}
.pointBox1 {
  position: absolute;
  right: 1rem;
  bottom: 4rem;
}
.pointBox1 span {
  background: #fff url("../../../assets/image/shopping/up.png") no-repeat center;
  width: 33px;
  border-radius: 50%;
  display: block;
  height: 33px;

  box-shadow: 0 5px 15px 0 rgba(27, 27, 78, 0.1);
}
.pointBox1 span:hover {
  background: #ffe300 url("../../../assets/image/shopping/up.png") no-repeat
    center;
}
.infeed {
  display: flex;
}
.pointBox1 span.left {
  transform: rotate(-90deg);
  position: relative;
  /* top: -33px; */
  left: -33px;
}
.pointBox1 span.right {
  transform: rotate(90deg);
}
.threedcontent {
  font-size: 14px;
}
.pointBox1 span.bottom {
  transform: rotate(180deg);
}
.wdmianliao {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  margin-right: 42px;
}
.wdhuaxing {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
}
.fanhui {
  position: absolute;
  width: 120px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  top: 35px;
  left: 385px;
}
.zhtext {
  float: left;
  margin-top: 10px;
}
.zhinput {
  background: #ffffff;
  border: 1px solid #979797;
  border-radius: 4px;
  width: 191px;
  height: 38px;
  text-indent: 8px;
}
.kuai {
  max-width: 1650px;
  height: 850px;
  min-width: 1200px;
  background: #ffffff;
  top: 40px;
  margin: auto;
  position: relative;
}
button {
  outline: none;
}
.zh1 {
  width: 527px;
  height: 807px;
  position: absolute;
  left: 0px;
  top: 20px;
}
.zhimgp {
  width: 527px;
  overflow: hidden;
}
.zhimg {
  width: 471px;
  height: 324px;
  display: -webkit-flex;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  background: #ffffff;
  border: 1px solid #979797;
  padding: 42px;
  padding-left: 26px;
}
.zhimg1 {
  width: 92px;
  height: 138px;
  position: relative;
  background: #d8d8d8;
  border: 1px solid #979797;
  margin-left: 16px;
  margin-bottom: 36px;
  overflow: hidden;
}
.imgjuzhong {
  width: 460px;
  height: 138px;
  position: relative;
  left: -184px;
}
.imgjuzhong > img {
  height: 138px;
  min-width: 92px;
  margin: auto;
}
.zhimg2 {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #e1e8ee;
  background: #ffffff;
  position: absolute;
  top: 10px;
  left: 10px;
}
.zhimg2 > img {
  width: 14px;
  height: 14px;
  background-size: 14px 14px;
  position: relative;
  left: -1px;
  top: -1px;
}
.zhimg2x {
  width: 10px;
  height: 10px;
  border: 2px solid #ffe300;
}
.zhimg3 {
  top: 0;
  left: 0;
  width: 102.7px;
  max-height: 153.8px;
}
.zh2 {
  width: 300px;
  height: 38px;
  position: absolute;
  top: 50px;
  left: 588px;
}
.zh3 {
  width: 300px;
  height: 38px;
  position: absolute;
  left: 588px;
  top: 106px;
}
.zh4 {
  width: 595px;
  height: 470px;
  position: absolute;
  left: 588px;
  top: 200px;
}
.juzhong1200 > button {
  width: 250px;
  height: 60px;
  font-size: 14px;
  position: absolute;
}
.zhb1 {
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  color: #666666;
  background: #ffffff;
  left: 588px;
  top: 703px;
  font-weight: bold;
  position: absolute;
}
.zhb1:hover {
  border: 1px solid #ffe300;
  border-radius: 4px;
  color: #333333;
  background: #ffe300;
  left: 588px;
  top: 703px;
  position: absolute;
}
.zhb1:hover + .zhb2 {
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  color: #666666;
  position: absolute;
  left: 879px;
  top: 703px;
  background: #ffffff;
}
.zhb2 {
  border: 1px solid #ffe300;
  border-radius: 4px;
  color: #333333;
  background: #ffe300;
  left: 879px;
  top: 703px;
  font-weight: bold;
  position: absolute;
}
.newContent {
  padding-left: 19.1875rem;
}
/* 编辑弹窗 */
.editModel {
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  right: 0;
  z-index: 9998;
  background: rgba(51, 51, 51, 0.6);
}
.editBox {
  width: 36.75rem;
  height: 14rem;
  position: fixed;
  z-index: 9999;
  top: calc(50vh - 7rem);
  left: 50%;
  margin-left: -18.725rem;
  background: #fff;
  border-radius: 0.3125rem;
  text-align: left;
}
.closeBox {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.625rem;
  height: 1.625rem;
  z-index: 99999;
}
.editBox .close {
  width: 1.625rem;
  height: 1.625rem;
  display: block;
}
.editBox h5 {
  font-size: 1.5rem;
  color: #333;
  padding: 1.1875rem 1.875rem;
  font-weight: normal;
  position: relative;
}
.editBox h5:after {
  content: "";
  width: 36.75rem;
  height: 0.0625rem;
  background: #b4b4b4;
  bottom: 0;
  left: 0;
  position: absolute;
}
.editTitle {
  padding: 1.25rem 0;
  padding-left: 1.875rem;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.25rem;
  color: #2c2e30;
  position: relative;
}
.editTitle:after {
  position: absolute;
  width: 36.75rem;
  height: 0.0625rem;
  background: #b4b4b4;
  bottom: 0;
  left: 0;
  content: "";
}
.editTitle input {
  width: 27.875rem;
  display: block;
  margin-left: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  padding-left: 0.625rem;
  outline: none;
}
.editBtn {
  padding: 0 1.875rem;
  overflow: hidden;
}
.sureBox {
  float: right;
  display: flex;
  justify-content: end;
  align-items: center;
}
.sureBox button {
  margin-top: 0.9375rem;
  display: block;
  margin-left: 1.25rem;
  width: 6.25rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #ffde18;
  border-radius: 1.25rem;
  color: #000;
  font-size: 1.25rem;
  text-align: center;
  outline: none;
  border: none;
}
.sureBox button.cancel {
  background: #fff;
  border: 1px solid #8d8d8d;
  color: #8d8d8d;
}
</style>
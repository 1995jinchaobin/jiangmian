<template>
  <div class="threed">
    <div class="header">
      <img src="../../../assets/image/searchPicturePC/addHeaderBg.png"/>
      <!--顶部个人信息-->
      <div class="userInfo">{{userName}}，您好</div>
      <!--花型管理按钮-->
      <!-- <div class="headerBtn flowerBtn" @click="goToManage">花型管理</div> -->
      <!--返回按钮-->
      <div class="headerBtn" @click="goToList">返回识图</div>
    </div>
    
    <!-- 3D展示 -->
      <div class="proBox">
        <ul v-if="proList.length" class="proList" id="prolisttongji">
          <li v-for="(item,index) in proList" :key="index" @click="toDetail(item)">
            <img height="100%" width="100%" :src="item.resultImage" alt />
          </li>
        </ul>
        <div class="nodata" v-if="!proList.length&&!showOnly">
          <img src="../../../assets/image/Emoji.png" alt />
          <span>暂无数据</span>
        </div>
        <ul class="pageBox" v-if="pageNumber!=0">
          <li @click="prev"  style="cursor:pointer;">
            <img src="../../../assets/image/left.png" alt />
          </li>
          <li  style="cursor:pointer;"
            @click="btnClick(index)"
            :class="index==pageIndex-1?'click':''"
            v-for="(item,index) in page"
            :key="index"
          >{{item.name}}</li>
          <li @click="next"  style="cursor:pointer;">
            <img src="../../../assets/image/right.png" alt />
          </li>
        </ul>
      </div>
    <Jump v-if="showJump" :title="err"></Jump>
  </div>
</template>
<script>
import Jump from "../Jump";
import axios from 'axios'
export default {
  name: "Threed",
  components: {
    Jump
  },
  data() {
    return {
      baseUrl:'https://www.ayznscm.com',
      showJump: false,
      type: this.$route.query.type,
      typeindex: this.$route.query.index,
      err: "",
      height: "",
      userName:'',
      // 商品列表
      proList: [],
      pageNumber: null,
      flag: 0,
      cnt: 1,
      pageIndex: 1,
      page: [],
      id: 0,
      showOnly: false,
      url: [],
      suitIndex: 0,
      backImg: "",
      imageUrl: "",
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      image:''
    };
  },
  methods: {
    goToList(){
      localStorage.removeItem('image')
      this.$router.push({
          path: '/'
      });
    },
    goToManage(){
      this.$router.push({
          path: '/Addpicture'
      });
    },
    // 获取高度
    getHeight() {
      this.height = document.offsetHeight - 74 + "px";
    },
    // 去查看细节
    toDetail(item) {
      localStorage.removeItem('template');
      localStorage.setItem("template",JSON.stringify(item));
      this.$router.push({
        name:'Details'
      })
    },
    // 初始化分页器
    pageAuto() {
      this.$forceUpdate();
      if (!this.page.length) {
        if (this.pageNumber <= 7) {
          for (let i = 0; i < this.pageNumber; i++) {
            this.page.push({ name: i + 1 });
          }
        } else {
          this.page = [
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: "···" },
            { name: this.pageNumber }
          ];
        }
      }
    },
    // 分页器每个点击
    btnClick(index) {
      if (this.pageNumber <= 7) {
        this.flag = 0;
        this.cnt = index + 1;
        if (this.showOnly) {
          this.getOnlylist();
        } else {
          this.getProlist();
        }
        this.pageIndex = index + 1;
      } else {
        // 状态0
        if (this.flag == 0) {
          if (index == 5) {
          } else if (index == 4) {
            this.cnt = this.page[index].name;
            if (this.pageNumber - this.cnt <= 3) {
              this.flag = 2;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.pageNumber - 4 },
                { name: this.pageNumber - 3 },
                { name: this.pageNumber - 2 },
                { name: this.pageNumber - 1 },
                { name: this.pageNumber }
              ];
              this.pageIndex = 7 - (this.pageNumber - this.cnt);
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            } else {
              this.flag = 1;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              this.pageIndex = 4;
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            }
          } else if (index == 6) {
            this.cnt = this.page[index].name;
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7;
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else {
            this.cnt = this.page[index].name;
            this.pageIndex = index + 1;
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          }
        } else if (this.flag == 1) {
          if (index == 1 || index == 5) {
            return;
          } else {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              // 点击首页
              this.pageIndex = this.cnt;
              this.flag = 0;
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
              this.page = [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: "···" },
                { name: this.pageNumber }
              ];
            } else if (this.pageNumber - this.cnt <= 4) {
              this.pageIndex = 7 - (this.pageNumber - this.cnt);
              this.flag = 2;
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.pageNumber - 4 },
                { name: this.pageNumber - 3 },
                { name: this.pageNumber - 2 },
                { name: this.pageNumber - 1 },
                { name: this.pageNumber }
              ];
            } else {
              this.flag = 1;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            }
          }
        } else if (this.flag == 2) {
          if (index == 1) {
            return;
          } else if (index == 2) {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              this.flag = 0;
              this.pageIndex = this.cnt;
              this.page = [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            } else {
              this.flag = 1;
              this.pageIndex = 4;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            }
          } else if (index == 0) {
            this.cnt = this.page[index].name;
            this.flag = 0;
            this.pageIndex = 1;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else {
            this.cnt = this.page[index].name;
            this.flag = 2;
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          }
        }
      }
    },
    prev() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt == 1) {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        } else {
          this.cnt -= 1;
          this.pageIndex -= 1;
          if (this.showOnly) {
            this.getOnlylist();
          } else {
            this.getProlist();
          }
        }
      } else {
        if (this.cnt != 1) {
          this.cnt--;
          if (this.pageNumber - this.cnt <= 3) {
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else if (this.cnt <= 4) {
            this.flag = 0;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
            this.pageIndex = this.cnt;
          } else {
            this.flag = 1;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.cnt - 1 },
              { name: this.cnt },
              { name: this.cnt + 1 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            this.pageIndex = 4;
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          }
        } else {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      }
    },
    // 下一页
    next() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt < this.pageNumber) {
          this.cnt += 1;
          this.pageIndex += 1;
          if (this.showOnly) {
            this.getOnlylist();
          } else {
            this.getProlist();
          }
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      } else {
        if (this.cnt < this.pageNumber) {
          this.cnt++;
          if (this.pageNumber - this.cnt <= 3) {
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else if (this.cnt <= 4) {
            this.flag = 0;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
            this.pageIndex = this.cnt;
          } else {
            this.flag = 1;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.cnt - 1 },
              { name: this.cnt },
              { name: this.cnt + 1 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
            this.pageIndex = 4;
          }
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      }
    },
    // 获取商品列表
    getProlist() {
      let _this = this;
      let formData = new FormData();
      formData.append("page", this.cnt);
      formData.append("pageSize", 10);
      formData.append("genre1", 0);
      formData.append("genre2", 0);
      let obj = {
        page: this.cnt,
        pageSize: 10,
        genre1: 0,
        genre2: 0
      };
      axios.post(this.baseUrl + "/template2d/list",formData,{transformRequest:[function(data1,headers){
        delete headers.token;
        return data1;
      }]}).then((res)=>{
        setTimeout(function() {
        }, 500);
        let result;
        if(res.data.status == 0){
          let image = localStorage.getItem('image');
          result = res.data.result;
          let list = result.list;
          _this.pageNumber = result.pages;
          _this.pageAuto();
          Object.keys(list).forEach(item=>{
            // list[item].backgroudImage = _this.compose(image,list[item]);
              let obj = {
                back: list[item].backgroudImage,
                cloth: list[item].clotheThumbnail,
                pic: image,
                radio: 1,
                rotateX: 1,
                rotateY: 1,
                width: list[item].width,
                height: list[item].height
              }
              _this.$post('/compose',obj).then((data)=>{
                list[item].resultImage = data.wwwFileBaseUrl + data.data;
                _this.$forceUpdate();
              })
          })
          _this.proList = list;
          _this.$forceUpdate();
        }
      })
    },
  },
  mounted() {
    this.userName= JSON.parse(localStorage.getItem("userInfo")).name;
    this.getHeight();
    this.getProlist();
  }
};
</script>
<style scoped>
.header{
  width: 100%;
  height: auto;
  position: relative;
  text-align: center;
  margin-bottom: -4px;
}
.header img{
  width: 100%;
}
.headerBtn{
  width: 89px;
  height: 29px;
  border: 1px solid #FFFFFF;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
  position: absolute;
  top: 58px;
  right: 113px;
  border-radius: 4px;
  text-align: center;
  line-height: 29px;
  cursor: pointer;
}
.flowerBtn{
  right: 210px;
}
.userInfo{
    position: absolute;
    top: 21px;
    right: 113px;
    display: flex;
    align-items: right;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #FFFFFF;
}
.proBox {
  width: 1220px;
  margin: auto;
  margin-top: 40px;
}
.topBox {
  display: flex;
  justify-content: start;
  margin-bottom: 1rem;
}
.topBox h4 {
  font-size: 1.125rem;
  color: #333;
  font-weight: normal;
  width: 6rem;
  margin-top: 0.1rem;
  text-align: left;
  flex-shrink: 0;
}
ul.classifyBox {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
ul.classifyBox li {
  color: #8d8d8d;
  margin-right: 1.125rem;
  font-size: 0.9rem;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 1.875rem;
  background: #fff;
  color: #8d8d8d;
  border: 1px solid #8d8d8d;
  margin-bottom: 0.625rem;
  cursor: default;
}
ul.classifyBox li.special {
  background: #ffde18;
}
ul.classifyBox li:last-child {
  margin-right: 0;
}
ul.proList {
  display: flex;
  flex-wrap: wrap;
}
ul.proList li {
  width: 220px;
  height: 329px;
  background: #fff;
  margin-bottom: 25px;
  margin-right: 21px;
  /* box-shadow: 2px 2px 2px #cbccd2; */
  /* border-radius: 0.5rem; */
}
/* 分页器 */
ul.pageBox {
  padding-bottom: 3.125rem;
  display: flex;
  margin-top: 5.5rem;
  justify-content: center;
  align-items: center;
}
ul.pageBox li {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 0.875rem;
  color: #333;
  box-shadow: 0.125rem 0.125rem 0.125rem #ddd;
  border-radius: 50%;
  margin: 0 0.3125rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
ul.pageBox li.click {
  background: black;
  color: #fff;
}
ul.pageBox li.sureList {
  width: 6.25rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #133ffc;
  color: #fff;
  font-size: 0.625rem;
  margin-left: 11.25rem;
  text-align: center;
  border-radius: 1.25rem;
}
ul.pageBox li img {
  display: block;
  width: 0.5rem;
  height: 1rem;
  margin: 0.625rem auto;
}
</style>
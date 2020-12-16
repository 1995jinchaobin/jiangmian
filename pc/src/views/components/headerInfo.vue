<template>
  <div class="headerInfo">
    <!-- 顶部信息组件 -->
    <!-- <img class="headerLogo" src="../../assets/image/order/logo.png" /> -->

    <div @click="goTo('/')" class="btnText">以图识图</div>
    <div @click="goTo('/message')" class="btnText">新建订单</div>
    <div @click="goTo('/addCustomer')" class="btnText">新建客户</div>
    <div @click="goTo('/messageManage')" class="btnText">订单列表</div>
    <!-- <div @click="goTo('/fabricManage')" class="btnText">客户面料</div> -->
    <div @click="dialogVisible = true" class="btnText">小程序</div>
    <div class="btnText rightText" style="right: 43px; cursor: default">
      {{ userName }}
    </div>
    <div class="btnText rightText" style="color: #1890ff" @click="loginOut">
      退出
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <div class="imgBox">
        <img width="100%" src="../../assets/image/order/wx.png" alt="" />
        扫码进入小程序
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "HeaderInfo",
  data () {
    return {
      userName: "",
      dialogVisible: false
    };
  },
  methods: {
    loginOut () {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      this.$router.push('/picLogin');
    },
    goTo (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    if (localStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.userName = userInfo.name;
    } else {
      this.$message.error('请先登录');
      this.$router.push('/picLogin');
    }
  }
};
</script>
<style scoped>
.headerInfo {
  width: 1200px;
  height: 70px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: relative;
  justify-content: center;
}
.headerLogo {
  width: 130px;
  margin-right: 45px;
}
.btnText {
  margin-left: 30px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}
.rightText {
  position: absolute;
  right: 0px;
}
.imgBox {
  text-align: center;
}
.imgBox img {
  width: 180px;
  height: 180px;
  margin: 0 calc(50% - 90px) 20px;
}
</style>
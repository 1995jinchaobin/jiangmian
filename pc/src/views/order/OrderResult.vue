<template>
  <div class="order">
    <div class="header"><HeaderInfo></HeaderInfo></div>
    <div class="content">
      <div class="contentHeader">
        <div class="contentHeaderTitle">新建订单</div>
      </div>
      <div>
        <img
          class="resultStatusIcon"
          v-if="resultCode == 0"
          src="../../assets/image/order/success.png"
          alt=""
        />
        <img
          class="resultStatusIcon"
          v-else
          src="../../assets/image/order/fail.png"
          alt=""
        />
        <div class="title">
          {{ resultCode == 0 ? "订单创建成功" : "订单创建失败" }}
        </div>
        <div class="text">
          {{
            resultCode == 0
              ? "恭喜您，订单创建成功，请到小程序查看订单审核状态"
              : "请核对并修改以下信息后，再重新提交。"
          }}
        </div>
        <img class="weix" src="../../assets/image/order/wx.png" alt="" />
        <div class="text">扫一扫，进入小程序进看订单状态</div>
      </div>
      <div class="btnBox">
        <el-button type="primary" @click="toOrder">新建订单</el-button>
        <el-button @click="toPic">以图识图</el-button>
      </div>
    </div>
    <!-- <div class="copyright">copyright © 2020 华燕数码</div> -->
  </div>
</template>

<script>
import HeaderInfo from '../components/headerInfo'
export default {
  data () {
    return {
      resultCode: 0
    }
  },
  components: {
    HeaderInfo: HeaderInfo
  },
  methods: {
    toOrder () {
      this.$router.push({
        path: "/message"
      })
    },
    toPic () {
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted () {
    if (this.$route.params.resultCode) {
      this.resultCode = this.$route.params.resultCode
    }
  }
}
</script>


<style scoped>
.order {
  min-width: 1440px;
}
.header {
  box-shadow: 0 2px 35px 0 rgba(28, 34, 38, 0.1);
  position: relative;
}
.content {
  width: 1200px;
  margin: 51px auto;
}
.contentHeader {
  display: flex;
  margin-bottom: 22px;
}
.contentHeaderTitle {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
}
.resultStatusIcon {
  width: 72px;
  height: 72px;
  margin: 65px calc(50% - 36px) 24px;
}
.title {
  width: 144px;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
  margin: 0 auto 16px;
}
.text {
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  text-align: center;
  margin-bottom: 48px;
}
.msgBox > div:first-child {
  width: 197px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  margin-left: 360px;
}
.copyright {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
}
.weix {
  width: 186px;
  height: 186px;
  margin: 0 calc(50% - 93px);
}
.btnBox {
  margin-left: 507px;
}
</style>
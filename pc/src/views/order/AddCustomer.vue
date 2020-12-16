<template>
  <div class="addCustomer">
    <div class="header"><HeaderInfo></HeaderInfo></div>
    <div class="content">
      <div class="contentHeader">
        <div class="contentHeaderTitle">新建客户</div>
      </div>
      <div class="contentArea">
        <div class="mainTitle">新建客户</div>
        <div class="titleTip">新建订单后请到小程序查看订单状态</div>
        <!-- 表单 -->
        <div>
          <el-form label-position="top" label-width="80px" :model="customerInfo">
            <el-form-item label="公司名">
              <el-input v-model="customerInfo.companyName" placeholder="请输入公司名"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="customerInfo.name" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="customerInfo.account" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="customerInfo.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width=100%;" type="primary" @click="onSubmit">立即新建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <div class="copyright">copyright © 2020 华燕数码</div> -->
  </div>
</template>
<script>
import HeaderInfo from '../components/headerInfo'

export default {
  name: "AddCustomer",
  data() {
    return {
      customerInfo:{
        account:'',
        password:'111111',
        name:'',
        companyName:'',
        address:''
      },
      //判断是否从订单页面跳转 1从订单页面跳转0点击导航栏进入
      isLine:0 
    };
  },
  components:{
    HeaderInfo:HeaderInfo
  },
  methods: {
    onSubmit(){
      //验证
      if(!this.customerInfo.companyName){
        this.$message.error("请输入公司名");
      } else if(!this.customerInfo.name){
        this.$message.error("请输入联系人");
      } else if(!this.customerInfo.account){
        this.$message.error("请输入联系电话");
      }else if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.customerInfo.account)){
        this.$message.error('请输入正确的电话号码')
      }else if(!this.customerInfo.address){
        this.$message.error("请输入地址");
      } else{
        this.$post('/customer',{
                        account: this.customerInfo.account,
                        password: this.customerInfo.password,
                        name:this.customerInfo.name,
                        companyName:this.customerInfo.companyName,
                        contacts:this.customerInfo.name,
                        phone:this.customerInfo.account,
                        address:this.customerInfo.address,
                        bindUserId:JSON.parse(localStorage.getItem("userInfo")).userId
                    }).then((data)=>{
                        this.$message.success(data.message);
                        //跳转到新增订单页面,并且自动选中该客户
                        if(this.isLine){
                          this.$router.push({
                            name: 'Order',
                            params:{customerAccount:this.customerInfo.account}
                          })
                        }else{
                          this.customerInfo={
                            account:'',
                            password:'111111',
                            name:'',
                            companyName:'',
                            address:''
                          }
                        }
                    })
      }
    }
  },
  mounted() {
    if(this.$route.params.isLine){
      this.isLine = 1;
    }
  }
};
</script>
<style>
  .addCustomer .el-form-item__label{
    line-height: 100%;
  }
  .addCustomer .el-button--primary{
    width: 100%;
  }
</style>
<style scoped>
.addCustomer{
  min-width: 1440px;
}
.header{
  box-shadow: 0 2px 35px 0 rgba(28,34,38,0.10);
  position: relative;
}
.content{
  width: 1200px;
  margin: 51px auto;
}
.contentHeader{
  display: flex;
  margin-bottom: 22px;
}
.contentHeaderTitle{
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: rgba(0,0,0,0.85);
  line-height: 28px;
}
.contentArea{
  width: 460px;
  background: #FFFFFF;
  box-shadow: 0 2px 35px 0 rgba(28,34,38,0.05);
  border-radius: 6px;
  padding: 63px 370px 67px;
}
.contentArea .mainTitle{
  font-family: PingFangSC-Regular;
  font-size: 40px;
  color: #000000;
  letter-spacing: -1.33px;
  line-height: 40px;
}
.titleTip{
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #999999;
  letter-spacing: -0.55px;
  margin-top: 10px;
  margin-bottom: 65px;
}
.copyright{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.45);
  line-height: 20px;
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
}
</style>
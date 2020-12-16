<template>
  <div class="fabricManageContent">
    <div class="header"><HeaderInfo></HeaderInfo></div>
    <!-- <div class="note">
      <div class="noteText">
        面料管理
      </div>
    </div> -->
    <div class="data">
      <div class="dataContent">
        <div class="contentHeader">
          <div class="contentHeaderTitle">客户面料</div>
        </div>
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.key" placeholder="请输入面料名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="clearSearchInfo">重&nbsp;&nbsp;置</el-button>
                <el-button plain @click="getData">搜&nbsp;&nbsp;索</el-button>
                <!-- <el-button plain @click="openUpdateDrawer">新&nbsp;&nbsp;增</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column align="center" :show-overflow-tooltip="true" prop="id" label="编号" >
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="name" label="面料名称">
            </el-table-column>
            <!-- <el-table-column align="center" :show-overflow-tooltip="true" prop="num1" label="半漂仓数量">
              <template slot-scope="scope">
                <span v-if="scope.row.num1 > scope.row.threshold">{{scope.row.num1}}</span>
                <span v-else style="color: red;">{{scope.row.num1 + '(已低于警报阀值！)'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="num2" label="上浆仓数量">
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="num3" label="成品仓数量">
            </el-table-column> -->
            <el-table-column align="center" :show-overflow-tooltip="true" prop="note" label="备注">
            </el-table-column>
            <el-table-column align="center" label="操作" width="400px" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.row)">查看详情</el-button>
                <!-- <el-button type="primary" size="mini" @click="check(scope.row)">编辑</el-button> -->
                <!-- <el-button type="primary" size="mini" @click="HandlerDelete(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total" :current-page.sync="page.page">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-drawer size="50%" title="面料详情" :visible.sync="drawer" direction="rtl" :destroy-on-close="openSet" :before-close="closeCheckDrawer">
        <div class="checkDrawer" >
          <el-divider content-position="left"></el-divider>
          <el-form>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="编号:">
                    <label>{{detailInfo.id}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="面料名称:">
                    <label>{{detailInfo.name}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="客户名称:">
                    <label>{{detailInfo.customerName}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <!-- <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="半漂仓数量:">
                    <label>{{detailInfo.num1}}</label>
                  </el-form-item>
                </el-form>
              </el-col> -->
            </el-row>
            <!-- <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="上浆仓数量:">
                    <label>{{detailInfo.num2}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="成品仓数量:">
                    <label>{{detailInfo.num3}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="缩水比例:">
                    <label>{{detailInfo.percent}}%</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="警报阀值:">
                    <label>{{detailInfo.threshold}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="备注:">
                    <label>{{detailInfo.note}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item>
                    <el-button type="primary" @click="drawer=false" style="width: 100%">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-drawer>
    </div>
    <div>
      <el-drawer size="50%" :title="drawerTitle" :visible.sync="updateDrawer"  direction="rtl" :destroy-on-close="openSet" :before-close="closeCheckDrawer">
        <div class="checkDrawer">
          <el-divider content-position="left"></el-divider>
          <el-form :model="detailInfo" ref="fabricForm" :rules="rules" label-width="100px">
            <el-row>
              <el-col :span="12" v-if="operateType=='update'">
                <el-form-item label="编号:">
                  <label>{{detailInfo.id}}</label>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="operateType=='update' ? 1 : 0">
                <el-form-item label="面料名称:"  prop="name">
                  <el-input v-model="detailInfo.name" type="text" placeholder="请输入面料名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="半漂仓数量:" prop="num1">
                  <el-input v-model="detailInfo.num1" type="text" placeholder="请输入半漂仓数量"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="上浆仓数量:"  prop="num2">
                  <el-input v-model="detailInfo.num2" type="text" placeholder="请输入上浆仓数量"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="成品仓数量:" prop="num3">
                  <el-input v-model="detailInfo.num3" type="text" placeholder="请输入成品仓数量"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="警报阀值:"  prop="threshold">
                  <el-input v-model="detailInfo.threshold" type="text" placeholder="请输入警报阀值"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="缩水比例:" prop="percent">
                  <el-input v-model="detailInfo.percent" type="text" placeholder="请输入缩水比例"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="所属客户:">
                    <el-select v-model="customerName" placeholder="请选择" v-if="operateType == 'add'">
                      <el-option
                        v-for="item in userList"
                        :key="item.id"
                        :value="item.name">
                      </el-option>
                    </el-select>
                    <el-select v-model="detailInfo.customerName" placeholder="请选择" v-else>
                      <el-option
                        v-for="item in userList"
                        :key="item.id"
                        :value="item.name">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注:">
                  <el-input type="textarea" v-model="detailInfo.note"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item>
                    <el-button type="primary" @click="add">{{operateType=='add'?'保存':'修改'}}</el-button>
                    <el-button type="primary" @click="closeCheckDrawer">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-drawer>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import HeaderInfo from '../components/headerInfo'
  import messageUtil from '../../utils/js/MessageUtil'
  import dateUtil from '../../utils/js/DateUtil'
  export default {
    components:{
      HeaderInfo
    },
    data() {
      return {
        openSet:true,
        //查询参数
        searchParams: {
          //关键字：面料名称
          key: ""
        },
        //分页参数
        page: {
          page: 1,
          rows: 10,
          total: 0
        },
        tableData: [],
        //抽屉
        drawer: false,
        //某条详情的信息
        detailInfo: {},
        defaultInfo:{
          name:'',
          note:''
        },
        drawerTitle:'新增面料',
        // 业务员客户列表
        userList:[],
        customerName:'',
        updateDrawer:false,
        //编辑类型：add,update
        operateType:'add',
        rules:{
          name:[{ required: true, message: '请输入面料名称', trigger: 'blur' }],
          num1:[{required: true,message:'请输入半漂仓仓数量',trigger:'blur'}],
          num2:[{required: true,message:'请输入上浆仓数量',trigger:'blur'}],
          num3:[{required: true,message:'请输入成品仓数量',trigger:'blur'}],
          percent:[{required: true,message:'请输入缩水比例',trigger:'blur'}],
          threshold:[{required: true,message:'请输入警报阀值',trigger:'blur'}]
        }
      }
    },
    methods: {
      getData() {
        this.$get('/fabric',{
          ...this.searchParams,...this.page
        }).then((data)=>{
          this.tableData=data.data.list;
          this.page.total = data.data.total;
        })
      },
      getUserList(){
        this.$get('/customer',{
          page:1,
          rows:99999
        }).then((data)=>{
          this.userList = data.data.list;
        })
      },
      search(){
        this.page.page=1;
        this.getData()
      },
      changePage(page) {
        this.page.page = page;
        this.getData();
      },
      //重置
      clearSearchInfo() {
        this.page.page = 1;
        this.page.rows = 10;
        this.page.total = 0;
        this.searchParams = {}
        this.getData()
      },
      //点击查看详情按钮，显示用户详细信息弹框
      showDetail(row) {
        this.drawer = true;
        this.detailInfo = row;
      },
      //点击新增按钮，显示新增弹框
      openUpdateDrawer() {
        this.updateDrawer = true;
        this.detailInfo = {
          name:'',
          note:''
        };
        this.drawerTitle = '新增面料';
        this.operateType = 'add';
      },
      //点击编辑按钮，显示编辑弹框
      check(row) {
        this.updateDrawer = true;
        this.detailInfo = {
          id:row.id,
          name:row.name,
          note:row.note,
          num1: row.num1,
          num2: row.num2,
          num3: row.num3,
          percent: row.percent,
          threshold: row.threshold,
          customerName: row.customerName
        };
        this.drawerTitle = '编辑面料';
        this.operateType = 'update';
      },
      //关闭抽屉清空数据
      closeCheckDrawer() {
        this.drawer = false;
        this.updateDrawer = false;
        this.detailInfo = {
          id:'',
          name:'',
          note:'',
          num1: '',
          num2: '',
          num3: '',
          percent: '',
          threshold: '',
          customerName: ''
        };
        this.customerName = '';
      },
      //点击保存按钮
      add(){
        //判断
        this.$refs['fabricForm'].validate((valid) => {
          if (valid) {
            if(this.operateType=='add'){
              if(this.customerName != ''){
                this.userList.forEach(item=>{
                  if(item.name == this.customerName){
                    this.detailInfo.customerName = item.name;
                    this.detailInfo.fkCustomerId = item.id;

                  }
                })
              };
              this.$post('/fabric',this.detailInfo).then((data)=>{
                messageUtil.message.success(data.message)
                this.closeCheckDrawer();
                this.getData();
              })
            }else{
              if(this.detailInfo.customerName != ''){
                this.userList.forEach(item=>{
                  if(item.name == this.detailInfo.customerName){
                    this.detailInfo.customerName = item.name;
                    this.detailInfo.fkCustomerId = item.id;
                  }
                })
              };
              this.$put('/fabric/'+this.detailInfo.id,this.detailInfo).then((data)=>{
                messageUtil.message.success(data.message)
                this.closeCheckDrawer();
                this.getData();
              })
            }
          } else {
            return false;
          }
        });
      },
      //删除
      HandlerDelete(fabricInfo){
        messageUtil.confirm('确认要删除该面料吗？',()=>{
          this.$deletefn('/fabric/'+fabricInfo.id,{}).then((data)=>{
            messageUtil.message.success(data.message)
            this.getData();
          })
        })
      }
    },
    mounted() {
      this.getData();
      this.getUserList();
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    }
  }
</script>

<style >
  .header{
    min-width: 1440px;
    box-shadow: 0 2px 35px 0 rgba(28,34,38,0.10);
    position: relative;
  }
  span{outline:none}
  .fabricManageContent {
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100%);
    height: calc(100vh - 64px) !important;
  }
  .contentHeader{
    padding-top: 15px;
    padding-left: 32px;
    background: #fff;
  }
  .contentHeaderTitle{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0,0,0,0.85);
    line-height: 28px;
  }
  .fabricManageContent .note {
    height: 64px;
  }
  tr.trStyle{
    height: 60px !important;
  }
  .fabricManageContent .noteText {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    height: 28px;
    padding-left: 32px;
    padding-top: 18px;
    font-weight: bold;
  }

  .fabricManageContent .data {
    width: calc(100%);
    min-height: calc(100% - 64px);
    height: auto;
    padding: 24px 24px 24px 24px;
    background-color: #F0F3F7;
  }

  .fabricManageContent .dataContent {
    width: calc(100% - 48px);
    background-color: #fff;
    border-radius: 2px;
    border-radius: 2px;
    padding-bottom: 32px;
  }

  .fabricManageContent .searchArea {
    width: calc(100%);
    margin: 0px 24px 0px 0px;
  }

  .fabricManageContent .searchForm {
    padding-top: 24px;
    padding-left: 32px;
  }

  .fabricManageContent .dataListArea {
    margin: 0px 24px 24px 24px;
  }

  .fabricManageContent .tableData {
    height: 100%;
  }

  .fabricManageContent .page {
    margin: 15px 15px;
    float: right;
  }

  .fabricManageContent .el-drawer__header {
    margin-bottom: 0px !important;
  }
  .fabricManageContent .checkDrawer {
    height: calc(90vh);
    margin-bottom: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .fabricManageContent .fabricHeaderImg{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
</style>

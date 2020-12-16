import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path:"/",
    //   name:'login',
    //   component: resolve => (require(['@/views/system/login/Login'],resolve)),
    // },
    {
      path:'/',
      name:'Knowledge',
      component: resolve => (require(['@/views/components/own/OwnHome'],resolve))
    },
    {
      path:'/Addpicture',
      name:'AddPicture',
      component: resolve => (require(['@/views/components/own/OwnAddPicture'],resolve))
    },
    {
      path:"/History",
      name:'History',
      component: resolve => (require(['@/views/components/own/OwnHistory'],resolve))
    },
    {
      path:'/picLogin',
      name:'picLogin',
      component: resolve => (require(['@/views/components/own/OwnLogin'],resolve))
    },
    {
      path:"/threeD",
      name:'ThreeD',
      component: resolve => (require(['@/views/components/threeD/index'],resolve))
    },
    {
      path:'/details',
      name:'Details',
      component: resolve => (require(['@/views/components/threeD/details'],resolve))
    },
    {
      path:'/message',
      name:'Order',
      component: resolve => (require(['@/views/order/Order'],resolve))
    },
    {
      path:'/addCustomer',
      name:'AddCustomer',
      component: resolve => (require(['@/views/order/AddCustomer'],resolve))
    },
    {
      path:'/messageResult',
      name:'OrderResult',
      component: resolve => (require(['@/views/order/OrderResult'],resolve))
    },
    {
      path:'/fabricManage',
      name:'FabricManage',
      component: resolve => (require(['@/views/order/FabricManage'],resolve))
    },
    {
      path:'/messageManage',
      name:'MessageManage',
      component: resolve => (require(['@/views/order/orderManage'],resolve))
    },
    {
      path:'/ceshi',
      name:'Ceshi',
      component: resolve => (require(['@/views/order/Ceshi'],resolve))
    }
  ],
  mode:'history'
})

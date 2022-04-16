import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)

import Layout from '../pages/Layout.vue'
import Center from '../pages/container/Center'
import Register from "@/pages/Register";
const routes=[
  {
    path:'/',
    component:Layout,
    name:'layout',
    redirect:"/home",
    children:[
      {
        path:'/home',
        component:()=>import('../pages/Home/index.vue'),
        redirect:'/articleList',
        children:[
          {
            path:'/articleList',
            component:()=>import('../pages/container/ArticleList.vue')
          },
          {
            path:'/articleDetail',
            component:()=>import('../pages/container/ArticleDetail.vue')
          },
        ]
      },

    ],
  },
  {
    path:'/friendLink',
    component:()=>import('../pages/container/FriendsUrl.vue'),
  },
  {
    path:'/addArticle',
    component:()=>import("@/pages/container/AddArticle")
  },
  {
    path:'/center',
    component:Center
  },
  {
    path: '/login',
    component:()=>import('../pages/Login.vue')
  },
  {
    path: '/register',
    component:Register
  }
]

const router=new VueRouter({
  mode:'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // to:要进入的目标路由对象，到哪里去ss
    // console.log(to)
    if(to.path==='/addArticle'){
      return {x:0,y:600}
    }
    // from:离开的路由对象，从哪儿来
    // console.log(from)
    // savedPosition: 会记录滚动条的坐标，点击"后退/前进" 时的记录值(x:?,y:?)
    // console.log(savedPosition)
  }
})

router.beforeEach(((to, from, next) => {
  let token=localStorage.getItem("token");
  next();
  if(token){
    if(to.path==='/login'||to.path==='/register'){
      console.log("有token去登录页")
      next('/home');
    }else {
      console.log("除login和register的其他页面")
     next();
    }
  }
  else {
    console.log("未登录")
    //未登录
    next();
  }
}))

export default router

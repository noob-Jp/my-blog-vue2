<template>
<div>
  <div class="header">
    <div class="menu-container">
      <div class="menu">
        <ul class="menu_left" @click="changeRoute">
          <li :class="{menuActive:this.$route.path==='/articleList'&&!this.$route.query.categoryId}"><span class="iconfont">&#xe62e;</span>首页</li>
          <li :class="{menuActive:this.$route.query.categoryId}" class="hoverCategory"><span class="iconfont">&#xe71b;</span>分类
            <ul class="hoverCategoryUl" style="display: block;background: rgba(40, 42, 44, 0.6)" >
              <li v-for="(categoryItem,index) in categoryList" :key="categoryItem.id" @click="toCategory(categoryItem.id)">
                {{ categoryItem.name }}
              </li>
            </ul>
          </li>
          <li><span class="iconfont">&#xe6c8;</span>友链</li>
        </ul>
        <ul class="menu_right" @click="toLoginOrRegister">
            <ul v-if="!isLogin">
              <li>登录</li>
              <li>注册</li>
            </ul>
            <ul v-if="isLogin">
              <li @click="toAddArticle"><span class="iconfont">&#xe77a;</span>发表</li>
              <li class="dropbtn">
                <span class="iconfont dropbtn">&#xe623;</span>
                <div class="dropdown-content">
                  <a @click="toCenter">个人中心</a>
                  <a @click="logout">退出</a>
                </div>
              </li>

            </ul>
        </ul>
      </div>
    </div>

    <div class="h_information">
      <div>
        <img src="./images/tou.png" width="100px" height="100px">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
import { reqGetArticleList } from '@/api';

export default {
  name: 'header',
  data(){
    return{
      category:this.categoryList,
      stat:"11",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryId: 0
      },
    }
  },
  created() {
    this.getCategoryList()
  },
  methods:{
    //菜单栏跳转
    changeRoute(e){
      let liName=e.target.innerHTML;
      if(liName.includes("首页")){
        this.$router.push('/home')
      }else if(liName.includes("分类")){
      }else if(liName.includes("友链")){
        this.$router.push('/FriendLink')
      }
    },
    //登录按钮跳转
    toLoginOrRegister(e){
      let liName=e.target.innerHTML;
      if(liName==="登录"){
        // console.log("登录");
        this.$router.push('/login')
      }else if(liName==="注册"){
        // console.log("注册")
        this.$router.push('/register')
      }
    },
    //退出登录
    async logout(){
      try {
        await this.$store.dispatch('logout');
        await this.$router.replace("/login")
      }catch (e) {
        return e;
      }
    },
    //获取分类
    async getCategoryList(){
      try {
        await this.$store.dispatch('getCategoryList');
      }catch (e) {
        return e;
      }
    },
    async toCategory(id){
      await this.$router.push({path:"/articleList",query:{categoryId:id}})
    },
    toCenter(){//跳转到个人中心
      this.$router.push("/center")
    },
    toAddArticle(){
      this.$router.push("/addArticle")
    }
  },
  computed:{
    isLogin(){
      if(localStorage.getItem('userInfo')){
        return true;
      }else{
        return false;
      }
    },
    ...mapState({
      categoryList:state=>state.home.categoryList
    })
  },
  watch:{
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  margin-right: 5px;
}
.dropdown-content{
  visibility: hidden;
  background-color: rgba(40, 42, 44, 0.6);

}
.dropdown-content a{
  color: #fff;
  display: block;
}
.dropdown-content a:hover{
  background-color: #48456c;
}
.dropbtn:hover .dropdown-content{
  visibility: visible;
  transition: 1s;
}
.hoverCategoryUl{
  opacity: 0;
}
.hoverCategory:hover{
  .hoverCategoryUl{
    opacity: 1;
    transition: 1s;
  }
}

.menuActive{
  background: #48456c;
}
.header{
  width: 100%;
  height: 650px;
  //border: 1px solid black;
  background: url(./images/headbg05.jpg) no-repeat;
}
.menu-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 38px;
  width: 100%;
  background: rgba(40, 42, 44, 0.6);
  z-index: 10;
}
.menu{
  max-width: 75%;
  margin: 0 auto;
  height: 38px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
.menu ul{
  display: flex;
  flex-direction: row;
  color: #fff;
}
.menu .menu_left li{
  width: 60px;
  line-height: 38px;
  text-align: center;
}
.menu .menu_left li:hover{
  background: #48456c;
  cursor: pointer;
  transition:0.5s;
}
.menu .menu_right  li{
  width: 60px;
  line-height: 38px;
  text-align: center;
}
.menu .menu_right li:hover{
  color: #48456c;
  cursor: pointer;
  transition:0.5s;
}
.h_information{
  position: relative;
  margin: 0 auto;
  text-align: center;
  max-width: 70%;
  background: rgba(230, 244, 249, 0.8);;
  top: 480px;
  padding: 40px;
  opacity: 0.9;
  border-radius: 5px;
  animation: b 1s ease-out;
}
.h_information img{
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.h_information img:hover{
  transform: rotate(360deg);
  transition: all 0.5s ease-in-out;
}

@keyframes b {
  from {top:520px;}
  to {top:480px;}
}

@media all and (max-width: 450px){
  .header {
    background-size: cover;
    background-position: center 50%;
    height: 450px !important;
    margin-bottom: -150px;
  }
}
</style>
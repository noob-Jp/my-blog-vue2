//store user.js

import {reqLogin,reqLogout} from '@/api';

//state:仓库存储数据的唯一手段
const state={
  token:"",
  userInfo:{}
};
//mutation:修改state的唯一手段
const mutations={
  USERLOGINTOKEN(state,data){
    state.token=data.token;
    state.userInfo=data.userInfo;
  }
}
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
  async login({commit},data){
    console.log(data);
    let result=await reqLogin(data);
    console.log(result);
    if(result.code===200){
      localStorage.setItem("token",result.data.token);
      localStorage.setItem("userInfo",JSON.stringify(result.data.userInfo))
      commit("USERLOGINTOKEN",result.data);
      return "ok";
    }else {
      return Promise.reject(new Error("fail"))
    }
  },
  async logout(){
    let result=await reqLogout();
    console.log(result);
    if(result.code===200){
      localStorage.removeItem("userInfo")
      localStorage.removeItem("token")
    }else {
      return Promise.reject(new Error("fail"))
    }
  }
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters={

}
export default {
  state,
  mutations,
  actions,
  getters
}
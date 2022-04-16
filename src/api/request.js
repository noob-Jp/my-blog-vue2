
import axios  from 'axios';

//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'
import { Message } from 'element-ui'
let request=axios.create({
  // baseURL:"/api",
  baseURL:'http://localhost:7777',
  timeout:5000
})

request.interceptors.request.use((config)=>{
  NProgress.start();
  console.log("请求拦截")
  if(localStorage.getItem('token')){
    config.headers.token=localStorage.getItem("token");
  }
  return config;
},(error => {
  console.log("请求失败")
  return Promise.reject(error)
}))

request.interceptors.response.use((res)=>{
  NProgress.done();
  console.log("响应拦截",res.data.code)
  return res.data;
},(err)=>{

  if (err && err.response) {
    switch (err.response.code) {
      case 400:
        err.message = '请求出错'
        break
      case 401:
        Message.warning({
          message: '授权失败，请重新登录'
        })
        store.dispatch('logout')
        setTimeout(() => {
          window.location.reload()
        }, 1000)

        return
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 500:
        err.message = '服务器端出错'
        break
    }
  } else {
    err.message = '连接服务器失败'
  }
  Message.error({
    message: err.message
  })
  return Promise.reject(err.response)
})

export default request;
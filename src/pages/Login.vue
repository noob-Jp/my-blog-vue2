<template>
  <div>
    <div class="login">
      <div class="login_content">
        <h2>登录</h2>
        <p style="text-align: right;font-size: 12px">
          新用户<router-link class="rcolors" to="/register">注册</router-link>
        </p>
        <el-form :model="loginForm" :rules="ruleslogin" ref="ruleLoginForm">
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" class="input" placeholder="用户名" ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" class="input" placeholder="密码" type="password" ></el-input>
          </el-form-item>

        </el-form>

        <button @click="loginBtn()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { isChinese } from '@/tools/isChinese';
import _ from 'lodash';
export default {
  name: 'Login',
  data(){
    return{
      loginForm:{
        userName:'',
        password:''
      },
      ruleslogin: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    loginBtn:_.throttle(function(){
      if(isChinese(this.loginForm.userName)){
        this.$message({
          type:'error',
          message:`输入的用户名不应该包含汉字`
        })
        return false;
      }
      this.validate();
      console.log("throttle")
    },2000),
    async validate(){
      this.$refs["ruleLoginForm"].validate(async (valid) => {
        if (valid) {
          this.$message({
            type:'success',
            message:`登录按钮`
          })
          const {userName,password}=this.loginForm;
          try {
            await this.$store.dispatch("login",{userName,password})
            await this.$router.replace('/home')
          }catch (e){
            return false;
          }
          // await this.$store.dispatch("logout")
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" >
.login{
  position: absolute;
  background: #efefef;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  .rcolors{
    color: #97dffd;
  }
}
.login_content{
  position: relative;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 350px;
  background: #fff;
  padding: 20px;
  h2{
    margin-bottom: 20px;
  }
  .input{
    margin-top: 15px;
  }
}
.login_content button{
  background: #97dffd;
  color: #fff;
  border: 0;
  display: block;
  width: 100%;
  margin-top: 30px;
  height: 40px;
  border-radius: 10px;
  transition: 0.5s;
  margin-bottom: 20px;
}
.login_content button:hover{
  background: #48456c;
}

.alert{
  width: 300px;
}


</style>
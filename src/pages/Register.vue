<template>
  <div class="register">
    <div class="register_content">
      <h2>注册</h2>
      <p style="text-align: right;font-size: 12px">
        已有账号
        <router-link class="rcolors" to="/login">登录</router-link>
      </p>
      <el-form :model="registerForm" :rules="rulesRegister" ref="ruleRegisterForm">
        <el-form-item prop="username">
          <el-input v-model:type="registerForm.username" class="input" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="nickName">
          <el-input v-model="registerForm.nickName" class="input" placeholder="昵称" ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" class="input" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" class="input" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="passwordSure">
          <el-input v-model="registerForm.passwordSure" class="input" placeholder="确认密码" type="password"></el-input>
        </el-form-item>

      </el-form>

      <button @click="registerBtn()">注册</button>
    </div>
  </div>
</template>

<script>
import { isChinese } from '../tools/isChinese';
export default {
  name: 'Register',
  data(){
    return{
      registerForm:{
        username:"",
        nickName:"",
        email:"",
        password:"",
        passwordSure:""
      },
      rulesRegister: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        passwordSure: [
          { required: true, message: '请再次输入密码确认', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    registerBtn(){
      if(isChinese(this.registerForm.username)){
        this.$message({
          type:'error',
          message:`输入的用户名不应该包含汉字`
        })
        return false;
      }
      this.$refs["ruleRegisterForm"].validate((valid) => {
        if (valid) {
          this.$message({
            type:'success',
            message:`登录按钮`
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  position: absolute;
  background: #efefef;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  .rcolors {
    color: #97dffd;
  }
}

.register_content {
  position: relative;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 350px;
  background: #fff;
  padding: 20px;
  h2 {
    margin-bottom: 20px;
  }
  .input {
    margin-top: 15px;
  }
}

.register_content button {
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

.register_content button:hover {
  background: #48456c;
}


</style>
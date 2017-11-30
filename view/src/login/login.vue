<style>
 .login-page {
   //display: flex;
   //justify-content: center;
   height: 100vh;
 }
 .login-page:before {
    background-image: url("http://opb4v2wjv.bkt.clouddn.com/yunboss-login.jpg");
    background-size: cover;
    background-position: center;
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    content: '';
    z-index: -1;
  }
 .login-layout {
   float: right;
   border: 1px solid #e7ecf1;
   padding: 20px 0px 10px 0px;
   margin-right: 15%;
   width: 430px;
   margin-top: 200px;
   background: rgba(0,0,0,.5);
   height: 300px;
 }
 .login-title {
   align-content: center;
   color: #4db3a5;
   font-size: 30px;
   display: flex;
   justify-content: center;
   font-family: sans-serif;
   line-height: 0px;
 }

 .input-style {
   width: 300px;
 }

 .input-style1 {
   width: 120px;
   float: left;
 }

.code-style {
  display: block;
  float: left;
  height: 42px;
  padding-left: 10px;
}

.image-code-style {
  border: 1px solid #ddd;
  height: 35px;
  width: 100px;
}

.a-style {
  margin-left: 10px;
  font-size: 13px;
  color: rgb(27, 102, 199);
  font-family: Arial, Helvetica, STHeiti, 宋体;
  text-decoration: none;
}

.login-from {
  margin-top: 20px;
}

</style>

<template>
  <div class='login-page'>
    <div class='login-layout'>
      <h3 class='login-title '>登  入</h3>
      <el-form ref="form" class="login-from" :rules="rules" :model="form" label-width="80px">
        <el-form-item required label="账号" style="color: white;" prop="userName">
          <el-input class='input-style' @keyup.enter="onSubmit(form)" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item required label="密码" prop="userPwd">
          <el-input class='input-style' @keyup.enter="onSubmit(form)"  type='password' v-model="form.userPwd" ></el-input>
        </el-form-item>
        <el-form-item required label="验证码" prop="captcha">
          <input class='input-style input-style1 el-input' @keyup.enter="onSubmit(form)" v-model="form.captcha" ></input>
          <span class='code-style'>
             <img class='image-code-style' :src="codeUrl" />
          </span>
          <a class='a-style' @click="changeCode">换一张</a>
         
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('form')" >取消</el-button>
          <el-button type="primary" @click="onSubmit(form)">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { appStore, loginStore } from '../stores';
  export default {
    data() {
      return {
        form: {
          userName: '',
          userPwd: '',
          captcha: '',
        },
        codeSource: '',
        codeUrl: '/wushu/api/login/captcha',
        rules: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'change' }
          ],
        },
      }
    },
    created: function() {
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            appStore.login(this.form).then(ret => {
              appStore.token = ret.data.token;
              appStore.payload = ret.data.user;
              window.location.reload();
            }).catch(err => {
              this.$message.error(`登入失败！${err}`);
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeCode() {
        this.codeUrl = `/wushu/api/login/captcha?${Math.random().toString().slice(-5)}`;
      },
    }
  }
</script>
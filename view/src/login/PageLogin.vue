<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    height: 100vh;
}

.login-page:before {
    background-image: url("http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1494212954074.jpg");
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
    border: 1px solid #20a0ff;
    width: 360px;
    margin-top: 220px;
    background: white;
    height: 260px;
    position: relative;
    border-radius: 1%;
}

.login-header {
    text-align: center;
    width: 358px;
    background: #20a0ff;
    color: white;
    height: 35px;
    font-size: 20px;
}

.input-style {
    width: 260px;
    height: 38px;
    padding: 9px;
}

.input-style1 {
    width: 100px;
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
    height: 38px;
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

.ui-label .ui-icon {
    width: 39px;
    height: 38px;
    display: block;
    overflow: hidden;
    background-color: #aaabab;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 38px;
}

.ui-icon-userDEF {
    background-position: -2px 5px;
}

.ui-label {
    width: 39px;
    height: 38px;
    display: block;
    float: left;
    cursor: pointer;
}

.el-form-item {
    margin-bottom: 10px;
}

.sl-error-display {
    margin-top: 0px;
}

.sl-error-display {
    margin: 35px auto 16px;
    padding: 3px 5px 3px 0;
    height: auto;
    // opacity: 1;
    line-height: 26px;
    background: #ff4949;
    border: 1px solid #fadcd3;
}

.sl-error {
    position: relative;
    margin: 0;
    width: 300px;
    // opacity: .2;
    color: white;
    overflow: hidden;
}

.sl-error-display .sl-error-text {
    display: block;
    padding-left: 10px;
    line-height: 20px;
}
</style>
<template>
    <div class='login-page'>
        <div class='login-layout' :style="loginHeight">
            <div class="login-header">盛阳云Boss</div>
            <div class="breadcrumb-header" style="height: 4px; background: #20a0ff; border-bottom: 1px solid #20a0ff;"></div>
            <el-form ref="form" class="login-from" :model="form" label-width="30px">
                <el-form-item v-if="errorText">
                    <div class="sl-error sl-error-display"><span class="sl-error-text">{{errorText}}</span></div>
                </el-form-item>
                <el-form-item required style="color: white;" prop="userName">
                    <label class="ui-label"><span class="ui-icon ui-icon-userDEF"><VIcon type="user" size="18"/></span></label>
                    <input class='input-style' autofocus="autofocus" v-model="form.userName" placeholder="邮箱账号"></input>
                </el-form-item>
                <el-form-item required prop="userPwd">
                    <label class="ui-label"><span class="ui-icon ui-icon-userDEF"><VIcon type="lock" color="white" size="18"/></span></label>
                    <input class='input-style' type="password" v-model="form.userPwd"></input>
                </el-form-item>
                <el-form-item required prop="captcha">
                    <label class="ui-label"><span class="ui-icon ui-icon-userDEF"><VIcon type="lock" color="white" size="18"/></span></label>
                    <input class='input-style input-style1' @keyup.enter="onSubmit(form)" v-model="form.captcha"></input>
                    <span class='code-style'>
             <img class='image-code-style' :src="codeUrl" />
          </span>
                    <a class='a-style' @click="changeCode">换一张</a>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="saveUser">记住用户名和密码</el-checkbox>
                    <!-- @change="saveUserInfo" -->
                </el-form-item>
                <el-form-item style="margin-right: 30px">
                    <div style="float: right">
                        <el-button @click="resetForm('form')">取消</el-button>
                        <el-button type="primary" @click="onSubmit(form)">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    VIcon
} from '../components';
import {
    appStore,
    loginStore
} from '../stores';
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
                errorText: '',
                loginHeight: "height: 300px; margin-top: 220px;",
                saveUser: true,
            }
        },
        created: function() {
            this.form.userName = appStore.username;
            this.form.userPwd = appStore.pwd;
        },
        components: {
            VIcon,
        },
        watch: {
            saveUser() {
                console.log("选中还是不选中", this.saveUser);
            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!this.form.userName) {
                        this.errorText = '请输入账号';
                        this.loginHeight = "margin-top: 200px; height: 300px;";
                        return;
                    }
                    if (!this.form.userPwd) {
                        this.errorText = '请输入密码';
                        this.loginHeight = "margin-top: 200px;height: 300px;";
                        return;
                    }
                    if (!this.form.captcha) {
                        this.errorText = '请输入验证码';
                        this.loginHeight = "margin-top: 200px;height: 300px;";
                        return;
                    }
                    if (valid) {
                        appStore.login(this.form).then(ret => {
                            if(ret.code===0){
                                appStore.token = ret.data.token;
                                appStore.payload = ret.data.user;
                                if (this.saveUser) {
                                    console.log("选中之后存储");
                                    appStore.saveLocalUser(this.form.userName);
                                    appStore.saveLocalPwd(this.form.userPwd);
                                } else {
                                    console.log("不选中之后存储");
                                    appStore.saveLocalUser("");
                                    appStore.saveLocalPwd("");
                                }
                                this.$router.push('/');
                                window.location.reload();
                            }else{
                                this.$message.error(`登入失败！${ret.msg}`);
                            }
                            
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
                this.codeUrl = `${this.codeUrl}?${Math.random().toString().slice(-5)}`;
            },
        }
}
</script>

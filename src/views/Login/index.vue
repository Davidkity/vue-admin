<template>
  <div id="login">
      <div class="login-wrap">
            <ul class="menu-tab">
            <li :class="{'current': item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)" >{{ item.txt }}</li>
            </ul>
          <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm"  class="login-form" size="medium">
                <el-form-item  prop="username" class="item-form">
                    <!-- for 是用来绑定input框的，达到点击label，input框也能获取到焦点 -->
                    <label for="username">邮箱</label>  
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="password" class="item-form">
                    <label for="password">密码</label>
                    <el-input id="password"  v-model="ruleForm.password" autocomplete="off" minlength=6 maxlength=20></el-input>
                </el-form-item>
                <el-form-item  prop="passwords" class="item-form" v-if="loginButton.model === 'register'">
                    <label for="passwords">重复密码</label>
                    <el-input id="passwords"  v-model="ruleForm.passwords" autocomplete="off" minlength=6 maxlength=20></el-input>
                </el-form-item>
                <el-form-item  prop="code" class="item-form">
                    <label for="code">验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input id="code" v-model="ruleForm.code" autocomplete="off" minlength=6 maxlength=6></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" :disabled="codeButton.status" @click="getSms()">{{ codeButton.text }}</el-button>
                        </el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButton.status">{{ loginButton.model === "login" ? "登录" : "注册" }}</el-button>
                    
            </el-form-item>
</el-form>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import {GetSms,Register,Login} from "@/api/login"
//运用到什么接口，就导入什么接口
import { reactive,ref,onMounted } from '@vue/composition-api';
import { stripscript,validateEmail,validatePass,validateCodeValue } from '@/utils/validate'

export default {
  name: "login",
  setup(props, context){
    
    /*********************************************************************************************************
     * 方法
     */
    //验证用户名
    let validateUsername = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入用户名'));
        } else if(!validateEmail(value)){     //邮箱验证，正则表达式
            callback(new Error('用户名格式有误'));  
        }
        else {
            callback();  //true
        }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {

        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        
        if (value === '') {
            callback(new Error('请输入密码'));
        } else if (!validatePass(value)) {
            callback(new Error('密码为6至20为的数组+字母'));
        } else {
            callback();
        }
    };
    //验证重复密码
    let validatePasswords = (rule, value, callback) => {

        ruleForm.passwords = stripscript(value);
        value = ruleForm.passwords;
        
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value != ruleForm.password) {
            callback(new Error('两次密码不匹配，请重新输入'));
        } else {
            callback();
        }
    };
    //验证验证码
    let validateCode = (rule, value, callback) => {
        ruleForm.code = stripscript(value);
        value = ruleForm.code;
        
        if (value === '') {
            return callback(new Error('请输入验证码'));
        } else if(!validateCodeValue(value)){
            return callback(new Error('验证码格式有误'));
        } else {
            callback();
        }
    }

    /*********************************************************************************************************
     * 声明数据
     */
    //这里面放置data数据，什么周期，自定义的函数
    // reactive 用于声明对象类型的数据
    const menuTab = reactive([
        { txt: "登录", current: true, type: 'login' },
        { txt: "注册", current: false, type: 'register' }
    ])
    //模块值
    // ref 用于声明基础类型的数据 .value 来取值；isRef() 用于判断是否为基础数据类型
    // toRefs() 将对象类型转化为基础数据类型
    //验证码按钮
    const codeButton = reactive({
        status: false,
        text: "获取验证码"
    });
    //登录按钮
    const loginButton = reactive({
        // 登录按钮的状态（是否禁用）
        status: true,
        model: "login"
    });
    //倒计时
    const timer = ref(null);
    // 表单绑定数据
    const ruleForm = reactive( {
            username: '',
            password: '',
            passwords: '',
            code: ''
        })
    // 表单验证规则
    const rules = reactive({
            username: [
            { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
            { validator: validatePassword, trigger: 'blur' }
            ],
            passwords: [
            { validator: validatePasswords, trigger: 'blur' }
            ],
            code: [
            { validator: validateCode, trigger: 'blur' }
            ]
        }) 
    /*******************************************************************************************************
     * 声明函数
     */
    const toggleMenu = (data => {
        menuTab.forEach(element => {
            element.current = false;
        });
        data.current = true;
        //修改模块值
        loginButton.model = data.type;
        //重置表单数据
        context.refs.loginForm.resetFields();
        //重置验证码按钮文本内容
        codeButton.text = "获取验证码";
        //重置登录(注册)按钮为默认不可点的状态
        loginButton.status = true;
    });

    /**
     * 获取验证码
     */
    const getSms = (() => {
        
        //进行提示
        if(ruleForm.username == ''){
            context.root.$message.error('用户名不能为空！！');
            return false;
        }  
        //前端验证邮箱格式
        if(!validateEmail(ruleForm.username)){
            context.root.$message.error('用户名的格式不正确，请重新输入！！');
            return false;
        }
        //请求验证码的接口
        let data = {
            username: ruleForm.username,
           // module: loginButton.model
        };
        //修改验证码按钮的状态
        codeButton.status = true;
        //修改验证码按钮的文本
        codeButton.text = "发送中";
        //模拟延时请求 3秒
        setTimeout(() => {
            GetSms(data).then(response => {
                let data = response.data;
                console.log(data);
                context.root.$message({
                    message: data.message,
                    type: "success"
                });
                //启用登录或注册按钮
                loginButton.status = false;
                //调定时器，倒计时
                countDown(5);
            }).catch(error => {
                console.log(error);
            });
        }, 3000);
        
    })
    /**
     * 提交表单
     */
    const submitForm = (loginForm => {
        context.refs[loginForm].validate((valid) => {
            if (valid) {
                loginButton.model === "login" ? login() : register();
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    });
    /**
     * 登录
     */
    const login = (() => {
        let requestData = {
            username: ruleForm.username,
            password: ruleForm.password,
            code: ruleForm.code
        }
        Login(requestData).then(response => {
            console.log("登录");
            console.log(response);
            clearCountDown();
        }).catch(error => {

        });
    });
    /**
     * 注册
     */
    const register = (() => {
        let requestData = {
            username: ruleForm.username,
            password: ruleForm.password,
            code: ruleForm.code
        }
        Register(requestData).then(response => {
            let data = response.data;
            context.root.$message({
                message: data.message,
                type: "success"
            })
            // 注册成功
            toggleMenu(menuTab[0]);
            clearCountDown();
        }).catch(error =>{
            // 失败时执行的代码
        });
    });
    /**
     * 倒计时
     */
    const countDown = ((number) => {
        // setTimeout 倒计时，只执行一次
        // 判断定时器是否存在，存在则清除
        if(timer.value){
            clearInterval(timer.value);
        }
        let time = number;
        //setInterval 倒计时，可不断的执行，需要条件才会停止
        timer.value = setInterval(() => {
            time--;
            if(time === 0){
                clearInterval(timer.value);
                codeButton.status = false;
                codeButton.text = "再次获取";
            }else{
                codeButton.text = `倒计时${time}秒`;
            }
        }, 1000);
    });
    /**
     * 清除倒计时
     */
    const clearCountDown = (() =>{
        // 还原验证码按钮默认状态
        codeButton.status = false;
        codeButton.text = "获取验证码";
        // 清除倒计时计时器
        clearInterval(timer.value);
    });
    
    /**
     * 生命周期
     */
    //挂载完成后
    onMounted(() => {
        
    })

    return {
        menuTab,
        codeButton,
        loginButton,
        ruleForm,
        rules,
        toggleMenu,
        submitForm,
        getSms 
    }
  },
  
  
  
}

</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.menu-tab {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer
    }
    .current {
        background-color: rgba(0,0,0,.1);
    }
}
.login-form {
    margin-top: 29px;
    label {
        display: block;
        text-align: left;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff
    }
    .item-form { margin-bottom: 13xp; }
    .block {
        display: block;
        width: 100%;
    }
    .login-btn {margin-top: 19px; }
}
</style>

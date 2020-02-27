<template>
  <div id="login">
      <div class="login-wrap">
            <ul class="menu-tab">
            <li :class="{'current': item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMmeu(item)" >{{ item.txt }}</li>
            </ul>
          <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
                <el-form-item  prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="password" class="item-form">
                    <label>密码</label>
                    <el-input  v-model="ruleForm.password" autocomplete="off" minlength=6 maxlength=20></el-input>
                </el-form-item>
                <el-form-item  prop="passwords" class="item-form" v-if="model === 'register'">
                    <label>重复密码</label>
                    <el-input  v-model="ruleForm.passwords" autocomplete="off" minlength=6 maxlength=20></el-input>
                </el-form-item>
                <el-form-item  prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code" minlength=6 maxlength=6></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                    
            </el-form-item>
</el-form>
      </div>
  </div>
</template>
<script>
//运用到什么接口，就导入什么接口
import { reactive,ref,onMounted } from '@vue/composition-api';
import { stripscript,validateEmail,validatePass,validateCodeValue } from '@/utils/validate'

export default {
  name: "login",
  setup(props, context){
    
    /**
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
            callback(new Error('请再次输入密码'));
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

    /**
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
    const model = ref('login');
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
    /**
     * 声明函数
     */
    const toggleMmeu = (data => {
        menuTab.forEach(element => {
            element.current = false;
        });
        data.current = true;
        //修改模块值
        model.value = data.type;
    });

    const submitForm = (formName => {
        context.refs[formName].validate((valid) => {
            if (valid) {
            alert('submit!');
            } else {
            console.log('error submit!!');
            return false;
            }
        });
    })
    
    /**
     * 生命周期
     */
    //挂载完成后
    onMounted(() => {

    })

    return {
        menuTab,
        model,
        ruleForm,
        rules,
        toggleMmeu,
        submitForm
    }
  },
  data() {
    
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

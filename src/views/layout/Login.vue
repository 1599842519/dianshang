<template>
  <a-form-model
    class="login-form"
    ref="longinForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
  >
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('longinForm')">
        登录
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('longinForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailRef = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入登录邮箱号'));
      }
      if (emailRef.test(value)) {
        return callback();
      }
      return callback(new Error('请输入正确的邮箱号'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(loginForm) {
      console.log();
      console.log(this.$refs[loginForm]);
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          api
            .login(this.loginForm)
            .then((res) => {
              console.log(res);
              this.$store.dispatch('setUserInfo', res);
              this.$router.push({
                name: 'Home',
              });
            })
            .catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    },
  },
};
</script>
<style lang="less" >
@import url("~@/assets/css/login.less");
</style>

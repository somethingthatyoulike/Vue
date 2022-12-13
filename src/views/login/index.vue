<template>
  <div class="login-container">
    <div class="top">
      <h3>人力资源管理系统</h3>
    </div>
    <div class="container">
      <div class="lg-form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title">
            <h3>登录</h3>
            <p>还没有账号？<a href="#">我要注册</a></p>
          </div>
          <p>手机号/账号</p>
          <el-form-item prop="mobile">
            <el-input
              ref="username"
              v-model="loginForm.mobile"
              placeholder="请输入登录手机/账号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <p>登录密码</p>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="8-24位,含英文和数字"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <div class="cz">
            <el-checkbox v-model="checked">记住手机号或账号</el-checkbox>
            <a href="#" class="wjmm">忘记密码？</a>
          </div>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            class="dl"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请正确输入账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6个字符"));
      } else {
        callback();
      }
    };
    return {
      checked: true,
      loginForm: {
        mobile: "13800000002",
        password: "123456",
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["user/login"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            await this["user/login"](this.loginForm);
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .top {
    width: 100%;
    height: 7vh;
    background-color: #fff;
    h3 {
      font-size: 5vh;
      line-height: 7vh;
      text-align: center;
      color: #409eff;
    }
  }
  .container {
    width: 100%;
    height: 93vh;
    background: url("~@/assets/login/background-page.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .lg-form {
      background: url("~@/assets/login/box-background.png") no-repeat;
      background-size: 100% 100%;
      height: 73vh;
      position: relative;
      top: 10vh;
      width: 60vw;
      min-width: 600px;
      min-height: 450px;
      margin: 0 auto;
      padding: 5vh;
      overflow: hidden;
      .login-form {
        position: absolute;
        left: 55%;
        width: 40%;
        .title {
          width: 100%;
          height: 10vh;
          margin-top: 5vh;
          p {
            margin-top: 1vh;
            color: #889aa4;
            a {
              color: #409eff;
            }
          }
        }
        .cz {
          width: 100%;
          height: 5vh;
          color: #889aa4;
          white-space: nowrap;
          overflow: hidden;
          .wjmm {
            float: right;
          }
        }
        .dl {
          margin-top: 5vh;
        }
        .show-pwd {
          position: absolute;
          right: 2vh;
          font-size: 3vh;
          color: $dark_gray;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
</style>

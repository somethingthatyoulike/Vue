<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="breadcrumb-title">欢迎进入后台登录系统</div>
    <div class="btns">
      <i class="el-icon-s-flag btn" @click="changelang"></i>
      <i class="el-icon-full-screen btn" @click="changescreen"></i>
      <theme-picker />
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ userInfo.username }}</span>
          <img :src="userInfo.staffPhoto" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 主页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getuserinfo, removeuserinfo } from "@/utils/sessionStor";
import screenfull from "screenfull";
export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      userInfo: getuserinfo(),
    };
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "sidebar",
      // 'avatar'
    ]),
  },
  methods: {
    changescreen() {
      screenfull.toggle();
    },
    changelang() {
      console.log("changeLangEvent");
      this.$confirm("确定切换语言吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.$i18n.locale === "cn") {
            this.$i18n.locale = "en"; //关键语句
            console.log("en");
          } else {
            this.$i18n.locale = "cn"; //关键语句
            console.log("cn");
          }
        })
        .catch(() => {
          console.log("catch");
          this.$message({
            type: "info",
          });
        });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      removeuserinfo();
      this.$store.commit("user/removeToken");
      this.$router.push(`/login`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .breadcrumb-title {
    float: left;
    line-height: 50px;
    color: skyblue;
    font-size: 30px;
  }
  .btns {
    position: absolute;
    right: 15%;
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .btn{
      width: 35px;
      height: 35px;
      font-size: 30px;
      cursor: pointer;
      padding: 2px;
      border: 1px solid gainsboro;
    }
  }
  .right-menu {
    width: 15%;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    line-height: 50px;
    .user-dropdown{
      top: 50px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

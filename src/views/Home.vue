<template>
  <div id="homeIndex">
    <el-container style="height: 500px">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2B2E33"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div>
            <img
              src="../../public/image/logo.png"
              alt
              width="199px;height:59px"
            />
          </div>
          <el-menu-item index="2">
            <router-link to="/homeindex">
              <i class="el-icon-menu"></i>
              <span>首页</span>
            </router-link>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>费用</span>
            </template>
            <el-menu-item v-if="[2, 3].includes(+auth)" index="1-1">
              <router-link to="/class">
                <i class="el-icon-s-cooperation"></i>
                <span>费用管理</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="homegoods">
                <i class="el-icon-s-goods"></i>
                <span>凭证管理</span>
              </router-link>
            </el-menu-item>
          </el-submenu>

          <el-submenu v-if="[3].includes(+auth)" index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户</span>
            </template>
            <el-menu-item index="3-1">
              <router-link to="userdate">
                <i class="el-icon-s-cooperation"></i>
                <span>用户管理</span>
              </router-link>
            </el-menu-item>
          </el-submenu>

          <el-submenu v-if="[2, 3].includes(+auth)" index="4">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>订单</span>
            </template>
            <el-menu-item index="4-1">
              <router-link to="orderdate">
                <i class="el-icon-phone-outline"></i>
                <span>订单管理</span>
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="userInfo">
            <img src="../../public/image/head.jpg" alt />
            <span>{{ user }}</span
            >|
            <button @click="getOut">退出登录</button>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>短途运输公司版权所有</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

#homeIndex {
  a {
    text-decoration: none;
    color: #fff;
  }
  a:active {
    color: #ffd04b;
  }
  .el-header,
  .el-footer {
    color: #333;
    line-height: 60px;
  }
  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    .userInfo {
      float: right;
      display: flex;
      vertical-align: middle;
      align-items: center;
      width: 175px;
      font-size: 14px;
      justify-content: space-between;
      img {
        width: 40px;
        height: 40px;
      }
      button {
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
      }
    }
  }
  .el-footer {
    background-color: #f1f1f1;
    text-align: center;
  }
  .el-aside {
    color: #333;
    background-color: #2b2e33;
    height: 100vh;
  }
  .el-container {
    height: 100vh;
    background: #f1f1f1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      user: "",
      auth: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getOut() {
      this.$router.replace("/");
      localStorage.clear();
    },
  },
  computed: {
    users() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    this.auth = localStorage.getItem("role");
    if (localStorage.getItem("token") == null) {
      this.$router.push({ path: "/" });
      setTimeout(() => {
        this.$message.error("请先登录");
      }, 2500);
      return;
    } else {
      this.user = localStorage.getItem("token");
    }
  },
};
</script>


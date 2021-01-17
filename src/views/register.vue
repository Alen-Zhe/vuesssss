
<template>
  <div>
    <div class="main">
      <img class="back" src="../assets/loginback.jpg" alt />
      <div class="login_box">
        <div class="nav">
          <div class="usenum">账号注册</div>
        </div>
        <div class="userform">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            id="getinfoform"
          >
            <el-form-item prop="userName">
              <el-input
                type="text"
                placeholder="账号"
                v-model="ruleForm.userName"
                id="username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input
                type="passWord"
                placeholder="密码"
                v-model="ruleForm.passWord"
                id="password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                type="email"
                placeholder="邮箱"
                v-model="ruleForm.email"
              >
                <template slot="append">
                  <span @click="getCode()" v-text="codeMsg"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                type="code"
                placeholder="验证码"
                v-model="ruleForm.code"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                class="btn"
                >账号注册</el-button
              >
            </el-form-item>
          </el-form>
          <div class="gotoreg">
            <p @click="gotologin()">返回登录</p>
          </div>
          <div class="others">
            <p>其他登录方式</p>
            <img src="../assets/others.png" alt />
          </div>
        </div>
      </div>
    </div>
    <footer id="footer">
      <p>简体| 繁体| English |常见问题</p>
      <p>短途运输公司版权所有-京ICP备xxx-京公网安备xxx号-京ICP证xxx号</p>
    </footer>
  </div>
</template>

<style  lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main {
  width: 100%;
  height: 588px;
  background-color: aquamarine;
  position: relative;
  overflow: hidden;
  .back {
    height: auto;
    width: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login_box {
    width: 410px;
    height: 556px;
    position: absolute;
    top: 25px;
    left: 1100px;
    background-color: white;
  }
  .login_box .nav {
    position: relative;
    width: 100%;
    height: 52px;
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .usenum,
    .scan {
      width: 200px;
      height: 100%;
      text-align: center;
      line-height: 52px;
      font-size: 24px;
    }
    .usenum {
      color: #ff6700;
    }
  }
}

.main .login_box .userform {
  width: 390px;
  height: 415px;
  #getinfoform {
    width: 100%;
    height: 320px;
    padding: 10px;
  }
  form input {
    padding: 13px 16px 13px 14px;
  }

  button {
    margin: 18px 35px 10px 35px;
    width: 336px;
    height: 48px;
    border: none;
    background-color: #ff6700;
    color: white;
  }
  .gotoreg {
    width: 160px;
    height: 20px;
    margin-left: 306px;
    p {
      position: relative;
      text-decoration: none;
      color: #999;
      margin-right: 6px;
    }
  }
  .others {
    width: 100%;
    padding-top: 30px;
    p {
      position: relative;
      font-size: 14px;
      color: #bbb;
      text-align: center;
    }
    p::after {
      position: absolute;
      content: "";
      display: block;
      height: 1px;
      width: 115px;
      background-color: #bbb;
      left: 38px;
      top: 50%;
    }
    p::before {
      position: absolute;
      content: "";
      display: block;
      height: 1px;
      width: 115px;
      background-color: #bbb;
      right: 38px;
      top: 50%;
    }
    img {
      margin-left: 32px;
      margin-top: 18px;
    }
  }
}

#footer {
  padding-top: 40px;
  text-align: center;
  color: #9d9d9d;
  font-size: 14px;
}
</style>
<script>
import { mapActions } from "vuex";
import { getCode } from "../api/getCode";
import { register } from "../api/register";
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        passWord: "",
        email: "",
        role: 0,
        roleId: 0,
        code: "",
        codeId: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确`的邮箱地址",
            trigger: "blur",
          },
        ],
        coed: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码为 6 个字符", trigger: "blur" },
        ],
      },
      codeMsg: "获取验证码",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
    },
    ...mapActions(["loginGet"]),
    gotologin() {
      this.$router.replace("/");
    },
    getCode() {
      if (this.codeMsg == "获取验证码") {
        getCode({ email: this.ruleForm.email }).then(({ data }) => {
          this.ruleForm.codeId = data.data;
        });
        var intime = 60;
        const that = this;
        var setTime = setInterval(function () {
          that.codeMsg = `剩余时间${intime}`;
          intime--;
          if (intime == 0) {
            that.codeMsg = `获取验证码`;
            clearInterval(setTime);
          }
        }, 1000);
      } else {
        this.$message.error("请稍后重试");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        if (valid) {
          register(this.ruleForm).then(({ data }) => {
            console.log(data);
            if (data.status == 200) {
              loading.close();
              this.$message({
                message: "注册成功",
                type: "success",
              });
            } else {
              loading.close();
              this.$message.error("注册失败");
            }
          });
        } else {
          loading.close();
          this.$message.error("请输入用户名和密码");
          return false;
        }
      });
    },
  },
};
</script>
<template>
  <div id="userDate">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left; padding: 3px 0"
          type="primary"
          @click="dialogVisible = true"
          >+ 添加用户</el-button
        >
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-form
            status-icon
            :model="addUser"
            ref="addUser"
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input type="text" v-model="addUser.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input type="password" v-model="addUser.passWord"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input type="text" v-model="addUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="addUser.email"></el-input>
            </el-form-item>
            <el-form-item label="用户权限">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="adduser('addUser')"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          stripe
          fit
          empty-text="暂无数据"
          style="width: 100%"
        >
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="createDate" label="注册时间"></el-table-column>
          <el-table-column prop="role" label="权限角色"></el-table-column>
          <el-table-column prop="_id" label="操作选项">
            <template slot-scope="scope">
              <el-button @click="updateUser(scope.$index, tableData)"
                >修改</el-button
              >
              <el-dialog title="提示" :visible.sync="updateVisible" width="30%">
                <el-form
                  status-icon
                  :model="upUser"
                  ref="upUser"
                  label-width="100px"
                  :rules="rules"
                  class="demo-ruleForm"
                >
                  <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model="upUser.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="passWord">
                    <el-input
                      type="password"
                      v-model="upUser.passWord"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone">
                    <el-input type="text" v-model="upUser.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="upUser.email"></el-input>
                  </el-form-item>
                  <el-form-item label="用户权限">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in roles"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="updateVisible = false">取 消</el-button>
                  <el-button type="primary" @click="upuser('upUser')"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
              <el-button @click="deluser(scope.$index, tableData)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="1"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<style lang="less">
#userDate {
  height: 500px;
  .text {
    font-size: 14px;
  }
  .el-button {
    padding: 7px 15px;
    font-size: 12px;
  }
  .el-card__body {
    text-align: left;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .el-table__body-wrapper {
    overflow: hidden;
  }
  .clearfix:after {
    clear: both;
  }
}
</style>
<script>
import { getUser } from "../api/getUser";
import { delUser } from "../api/delUser";
import { addUser } from "../api/addUser";
import { updateUser } from "../api/updateUser";
import { getJuri } from "../api/getJuriList";
export default {
  data() {
    return {
      tableData: [],
      pagesize: 5,
      totals: 1,
      currentPage: 1,
      pageNum: "",
      pageSize: "",
      dialogVisible: false,
      updateVisible: false,
      addUser: {
        userName: "",
        phone: "",
        email: "",
        roleId: "",
        passWord: "",
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "请输入3-10位的汉字或字母",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "密码不能为空" },
          // { type: "number", message: "密码只能为数字" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确`的邮箱地址",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "手机不能为空" },
          // { type: "number", message: "手机号只能为数字" }
        ],
      },
      options: [
        {
          label: "1",
          value: "1s",
        },
        {
          label: "2",
          value: "2s",
        },
        {
          label: "3",
          value: "3s",
        },
      ],
      value: "",
      roles: [],
      delInfo: {
        userId: "",
      },
      upUser: {
        id: "",
        userName: "",
        phone: "",
        email: "",
        roleId: "",
        passWord: "",
      },
      index: "",
      indexInfo: "",
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserPage(this.currentPage, this.pagesize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserPage(val, this.pagesize);
    },
    getUserPage(num, size) {
      console.log(num, typeof num, size, typeof size);
      getUser({ page: num, size: size }).then(({ data }) => {
        console.log(data);
        this.tableData = data.records;
        this.totals = data.total;

        for (let i = 0; i < data.data.list.length; i++) {
          // 修改时间戳
          var date = new Date(data.data.list[i].create_time);
          var date2 = new Date(data.data.list[i].auth_time);
          Date.prototype.Format = function (fmt) {
            var o = {
              "M+": this.getMonth() + 1, //月份
              "d+": this.getDate(), //日
              "h+": this.getHours(), //小时
              "m+": this.getMinutes(), //分
              "s+": this.getSeconds(), //秒
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度
              S: this.getMilliseconds(), //毫秒
            };
            if (/(y+)/.test(fmt))
              fmt = fmt.replace(
                RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length)
              );
            for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(
                  RegExp.$1,
                  RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
                );
            return fmt;
          };
          data.data.list[i].create_time = date.Format("yyyy-MM-dd hh:mm:ss");
          data.data.list[i].auth_time = date2.Format("yyyy-MM-dd hh:mm:ss");
        }
        for (let j = 0; j < this.roles.length; j++) {
          //  修改角色名称
          let nums = data.data.list.findIndex(
            (element) => element.role_id == this.roles[j]._id
          );
          if (nums != -1) {
            data.data.list[nums].role_id = this.roles[j].name;
          }
        }
      });
    },
    // 添加
    adduser(formName) {
      this.dialogVisible = false;
      this.$refs[formName].validate((valid) => {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        if (valid) {
          this.addUser.roleId = this.value;
          addUser(this.addUser).then(() => {});
          this.getUserPage(1, 5);
          loading.close();
          this.$message({
            message: "添加成功",
            type: "success",
          });
        } else {
          loading.close();
          this.$message.error("请输入信息");
          return false;
        }
      });
    },
    // 删除
    deluser(num, size) {
      console.log(size[num].id);
      if (size[num].roleId) {
        this.$message.error("暂无权限删除管理员账户");
        return;
      }
      this.delInfo.userId = size[num].id;
      this.tableData.splice(num, 1);
      delUser(this.delInfo).then(() => {});
    },
    // 修改
    updateUser(num, size) {
      this.updateVisible = true;
      this.index = num;
      this.indexInfo = size;
    },
    upuser(formName) {
      this.updateVisible = false;
      this.$refs[formName].validate((valid) => {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        if (valid) {
          this.upUser.id = this.indexInfo[this.index].id;
          this.upUser.roleId = this.value;
          updateUser(this.upUser).then(({ data }) => {
            console.log(data);
          });
          this.getUserPage(1, 5);
          loading.close();
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          loading.close();
          this.$message.error("请输入信息");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getUserPage(1, 5);
    getJuri().then(({ data }) => {
      this.roles = data.data;

      for (let j = 0; j < this.roles.length; j++) {
        //  修改角色名称
        let nums = data.data.list.findIndex(
          (element) => element.role_id == this.roles[j]._id
        );
        if (nums != -1) {
          data.data.list[nums].role_id = this.roles[j].name;
        }
      }
    });
  },
};
</script>
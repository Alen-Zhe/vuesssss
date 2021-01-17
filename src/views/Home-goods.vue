<template>
  <div id="goods">
    <el-card class="box-card">
      <el-table
        :data="goodDate"
        border
        stripe
        fit
        empty-text="暂无数据"
        style="width: 100%"
      >
        <el-table-column prop="driver" label="运输员"></el-table-column>
        <el-table-column prop="startPlace" label="出发地"></el-table-column>
        <el-table-column prop="endPlace" label="目的地"></el-table-column>
        <el-table-column
          prop="transportationCost"
          label="运输费用"
        ></el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.accountingAdopt == 0
                  ? "等待一审"
                  : scope.row.accountingAdopt == 1
                  ? "一审通过"
                  : "一审未通过"
              }}
            </div>
            <div>
              {{
                scope.row.managerAdopt == 0
                  ? "等待二审"
                  : scope.row.managerAdopt == 1
                  ? "二审通过"
                  : "二审未通过"
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作选项">
          <template slot-scope="scope" v-if="scope.row.managerAdopt == 0">
            <el-button @click="changeSta(scope.$index, goodDate, 1)"
              >通过</el-button
            >
            <el-button @click="changeSta(scope.$index, goodDate, 2)"
              >不通过</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 10, 20, 30]"
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
#goods {
  .el-table {
    .el-button {
      // width: 40px;
      padding: 5px;
      font-size: 12px;
    }
  }

  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .forms {
    display: flex;
    justify-content: space-between;
  }
}
</style>
<script>
import { getGoods } from "../api/getGoods";
import { goodStatus } from "../api/goodStatus";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formInline: {},
      goodDate: [],
      pagesize: 4,
      totals: 6,
      currentPage: 1,
      goodStatus: {
        productId: "",
        status: "",
      },
      statusVal: {
        btn: "下架",
        text: "已下架",
      },
      iptVal: "",
      auth: "",
    };
  },
  methods: {
    ...mapActions(["detaiChange"]),
    onSubmit() {
      console.log("submit!");
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getGoodsPage(this.currentPage, this.pagesize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoodsPage(val, this.pagesize);
    },
    getGoodsPage(num, size, role) {
      getGoods({ pageNo: num, pageSize: size, userRole: role, temp: 0 }).then(
        ({ data }) => {
          console.log(data);
          this.goodDate = data.records;
          this.totals = data.total;
        }
      );
    },
    // 更新状态
    changeSta(num, size, status) {
      console.log(size[num]);

      goodStatus({
        orderId: size[num].id,
        userRoleId: this.auth,
        temp: status,
      }).then(({ data }) => {
        console.log(data);
        this.getGoodsPage(1, 4, +this.auth);
      });
    },
  },
  mounted() {
    this.auth = localStorage.getItem("role");

    this.getGoodsPage(1, 5, +this.auth);
  },
};
</script>

<template>
  <div id="homeClass">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="dialogVisible = true"
          >+添加账单</el-button
        >
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
          <el-form
            status-icon
            :model="dataAdd"
            ref="addUser"
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item label="运输员" prop="driver">
              <el-input type="text" v-model="dataAdd.driver"></el-input>
            </el-form-item>
            <el-form-item label="出发地" prop="startPlace">
              <el-input type="text" v-model="dataAdd.startPlace"></el-input>
            </el-form-item>
            <el-form-item label="目的地" prop="endPlace">
              <el-input type="text" v-model="dataAdd.endPlace"></el-input>
            </el-form-item>
            <el-form-item label="订单金额" prop="orderAmount">
              <el-input type="text" v-model="dataAdd.orderAmount"></el-input>
            </el-form-item>
            <el-form-item label="运输成本" prop="transportationCost">
              <el-input v-model="dataAdd.transportationCost"></el-input>
            </el-form-item>
            <el-form-item label="工资支出" prop="wageExpenditure">
              <el-input v-model="dataAdd.wageExpenditure"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCla()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        fit
        empty-text="暂无数据"
        style="width: 100%"
      >
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column
          prop="transportationCost"
          label="运输费用"
        ></el-table-column>
        <el-table-column
          prop="wageExpenditure"
          label="工资支出"
        ></el-table-column>
        <el-table-column label="收益">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{
                scope.row.orderAmount -
                scope.row.transportationCost -
                scope.row.wageExpenditure
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收益状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{
                scope.row.orderAmount -
                  scope.row.transportationCost -
                  scope.row.wageExpenditure >
                0
                  ? "盈利"
                  : "亏损"
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
#homeClass {
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
}
</style>
<script>
import { getOrder } from "../api/getOrder";
import { addClass } from "../api/addClass";

export default {
  data() {
    return {
      pagesize: 5,
      dialogVisible: false,
      totals: 0,
      currentPage: 1,
      tableData: [],
      pageNum: "1",
      dataUpPes: {
        categoryId: "",
        categoryName: "",
      },
      dataAdd: {
        driver: "",
        endPlace: "",
        orderAmount: 0,
        startPlace: "",
        transportationCost: 0,
        wageExpenditure: 0,
      },
      rules: {
        driver: [{ required: true, message: "运输员不能为空" }],
        endPlace: [{ required: true, message: "目的地不能为空" }],
        orderAmount: [{ required: true, message: "订单金额不能为空" }],
        startPlace: [{ required: true, message: "出发地不能为空" }],
        transportationCost: [{ required: true, message: "运输成本不能为空" }],
        wageExpenditure: [{ required: true, message: "工资支出不能为空" }],
      },
    };
  },
  methods: {
    //   分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getClassPage(this.currentPage, this.pagesize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClassPage(val, this.pagesize);
    },
    getClassPage(num, size) {
      getOrder({ pageNum: num, pageSize: size }).then(({ data }) => {
        this.totals = data.total;
        this.tableData = data.records;
        console.log(data.records);
      });
    },
    // 添加
    addCla() {
      addClass(this.dataAdd).then(({ data }) => {
        this.dialogVisible = false;
        console.log(data);
        this.$message({
          message: "添加成功",
          type: "success",
        });
      });
      this.getClassPage(1, 5);
    },
  },
  mounted() {
    this.getClassPage(1, 5);
  },
};
</script>
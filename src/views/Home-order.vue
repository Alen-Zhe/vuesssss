<template>
  <div id="goods">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" class="demo-form-inline forms">
          <div>
            <el-form-item>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="关键字" v-model="iptVal"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="serchGood">搜索</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-table
        :data="orderDatas"
        border
        stripe
        fit
        empty-text="暂无数据"
        style="width: 100%"
      >
        <el-table-column prop="startPlace" label="出发地"></el-table-column>
        <el-table-column prop="endPlace" label="目的地"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column
          prop="transportationCost"
          label="运输成本"
        ></el-table-column>
        <el-table-column prop="profit" label="运输收入"></el-table-column>
        <el-table-column prop="driver" label="运输人员"></el-table-column>
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
import { getOrder } from "../api/getOrder";

export default {
  data() {
    return {
      formInline: {},
      orderDatas: [],
      pagesize: 5,
      totals: 6,
      currentPage: 1,
      options: [
        {
          value: "startPlace",
          label: "按照出发地搜索",
        },
        {
          value: "endPlace",
          label: "按照目的地搜索",
        },
      ],
      value: "",
      iptVal: "",
      serOrder: {
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.orderPage(this.currentPage, this.pagesize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.orderPage(val, this.pagesize);
    },
    orderPage(num, size) {
      getOrder({ pageNo: num, pageSize: size }).then(({ data }) => {
        this.totals = data.total;
        this.orderDatas = data.records;
        console.log(data.records);
      });
    },
    // 搜索
    serchGood() {
      if (this.value == "startPlace") {
        getOrder({ ...this.serOrder, startPlace: this.iptVal }).then(
          ({ data }) => {
            this.totals = data.total;
            this.orderDatas = data.records;
            console.log(data);
          }
        );
      } else if (this.value == "endPlace") {
        getOrder({ ...this.serOrder, endPlace: this.iptVal }).then(
          ({ data }) => {
            this.totals = data.total;
            this.orderDatas = data.records;
            console.log(data);
          }
        );
      }
    },
  },
  mounted() {
    this.orderPage(1, 5);
  },
};
</script>
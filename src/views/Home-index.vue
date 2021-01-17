<template>
  <div id="homeIndex">
    <el-card class="box-card">
      <el-row>
        <el-col class="cols">
          <el-card
            class="cards"
            v-for="item in nums"
            :key="item.num"
            :style="item.color"
          >
            <div style="paddin: 14px">
              <span>{{ item.name }}</span>
              <h1>{{ item.num }}</h1>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div id="chart1" style="width: 100%; height: 550px"></div>
      <el-button @click="dialogVisible = true">下载最近数据</el-button>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
        <el-form
          status-icon
          :model="dataDoload"
          ref="addUser"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="日期">
            <el-date-picker
              v-model="dataDoload.endDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="downs()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<style lang="less">
.cols {
  display: flex;
  justify-content: space-around;
  text-align: center;
  .cards {
    width: 280px;
    height: 190px;
    line-height: 0;
    color: #fff;
    h1 {
      font-size: 50px;
      line-height: 120px;
    }
  }
}
</style>
<script>
import { getdown } from "../api/getDown";
import { getTotal } from "../api/getTotal";

export default {
  data() {
    return {
      nums: [
        {
          name: "司机人数",
          num: 1010,
          color: "background:#3CDB86",
        },
        {
          name: "用户人数",
          num: 100,
          color: "background:#4480F4",
        },
        {
          name: "订单总数",
          num: 110,
          color: "background:#083045",
        },
        {
          name: "金额总数",
          num: 1101,
          color: "background:#F66932",
        },
      ],
      dataDoload: {
        driver: "",
        endPlace: "",
        orderAmount: 0,
        startPlace: "",
        transportationCost: 0,
        wageExpenditure: 0,
        endDate: "",
      },
      dialogVisible: false,
    };
  },
  methods: {
    downs() {
      const that = this;
      getdown({
        startDate: that.dataDoload.endDate[0],
        endDate: that.dataDoload.endDate[1],
      }).then(({ data }) => {
        console.log(data);
      });
    },
  },
  mounted() {
    this.$chart.line1("chart1");
    getTotal().then(({ data }) => {
      console.log(data.data);
    });
  },
};
</script>
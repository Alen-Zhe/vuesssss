<template>
  <div id="details">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="text" icon="el-icon-back" @click="backGood"></el-button>电影详情
        </span>
      </div>
      <div>
        <div class="goodsBox">
          <el-tag>电影名称</el-tag>
          <p>{{goodName}}</p>
        </div>
        <el-divider el-divider--horizontal>
          <i class="el-icon-shopping-cart-full"></i>
        </el-divider>
        <div class="goodsBox">
          <el-tag>电影描述</el-tag>
          <p>{{goodDesc}}</p>
        </div>
        <el-divider el-divider--horizontal>
          <i class="el-icon-chat-line-round"></i>
        </el-divider>
        <div class="goodsBox">
          <el-tag>电影价格</el-tag>
          <p>{{goodPrice}}元</p>
        </div>
        <el-divider el-divider--horizontal>
          <i class="el-icon-money"></i>
        </el-divider>
        <div class="goodsBox">
          <el-tag>电影分类</el-tag>
          <p>{{goodCate}}</p>
        </div>
        <el-divider el-divider--horizontal>
          <i class="el-icon-folder-opened"></i>
        </el-divider>
        <div class="goodsBox">
          <el-tag>电影图片</el-tag>
         <img v-for="item in goodImgs" :key="item" :src="('http://118.24.25.7:5000/upload/'+item)" alt="">
        </div>
        <el-divider el-divider--horizontal>
          <i class="el-icon-picture-outline"></i>
        </el-divider>
        <div class="goodsBox">
          <el-tag>电影名称</el-tag>
          <div v-html="details"></div>
        </div>
        <el-divider el-divider--horizontal>
          <i class="el-icon-set-up"></i>
        </el-divider>
      </div>
    </el-card>
  </div>
</template>
<style lang="less">
#details {
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
  .goodsBox {
    display: flex;
    li {
      list-style: none;
    }
    p,
    div {
      padding-left: 20px;
    }
    img{
        width: 100px;
        height: 100px;
    }
  }
}
</style>
<script>
import { getClassName } from "../api/getClassName";
export default {
  data() {
    return {
      details: "",
      goodName: "",
      goodDesc: "",
      goodPrice: "",
      goodCateInfo: {
        categoryId: "",
      },
      goodCate: "",
      goodImgs: []
    };
  },
  mounted() {
      this.details = this.$store.state.detailInfo.detail;
    this.goodName = this.$store.state.detailInfo.name;
    this.goodDesc = this.$store.state.detailInfo.desc;
    this.goodPrice = this.$store.state.detailInfo.price;
    this.goodCateInfo.categoryId = this.$store.state.detailInfo.categoryId;
    this.goodImgs = this.$store.state.detailInfo.imgs;
    getClassName(this.goodCateInfo).then(({ data }) => {
      this.goodCate=data.data.name
    });
  },
  methods: {
    backGood() {
      this.$router.replace("/homegoods");
    }
  }
};
</script>
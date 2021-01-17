<template>
  <div id="updateGood">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="text" icon="el-icon-back" @click="backGood"></el-button>电影详情
        </span>
      </div>
      <el-form
        :model="addGoods"
        :rules="rules"
        ref="addGoods"
        label-width="100px"
        class="demo-addGoods"
      >
        <el-form-item label="电影名称" prop="name">
          <el-input v-model="addGoods.name"></el-input>
        </el-form-item>
        <el-form-item label="电影描述" prop="desc">
          <el-input type="textarea" v-model="addGoods.desc"></el-input>
        </el-form-item>
        <el-form-item label="电影价格">
          <el-input-number
            v-model="addGoods.price"
            controls-position="right"
            @change="handleChange"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="电影分类">
          <el-select v-model="addGoods.categoryId" placeholder="请选择">
            <el-option
              v-for="item in className"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传" prop="name">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="电影详情">
          <div id="editor" class="editor">
            <div v-html="addGoods.detail"></div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addGoods')">立即创建</el-button>
          <el-button @click="resetForm('addGoods')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="less">
#updateGood {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
<script>
import E from "wangeditor";
import { getClass } from "../api/getClass";
import { addGoods } from "../api/addGoods";
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      num: "",
      rules: {
        name: [{ required: true, message: "请输入电影名称", trigger: "blur" }],
        desc: [
          { required: true, message: "请输入电影描述", trigger: "blur" },
          {
            min: 5,
            max: 100,
            message: "长度在 5 到 100 个字符",
            trigger: "blur"
          }
        ],
        prec: [
          {
            type: "number",
            required: true,
            message: "请输入电影价格",
            trigger: "blur"
          }
        ],
        goodclass: [
          { required: true, message: "请输入电影描述", trigger: "blur" },
          {
            min: 5,
            max: 100,
            message: "长度在 5 到 100 个字符",
            trigger: "blur"
          }
        ]
      },
      className: [],
      value: "",
      addGoods: {
        categoryId: "",
        pCategoryId: 0,
        name: "",
        desc: "",
        price: "",
        detail: ""
      }
    };
  },
  methods: {
    backGood() {
      this.$router.replace("/homegoods");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addGoods(this.addGoods).then(({ data }) => {
            console.log(data);
            console.log(this.value);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    getClass().then(({ data }) => {
      for (let i = 0; i < data.data.list.length; i++) {
        this.className = data.data.list;
      }
    });

    var editor = new E("#editor");
    editor.customConfig.onchange = html => {
      this.formArticle = html;
    };
    editor.customConfig.uploadImgServer = "<%=path%>/Img/upload"; //上传URL
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
    editor.customConfig.uploadFileName = "myFileName";
    editor.customConfig.uploadImgHooks = {};
    editor.create();
  }
};
</script>
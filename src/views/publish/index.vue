<template>
  <div class="main">
    <div class='inner'>
      <p class="nav">
        商品信息
        <i class="fa fa-angle-down" aria-hidden="true"></i>
        <router-link class='return' to='/'>返回首页</router-link>
      </p>
      <div class='commodity'>
        <p class='text'>
          <span class="warn">*</span>
          <span class='span'>商品标题：</span>
          <input type="text" class='input' v-model='commodityProperty.title' @change='textTitle'>
          <span class='warn'>{{titleWarn}}</span>
        </p>
        <p class='text'>
          <span class="warn">*</span>
          <span class='span'>商品类型：</span>
          <!-- <input type="text" class='input' v-model='type' @change='textType'> -->
          <el-select v-model='commodityProperty.type' placeholder='请选择商品类型'>
            <el-option v-for='value in types' :key='value' :value='value'>{{value}}</el-option>
          </el-select>
          <span class='warn'>{{typeWarn}}</span>
        </p>
        <p class='text'>
          <span class="warn">*</span>
          <span class='span'>商品价格：</span>
          <input type="text" class='input' v-model='commodityProperty.price' @change='textPrice'>
          <span class='span'>(单位：元）</span>
          <span class='warn'>{{priceWarn}}</span>
        </p>
        <p class='text'>
          <span class="warn">*</span>
          <span class='span'>商品数量：</span>
          <input type="text" class='input' v-model='commodityProperty.num' @change='textNum'>
          <span class='warn'>{{numWarn}}</span>
        </p>
        <div class='img'>
          <!-- <el-button type='warning'>点击选择图片</el-button> -->
          <input type="file" ref='img' name='点击选择图片' @change='imgCheck'>
        </div>
        <el-button type='primary' class='comfirm' @click='publishCommodity'>确认</el-button>
        <el-button type='danger' class='empty' @click='empty'>清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//商家发布商品
import c from "@/custom";
import { publish } from "@/api/commodity";
export default {
  data() {
    return {
      types: ["穿着", "家具", "电脑-手机", "文具", "挂饰品", "生活用品"],
      commodityProperty: {
        title: "",
        type: "",
        price: "",
        num: "",
        user: this.$store.state.user.user,
        img: ""
      },
      titleWarn: "",
      priceWarn: "",
      numWarn: "",
      imgsrc: "",
      typeWarn: ""
    };
  },
  created() {
    if (this.$store.state.user.token != "seller") this.$router.push("/");
  },
  methods: {
    imgCheck() {
      this.commodityProperty.img = this.$refs.img.files[0];
      c(this.commodityProperty.img.name);
    },
    textTitle() {
      if (
        this.commodityProperty.title.length < 5 ||
        this.commodityProperty.title.length > 15
      ) {
        this.titleWarn = "标题长度必须在5到15位！";
      } else {
        this.titleWarn = "";
      }
    },
    textPrice() {
      const i = 1 + +this.commodityProperty.price;
      if (Object.is(i, NaN)) {
        this.priceWarn = "价格必须为数字！";
      } else if (this.commodityProperty.price.length >= 8) {
        this.priceWarn = "该网站暂时不出售超过此价格的商品！";
      } else {
        this.priceWarn = "";
      }
    },
    textNum() {
      const i = 1 + +this.commodityProperty.num;
      if (Object.is(i, NaN)) {
        this.numWarn = "数量必须为数字！";
      } else if (this.commodityProperty.num.length >= 8) {
        this.numWarn = "销售量过大！请降低数量。";
      } else {
        this.numWarn = "";
      }
    },
    comfirm() {
      c(this.$refs.text.value);
    },
    empty() {
      this.commodityProperty.title = "";
      this.commodityProperty.type = "";
      this.commodityProperty.price = "";
      this.commodityProperty.num = "";
      this.titleWarn = "";
      this.priceWarn = "";
      this.numWarn = "";
      this.$refs.img.value = "";
    },
    publishCommodity() {
      if (this.titleWarn != "" || this.numWarn != "" || this.priceWarn != "")
        return;
      else if (this.commodityProperty.title == "") {
        this.titleWarn = "标题不能为空!";
        return;
      } else if (this.commodityProperty.type == "") {
        this.typeWarn = "请选择类型！";
        return;
      } else if (this.commodityProperty.price == "") {
        this.priceWarn = "价格不能为空!";
        return;
      } else if (this.commodityProperty.num == "") {
        this.numWarn = "数量不能为空!";
        return;
      } else {
        this.typeWarn = "";
        // publish(this.commodityProperty)
        //   .then(res => {
        //     // this.empty();
        //     // c(res.data);
        //     // let go = confirm("发布商品成功！是否继续发布商品？");
        //     // if (go == false) this.$router.push("/");
        //     // this.$router.push('/')
        //     this.empty();
        //     let go = confirm("发布商品成功！是否继续发布商品？");
        //     if (go == false) this.$router.push("/");
        //   })
        //   .catch(err => {
        //     c(err);
        //   });
        this.addFile();
        this.empty();
        let go = confirm("发布商品成功！是否继续发布商品？");
        if (go == false) this.$router.push("/");
      }
    },
    upload(file) {
      // let file = this.commodityProperty.img;
      let fileName = this.commodityProperty.img.name;
      let fd = new FormData();
      let title = this.commodityProperty.title;
      let type = this.commodityProperty.type;
      let price = this.commodityProperty.price;
      let num = this.commodityProperty.num;
      let user = this.commodityProperty.user;
      fd.append("file", file);
      fd.append("title", title);
      fd.append("type", type);
      fd.append("price", price);
      fd.append("num", num);
      fd.append("user", user);
      fd.append("fileName", fileName);
      let url = "http://localhost/sale/publish.php";
      let XHR = new XMLHttpRequest();
      if (XHR) {
        XHR.onreadystatechange = () => {
          if (XHR.readyState == 4 && XHR.status == 200) {
            c(XHR.responseText);
          }
        };
        XHR.open("POST", url);
        XHR.send(fd);
      }
    },
    addFile() {
      let file = this.commodityProperty.img;
      let typeStr = "image/jpg,image/png,image/gif,image/jpeg";
      if (typeStr.indexOf(file.type) >= 0) {
        if (file.size > 10240000) {
          alert("上传的文件不能大于10M");
          return;
        } else {
          this.upload(file);
        }
      } else {
        alert("请上传格式为jpg、png、gif、jpeg的图片");
      }
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
}
.inner {
  position: relative;
  left: 12%;
  top: 100px;
  border: 1px solid #dcdfe6;
  width: 76%;
  height: 700px;
}
.nav {
  color: #f00;
  padding: 1%;
  font-size: 18px;
  border-bottom: 1px solid #ececec;
  position: relative;
  top: -20px;
}
.return {
  color: #000;
  position: relative;
  left: 85.5%;
}
.return:hover {
  color: #f00;
}
.commodity {
  position: relative;
  width: 60%;
  left: 12%;
}
.warn {
  color: #f00;
}
.span {
  font-size: 18px;
}
.text {
  margin-bottom: 33px;
}
.input {
  width: 30%;
  height: 25px;
}
.img {
  border: 1px dashed #909399;
  position: relative;
  left: 10%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
.comfirm {
  position: relative;
  top: 40px;
  left: 38%;
}
.empty {
  position: relative;
  top: 40px;
  left: 57%;
}
</style>

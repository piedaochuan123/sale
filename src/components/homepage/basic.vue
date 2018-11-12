<template>
  <div>
    <div class='selectPrice'>
      价格：<input type="text" v-model='minPrice'> - <input type="text" v-model='maxPrice'>
      <el-button type='primary' class='el-button' @click='checkPrice'>
        确认
        </el-button>
      <span style='color:#f00'></span>
    </div>
    <div class='main' ref='commodity'>
      <span v-for='(value,index) in commodity' class="commodity" :key='value[0]'>
        <router-link :to='commodityLink[index]' class='aa'>
          <img :src="value[2]" class='img'>
          <span class="price">
            <b>￥{{value[1]}}</b>
          </span><br>
          <span class="title">{{value[0]}}</span><br>
          <span class="num">库存：{{value[3]}}</span>
          <img src="static/cat.jpg" class='icon'>
          <span class='name'>
            <b>{{value[4]}}</b>
          </span>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import c from "@/custom";
import { hot } from "@/api/commodity";
export default {
  data() {
    return {
      price: 100,
      num: 5,
      commodity: "",
      commodityLink: [],
      minPrice:'',
      maxPrice:''
    };
  },
  methods: {
    hotCommodity() {
      hot().then(res => {
        this.commodity = res.data;
        for (let i = 0; i < this.commodity.length; i++)
          this.commodityLink.push(this.commodity[i][0]);
        this.commodityLink = this.commodityLink.map(x => "/commodity/" + x);
        this.grid();
        // c(this.commodity)
      })
      .catch(err=>console.log(err))
    },
    checkPrice(){
       
    },
    grid() {
      let num = Math.round(this.commodity.length / 5);
      if (this.commodity.length % 5 != 0) num++;
      c(num);
      let rows = "";
      for (let i = 0; i < num; i++) {
        rows = rows + " 375px";
      }
      this.$refs.commodity.style.gridTemplateRows = rows;
    }
  },
  created() {
    this.hotCommodity();
  }
};
</script>

<style scoped>
.selectPrice{
  position: relative;
  left:8%;
  margin-bottom: 20px;
}
.selectPrice input{
  width:6%;
}
.selectPrice .el-button{
  margin-left:1%;
}
.main {
  display: grid;
  width: 100%;
  grid-template-columns: 17% 17% 17% 17% 17%;
  grid-template-rows: 375px 375px 375px 375px 375px 375px 375px 375px;
  margin-bottom: 40px;
}
.main::before {
  width: 8%;
}
.commodity {
  display: block;
  margin-right: 9%;
  padding: 6%;
  border: 1px solid #dcdfe6;
  position: relative;
  left: 8%;
  margin-bottom: 30px;
}
.aa {
  display: inline-block;
  width: 100%;
  height: 375px;
}
.commodity:hover {
  border: 1px solid #409eff;
}
.commodity .img {
  width: 100%;
  height: 220px;
}
.price {
  font-size: 18px;
  color: #ff0036;
}
.title {
  color: #000;
}
.num {
  position: relative;
  top: 5px;
  /* left: 70%; */
  font-size: 14px;
  color: #606266;
}
.icon {
  position: absolute;
  top: 83%;
  left: 85%;
}
.name {
  position: absolute;
  left: 75%;
  top: 90%;
  color: #f00;
}
</style>

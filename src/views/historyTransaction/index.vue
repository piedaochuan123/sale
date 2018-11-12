<template>
    <div class="main">
        <top></top>
        <div v-if='this.commodityDetails[0] == undefined' class='shoppingCart'>
            <img src="./shoppingCart.png"> 哦，你还没有购买过任何商品，赶快去买些东西吧！
        </div>
        <div v-if='this.commodityDetails[0]!=undefined'>
            <div class='body' v-for='(value,index) in commodityDetails' :key='"histroyTransaction"+index'>
                <img src="static/cat.jpg" class='cat'>
                <span>卖家：
                    <span>
                        {{value[5]}}
                    </span>
                </span>
                <img src="./wangwang.png" class='wangwang'>
                <div class='details'>
                    <img :src="value[4]" class='img'>
                    <span class='title'>{{value[3]}}</span>
                    <span class="commodity">
                        <span class='price'>单价：￥{{value[1]}}元</span>
                        <span class="num">数量：{{value[0]}}</span>
                        <span class='sum'>总价：{{value[2]}}元</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from "@/components/published/top";
import { historyTransaction } from "@/api/commodity";
import c from "@/custom";
export default {
  data() {
    return {
      commodityDetails: []
    };
  },
  methods: {
    commodity() {
      historyTransaction({
        user: this.$store.state.user.user
      })
        .then(res => {
          c(res.data);
          this.commodityDetails = res.data;
          c(this.commodityDetails[0] == undefined);
        })
        .catch(err => {
          c(err);
        });
    }
  },
  mounted() {
    this.commodity();
  },
  components: {
    top
  }
};
</script>

<style scoped>
.body {
  position: relative;
  width: 80%;
  left: 10%;
  top: 10%;
}
.shoppingCart {
  position: relative;
  left: 30%;
  width:70%;
  top: 120px;
}
.cat {
  position: relative;
  top: 1px;
}
.details {
  margin-bottom: 15px;
  border: 1px solid #dcdfe6;
}
@keyframes move {
  0% {
    top: 0px;
  }
  50% {
    top: -2px;
  }
  100% {
    top: 2px;
  }
}
.wangwang {
  position: relative;
  top: 6px;
  animation: move 2s infinite;
}
.img {
  width: 8%;
  height: 80px;
}
.title {
  position: relative;
  top: -65px;
  display: inline-block;
  width: 40%;
  left: 0.1%;
}
.commodity {
  position: relative;
  top: -40px;
}
.price {
  display: inline-block;
  width: 10%;
}
.num {
  position: relative;
  display: inline-block;
  width: 10%;
  left: 3%;
}
.sum {
  position: relative;
  left: 5%;
}
</style>

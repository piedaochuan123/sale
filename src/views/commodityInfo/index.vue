<template>
  <div class="main">
    <div>
      <img src="./nav.png" width='100%'>
    </div>
    <div class='center'>
      <img :src="commodityDetails[0][2]" class='img'>
      <div class="right">
        <span>
          <b>{{ commodityDetails[0][0] }}</b>
        </span><br>
        <img src="./type.png" class='type'>
        <p class='price'>
          <span>价格：</span>
          <b>￥{{commodityDetails[0][1]}}
          </b>
        </p>
        <span class='num'>数量</span>
        <input type="text" v-model='inputnum' class='input'>
        <button class='up' @click='up'>
          <i class="fa fa-angle-up" aria-hidden="true"></i>
        </button>
        <button class='down' @click='reduce'>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </button>
        <span>库存:{{commodityDetails[0][3]}}</span>
        <el-button type='danger' plain class='buy' @click='buy'>
          立即购买
        </el-button>
        <el-button type='danger' @click='shoppingCart'>
          <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入购物车
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
//商品的动态路由
import c from "@/custom";
import { detailsPage } from "@/api/commodity";
import { transaction } from "@/api/transaction";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      inputnum: 1,
      commodityDetails: [1, 2, 3, 4, 5],
      id: this.$route.params.id
    };
  },
  methods: {
    buy() {
      if(this.$store.state.user.user==null){
        alert('您还没有登录，请先登录！')
        this.$router.push('/login')
        return
      }
      if (this.$store.state.user.user == this.commodityDetails[0][4]) {
        alert("不能购买自己的商品哦！");
        // c(this.$store.state.user.user);
        // c(this.commodityDetails[0][4]);
        // c(this.inputnum * this.commodityDetails[0][1]);
        return;
      } else {
        let t = confirm(
          "供需" +
            this.inputnum * this.commodityDetails[0][1] +
            "元，是否确认购买？"
        );
        if (t == true) {
          transaction({
            user: this.$store.state.user.user,
            seller: this.commodityDetails[0][4],
            sum: this.inputnum * this.commodityDetails[0][1],
            num: this.inputnum,
            price: this.commodityDetails[0][1],
            title: this.commodityDetails[0][0],
            img: this.commodityDetails[0][2]
          })
            .then(res => {
              alert(res.data);
              if ((this.commodityDetails = null)) this.$router.push("/");
              location.reload();
            })
            .catch(err => {
              c(err);
            });
        }
      }
    },
    up() {
      if (this.inputnum < this.commodityDetails[0][3]) this.inputnum++;
    },
    reduce() {
      if (this.inputnum != 1) {
        this.inputnum--;
      }
    },
    details() {
      detailsPage({
        title: this.$route.params.id
      })
        .then(res => {
          this.commodityDetails = res.data;
          // c(this.commodityDetails);
        })
        .catch(error => {
          c(err);
        });
    },
    ...mapMutations({
      add: "add"
    }),
    shoppingCart() {
      this.add(this.commodityDetails[0][0]);
      // c(this.$store.state.shoppingCart.commodity);
    }
  },
  watch: {
    inputnum(newvalue, oldvalue) {
      let text = 1 + +this.inputnum;
      if (
        Object.is(text, NaN) ||
        +newvalue > this.commodityDetails[0][3] ||
        newvalue == "0"
      ) {
        this.inputnum = oldvalue;
      }
    },
    $route(to, from) {
      if (this.$route.name === "commodity")
        //同一id页面不重新加载问题解决，仅仅是接口。
        this.details();
    }
  },
  mounted() {
    this.details();
  }
};
</script>

<style scoped>
/* .main{
} */
.center {
  position: relative;
}
.img {
  position: absolute;
  left: 13%;
  right: 0;
  width: 24%;
  border: 1px solid #000;
}
.right {
  position: relative;
  left: 40%;
  width: 36%;
}
.type {
  width: 100%;
  margin-bottom: 2%;
}
.price {
  font-size: 18px;
  color: #f40;
}
.num {
  color: #878787;
  font-size: 16px;
  margin-left: 1%;
  margin-right: 7%;
  margin-top: 9%;
}
.input {
  width: 5%;
  border: #a7a6ab 1px solid;
  height: 31px;
}
.up,
.down {
  position: relative;
  height: 15px;
  text-align: center;
  line-height: 15px;
  padding: 0;
  width: 4%;
}
.up {
  top: -10px;
}
.down {
  left: -4.8%;
  top: 10px;
}
.buy {
  margin-left: 4%;
}
</style>

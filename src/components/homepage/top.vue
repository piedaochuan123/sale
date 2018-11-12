<template>
  <div class='main'>
    <el-menu mode='horizontal' class='el-menu' text-color='#000'>
      <el-submenu index='1'>
        <template slot='title' index='1-1' class='el-submenu'>我的购物</template>
        <el-menu-item index='1-2'>
          <router-link to='/historyTransaction'>已买到的宝贝</router-link>
          </el-menu-item>
        <el-menu-item index='1-3'>我的足迹</el-menu-item>
      </el-submenu>
      <el-menu-item index='2' class='el-menu-item'>
        <router-link to='/shoppingCart'>购物车</router-link>
      </el-menu-item>
      <el-submenu index='3' class='el-submenu'>
        <template slot='title' index='3-1'>
          <i class="fa fa-star" aria-hidden="true"></i>收藏夹
        </template>
        <el-menu-item index='3-2'>收藏的宝贝</el-menu-item>
        <el-menu-item index='3-3'>收藏的店铺</el-menu-item>
      </el-submenu>
      <el-submenu index='4'>
        <template slot='title' index='4'>商品分类</template>
        <el-menu-item class='el-menu-item' v-for='value in types' :key='value.name' index='4-1'>
          <router-link :to='value.link'>{{value.name}}</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index='5' class='el-submenu'>
        <template slot='title' index='5-1'>网站导航</template>
        <el-menu-item index='5-2'>哈哈哈</el-menu-item>
        <el-menu-item index='5-3'>fff</el-menu-item>
      </el-submenu>
      <el-submenu index='9' v-if='$store.state.user.token =="seller"' class='el-submenu'>
        <template slot='title' index='9-1'>商品管理</template>
        <el-menu-item class='el-menu-item' index='9-2'>
          <router-link to='/publish'>发布商品</router-link>
        </el-menu-item>
        <el-menu-item class='el-menu-item' index='9-3'>
          <router-link to='/published'>我的商品</router-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class='block' index='6' @click='test'></el-menu-item>
      <el-menu-item style='color:#f00' index='7' v-if='$store.state.user.user'>
        {{$store.state.user.user}}
      </el-menu-item>
      <el-menu-item class='el-menu-item' index='7' v-if='!$store.state.user.user'>
        <router-link to='/login' class='el-menu-item login'>亲，请登录</router-link>
      </el-menu-item>
      <el-menu-item index='8' class='el-menu-item regist' v-if='!$store.state.user.user'>
        注册
      </el-menu-item>
      <el-menu-item index='8' class='el-menu-item regist' v-if='$store.state.user.user' @click='loginout'>
        登出
      </el-menu-item>
    </el-menu>
    <img src="./sale.png" class='sale'>
    <el-input placeholder="请输入要查询的商品" prefix-icon='el-icon-search' class='search'>
      <template slot="append">搜索</template>
    </el-input>
    <img src="./cat.jpg" class='cat'>
  </div>
</template>

<script>
import c from "@/custom";
import { removeToken } from "@/custom/localStorage";
import { removeUser } from "@/custom/localStorage";
export default {
  data() {
    return {
      username: this.$store.state.user.user,
      show: true,
      showBlance:false,
      types: [
        {
          link: "/types/穿着",
          name: "穿着"
        },
        {
          link: "/types/手机-电脑",
          name: "手机-电脑"
        },
        {
          link: "/types/家具",
          name: "家具"
        },
        {
          link: "/types/挂饰品",
          name: "挂饰品"
        },
        {
          link: "/types/文具",
          name: "文具"
        },
        {
          link: "/types/生活用品",
          name: "生活用品"
        }
      ]
    };
  },
  methods: {
    loginout() {
      let check = confirm("确定要登出吗？");
      if (check == true) {
        removeToken();
        removeUser();
        location.reload();
      }
    },
    test() {
      c(this.$store.state.user.token);
      c(this.$store.state.user.user);
      c(this.username);
    }
  },
  mounted() {
    if (this.$store.state.user.user != null) {
      this.username = this.$store.state.user.user;
      this.show = false;
      // c(this.$store.state.user.user);
      //   c(this.$store.state.user.money)
    }
  }
};
</script>

<style scoped>
a {
  color: #000;
}
a:hover {
  color: #f00 !important;
}
.el-menu {
  padding-left: 10%;
}
.block {
  cursor: auto;
  width: 38%;
  border-bottom: transparent !important;
}
.search {
  width: 50%;
  position: relative;
  top: -105px;
  left: 1%;
}
.sale {
  position: relative;
  top: -40px;
  width: 27%;
}
.cat {
  position: relative;
  left: 50px;
  top: 10px;
  width: 16%;
}
.el-menu-item {
  border-bottom: transparent !important;
}
.el-menu-item,
.el-submenu {
  cursor: auto;
}
.el-menu-item a {
  cursor: pointer;
}
.login {
  color: #f00 !important;
}
.login:hover,
.regist:hover {
  background: #fff;
  cursor: pointer;
  color: #f00;
}

</style>

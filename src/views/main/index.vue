<template>
  <div class='main'>
    <div class='top' @mouseover="stop()" @mouseout="move()">
      <img src="./btn-left.png" class='leftbtn' @click="reduce">
      <img src="./btn-right.png" class='rightbtn' @click='add'>
      <div class='carousel' :style="{transform:'translateX(-'+translateX+'%)'}" :class='{animate:animate}' ref='carousel'>
        <span v-for='(value,index) in carousel' :key='"carousel"+index'>
          <router-link :to='commodityLink[index]'>
            <img :src="value[1]" class='ad'></router-link>
          <div class="link" :style='{left:left[index]}'>
            <router-link :to='commodityLink[index]'>{{value[0]}}</router-link>
          </div>
        </span>
      </div>
    </div>
    <login class='login'></login>
  </div>
</template>

<script>
//登录页面
import login from "@/components/main/login";
import c from "@/custom";
import { adcarousel } from "@/api/carousel"; //轮播图
export default {
  data() {
    return {
      t: null,
      translateX: 100 / 8,
      carousel: [],
      num: 1,
      animate: true,
      left: ["0", "12.5%", "25%", "37.5%", "50%", "62.5%", "75%", "87.5%"],
      click: true,
      commodityLink: []
    };
  },
  components: {
    login
  },
  methods: {
    add() {
      if (this.click == true) {
        this.click = false;
        this.animate = true;
        if (this.num < 6) {
          this.translateX += 100 / 8;
          this.num++;
          // c(this.num);
        } else {
          this.translateX += 100 / 8;
          setTimeout(() => {
            this.animate = false;
            this.translateX = 100 / 8;
            this.num = 1;
          }, 690);
        }
        setTimeout(() => {
          this.click = true;
        }, 700);
      }
      // this.click=true;
    },
    reduce() {
      if (this.click == true) {
        this.click = false;
        this.animate = true;
        if (this.num > 1) {
          this.translateX -= 100 / 8;
          this.num--;
          // c(this.num);
        } else {
          this.translateX -= 100 / 8;
          setTimeout(() => {
            this.animate = false;
            this.num = 6;
            this.translateX = 600 / 8;
          }, 690);
        }
        setTimeout(() => {
          this.click = true;
        }, 700);
      }
    },
    move() {
      this.t = setInterval(() => {
        this.add();
      }, 3000);
    },
    stop() {
      clearInterval(this.t);
    },
    carouselapi() {
      adcarousel()
        .then(res => {
          c(res.data);
          this.carousel = res.data;
          this.carousel.unshift(this.carousel[5]);
          this.carousel.push(this.carousel[1]);
          for (let i = 0; i < this.carousel.length; i++)
          this.commodityLink.push(this.carousel[i][0]);
          this.commodityLink = this.commodityLink.map(x => "/commodity/" + x);
        })
        .catch(err => {
          c(err);
        });
    }
  },
  created() {
    // c(window.innerHeight);
    this.carouselapi();
  },
  mounted() {
    this.move();
    document.addEventListener("visibilitychange", () => {
      //页面离开的时候停止轮播图动画，
      if (document.visibilityState === "hidden") {
        //visiblityState属性作用*
        this.stop();
      } else {
        this.move();
      }
    });
  }
};
</script>

<style scoped>
.main {
  background-image: url("./city.jpg");
  background-repeat: no-repeat;
  height: 843px;
  background-size: 100% 100%;
}
.login {
  position: relative;
  width: 50%;
  left: 66%;
  top: -65px;
}
.top {
  width: 35%;
  height: 300px;
  background: #f00;
  overflow: hidden;
  position: relative;
  left: 11%;
  top: 240px;
}
.carousel {
  height: 300px;
  width: 800%;
  background: #fff;
  position: relative;
  top: -15.4%;
}
.animate {
  transition: all 0.7s;
}
.leftbtn,
.rightbtn {
  width: 9%;
  height: 14%;
  position: relative;
  top: 105px;
  z-index: 1;
  cursor: pointer;
}
.rightbtn {
  left: 81%;
}
.ad {
  width: 12.5%;
  height: 100%;
  z-index: 0;
  position: relative;
  float: left;
}
.link {
  position: absolute;
  left: 12.5%;
  top: 82%;
  background-color: #000;
  opacity: 0.8;
  width: 12.5%;
  height: 70px;
  color: #fff;
  padding: 10px;
}
a {
  color: #fff;
}
a:hover {
  color: #e6a23c;
}
</style>

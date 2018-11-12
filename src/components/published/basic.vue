<template>
    <div class="main">
        <div class='body'>
            <div v-for='(value,index) in details' :key='"published"+index'>
                <img src="static/cat.jpg" class='cat'>
                <span>店家：
                    <span class="user">
                        <b>{{username}}</b>
                    </span>
                </span> 
                <img src="./wangwang.png" class='wangwang'>
                <div class='details'>
                    <img :src="value[2]" class='img'>
                    <span class='title'>{{value[0]}}</span>
                    <span class="commodity">
                        <span class='price'>单价：￥{{value[1]}}</span>
                        <span class="num">库存：{{value[3]}}</span>
                        <el-button type='primary' class='delete' @click='remove(index)'>删除</el-button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { myCommodity,removeCommodity } from "@/api/commodity";
import c from "@/custom";
export default {
  data() {
    return {
      username: this.$store.state.user.user,
      details:[]
    };
  },
  methods: {
    commodity() {
      myCommodity({
        user: this.$store.state.user.user
      })
        .then(res => {
          c(res.data);
          this.details=res.data
        })
        .catch(err => {
          c(err);
        });
    },
    remove(index){
       let t=confirm('确认要删除吗？')
       if(t!=true) return
        removeCommodity({
           title:this.details[index][0]
        })
        .then(res=>{
            location.reload()
        })
        .catch(err=>{
            c(err)
        })
    }
  },
  created() {
    c(this.$store.state.user.user)
    this.commodity();
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
.cat {
  position: relative;
  top: 1px;
}
.user {
  color: #f40;
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
  width:40%;
  left:0.1%;
}
.commodity {
  position: relative;
  top: -40px;
}
.price{
    display: inline-block;
    width:10%;
}
.num {
  position: relative;
  display: inline-block;
  width:10%;
  left:3%;
}
.delete {
  position: relative;
  left:10%;
}
</style>

<template>
    <div class="main">
        
    </div>
</template>

<script>
import top from "@/components/published/top";
export default {
  data() {
    return {
      username: "piedaochuan"
    };
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
  /* height: 80px; */
}
.title {
  position: relative;
  display:inline-block;
  width: 35%;
  border: 1px solid #f00;
  top:-80px;
}
.commodity{
    position: relative;
    left:10%;
    top:-40px;
}
.price,.number,.sum{
    position: relative;
    display:inline-block;
    width:10%; 
}
</style>

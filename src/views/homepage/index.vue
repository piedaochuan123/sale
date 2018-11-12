<template>
    <div>
        <top class='top'>
          <div></div>
        </top>
        <router-view></router-view>
        <bottom></bottom>
    </div>
</template>

<script>       
                                                 //主页面
import top from "@/components/homepage/top";
import basic from "@/components/homepage/basic";
import bottom from "@/components/homepage/bottom";
export default {
  components: {
    top,
    basic,
    bottom
  }
};
</script>

<style scoped>
.top {
  width: 100%;
}
</style>

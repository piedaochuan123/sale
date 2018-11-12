<template>
    <div class="main">
        <top></top>
        <basic></basic>
    </div>
</template>

<script>
import top from '@/components/published/top'
import basic from '@/components/published/basic'
export default {
  data() {
    return {};
  },
  created() {
    if (this.$store.state.user.token != "seller") this.$router.push("/");
  },
  components:{
      top,
      basic
  }
};
</script>

<style scoped>
</style>

<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body,
img,
div {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
</style>

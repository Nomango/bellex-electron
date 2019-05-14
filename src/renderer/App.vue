<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
* {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
</style>

<style lang='stylus' scoped>
#app {
  width 100%
  height 100%
  color: #333;
  font-weight normal;
  background-color #f2f2f2;
}
</style>

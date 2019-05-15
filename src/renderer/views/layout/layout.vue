<template>
  <div class="home-wrapper">
    <layout-header />
    <layout-sidebar />
    <layout-body>
      <router-view slot="layout-body-slot" />
    </layout-body>
  </div>
</template>

<script>
import layoutHeader from './components/header'
import layoutSidebar from './components/sidebar'
import layoutBody from './components/body'
export default {
  name: 'home',
  components: {
    layoutHeader,
    layoutSidebar,
    layoutBody
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.home-wrapper .bell-side
  width: 220px;
  top: 0;
  z-index: 1001;
</style>
<style lang="stylus" scoped>
.home-wrapper
  width 100%
  height 100%
</style>

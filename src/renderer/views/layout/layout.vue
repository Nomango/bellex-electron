<template>
  <div class="home-wrapper">
    <bell-header />
    <bell-menu />
    <bell-body>
      <router-view slot="bellcontent" />
    </bell-body>
  </div>
</template>

<script>
import bellHeader from './components/bellHeader'
import bellMenu from './components/bellMenu'
import bellBody from './components/bellContent'
export default {
  name: 'home',
  components: {
    bellMenu,
    bellHeader,
    bellBody
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

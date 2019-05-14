<template>
  <div class="bell-body" :class="{'isCollapse': sidebar}">
    <div class="bell-content bell-show">
      <slot name="bellcontent"></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sidebar'])
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang='stylus' scoped>
.bell-body
  position: fixed;
  top 50px
  left: 220px;
  width calc(100vw - 220px)
  height auto
  bottom: 0;
  right: 0;
  z-index 1200
  transition all .3s
  box-sizing border-box
  &.isCollapse
    left 64px
    width calc(100vw - 64px)
  .bell-content
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    overflow: hidden;
    overflow-y: auto;
    box-sizing border-box
</style>

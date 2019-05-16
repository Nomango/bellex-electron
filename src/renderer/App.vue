<template>
  <div id="app">
    <router-view></router-view>
    <div class="mask" v-if="showMask">
      <div class="content">
        <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="updateData.percent" status="success" />
        <p>正在更新中...</p>
        <p>
          <span class="">{{updateData.transferred | capacityConversion}} / {{updateData.total | capacityConversion}}</span>
          <span class="speed-span">{{updateData.bytesPerSecond | capacityConversion}}/s</span>
        </p>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  filters: {
    capacityConversion (capacity) {
      if (capacity > 1024 * 1024) {
        let mb = capacity / 1024 / 1024
        return `${mb.toFixed(2)} Mb`
      } else if (capacity > 1024) {
        let kb = capacity / 1024
        return `${kb.toFixed(0)} Kb`
      } else {
        let b = capacity
        return `${b} Bytes`
      }
    }
  },
  data () {
    return {
      showMask: false,
      updateData: {
        transferred: 0,
        total: 0,
        bytesPerSecond: 0,
        percent: 0
      }
    }
  },
  created () {
    // 启动时自动检查更新
    this.$electron.ipcRenderer.send('checkForUpdate')
    // 监听自动更新事件
    this.$electron.ipcRenderer.on('start-download', () => {
      // 正在下载更新包
      this.showMask = true
    })
      .on('download-progress', (event, progress) => {
        if (progress) {
          this.updateData = Object.assign({}, progress)
        }
      })
      .on('update-downloaded', (event, progress) => {
        this.showMask = false
      })
      .on('update-error', (event, error) => {
        this.showMask = false
        this.$message({
          type: 'warning',
          message: `检查更新失败: ${error}`
        })
      })
  },
  beforeDestroy () {
    this.$electron.ipcRenderer.removeAll(['start-download', 'download-progress', 'update-downloaded', 'update-error'])
  }
}
</script>

<style lang='stylus'>
* {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
</style>

<style lang='stylus' scoped>
#app
  position relative
  width 100%
  height 100%
  color: #333;
  font-weight normal;
  background-color #f2f2f2;
  
  .mask
    position absolute
    top 0
    left 0
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
    padding 0 40px
    background-color rgba(0,0,0,.6)
    box-sizing border-box
  .progress
    margin 0 auto
  .content
    flex 1
    font-size 16px
    color rgb(240,240,240)
    text-align center
    p
      margin-top 10px
      .speed-span
        display inline-block
        margin-left 10px
</style>

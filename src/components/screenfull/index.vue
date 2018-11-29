<template>

  <div>
    <svg
      class="svg-icon screenfull-svg"
      aria-hidden="true"
      @click="click"
    >
      <use :xlink:href="iconName()"></use>
    </svg>
  </div>

</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  props: {},
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {},
  methods: {
    iconName() {
      return this.isFullscreen ? '#icon-tuichuquanping' : '#icon-quanping'
    },
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = !screenfull.isFullscreen
      this.$emit('listenToEvent', this.isFullscreen)
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  cursor: pointer;
  width: 18px;
  height: 18px;
  vertical-align: -4px !important;
}
</style>

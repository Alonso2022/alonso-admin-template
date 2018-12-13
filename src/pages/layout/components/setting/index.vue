<template>
  <span class="setting">
    <div class="setting__shade" :class="{'setting__shade--show':isShade}" @click="close"></div>
    <i class="el-icon-more setting__icon" @click="open"></i>
    <div class="setting__content" :class="{'setting__content--show':box}">

      <div class="setting__header">版权信息</div>
      <div class="setting__body setting__about">
        <p>当前版本 alonso-admin-template v0.1 </p>
        <p>基于框架 vue-cli v3.x 开发</p>
      </div>

      <div class="setting__header">设置</div>

      <div class="setting__body setting__form">
<el-switch
  v-model="demonstration"
  active-text="演示模式"
  inactive-text="工作模式">
</el-switch>
      </div>

    </div>
  </span>
</template>

<script>

export default {
  data() {
    return {
      box: false,
      // testMode: false,
      form: {}
    }
  },
  computed: {
    isShade() {
      return this.$store.state.user.setting.displaySettingPanl
    },
    demonstration: {
      get: function() {
        return this.$store.state.user.setting.demonstration
      },
      set: function(newValue) {
        this.$store.commit('SET_DEMONSTRATION', newValue)
      }
    }
  },
  created() {
  },
  methods: {
    close() {
      this.box = false
      this.$store.commit('SET_SETTING_PANL', false)
    },
    open() {
      this.box = true
      this.$store.commit('SET_SETTING_PANL', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  &__icon {
    transform: rotate(90deg);
    cursor: pointer;
  }
  &__header {
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    small {
      margin-left: 8px;
      color: #999;
    }
  }
  &__body {
    padding: 10px 15px;
    line-height: 24px;
  }
  &__about {
    font-size: 14px;
    line-height: 30px;
  }
  &__shade {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2048;
    &--show {
      display: block;
    }
  }
  &__form {
    width: 230px;
    margin: 0 auto;
  }
  &__content {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    position: fixed;
    width: 320px;
    height: 100%;
    right: -450px;
    top: 0;
    z-index: 2048;
    background-color: #fff;
    &--show {
      right: 0;
    }
  }
}
</style>

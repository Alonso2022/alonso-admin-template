<template>
  <div>
    <svg class="svg-icon hamburger" :class="{'is-active':isActive}" aria-hidden="true" @click="toggleClick">
      <use xlink:href="#icon-menu"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 1.3em;
  height: 1.3em;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>


<template>
  <!-- eslint-disable vue/require-component-is-->
  <Component v-bind="linkProps(to)">
    <slot />
  </Component>
</template>

<script>
import { isExternal } from '@/utils/common'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    linkProps(url) {
      if (this.isExternalLink(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :default-openeds="openeds"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"

    >
      <sidebar-item v-for="route in addRouters" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return { openeds: ['1', '2', '3', '4'] }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'addRouters',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

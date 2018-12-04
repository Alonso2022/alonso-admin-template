<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">

      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>
        <el-tooltip :content="$t('navbar.lockScreen')" effect="dark" placement="bottom">
          <LockScreen class="screenfull right-menu-item" />
        </el-tooltip>

        <el-tooltip :content="isFullscreen?$t('navbar.exitScreenfull'):$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item" @listenToEvent="setFullScreen" />
        </el-tooltip>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip>
        <el-tooltip :content="$t('navbar.lang')" effect="dark" placement="bottom">
          <lang-select class="international right-menu-item"/>
        </el-tooltip>
        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">

        <span class="el-dropdown-link">
          <img :src="getAvatar()" class="user-avatar" /> {{name}}
          <i class="el-icon-arrow-down"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/Alonso2022/alonso-admin-template">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
import ErrorLog from '@/components/errorLog'
import LockScreen from '@/components/lockScreen'
import Screenfull from '@/components/screenfull'
import SizeSelect from '@/components/sizeSelect'
import LangSelect from '@/components/langSelect'
import ThemePicker from '@/components/themePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    LockScreen,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    getAvatar() {
      const path = this.avatar
      if (path) {
        return path.startsWith('http') ? path : `${process.env.BASE_URL}img/${path}`
      } else {
        return '/img/avatar.jpg'
      }
    },
    setFullScreen(isFullscreen) {
      this.isFullscreen = isFullscreen
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-bottom: 1px solid #eee;
  .hamburger-container {
    line-height: 54px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    color: #666;
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 5px;
    }
    .screenfull {
      vertical-align: top;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 0px;
    }
    .avatar-container {
      vertical-align: top;
      margin-right: 20px;
      .el-dropdown-link{
        cursor: pointer;
        .user-avatar {
          padding: 2px;
          width: 30px;
          height: 30px;
          border-radius: 100%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

import Cookies from 'js-cookie'
import { setStore, getStore, removeStore } from '@/utils/storage'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || process.env.VUE_APP_LANG,
    size: Cookies.get('size') || 'medium',
    lock: {
      isLock: getStore({ name: 'isLock' }) || false,
      pwd: getStore({ name: 'pwd' }) || ''
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },

    SET_LOCK: state => {
      state.lock.isLock = true
      setStore({
        name: 'isLock',
        content: state.lock.isLock,
        type: 'session'
      })
    },
    SET_LOCK_PASSWD: (state, pwd) => {
      state.lock.pwd = pwd
      setStore({
        name: 'pwd',
        content: state.lock.pwd,
        type: 'session'
      })
    },
    CLEAR_LOCK: state => {
      state.lock.isLock = false
      state.lock.pwd = ''
      removeStore({
        name: 'pwd'
      })
      removeStore({
        name: 'isLock'
      })
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }

  }
}

export default app

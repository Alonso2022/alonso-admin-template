<template>
    <div>
      <iframe :src="urlPath" class="iframe" ref="iframe" ></iframe>
    </div>
</template>

<script>

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { param2Obj } from '@/utils/common'
export default {
  name: 'Iframe',
  data() {
    return {
      urlPath: this.getUrlPath() // iframe src 路径
    }
  },
  created() {
    NProgress.configure({ showSpinner: false })
  },
  mounted() {
    this.load()
    this.resize()
  },
  props: ['routerPath'],
  watch: {
    $route: function() {
      this.load()
    },
    routerPath: function() {
      // 监听routerPath变化，改变src路径
      this.urlPath = this.getUrlPath()
    }
  },
  methods: {

    // 显示等待框
    show() {
      NProgress.start()
    },
    // 隐藏等待狂
    hide() {
      NProgress.done()
    },
    // 加载浏览器窗口变化自适应
    resize() {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // 加载组件
    load() {
      this.show()

      // console.log(this.$route.meta.src)
      // 超时3s自动隐藏等待狂，加强用户体验
      let time = 3
      const timeFunc = setInterval(() => {
        time--
        if (time === 0) {
          this.hide()
          clearInterval(timeFunc)
        }
      }, 1000)
      this.iframeInit()
    },
    // iframe窗口初始化
    iframeInit() {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 88
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      } else {
        iframe.onload = () => {
          this.hide()
        }
      }
    },
    getUrlPath: function() {
      // 获取 iframe src 路径
      if (this.$route.meta.src) {
        return this.$route.meta.src
      } else {
        const url = window.location.href
        console.log(window.location.href)
        const obj = param2Obj(url)
        return obj.src ? obj.src : ''
      }
    }
  }
}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}

</style>

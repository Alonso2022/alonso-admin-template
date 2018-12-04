import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/pages/layout/index'

/**
  vue router 官方见： https://router.vuejs.org/zh/api/#name

  declare type RouteConfig = {
    path: string;                               //如满足 /^(https?:|mailto:|tel:)/.test(path) 表达式的代表外链，将以新开网页打开
    component?: Component;
    name?: string;                              // 命名路由 建议设置，<keep-alive>将使用，如不设置将不会在Tag中显示
    components?: { [name: string]: Component }; // 命名视图组件
    redirect?: string | Location | Function;    // 如果配置成 `redirect:noredirect` 在面包屑中将以无连接形式展示
    props?: boolean | Object | Function;
    alias?: string | Array<string>;
    children?: Array<RouteConfig>;              // 子路由
    beforeEnter?: (to: Route, from: Route, next: Function) => void;
    meta?: any;

    // 2.6.0+
    caseSensitive?: boolean; // 匹配规则是否大小写敏感？(默认值：false)
    pathToRegexpOptions?: Object; // 编译正则的选项

    // 以上为vue官方属性
    // 以下为 alonso-admin-template 新增属性
    hidden: true                   // default: false, 如果设置为true 将不在菜单中显示
    alwaysShow: true               // default: false 如果设置为true 不管有几个子路由，均显示父级菜单，反之设置为false,当只有一项子路由时不显示父级菜单
    meta : {
      title: 'title'               // 在菜单及tag中显示的名称
      icon: 'svg-name'             // 对应icon 采用的svg
      src: 'http://www.baidu.com'  // 第三方网站 iframe 形式加载
    }
}
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/404',
    component: () => import('@/pages/errorPage/404'),
    name: 'Page404',
    hidden: false,
    meta: { title: 'page404', icon: 'about', noCache: true }
  },
  {
    path: '/iframe',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'ifrmae',
        component: () => import(/* webpackChunkName: "views" */ '@/views/iframe/index'),
        meta: {
          title: 'ifrmae',
          icon: 'setting-selected'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 需要权限验证的路由
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "views" */ '@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'el-icon-menu', noCache: true, roles: ['admin', 'editor'] }
    }]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/index',
    hidden: false,
    meta: { title: 'about', icon: 'about', noCache: true, roles: ['admin'] },
    children: [{
      path: 'index',
      name: 'about',
      component: () => import(/* webpackChunkName: "views" */ '@/views/about'),
      meta: { title: 'about', icon: 'about', noCache: true, roles: ['admin'] }
    }]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.baidu.com/',
        meta: {
          title: 'externalLink',
          icon: 'setting-selected'
        }
      }
    ]
  },
  {
    path: '/third-site',
    component: Layout,
    redirect: '/163',
    meta: {
      title: 'thirdSite',
      icon: 'group'
    },
    children: [
      {
        path: 'gitee',
        name: 'gitee',
        component: () => import(/* webpackChunkName: "thirdSite" */ '@/views/iframe/index'),
        meta: {
          src: 'http://www.gitee.com', title: 'gitee'
        }
      },
      {
        path: '163',
        name: '163',
        component: () => import(/* webpackChunkName: "thirdSite" */ '@/views/iframe/index'),
        meta: {
          src: 'http://www.163.com', title: 'wangyi'
        }
      },
      {
        path: 'baidu',
        name: 'baidu',
        component: () => import(/* webpackChunkName: "thirdSite" */ '@/views/iframe/index'),
        meta: {
          src: 'http://www.baidu.com', title: 'baidu'
        }
      },
      {
        path: 'jingdong',
        name: 'jingdong',
        component: () => import(/* webpackChunkName: "thirdSite" */ '@/views/iframe/index'),
        meta: {
          src: 'http://www.jd.com', title: 'jingdong'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

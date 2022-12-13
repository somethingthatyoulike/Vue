import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'tab' }
    }]
  },

  {
    path: '/person',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Person',
      component: () => import('@/views/person/index'),
      meta: { title: '员工', icon: 'peoples' }
    }]
  },

  {
    path: '/money',
    component: Layout,
    meta: { title: '工资', icon: 'money' },
    children: [
      {
        path: 'index',
        name: 'Money',
        component: () => import('@/views/money/index'),
        meta: { title: '工资', icon: 'money' }
      },
      {
        path:'see/:id',
        name:'See',
        component:()=>import('@/views/money/see/index'),
        meta: { title: '查看', icon: 'money' },
        hidden:true,
      },
      {
        path:'set',
        name:'Set',
        component:()=>import('@/views/money/setting/index'),
        meta: { title: '设置', icon: 'money' },
        hidden:true,
      },
    ]
  },

  {
    path: '/security',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Security',
      component: () => import('@/views/security/index'),
      meta: { title: '社保', icon: 'star' }
    }]
  },

  {
    path: '/attendance',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Attendance',
        component: () => import('@/views/attendance/index'),
        meta: { title: '考勤', icon: 'people' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/attendance/list/index'),
        meta: { title: '报表', icon: 'people0' },
        hidden:true,
      }
    ]
  },

  {
    path: '/csettings',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Csettings',
      component: () => import('@/views/csettings/index'),
      meta: { title: '公司设置', icon: 'tree' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

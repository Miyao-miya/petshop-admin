import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/',
  //   name: 'index',
  //   show: true,
  //   component: () => import('../views/Index.vue'),
  //   redirect: '/ManagePage',
  //   children:[
  //     {
  //       path: '/ManagePage',
  //       name: '查询',
  //       component: () => import('../views/ManagePage.vue')
  //     },
  //     {
  //       path: '/AddPage',
  //       name: '添加',
  //       component: () => import('../views/AddPage.vue')
  //     }
  //   ]
  // },
  {
    path: "/",
    name: "管理员管理",
    show: true,
    component: () => import('../views/adim/Index'),
    redirect: '/adim',
    children:[
      {
        path: '/adim',
        name: '管理员管理',
        component: () => import('../views/adim/Index')
      }
    ]
  },
  {
    path: "/log",
    name: "操作日志",
    show: true,
    component: () => import('../views/log/Index'),
    children:[
      {
        path: '/AdinmLog',
        name: '管理员操作日志',
        component: () => import('../views/log/module/AdinmLog')
      },
      {
        path: '/UserLog',
        name: '用户操作日志',
        component: () => import('../views/log/module/UserLog')
      }
    ]
  }
  ,
  {
    path: "/error",
    name: "错误日志",
    show: true,
    component: () => import('../views/error/Index'),
    children:[
      {
        path: '/error',
        name: '错误日志',
        component: () => import('../views/error/Index')
      }
    ]
  },
  {
    path: "/docker",
    name: "医生管理",
    show: true,
    component: () => import('../views/docker/Index'),
    children:[
      {
        path: '/docker',
        name: '医生管理',
        component: () => import('../views/docker/module/Docker')
      },
      {
        path: '/Arrange',
        name: '排班管理',
        component: () => import('../views/docker/module/Arrange')
      }
    ]
  },

  {
    path: "/user",
    name: "用户管理",
    show: true,
    component: () => import('../views/user/Index'),
    children:[
      {
        path: '/user',
        name: '用户管理',
        component: () => import('../views/user/moudle/User')
      },
      {
        path: '/Order',
        name: '订单管理',
        component: () => import('../views/user/moudle/Order')
      },
      {
        path: '/Reservation',
        name: '预约管理',
        component: () => import('../views/user/moudle/Reservation')
      },
      {
        path: '/ShopCart',
        name: '购物车管理',
        component: () => import('../views/user/moudle/ShopCart')
      },
      {
        path: '/post',
        name: '帖子管理',
        component: () => import('../views/user/moudle/post')
      },
      {
        path: '/Photos',
        name: '相册管理',
        component: () => import('../views/user/moudle/Photos')
      }
    ]
  },
  {
    path: "/docker",
    name: "商品管理",
    show: true,
    component: () => import('../views/goods/Index'),
    children:[
      {
        path: '/Goods',
        name: '商品管理',
        component: () => import('../views/goods/module/Goods')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

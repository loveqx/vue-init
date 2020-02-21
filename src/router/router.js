import Home from '../views/Home.vue'

//配置路由列表
export default [
  {
    path: '/',
    name: 'Home',
    alias: '/home_page', //路由别名
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //路由懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  //动态路由
  {
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/Argu.vue')
  },
  //嵌套路由
  {
    path: '/parent',
    name: 'parent',
    component: () => import('@/views/Parent.vue'),
    children: [
      {
        path: 'child',
        name: 'child',
        component: () => import('@/views/Child.vue')
      }
    ]
  },
  //命名路由
  {
    path: '/named_view',
    components: {
      default: ()=> import('@/views/Child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue'),
    }
  },
  //重定向
  {
    path: '/main',
    redirect: '/'
  },
  //重定向2
  {
    path: '/main2',
    redirect: {
      name:'About'
    }
  },
  //重定向3
  {
    path: '/main3',
    redirect: to => {
      return {
        name: 'About'
      }
    }
  },
  //重定向3 简写
  {
    path: '/main4',
    redirect: to => '/'
  },

]

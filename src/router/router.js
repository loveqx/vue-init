import Home from '../views/Home.vue'

//配置路由列表
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    alias: '/home_page', //路由别名
    component: Home,

    //路由传参1，函数方式
    props: route =>({
      food: route.query.food
    }),
    //路由独享守卫
    beforeEnter:(to,from,next)=>{
      if(from.name==='About') alert('这是从About来的')
      else alert('这不是从About来的')
      next()
    }

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //路由懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    //路由传参1，对象方式
    props: {
      food: 'banana'
    },
    meta: {
      title: '关于'
    }

  },
  //动态路由
  {
    path: '/argu/:username',
    name: 'argu',
    component: () => import('@/views/Argu.vue'),
    //路由传参2，bool方式
    props: true
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
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../views/error_404.vue')
  }

]

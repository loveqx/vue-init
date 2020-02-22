import Vue from 'vue'
import VueRouter from 'vue-router'
import  routes from './router'
import {setTitle} from '../lib/util'

Vue.use(VueRouter)
const router = new VueRouter({
  //mode: 'history',
  routes
})
//全局守卫-前置守卫
const HAS_LOGIN = true
router.beforeEach((to,from,next)=>{
  //如果访问页面不是login页面，则判断是否已经登录状态，否则跳到登录页面
  to.meta  && setTitle(to.meta.title)
  if(to.name!='Login'){
    if(HAS_LOGIN) next()
    else next({name:'Login'})
    //如果访问的是登录页面，如果已经登录，则到首页；否则继续
  } else {
    if(HAS_LOGIN) next({name:'Home'})
    else next()
  }
//全局守卫-路由解析钩子，导航被确认之前，异步路由被解析之后，所有的钩子都结束后执行
 router.beforeResolve((to,from,next)=>{
    //console.log('路由解析守卫');
    //console.log(to)
    next()
 })

//全局守卫-后置钩子,路由跳转之后进行的操作
  router.afterEach((to,from)=>{
    //console.log((to,from))
  })

})

//创建路由实例
export default router

/*
* 一个完整的导航流程
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
* */



# vue-course

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## V1.0 项目初始化
1.新建目录和文件

## V1.1 vue-router路由管理(上)
```
1、路由配置
    a、动态路由
      {
        path: '/argu/:name',
        name: 'argu',
        component: () => import('@/views/Argu.vue')
      },
    b、嵌套路由
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
    c、命名路由
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        //路由懒加载
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
    d、命名视图
      <router-view name="email"/>
2、JS操作路由
    a、前进(go)或后退(back)
    b、路由跳转
    c、路由替换
3、路由别名
    a、alias
```
## V1.2 vue-router路由管理(下)
```
1、路由组件传参
    方式一、bool传参
        路由里面配置：props: true
        组件里面配置：
            props: {
                  username: {
                    type: String,
                    default: 'jack'
                  }
                }
            username直接使用
    方式二、对象传参
        路由里面配置：
            props: {
                  food: 'banana'
                }
        组件里面配置：
            props: {
                  food: {
                    type: String,
                    default: 'apple'
                  }
                }
            food属性可以直接使用
    方式三、函数传参
        路由里面配置：
        //路由传参1，函数方式
            props: route =>({
              food: route.query.food
            })
        组件里面配置：
            props: {
                food: {
                  type: String,
                  default: 'apple'
                }
              },


2、HTML5 history模式
    //创建路由实例，history模式对于加载后端静态资源的时候会有问题，需要特殊配置
    export default new VueRouter({
      mode: 'history',
      routes
    })

    //404页面配置
    {
        path: '*',
        component: () => import(/* webpackChunkName: "about" */ '../views/error_404.vue')
    }
3、导航守卫
    正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
4、路由元信息
    路由元信息meta属性，可以在路由里面配置
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

5、过渡效果
    <transition-group name="router">
      <router-view key="default" />
      <router-view key="email" name="email"/>
      <router-view key="tel" name="tel"/>
    </transition-group>
    样式设置：
      .router-enter{
        opacity: 0;
      }
      .router-enter-active{
        transition: opacity 1s ease;
      }
      .router-enter-to{
        opacity: 1;
      }

      .router-leave{
        opacity: 1;
      }
      .router-leave-active{
        transition: opacity 1s ease;
      }
      .router-leave-to{
        opacity: 0;
      }
```


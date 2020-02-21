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



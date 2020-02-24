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
## V1.3 bus(多组件之间通讯)
```
    1、创建bus实例
        import Vue from 'vue'
        const Bus = new Vue()
        export default Bus
    2、main.js引入
        import Bus from './lib/bus
        Vue.prototype.$bus = Bus
    3、组件之间通过bus通讯
        组件A：emit提交事件，并传入参数
        methods: {
                  handleClick () {
                    this.$bus.$emit('on-click', 'hello')
                  }
                }
        组件B：侦听事件，接受传过来的参数
        mounted () {
              this.$bus.$on('on-click', mes => {
                this.message = mes
              })
            }
```

## V1.4 Vuex基础01
    a、vuex中state类似组件中的data
    b、store中的数据获取方式(3种)
        方式1
        this.$store.state.username
        方式2，module中的数据
        this.$store.state.module.username
        方式3，解构方式
        import {mapState} from 'vuex'
        ...mapState({
                appName: state => state.appName,
                userName: state => state.user.userName
              }),

         //上面的解构赋值import {mapState} from 'vuex'
         //等价于
        import vuex from 'vuex'
        const mapState = vuex.mapState

        //...mapState(['appName','userName']),
        //等价于下面的方式
            computed:{
              appName(){
                return this.$store.state.appName;
              },
              userName(){
                return this.$store.state.user.userName
              }
            },
    c、命名空间
        模块中设置命名空间：
        export default {
          //使用命名空间,可以使模块更加密闭，不受外界干扰
          namespaced: true,
          state,
          mutations,
          actions
        }

        //使用命名空间方式
          import { createNamespacedHelpers } from 'vuex'
          const {mapState} = createNamespacedHelpers('user')

        //使用命名空间方式引用数据
              ...mapState({
                userName: state => state.userName
              })
    d、vuex中的getters
        vuex中的getters类似模块中的计算属性
        1、定义：
            const getters = {
              appNameWithVersion: (state) => {
                return `${state.appName}v2.0`
              }
            }
            export default getters
        2、注册
            export default new Vuex.Store({
              getters,
              state,
              mutations,
              actions,
              modules: {
                user
              }
            })
        3、使用
         import {mapGetters } from 'vuex'
           ...mapGetters([
                 'appNameWithVersion'
               ])
         view中直接使用
         <div>appname:{{appName}} appNameWithVersion:{{appNameWithVersion}}</div>
         注意：如果开启了命名空间，则需要如下方式使用
         ...mapGetters('user',[
                          'appNameWithVersion'
                        ])
## V1.5 Vuex基础02
    ### a、vuex中的mutations
    mutation：变异、改变的意思，是用来改变state中的数据的。通过commit进行数据修改。
        1、定义方法
        import vue from 'vue'
        const mutations = {
          SET_APP_NAME(state,params){
            //参数是对象
            //state.appName = params.appName
            //参数是字符串
            state.appName = params
          },
          SET_APP_VERSION(state){
            vue.set(state,'appVersion','v2.0')
          }
        }

        export default mutations

        2、在组件中使用mutations
        结构mutation
        import { mapState, mapGetters, mapMutations } from 'vuex'
        在methods中使用方法，
         methods: {
              ...mapMutations([
                'SET_APP_VERSION',
                'SET_APP_NAME',
                'SET_USER_NAME'
              ]),
               handleUsername(){
                      this.SET_USER_NAME('新用户名')
                    }
         }
         注意1：如果在module中使用了namespanced：true时，引用方法是需要加入模块名
           ...mapMutations('user',[
             'SET_USER_NAME'
           ]),
         注意2、如果数据是异步获取的，需要修改的话，需要通过actions异步修改

    ### b、vuex中的actions
    1、定义方法
        import {getAppName} from '@/api/app'

        const actions ={
          //同步方式
          /*updateAppName({commit}){
            getAppName().then(res=>{
              console.log(res)
              //解构赋值方法
              const {code,info:{appName}} = res
              commit('SET_APP_NAME',appName)
            }).catch(err=>{
              console.log(err)
            })
          }*/
          //等价于如下方式
          /*updateAppName(paramsOBJ){
            const commit = paramsObj.commit
          }*/

          //异步实现同步效果
          async updateAppName({commit}){
            try{
              const {info:{appName}} = await getAppName()
              commit('SET_APP_NAME',appName)
            }catch(err){
              console.log(err)
            }
          }
        }

        export default actions
    2、在组件中使用
         import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
         methods: {
         ...mapActions([
                 'updateAppName'
               ]),
          handleChangeAppName(){
            this.updateAppName();
          }
         }
    ### c、vuex中的模块
        当vuex中数据很多时，我们需要把同一类数据，比如用户数据相关、某一业务数据相关的放在一起，这样就形成了模块。
        1、新建模块
            新建module文件夹
        2、新建文件
            新建业务文件，如user，代表user模块。如果数据量大，则可以新建user文件夹，下面新建actions、mutations、getters、state、index文件
        3、使用
             const state ={
               userName: 'xuequn'
             }
             const getters ={
               firstLetter: (state)=>{
                 return state.userName.substr(0,1)
               }
             }
             const mutations ={
               SET_USER_NAME(state,params){
                 state.userName = params
               }
             }
             const actions ={
               updateUserName({commit ,state,rootState,dispatch}){

               }
             }


             export default {
               //使用命名空间,可以使模块更加密闭，不受外界干扰
               //namespaced: true,
               getters,
               state,
               mutations,
               actions
             }
        4、组件中使用
            和前面的一样
            import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
            methods中引入，然后调用对应的方法即可,如果使用了namespaced，则需要加入模块名才能引入。
                ...mapMutations('user',[
                        'SET_USER_NAME'
                      ]),
                  ...mapActions('user',[
                    'updateAppName'
                  ]),

    ## d、动态注册模块
    //动态注册模块，直接调用registerModule就可以注册新模块，而且，可以嵌套注册。注册模块后，同样也可以定义state、mutations、actions等
          /*registerModule(){
            this.$store.registerModule('todo',{
              state:{
                todoList: [
                  '学习Vue-Router',
                  '学习Vuex'
                ]
              }
            })
          }*/
          //动态注册模块(多级)
          registerModule(){
            this.$store.registerModule(['user','todo'],{
              state:{
                todoList: [
                  '学习Vue-Router',
                  '学习Vuex'
                ]
              }
            })
          }
###1.6 Vuex进阶
    a、插件
        vuex中可以使用插件
        1、store中新建plugin文件夹
        2、配置plugin
            export default store => {
              if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
              store.subscribe((mutation, state) => {
                localStorage.state = JSON.stringify(state)
              })
            }
        3、mutations有变化时，会在localStorage中保存state

    b、严格模式
        strict：false,默认为false没有错误提示，我们可以通过以下设置开发环境为true，生产环境为false
        strict: process.env.NODE_ENV === 'development',
    c、vuex中的双向绑定
        <input v-model="inputValue">
        v-model有2个功能：1、会接受输入的数据作为value
                         2、input事件侦听，value变化后触发
         所以有双向绑定功能。
    d、vuex中实现双向绑定
        mutations中定义方法
             SET_STATE_VALUE (state, value) {
                state.stateValue = value
              }
        组件中使用
            methods引入
            ...mapMutations([ 'SET_STATE_VALUE'
                                   ]),
            computed中定义
                stateValue: {
                        get () {
                          return this.$store.state.stateValue
                        },
                        set (val) {
                          this.SET_STATE_VALUE(val)
                        }

            组件使用
                <input v-model="stateValue">
                <p>{{stateValue}}</p>


<template>
  <div>
    <a-input @input="handleInput"/>
    <!-- <p>{{ inputValue }}</p> -->
    <a-show :content="inputValue"/>
    <button @click="handleChangeAppName">修改appName</button>
    <div @click="handleAPPname">appname:{{appName}}======== appNameWithVersion:{{appNameWithVersion}}</div>
    <div @click="handleUsername">userName:{{userName}}=======  firstLetter:{{firstLetter}}</div>
    <div>appVersion:{{appVersion}}</div>
    <button @click="registerModule">动态注册模块</button>
    <div>
      <li v-for="(todo,index) in todoList" :key="index">{{todo}}</li>
    </div>
  </div>
  </div>
</template>
<script>
  import AInput from '_c/AInput.vue'
  import AShow from '_c/AShow.vue'
  //import {mapState} from 'vuex'
  //上面的解构赋值等价于
  //import vuex from 'vuex'
  //const mapState = vuex.mapState

  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  //使用命名空间方式
/*  import { createNamespacedHelpers } from 'vuex'
  const {mapState} = createNamespacedHelpers('user')*/

  export default {
    name: 'store',
    data () {
      return {
        inputValue: ''
      }
    },
    computed:{
      //等价于下面的方式
      //...mapState(['appName']),
      /*...mapState({
        appName: state => state.appName,
        userName: state => state.user.userName
      }),*/

      //使用命名空间方式
      ...mapState({
        appName: state => state.appName,
        userName: state => state.user.userName,
        appVersion: state => state.appVersion,
        todoList: state =>state.todo ?state.todo.todoList:[],
        todoList: state =>state.user.todo ?state.user.todo.todoList:[]
      }),
      //等价于下面的方式
      /*
      userName(){
        return this.$store.state.user.userName
      }*/

      ...mapGetters([
        'appNameWithVersion',
        'firstLetter'
      ])
    },
    components: {
      AInput,
      AShow
    },
    methods: {
      ...mapMutations([
        'SET_APP_VERSION',
        'SET_APP_NAME',
        'SET_USER_NAME'
      ]),
      ...mapActions([
        'updateAppName'
      ]),
      handleInput (val) {
        this.inputValue = val
      },
      handleAPPname(){
        this.$store.commit('SET_APP_NAME','newappname')
      },
      handleChangeAppName(){
       //this.$store.commit('SET_APP_VERSION')
        //参数是对象
        /*this.SET_APP_NAME({
          appName:'Myappname'
        }),*/
        //参数是字符串
        //this.SET_APP_NAME('Myappname')

        this.updateAppName();
        //this.$store.dispatch('updateAppName','xuexue')

      },
      handleUsername(){
        this.SET_USER_NAME('新用户名')
      },

      //动态注册模块
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
    }
  }
</script>

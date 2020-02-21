<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="handleClick('back')">返回到上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到child</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick(type){
      if(type==='back') this.$router.back()
      else if(type==='push') {
        const name = 'lison'
        this.$router.push({

          //方式1，es6模板语法
          //path: `/argu/${name}`

          //方式2，模板语法，带参数，和路由定义里面一样效果
          name: `argu`,
          params: {
            name: 'lison'
          }

          //方式3，使用命名路由加params
          /*name: 'argu',
          params: {
            name: 'lison' //添加后url为http://localhost:8080/#/argu/lison
          }*/

          //方式4，通过query，在url最后增加查询条件方式
          /*name: 'parent',
          query:{
            name: 'lison'//添加后的url为http://localhost:8080/#/parent?name=lison
          }*/
          })
      } else if(type==='replace'){
        this.$router.replace({
          name: 'child'
        })
      }
      //this.$router.push('/parent')  可以使用路径方式，命名路由是为了解决路由太长的问题。
      //替换(replace)和跳转(push)的区别：跳转会记住上一个页面，而relace则不会记住上一个，回退的话，会回到倒数第二个页面
    }
  }
}
</script>

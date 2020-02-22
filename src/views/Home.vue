<template>
  <div class="home">
    {{food}}
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
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  components: {
    HelloWorld
  },
  //进入组件的时候触发的，这个时候组件还没渲染完成，还不能使用this
  beforeRouteEnter(to,from,next){
    console.log('beforeRouterEneter执行时，this的值是:' +this)
    console.log('url来自：' + from.name);
    console.log('url去往：' + to.name);
    next((vm)=>{
      console.log('next函数里可以调用vm实例，vm.food的值为：'+vm.food)
    })
  },
  //在离开路由时会执行，比如离开页面时，提示你是否保存页面表单
  beforeRouteLeave(to,from,next){
    console.log('现在执行beforeRouterLeave')
    const leave = confirm('您确定要离开吗？')
    if(leave) next();
    else next(false)
  },

  methods: {
    handleClick(type){
      if(type==='back') this.$router.back()
      else if(type==='push') {
        const username = 'lison'
        this.$router.push({

          //方式1，es6模板语法
          //path: `/argu/${username}`

          //方式2，模板语法，带参数，和路由定义里面一样效果
          name: `argu`,
          params: {
            username: 'lison'
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

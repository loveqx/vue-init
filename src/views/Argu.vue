<template>
  <div>
    {{username}}
  </div>
</template>

<script>
  export default {
    name: 'Argu',
    props: {
      username: {
        type: String,
        default: 'jack'
      }
    },
  //当路由组件发生变化时调用，此时组件已经渲染完成，所以this可以调用
  beforeRouteUpdate(to,from,next){
    console.log('beforeRouteUpdate正在执行,url去往'+to.name +',url来自'+from.name)
  },
  }
</script>

<style scoped>

</style>

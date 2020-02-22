<template>
  <div>
    <a-input @input="handleInput"/>
    <!-- <p>{{ inputValue }}</p> -->
    <a-show :content="inputValue"/>
    <div>appname:{{appName}}======== appNameWithVersion:{{appNameWithVersion}}</div>
    <div>userName:{{userName}}=======  firstLetter:{{firstLetter}}</div>
  </div>
</template>
<script>
  import AInput from '_c/AInput.vue'
  import AShow from '_c/AShow.vue'
  //import {mapState} from 'vuex'
  //上面的解构赋值等价于
  //import vuex from 'vuex'
  //const mapState = vuex.mapState

  import { mapState, mapGetters } from 'vuex'

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
        userName: state => state.user.userName
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
      handleInput (val) {
        this.inputValue = val
      }
    }
  }
</script>

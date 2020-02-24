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
  },
  SET_STATE_VALUE (state, value) {
    state.stateValue = value
  }
}

export default mutations

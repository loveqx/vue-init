import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'
import user from './module/user'
import saveInLocal from './plugin/saveInLocal'
import config from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  state,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [ saveInLocal ]
})

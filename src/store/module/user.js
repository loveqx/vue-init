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


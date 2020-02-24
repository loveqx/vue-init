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

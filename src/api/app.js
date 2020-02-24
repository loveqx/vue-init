export const getAppName = ()=>{
  //模拟异步请求数据
  return new Promise((resolve, reject)=>{
    const err = null
    setTimeout(()=>{
      if(!err) resolve({code:200,info:{appName:'newAppName'}})
      else reject(err)
    })
  })
}

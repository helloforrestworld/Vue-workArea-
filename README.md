# Vue工作区

标签（空格分隔）： 作业总结

---
## 本项目主要复习vue-router ##

####首页
![此处输入图片的描述][1]


####管理页
![此处输入图片的描述][2]


###总结

####1.组件结构
![此处输入图片的描述][3]

####2.知识点

路由各项配置
>* mode: 'history'/'hash
>* linkActiveClass: 全局的导航匹配样式 (局部的: ``<router-link active-class:>``)
>* 嵌套路由
>* meta元信息使用
>* 全局的钩子beforeEach()
>* 工具函数插件的方式引入 

```
let local = {
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  fetch (key) {
    return JSON.parse(localStorage.getItem(key)) || {}
  }
}

export default {
  install: function (vm) {
    vm.prototype.$local = local
  }
}
```

```
import utils from './lib/utils.js'

Vue.use(utils)

```
验证登录
>* 1.访问project/workbench需要登录
```
    router.beforeEach((to,from,next)=>{
  
  // 判断该路由以及父路由是否有login:true
  if(to.matched.some( (item) => item.meta.login )){
    
    // 检验是否已经登录 router.app可以获取实例
    if( router.app.$local.fetch('login').login ) {
      next()
    }else{
      router.push({
        path:'/login',
        query:{redirect:to.path.slice(1)}
      })
    }
    
  }else{
    // 不需要登录
    next()
  }
})
```
>* 2.重定向到登录页面(跳转前记录去往的目标)
3.登录发送Ajax请求(localstorage模拟)
4.验证通过
5.重置路由router.push({})到之前记录的目标

```
created() {
      
      let userInfo = this.$local.fetch('login')
      // 初始化用户名
      this.userName = userInfo.userName
      
      // 初始化isLogin
      this.isLogin = userInfo.login
      
    }
```
>* 6.目标组件created钩子初始化用户信息

文档目录过渡效果
>* 1.通过beforeRouterUpdate监控hash值变化
>* 2.定义一个运动函数(引用Tween)
>* 3.每次beforeRouterUpdate触发 获取目标位置 和 当前滚动条位置
>* 4.滚动到指定位置

Webpack懒加载
>* 异步组件 let layout = (resolve)=>{。。。resolve(compoent)}
>* require.ensure或者 import()做代码切割
```
let layout = (resolve)=>{
  return require.ensure([],function(){
    resolve(require('@/views/layout'))
  })
}
```
```
let project = (resolve)=>{
  return import('@/views/backend/project')
}
```





  [1]: https://ws1.sinaimg.cn/large/e8323205gy1fparpu6cq5g20w60fqgyq.jpg
  [2]: https://ws1.sinaimg.cn/large/e8323205gy1fparqjk6rkg20w60fqn9h.jpg
  [3]: https://ws1.sinaimg.cn/large/e8323205gy1fpask3cuebj213c0io3yz.jpg
  
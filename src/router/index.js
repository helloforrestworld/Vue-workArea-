import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'

// import layout from '@/views/layout'
// import project from '@/views/backend/project'
// import doc from '@/views/backend/doc'
// import workbench from '@/views/backend/workbench'


// 利用webpack代码分割功能实现 懒加载
let layout = (resolve)=>{
  return require.ensure([],function(){
    resolve(require('@/views/layout'))
  })
}

// let project = (resolve)=>{
//   return require.ensure([],function(){
//     resolve(require('@/views/backend/project'))
//   })
// }

// 也可以用import函数
let project = (resolve)=>{
  return import('@/views/backend/project')
}

// 分割为同一个
let doc = (resolve)=>{
  return require.ensure([],function(){
    resolve(require('@/views/backend/doc'))
  },'doc&workbench')
}
let workbench = (resolve)=>{
  return require.ensure([],function(){
    resolve(require('@/views/backend/workbench'))
  },'doc&workbench')
}



Vue.use(Router)
let router = new Router({
  mode:'history',
  linkActiveClass:'is-active',
  routes: [
    {
      path: '/',
      component:home,
      name:'home'
    },
    {
      path:'/management',
      component:layout,
      name:'management',
      children:[
        {
          path:'/project',
          component:project,
          name:'project',
          meta:{
            // 需要登录
            login:true
          }
        },
        {
          path:'/doc',
          component:doc,
          name:'doc'
        },
        {
          path:'/workbench',
          component:workbench,
          name:'workbench',
          meta:{
            // 需要登录
            login:true
          }
        },
      ]
    },
    {
      path:'*',
      redirect:'/'
    },
    {
      path:'/login',
      component:login
    }
  ]
})

export default router

// 路由全局钩子
router.beforeEach((to,from,next)=>{
  
  // 判断该路由以及父路由是否有login:true
  if(to.matched.some( (item) => item.meta.login )){
    
    // 检验是否已经登录
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

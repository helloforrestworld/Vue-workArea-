import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import layout from '@/views/layout'
import login from '@/components/login'

import project from '@/views/backend/project'
import doc from '@/views/backend/doc'
import workbench from '@/views/backend/workbench'

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

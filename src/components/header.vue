<template>
  <div class="clearFix el-menu--dark">
    <ul class="el-menu menu-horizontal el-menu--dark el-menu--horizontal header-nav" >
      <router-link to="/" class="el-menu-item logo" exact tag="li">
      <img src="../assets/miaov.png">
    </router-link>
      <router-link to="/project" class="el-menu-item" tag="li" >
        <i class="fa fa-home"></i>
        我的项目
      </router-link>
      <router-link to='/workbench' class="el-menu-item"  tag="li">
        <i class="fa fa-code"></i>
        工作台
      </router-link>
      <router-link to="/doc" class="el-menu-item" tag="li">
        <i class="fa fa-book"></i>
        文档
      </router-link>
    </ul>
    <div class="user-info-box">
      <div v-if='isLogin' class="el-submenu__title">
        <img src="../assets/portrait.png">
        <span>{{userName}}</span>
      </div>
      <div class="header-menu">
        <ul class="menu-nav">
          <li class="el-menu-item"@click="logout">登出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        userName: 'aaa',
        isLogin: false
      }
    },
    methods: {
      logout() {//登出
        this.$local.save('login',null)
        this.$router.push('/login')
      }
    },
    created() {
      
      let userInfo = this.$local.fetch('login')
      // 初始化用户名
      this.userName = userInfo.userName
      
      // 初始化isLogin
      this.isLogin = userInfo.login
      
    }
  }
</script>
<style>

</style>

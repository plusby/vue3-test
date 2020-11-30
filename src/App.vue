<template>
  <router-link to="/">home</router-link>
  <router-link to="/TodoList">todoList</router-link>
  <router-link to="/SelectList">selectList</router-link>
  <router-link to="/Mark">mark</router-link>
  <router-link to="/Reactive">Reactive</router-link>
  <router-link to="/CompositionApi">CompositionApi</router-link>
  <span>用户名:{{ user && user.name }} <i v-if="user" @click.prevent="loginOut">退出</i></span>
  <router-link to="/Login" v-if="!user">登录</router-link>
  <router-view></router-view>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    
  },
  setup(){
    const store = useStore()
    const router = useRouter()
    const user = computed(()=>{
        console.log('store.state.userLogin.user',store.state.userLogin.user)
        return store.state.userLogin.user
    })

    console.log('user',user.value)

    const loginOut = async () => {
      await store.dispatch('userLogin/loginOut')
      router.replace('/')
    }
    
    return {
      user,
      loginOut
    }
  }
}
</script>
<style lang="css" scoped>
a{
  margin-right: 20px;
  text-decoration: none;
  color:cadetblue;
}
</style>

<template>
  <router-link to="/">home</router-link>
  <router-link to="/TodoList">todoList</router-link>
  <router-link to="/SelectList">selectList</router-link>
  <router-link to="/Mark">mark</router-link>
  <router-link to="/Reactive">Reactive</router-link>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  components: {
    
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

<template>
  <div class="card4">
      我是卡片4
      <div class="card4-list">
        <p v-for="(item,index) in options" :key="index">{{ item.value.value }}</p>
        <p @click="change">修改第二项value</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup(props){
     console.log('1',props.options)
    const change = () => {
      props.options.forEach(item=>{
        item.value.value = 1
      })
      console.log('3',props.options)
    }
    console.log('2',props.options)
    return {
      change
    }
  }
}
</script>

<style>
.card4{
    width: 100%;
    height: 100%;
    font-size: 12px;
    
}
.card4-list{
  margin: 200px 0 0;
}
.card4 p{
  line-height: 15px;
  height: 15px;
}
</style>
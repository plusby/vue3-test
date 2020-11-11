<template>
  <h1>{{ count }}</h1>
  <div>
    <button @click="add">加1</button>
    <button @click="reduce">减1</button>
  </div>
</template>
<script>
import { ref } from 'vue'
function useCount(){
  // 通过ref创建响应式数据，在setup中的数据是一个对象，赋值通过给它的value进行赋值
  // 而在模板中是通过实例代理对象可以直接使用数据的结果，无需通过value
  const count = ref(0)

  const add = () =>{
    count.value++
  }

  const reduce = () =>{
    count.value--
  }

  return {
    count,
    add,
    reduce
  }
}
export default {
  // setup中直接定义的变量不是响应的,setup在全部生命周期之前就执行了，并且内部不能直接使用this实例
  setup() {
    // 把数据返回挂载到实例代理对象上
    return {
      ...useCount()
    }
  }
}
</script>

<style>

</style>

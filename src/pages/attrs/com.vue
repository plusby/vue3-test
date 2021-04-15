<template>
  <div class="wrap">
      <p v-bind="$attrs">attrs的变化</p>
  </div>
  <!-- <p >样式和Clss添加到这里</p> -->
  <div>
    inheritAttrs: true/false 是否把$attrs添加到根元素上,默认是true
    v-bind="$attrs" 把$attrs设置到指定的元素上
    vue2：
      $attrs 包含除了class和style所有的 attribute

        eg1:

          父组件：
            <!-- <Com class="red" style="border:1px solid red" id="my-id"></Com> -->

          子组件:
            <div class="wrap">
                <p v-bind="$attrs">attrs的变化</p>
            </div>

          将生成以下 HTML：
            <div class="wrap red" style="border:1px solid red">
                <p id="my-id">attrs的变化</p>
            </div>
    vue3:
      $attrs 包含所有的 attribute，包括class和style

      1. 如果只有一个根元素并且子组件没有设置inheritAttrs: false，那么默认会把
         $attrs添加到根元素上

      2. 如果没有根元素(并列多个元素)并且子组件没设置inheritAttrs: false，那么
         默认不会把$attrs添加到任何元素上

      eg1: 只有一个根元素

          父组件：
            <!-- <Com class="red" style="border:1px solid red"></Com> -->

          子组件:
            <div class="wrap">
                <p>attrs的变化</p>
            </div>

          将生成以下 HTML：
            <div class="wrap red" style="border:1px solid red">
                <p>attrs的变化</p>
            </div>  

      eg2: 没有根元素

          父组件：
            <!-- <Com class="red" style="border:1px solid red"></Com> -->

          子组件:
            <div class="wrap">
                <p>attrs的变化</p>
            </div>
            <div class="wrap2">
                <p>attrs的变化2</p>
            </div>

          将生成以下 HTML：
            <div class="wrap">
                <p>attrs的变化</p>
            </div>
            <div class="wrap2">
                <p>attrs的变化2</p>
            </div> 

      2迁移到3时的注意事项：
        vue3中使用inheritAttrs:false, 会把class和style都不再添加到根元素上
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style>

</style>
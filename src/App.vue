<template>
  <Count />
  <TodoList/>
  <pre>
    webpack和vite：
      webpack会先打包，然后启动发开服务器，请求服务器时直接给予打包结果；
      而vite是直接启动服务器，请求哪个模块再对该模块进行实时的编译
      由于现代浏览器本身就支持ES module,会自动向依赖的module发出请求，vite充分利用了
      这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像Webpack那样进行打包合并
      由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖，不需要编译，因此，启动
      速度非常快，当浏览器请求某个模块时，在根据需要对模块内容进行编译，这种按需动态编译的方式，极大
      的缩减了编译事件，项目越复杂，模块越多，vite的优势越明显
      在HMR方面，当改动了一个模块后，仅需要让浏览器重新请求该模块即可，不像Webpack那样需要打该模块的相关
      依赖模块全部编译一次，效率高。
      当需要打包到生产环境时，vite使用传统的rollup进行打包，因此，vite的主要优势在开发阶段，
      另外，由于vite利用的ES module,因此在代码中不可以使用commonJS
  </pre>
  <pre>
    效率提升
    1. 静态提升
        静态元素提升到render前面，每次更新渲染的时候不再重新创建，提升创建虚拟dom和diff对比的时间

        静态节点：

        <h1>hello world</h1>
        vue2中的静态节点:
          render(){
            reateVNode('h1',null,'hello world')
          }

        vue3中的静态节点提升：
          const hoisted = createVNode('h1',null,'hello world') // 静态提升了
          function render(){ // 使用hoisted }

        
        静态属性：

        <div class="name">
          {{name}}
        </div>

        vue2中的静态属性:
          render(){
            reateVNode('div', { class: 'name'}, name)
          }

        vue3中的静态属性提升：
          const hoisted = { class: 'name'}

          function render(){
            reateVNode('div', hoisted, name)
          }


    2. 预字符串化
        连续20个以上的静态元素，直接转为字符串节点，不用每个都创建为虚拟dom，大大节省了时间
        <div>
          <h3>{{name}}</h3>
          <ul>
            <li>1test</li>
            <li>2test</li>
            <li>3test</li>
            <li>4test</li>
            <li>5test</li>
            <li>6test</li>
            <li>7test</li>
            <li>8test</li>
            <li>9test</li>
            <li>10test</li>
            <li>11test</li>
            <li>12test</li>
            <li>13test</li>
            <li>14test</li>
            <li>15test</li>
            <li>16test</li>
            <li>17test</li>
            <li>18test</li>
            <li>19test</li>
            <li>20test</li>
            <li>21test</li>
          </ul>
        </div>

        const hoisted = createVNode('<ul><li></li>......</ul>')

    3. 缓存事件处理函数
        事件进行缓存，下次更新的时候直接读取缓存中的事件函数

        <button @click="a++">点击</button>

        vue2中处理事件
          render(ctx){
            return createVNode('button', {
              onClick: function($event){
                ctx.a++
              }
            })
          }

        vue3中处理事件
          render(ctx,cache){
            return createVNode("button", {
              onClick: cache[0] || (cache[0] = ($event)=>{ctx.a++})  // 不存在就进行了缓存
            })
          }


    4. Block Tree
        vue2中在对比新旧dom树的时候，不知道哪些是静态节点哪些是动态节点，dom上的所有节点都要进行对比，
        而在vue3中。记录dom树下的所有动态子节点(dom树下有不确定的节点，都会创建为一个新的Block tree)，
        在虚拟dom对比的时候只比较动态的元素是否变化，静态元素不再比较，从而节省了很多时间

           新Block tree
           [动态节点1.动态节点2]

           旧Block tree
            [动态节点1.动态节点2]

    5. PatchFlag
        记录父节点下的动态子节点上的动态属性或内容，新旧节点对比的时候静态的属性或内容不进行比较，
        只比较动态节点下的动态属性或内容



  </pre>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Count from './components/Count/index.vue'
import TodoList from './pages/todoList/index.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Count,
    TodoList,
  }
}
</script>

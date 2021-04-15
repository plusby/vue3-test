<template>
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
        静态元素提升到render前面; 所以每次更新渲染的时候不再重新创建这些静态元素，从而提升了创建虚拟dom和diff对比的时间

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

    5. PatchFlag(静态标记)
        vue2:
          虚拟dom进行全量比较
        vue3:
          记录父节点下的动态子节点上的动态属性或内容(添加标记PatchFlag)，新旧节点对比的时候静态的属性或内容不进行比较，
          只比较动态节点下的动态属性或内容
          通过以下网站可以看出vue3的虚拟dom的创建https://vue-next-template-explorer.netlify.app/

        PatchFlag：
          export const enum PatchFlags {
            TEXT = 1, // 动态文本节点
            CLASS = 1 《 2, // 2 // 动态class
            STYLE = 1 《 2, // 4 // 动态style
            PROPS = 1 《 3, // 8 // 动态属性，但不包含类名和样式
            FULL_PROPS = 1 《 4, // 16 具有动态key属性，当key改变的时候，需要进行完整的diff比较
            HYDRATE_EVENTS = 1 《 5, //32 //带有监听事件的节点
            STABLE_FRAGMENT = 1 《 6, //64 // 一个不会改变子节点顺序的fragment
            KEYED_FRAGMENT = 1 《 7, // 128 带有key属性的fragment或部分子节点带有key
            UNKEYED_FRAGMENT = 1 《 8,  // 256 子节点没有key的fragment
            NEED_PATCH = 1 《 9, // 512 一个节点只会进行非props比较
            DYNAMIC_SLOTS = 1 《 10, 1024 动态slot
            HOISTED = -1, // 静态节点
            BAIL = -2, // 指示在diff过程应该要退出优化模式
          }


    6. vue3中为什么要去掉Vue构造函数
        1. 在vue2构造函数的静态方法中挂载的组件或方法都会在vue应用中生效，不利于隔离
        2. vue2的构造函数集成了太多的功能，不利于tree shaking,vue3把这些功能使用普通函数
            导出，能够充分利用tree shaking优化打包

        3. vue2中没有把组件实例和vue应用两个概念区分开，在vue2中，通过使用new Vue创建
           的对象，既是一个vue应用，同时也是一个特殊的vue组件，vue3中把两个概念进行区分，
           通过createApp创建的对象，是一个vue应用，它内部提供的方法是针对整个应用，而不是一个
           特殊的组件

    7. 谈谈你对vue3数据响应式的理解

        vue3不再使用Object.defineProperty的方式完成数据的响应式。而是使用proxy;vue2
        中初始数据的时候，会递归遍历整个data，为它的属性添加get和set方法。使用proxy
        除了proxy本身效率比Object.defineProperty更高之外，由于不必递归遍历所有的数据
        而是直接得到一个proxy，所以在vue3中，对数据的访问是动态的，当访问某个属性的时候
        再动态的获取和设置，这就极大的提升了在组件初始阶段的效率，同时，由于proxy可以监听
        到成员的新增和删除，因此在Vue3中新增成员、删除成员、索引访问等均可触发重新渲染，
        而在vue2中无法做到，必须使用$set或者splice方法来处理新增和删除的响应；

    8. setup函数
        是组合api的入口函数
        setup函数的执行是在beforeCreate之前，因此
        在setup函数中无法使用data和methods，因为此时还没有初始化data和methods.
        setup函数只能是同步的，不能是异步的,如果想要实现异步，只能在setup中定义使用异步函数

  </pre>
</template>

<script>
export default {
  beforeCreate(){
    console.log('beforeCreate')
  },
  created(){
    console.log('created')
  },
  setup(){
    console.log('setup')
  },
  beforeRouteEnter(to, from, next){
    console.log('beforeRouteEnter')
    next()
  },
}
</script>

<style>

</style>
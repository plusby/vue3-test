<template>
    <div>
       <h3>2019 GDP Top5</h3>
       <div class="container">
           <Bar1 :gdp='gdp' />
           <Bar2 :gdp='gdp' />
       </div>
       <div class="controls">
           <div class="item" v-for="(item,index) in gdp" :key="index">
               <label>{{ item.country }}</label>
               <input type="number" v-model="item.value">
           </div>
       </div>
    </div>
  <pre>
      composition api提供的函数很多是与组件深度绑定，不能脱离组件而存在
      <h3>1. setup</h3>
        setup函数在组件属性被赋值后立即执行，早于所有生命周期函数
        export default {
            setup(props, context){
            }
        }
        参数：
            props: 是一个对象，包含了所有的组件属性值
            context 是一个对象，提供了组件所需的上下文信息
            context对象成员：
                attrs 对象  同vue2 this.$attrs 
                slots 对象  同vue2 this.$slots 
                emit  方法  同vue2 thihs.$emit 

        生命周期：
            vue3 options api        vue3 composition api
            beforeCreate            不需要，代码可直接写在setup中
            created                 不需要，代码可直接写在setup中
            beforeMount             onBeforeMount
            mounted                 onMounted
            beforeUpdate            onBeforeUpdate
            updated                 onUpdated
            beforeUnmount           onBeforeUnmount  //组件销毁之前
            unmounted               onUnmounted
            errorCaptured           onErrorCaptured
            renderTracked           onRenderTracked     // 模板渲染之后获取动态数据
            renderTriggered         onRenderTriggered   // 模板中动态数据变化导致模板重新渲染的时候执行

        面试题：
            composition api相比option api有哪些优势？
            1. 为了更好的逻辑复用和代码组织
            2. 更好的类型推导

            有了composition api,配合reactivity api，可以在组件内部进行更加细粒度的控制，
            使得组件中不同的功能高度聚合，提升了代码的可维护性，对于不同组件
            的相同功能，也能够更好的复用
            相比option api,composition api中没有了指向奇怪的this,所有api变得更加函数式，
            这有利于和类型推断系统(ts)深度配合
        
  </pre>
</template>

<script>
import { reactive, ref} from 'vue'
import Bar1 from './components/bar1.vue'
import Bar2 from './components/bar2.vue'


export default {
    components:{
        Bar1,
        Bar2,
    },
    setup(){
        let gdp = ref([])
       
        console.log(1)
        async function getList(){
            console.log(2)
            gdp.value = await fetch('/src/mock/index.json').then(res=>res.json(),err=>{
                console.log(err)
            })
            gdp.value = gdp.value.arr
            console.log(3,gdp.value)
        }
        //  let gdp = reactive([])
        //  console.log(1,gdp)
        // async function getList(){
        //     console.log(2)
        //     const gdpArr = await fetch('/src/mock/index.json').then(res=>res.json(),err=>{
        //         console.log(err)
        //     })
        //     gdp = gdpArr.arr
        //     console.log(3,gdp)
        // }


        getList()
        console.log(4)
        return {
            gdp
        }
    }
}
</script>

<style scoped>
.controls,.container{
    display: flex;
    justify-content: space-around;
    width: 800px;
    margin: 0 auto;
}
.controls .item{
    width: 150px;
    margin: 0 3px;
    display: flex;
    /* justify-content: space-between; */
}
.controls .item input{
    width: 100px;
    margin-left: 4px;
}
</style>
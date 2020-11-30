<template>
  <p @click="changeState">点击改变state的a属性的值</p>
  <p>{{ state.a.c }}</p>
  <p @click="changeStateF">点击改变state的f</p>
  <p>{{ state.f }}</p>
  <p>objShallowReactive.aa:{{objShallowReactive.aa}}</p>
  <p>objShallowReactive.a.c.d:{{objShallowReactive.a.c.d}}</p>
  <p @click="changeObjShallowReactive">改变objShallowReactive.a.c.d</p>
  <pre>
    <h2>reactive API</h2>
    <p>使数据具有响应式</p>

    <p>
        api:
            reactive
            readonly
            ref
            computed
            watchEffect
            watch,
            shallowReactive,
            shallowRef,
            triggerRef
    </p>
    <h3>1. reactive</h3>
    <p>
        参数： 接收一个对象
            递归深度代理对象中的所有属性，不能代理基本类型的数据
        返回一个代理对象
    </p>
    <h3>2. readonly</h3>
    <p>
        参数：接收一个对象或代理对象
            只能读取代理对象中的属性，不可修改，若修改则不生效
        返回一个代理对象
    </p>
    <h3>3. ref</h3>
        参数： 任何类型
            对value的访问是响应的
            如果传递的是一个对象则内部会通过调用reactive进行代理
            如果传递的是一个代理对象，则直接返回这个代理对象
        返回一个对象{ value: 代理对象 }

    <h3>4.  computed</h3>
    <p>
        参数： 函数
            根据响应式的数据得到一个计算属性，这个计算属性有缓存，当依赖的响应式
            数据变化的时候在下一次使用这个计算属性才会执行
        返回一个对象{ value: 代理对象 }
    </p>

    vue3中有两种响应式数据格式：
        1. ref形式的: {value: XXX}
        2  proxy对象

        ref或者computed得到的是第一种
        reactive或readonly得到的是proxy

    应用：
        如果想要让一个对象变为响应式数据，可以使用reactive或Ref

        如果想要让一个对象的所有属性只读，可以使用readonly

        如果想要让一个非对象数据变为响应式数据，使用ref

        如果想要根据已知的响应式数据得到一个新的响应式数据可以使用computed

    eg:
        // 1. readonly传递一个代理对象为a，当原代理对象属性改变，a的这个属性也改变
            const reactiveObj = reactive({a:1, b: 2})
            reactiveObj.a++ 
            const stateRef = readonly(reactiveObj)
            console.log(stateRef.a)   // 2
            reactiveObj.a++ 
            console.log(stateRef.a)   // 3
            console.log(reactiveObj == stateRef) // false

        // 2. ref传递一个对象，内部调用使用reactive进行数据响应
            const objrefReactive = {a:1,b:{c:2}}
            const refReactive = reactive(objrefReactive)
            const refToObj = ref(objrefReactive) 
            console.log('refReactive === refToObj',refReactive === refToObj.value) // true

        // 3. computed 有缓存，依赖的响应式数据变化的时候下次使用才会执行
            const computedObj = { a:1 ,b :2}
            const computedReactiveObj = computed(()=>{
                console.log('普通对象改变不能被计算属性所监听') // 执行一次 普通对象改变不能被计算属性所监听
                return computedObj.a + computedObj.b
            })
            console.log('computedReactiveObj.value',computedReactiveObj.value) // 3
            computedObj.b = 4 // 改变普通对象的属性
            console.log('computedReactiveObj.value',computedReactiveObj.value) // 3 因为依赖的数据不是响应的所以监听不到依赖的数据的变化，因此使用缓存中的值
            console.log('computedReactiveObj.value',computedReactiveObj.value)   // 3

        // 4. 面试题
            const statequest1 = reactive({a:'a', b: 'b'})
            const name = computed(()=>{ // 计算属性在使用的时候才执行
                console.log('computed执行')
                return statequest1.a + '+' + statequest1.b
            })
            console.log('ready') 
            console.log('statequest1 a', statequest1.a)
            console.log(' statequest1 b', statequest1.b)
            const imState = readonly(statequest1)
            console.log('imState === statequest1',imState === statequest1) 
            const stateRefquest1 = ref(statequest1)
            console.log('statequest1 === stateRefquest1', statequest1 === stateRefquest1.value) // ref 传递一个代理对象直接返回这个对象 所以相等
            statequest1.a = 'aa'
            statequest1.b = 'bb'
            console.log(imState.a,imState.b) 
            console.log('computed',name.value) 
            console.log('computed',name.value) // 依赖的响应式数据没有改变 读取缓存中的计算属性
            const onlyState1 = readonly(stateRefquest1)
            console.log(onlyState1.value === stateRefquest1.value)

            // ready   statequest1 a a   statequest1 b b   imState === statequest1 false 
            // statequest1 === stateRefquest1 true    aa  bb  computed执行 computed aa+bb computed aa+bb
            // false

        
        // 5. 面试题
            function useUser(){
                // 这里补全函数
                const originUser = reactive({})
                const user = readonly(originUser)
                const setUserName = (name) => {
                    originUser.name = name
                }
                const setUserAge = (age) => {
                    originUser.age = age
                }
                return {
                    user,  // 这里是一个只读的用户对象，响应式数据，默认为一个空对象
                    setUserName,  // 这里是一个函数，传入用户姓名，用于修改用户的名称
                    setUserAge, // 这里是一个函数，传入用户年龄，用于修改用户的年龄
                }
            }

        // 6 面试题
            function useDebounce(obj, duration){
                const originUser = reactive(obj)
                const value = readonly(originUser)
                let timer = ''
                const setValue = () => {
                    timer && clearTimeout(timer)
                    timer = setTimeout(()=>{
                        Object.keys(originUser).forEach(element => {
                           originUser.element = originUser[element]    
                        });
                    },duration)
                }
                return {
                    value, // 这里是一个只读属性，响应式数据，默认为参数值
                    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，
                              // 混合操作需要在duration得时间中防抖
                }
            }

    <h3>5. watchEffect</h3>    
        监听数据的变化，该函数在首次加载的时候就会执行，然后在监听的数据变化的时候会再次执行
        外部改变了当前监听属性中的属性，这里监听不到，这里只能监听到外部改变了当前属性或及其以上的祖先属性，兄弟属性或子属性改变不会被监听到
        const w = watchEffect(()=>{
            //函数中使用到的响应式数据都会被监听
        })
        w() // 停止监听

        eg:
            const weffState = reactive({ a: { c: 2}, b: 2})
            watchEffect(()=>{
               console.log('监听state的变化', weffState.a) // 外部改变了a中的属性，这里监听不到，这里只能监听到外部改变了当前属性及其以上的祖先属性，兄弟属性改变不会被监听到
            })
            watchEffect(()=>{
                console.log('监听state的变化', weffState.a.c) //可以被监听到
            })
            weffState.a.c++
            console.log('weffState',weffState)

    <h3>6. watch</h3>
    
        监听数据的变化

        无论是watchEffect还是Watch，当依赖变化的时候，回调的函数都是异步执行的(微任务)

        watch的使用场景：

            不希望回调函数一开始就执行

            需要监听到旧的数据

            纯粹的监听数据，但是在回调函数中不用使用到被监听的数据

        除了以上场景其他场景均使用 watchEffect

        watch可以监听多个数据，使用数组包裹
        可以传递第二个参数{immediate:true} 在首次的时候就执行

        watch和watchEffect区别：

        1. watch不能监听原始值，可以监听对象，如果想要监听对象上的原始值，可以监听一个函数并且这个函数返回这个对象的属性
        
        2. watch在没有配置第二个参数{immediate:true}时不会立即执行，而watchEffect会立即执行

        3. watch可以深度监听到对象下的属性的变化，而watchEffect只能监听到当前对象的属性的变化，他们都能监听到当前属性的祖先属性的变化
        eg:

        const state = reactive({a: { c: 1}, b: 2, d: 3, f: 4})

        // 监听对象上的原始属性
        watch(state.b,(newval, oldval)=>{  // 监听不到对象的属性并且这个属性是原始值
            console.log('新1', newval, '旧1', oldval)
        })
        state.b++

        // 监听对象上的对象
        watch(state.a,(newval, oldval)=>{  // 可以监听到对象上的对象
            console.log('新2', newval, '旧2', oldval) // 新2 2 旧2 2
        })
        state.a.c++

        // 对象上的其他属性改变无法监听到这个属性意外的属性, state的d改变，state.b和state.a都不会被监听到
        state.d ++ 

        // 通过函数包裹监听对象上的原始值属性的变化
        watch(()=>(state.f),(newVal,oldVal)=>{
            console.log('新3', newVal, '旧3', oldVal)
        })

        // 监听多个数据
        watch([state.a,state.b],([new1,old1],[new2,old2])=>{

        })

    <h3>6. isProxy</h3>
        判断某个数据是否是由reactive和readonly创建的

    <h3>7. isReactive</h3>
        判断某个数据是否是通过reactive创建的

    <h3>8. isReadonly</h3>
        判断某个数据是否是readonly创建的

    <h3>9. isRef </h3>
        判断某个数据是否是一个ref对象

    <h3>10. unref</h3>
        转换为Ref类型的响应式对象
        unref(val) 等同于isRef(val) ? val.value: val
        
    <h3>11. toRef</h3>
        让指定的属性转换为Ref响应式格式

        const state = reactive({a:1,b:2})
        const stateRef = toRef(state, 'a')
        stateRef.value++
        state.value++
        console.log(state.a) // 3

    <h3>12. toRefs</h3>
        把一个响应式对象的所有属性转换为ref格式，然后包装到一个plain-object中返回
        const state = reactive({a:1,b:2})
        const stateAsRefs = toRefs(state)
        console.log(stateAsRefs) // {a: {value: xx}, b:{value:xx}}

        应用：
            setup(){
                const state1 = reactive({a:1,b:2})
                const state2 = reactive({c:3,d:4})
                return {
                    ...state1, // 直接平面展开的Reactive对象不再具有响应式功能 相当于{ a: 1, b: 2, c:3}
                    ...state2
                }
            }

        可以使用toRefs把响应式对象的属性的值转换为ref响应式对象
            setup(){
                const state1 = reactive({a:1,b:2})
                const state2 = reactive({c:3,d:4})
                return {
                    ...toRefs(state1), // {a:{value:XXX},b:{value:XXX}}
                    ...toRefs(state2)
                }
            }

        一般情况下composition function返回的数据均以toRefs进行转换，防止造成数据不能响应

        eg:
            function useUser(){
                const user = reactive({name:1,age:2})
                return toRefs(user)
            }

            function useWork(){
                const work = ref('打豆豆')
                return {
                    work
                }
            }

            setup(){
                return{
                    ...useUser() // 不用担心展开之后不具有响应式
                    ...useWork()
                }
            }
    <h3>13. shallowReactive</h3>
        非深度代理对象属性，只代理对象的第一层，只有第一层改变的时候才能渲染视图更新, 大量数据优化的时候可以使用这个方法

        const obj = shallowReactive({a:{b:2,c:{d:3}},aa:22})
        obj.b = 3 //  视图不会被更新
        obj.aa = 222 // 视图更新

    <h3>14. shallowRef</h3>
        非深度代理对象属性，只代理value,只有value改变的时候才能渲染视图更新, 大量数据优化的时候可以使用这个方法

    <h3>15. triggerRef</h3>
        triggerRef(ref)
        主动触发视图更新,如果只想通过shallowRef来改变某一层的数据，并且需要视图更新可以使用这个方法

    <h3>16. toRaw</h3>
        const originState = toRaw(ref.value或reactive)
        获得响应式对象的原始数据，用于性能优化，如果只是改变原数据中的属性，但是不更新视图，那么就没有必要让视图更新从而提高了性能
        const state = {a:1} 
        const stateRef = ref(state)
        let state2 = toRaw(stateRef.value)
        state2 === state // true

    <h3>17. markRaw</h3>
        markRaw(对象)  
        使原始对象不能够被代理
        const state = {a:1}
        state = markRaw(state)
        const stateRef = ref(state)
        stateRef.a = 2 // 视图不会被更新
  </pre>
</template>

<script>
import { watch, reactive, ref, readonly, computed, watchEffect, warn, toRef,shallowReactive, shallowRef, triggerRef } from 'vue'
export default {
    setup(){
        const state = reactive({a:{c:3}, b: 2, d: 3, f: 4})
        const newStateVal = ref(state)
        const oldStateVal = ref(state)
        // watch(state.a,(newval, oldval)=>{
        //     console.log('新', newval, '旧', oldval)
        //     newStateVal.value.a = newval
        //     oldStateVal.value.a = oldval
        // })
        const changeState = () => {
            state.a.c ++ 
        }

        // state.d++

        // watch(()=>(state.f),(newVal,oldVal)=>{
        //     console.log('新3', newVal, '旧3', oldVal) // 新3 5 旧3 4
        // })

        const changeStateF = () => {
            state.f ++ 
        }
        
        // readonly代理一个代理对象
        // const reactiveObj = reactive({a:1, b: 2})
        // reactiveObj.a++ 
        // const stateRef = readonly(reactiveObj)
        // console.log(stateRef.a)   // 2
        // reactiveObj.a++ 
        // console.log(stateRef.a)   // 3
        // console.log('reactiveObj == stateRef',reactiveObj == stateRef) // false

        // 2. ref传递一个对象，内部调用使用reactive进行数据响应
        // const objrefReactive = {a:1,b:{c:2}}
        // const refReactive = reactive(objrefReactive)
        // const refToObj = ref(objrefReactive) 
        // const refToObj2 = ref(refReactive) 
        // console.log('objrefReactive === refReactive',refReactive === objrefReactive) // false
        // console.log('refReactive === refToObj',refReactive === refToObj.value) // true
        // console.log('refReactive === refToObj',refReactive === refToObj2.value) // true

        // // 3. computed 有缓存，依赖的响应式数据变化的时候下次使用才会执行
        // const computedObj = { a:1 ,b :2}
        // const computedReactiveObj = computed(()=>{
        //     console.log('普通对象改变不能被计算属性所监听') // 执行一次 普通对象改变不能被计算属性所监听
        //     return computedObj.a + computedObj.b
        // })
        // console.log('computedReactiveObj.value',computedReactiveObj.value) // 3
        // computedObj.b = 4 // 改变普通对象的属性
        // console.log('computedReactiveObj.value',computedReactiveObj.value) // 3 因为依赖的数据不是响应的所以监听不到依赖的数据的变化，因此使用缓存中的值
        // console.log('computedReactiveObj.value',computedReactiveObj.value)   // 3

        // 4. 面试题
        // const statequest1 = reactive({a:'a', b: 'b'})
        // const name = computed(()=>{ // 计算属性在使用的时候才执行
        //     console.log('computed执行')
        //     return statequest1.a + '+' + statequest1.b
        // })
        // console.log('ready') 
        // console.log('statequest1 a', statequest1.a)
        // console.log(' statequest1 b', statequest1.b)
        // const imState = readonly(statequest1)
        // console.log('imState === statequest1',imState === statequest1) 
        // const stateRefquest1 = ref(statequest1)
        // console.log('statequest1 === stateRefquest1', statequest1 === stateRefquest1.value) // ref 传递一个代理对象直接返回这个对象 所以相等
        // statequest1.a = 'aa'
        // statequest1.b = 'bb'
        // console.log(imState.a,imState.b) 
        // console.log('computed',name.value) 
        // console.log('computed',name.value) // 依赖的响应式数据没有改变 读取缓存中的计算属性
        // const onlyState1 = readonly(stateRefquest1)
        // console.log(onlyState1.value === stateRefquest1.value)

        // ready   statequest1 a a   statequest1 b b   imState === statequest1 false 
        // statequest1 === stateRefquest1 true    aa  bb  computed执行 computed aa+bb computed aa+bb
        // false

        // 5. 面试题
            // function useUser(){
            //     // 这里补全函数
            //     const originUser = reactive({})
            //     const user = readonly(originUser)
            //     const setUserName = (name) => {
            //         originUser.name = name
            //     }
            //     const setUserAge = (age) => {
            //         originUser.age = age
            //     }
            //     return {
            //         user,  // 这里是一个只读的用户对象，响应式数据，默认为一个空对象
            //         setUserName,  // 这里是一个函数，传入用户姓名，用于修改用户的名称
            //         setUserAge, // 这里是一个函数，传入用户年龄，用于修改用户的年龄
            //     }
            // }

        // 6 面试题
            // function useDebounce(obj, duration){
            //     const originUser = reactive(obj)
            //     const value = readonly(originUser)
            //     let timer = ''
            //     const setValue = () => {
            //         timer && clearTimeout(timer)
            //         timer = setTimeout(()=>{
            //             Object.keys(originUser).forEach(element => {
            //                originUser.element = originUser[element]    
            //             });
            //         },duration)
            //     }
            //     return {
            //         value, // 这里是一个只读属性，响应式数据，默认为参数值
            //         setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，
            //                   // 混合操作需要在duration得时间中防抖
            //     }
            // }

        // 7. watchEffect和watch
        // const weffState = reactive({ a: { c: 2}, b: 2})
        // watchEffect(()=>{
        //     console.log('watchEffect监听state的a变化', weffState.a) // 外部改变了a中的属性，这里监听不到，这里只能监听到外部改变了当前属性及其以上的祖先属性，兄弟属性改变不会被监听到
        // })
        // watchEffect(()=>{
        //     console.log('watchEffect监听state的a的c变化', weffState.a.c)
        // })
        // watch(weffState.a,(newsVal,oldVal)=>{ // watch可以深度监听到对象下的属性的变化，而watchEffect不行
        //     console.log('watch监听state.a',newsVal,oldVal)
        // })
        // 监听不到基本类型
        // watch(state.a.c,(newsVal,oldVal)=>{
        //     console.log('watch监听state.a.c',newsVal,oldVal)
        // })
        // 通过函数包裹返回监听基本类型
        // watch(()=>(weffState.a.c),(newsVal,oldVal)=>{
        //     console.log('watch监听state.a.c',newsVal,oldVal)
        // })
        // weffState.a.b++
        // console.log('weffState')

        // 8. 面试题
        const weState1 = reactive({count: 0})
        watchEffect(()=>{
            console.log('面试题watchEffect', weState1.count)
        })
        watch(()=>weState1.count,(newsVal, oldval)=>{
            console.log('watch',newsVal, oldval)
        })
        console.log('start')
        setTimeout(()=>{
            console.log('time out')
            weState1.count++
            weState1.count++
        })
        weState1.count++
        weState1.count++
        console.log('end')

        //面试题watchEffect 0 start 面试题watchEffect 1 watch 1 0 面试题watchEffect 2 watch 2 1 end time out 面试题watchEffect 4  watch 4 2

        // 9. toRef
        const toRefstate = reactive({a:1,b:2})
        const toRefstateRef = toRef(toRefstate, 'a')
        toRefstateRef.value++
        toRefstate.value++
        console.log(toRefstate) // Proxy {a: 3, b: 2}
        console.log(toRefstateRef) // {_object: Proxy, _key: "a", __v_isRef: true}
        console.log(toRefstate.a) // 3
        
        // 13. shallowReactive
        const objShallowReactive = shallowReactive({a:{b:2,c:{d:3}},aa:22})
        const changeObjShallowReactive = () => {
            objShallowReactive.a.c.d = 'ddd' //  视图不会被更新
            // objShallowReactive.aa = 222 // 视图更新
            console.log(objShallowReactive.a)
            console.log(objShallowReactive.a.c.d)
            
        }

        // 14. shallowRef
        const objShallowRef = shallowRef({a:{b:2,c:{d:3}},aa:22})
        const changeObjShallowRef = () => {
            objShallowRef.value = {a:{b:2,c:{d:'dddd'}},aa:22} //  视图会被更新
            // objShallowRef.value.aa = 222 // 视图不会被更新
            // triggerRef(objShallowRef) // 触发视图更新
            console.log(objShallowRef.value.a)
            console.log(objShallowRef.value.a.c.d)
            
        }



        return {    
            changeState,
            state,
            newStateVal,
            oldStateVal,
            changeStateF,
            objShallowReactive,
            changeObjShallowReactive
        }
    }
}
</script>

<style>

</style>
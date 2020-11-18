<template>
    <Count />
    <div class="check-edit">
        <SelectInput v-for="(item,index) in productList" :key="index" v-model="item.selled" v-model:title.tirm="item.title" />
        <div>
            <h4>选中：</h4>
            <template v-for="(item,index) in selectedList" :key="index">
                <p>{{index+1}} {{item.title}}</p>
            </template>
        </div>
    </div>
    <pre>
        v-model的实现

        vue2:
            v-model='title'
        
            :value='title' @input="title=$event"

            子组件默认接收一个value属性，并且在改变的时候$emit一个input事件

        vue3:
            v-model="title"

            :modelValue="title" @update:modelValue="title=$event"

            子组件默认接收一个modelValue属性，并且在改变的时候emit一个update:modelValue事件

        .sync的实现

        vue2:
            :title.sync="title"

            :title="title"  @update:title="title=$event"

        vue3去掉了.sync,可以传递多个v-model:

            v-model:title="title"

            :title="title"   @update:title="title=$event"

        vue3自定义v-modle修饰符

            v-model:title.修饰符1.修饰符2='title'

            子组件接收一个titleModifiers作为接收到的修饰符对象

            eg: titleModifiers.修饰符1   titleModifiers.修饰符2
            

        
    </pre>
</template>

<script>
const list = [
    {
        id: 1,
        title: '手机',
        selled: false
    },
    {
        id: 2,
        title: '电脑',
        selled: true
    },
    {
        id: 3,
        title: '比价表',
        selled: true
    },
    {
        id: 4,
        title: '家具',
        selled: false
    }
]

import { computed, ref } from 'vue'
import SelectInput from './components/selectInput.vue'
import Count from '../../components/Count/index.vue'
export default {
    components: {
        Count,
        SelectInput
    },
    setup(){
        const checked = ref(false)
        const title = ref('haha')
        const productList = ref(list)

        const selectedList = computed(()=>{
            return productList.value.filter(item=>item.selled)
        })

        console.log('selectedList',selectedList)

        return{
            checked,
            title,
            productList,
            selectedList
        }
    }
}
</script>

<style lang="less" scoped>
    .check-edit{
        margin:  50px auto;
        width: 400px;
    }
</style>
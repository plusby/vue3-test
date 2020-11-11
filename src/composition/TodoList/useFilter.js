import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filterData } from '../../utils/todoStorage.js'

export default function useFilter (todoListRef) {
    const filterRef = ref('all')
    const filteredDataRef = ref(todoListRef.value)

    const hashChangeHandler = ()=> {
        const hashVal = window.location.hash.replace(/^#\/?/g,"")
        console.log('hashVal',hashVal,filterRef.value)
        // url有指定的hash值就进行过滤
        if (filterRef.value.includes(hashVal)) {
            filteredDataRef.value = filterData(todoListRef.value,hashVal)
        } else { // 没有就设置过滤条件为全部
            window.location.hash = ''
            filterRef.value = 'all'
        }
    }

    // 组件挂载的时候
    onMounted(()=>{
        window.addEventListener('hashchange', hashChangeHandler)
    })

    // 组件卸载的时候
    onUnmounted(()=>{
        window.removeEventListener('hashchange', hashChangeHandler)
    })

    // 计算属性
    const unCompleteDataRef = computed(()=>{
        return filterData(todoListRef.value,'uncomplete')
    })

    // 清除完成
    const clearBtn = () => {
        todoListRef.value = filteredDataRef.value = filterData(todoListRef.value,'uncomplete')
        console.log(filteredDataRef.value)
    }


    return {
        filterRef,
        filteredDataRef,
        unCompleteDataRef,
        clearBtn,
    }
}
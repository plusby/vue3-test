import { ref, watchEffect } from 'vue'
import { getListData, addListData } from '../../utils/todoStorage.js'

export default function useTodoList (){
    const todosRef = ref(getListData() || [])
    watchEffect(()=>{
        addListData(JSON.stringify(todosRef.value))
    })
    return {
        todosRef
    }
}
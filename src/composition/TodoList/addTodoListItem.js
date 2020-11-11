import { ref } from 'vue'
import { generatorId } from '../../utils/todoStorage.js'

export default function addTodoList (todoListRef) {

    const newItemRef = ref('')

    const addItem = () => {
        const value = newItemRef.value && newItemRef.value.trim()
        if (!value) {
            return
        }
        // 创建一个新任务
        const item = {
            id: generatorId(),
            title: value,
            completed: false
        }
        newItemRef.value = ''
        todoListRef.value.push(item)
    }

    const selectItem = (item) => {
        todoListRef.value = todoListRef.value.map(val=>{
            if (item.id === val.id) {
                val.completed = !val.completed
            }
            return val
        })
    }

    return {
        newItemRef,
        addItem,
        selectItem,
    }
}
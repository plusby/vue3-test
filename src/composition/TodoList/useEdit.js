import { ref, computed } from 'vue'

export default function useEdit(todoList) {
    const currentEditItem = ref(null)
    let originVal = null

    // 双击编辑
    const onEdit = (todoItem) => {
        currentEditItem.value = todoItem.id
        originVal = todoItem.title
    }

    // 失去焦点保存
    const onSave = (todoItem) => {
        currentEditItem.value = null
    }

    // esc取消修改
    const onCancel = (todoItem) => {
        console.log('todoItem',todoItem,originVal)
        currentEditItem.value = null
        todoItem.title = originVal
    }

    // 全选或全不选
    const allSelected = computed({
        get(){
            if (!todoList.value.length) {
                return false
            }
            return todoList.value.filter(item=>!item.completed).length === 0
        },
        set(val){
            console.log(val)
            todoList.value = todoList.value.map(element => {
                element.completed = val
                return element
            });
        }
    })

    return {
        onEdit,
        currentEditItem,
        onSave,
        onCancel,
        allSelected,
    }
}
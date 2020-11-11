<template>
  <div class="todolist-wrap">
    <h2>TodoList</h2>
    <section class="todolist-box">
        <div class="entry-wrap">
            <div class="left">
                <!-- <span class="select-wrap"></span> -->
                <input type="checkbox" v-model="allSelected" class="select-wrap" />
            </div>
            <input class="entry" v-model="newItemRef" type="text" @keypress.enter="addItem">
        </div>
        <ul class="list-wrap">
            <li class="list-item" v-for="(item,index) in filteredDataRef" :key="index" @dblclick="onEdit(item)">
                <div class="left">
                    <span class="select-wrap" :class="{'select-wrap-active': item.completed}" @click="selectItem(item)"></span>
                </div>
                <div class="right">
                    <span class="right" :class="{'list-item-active': item.completed}" :style="{display: currentEditItem === item.id ? 'none' : 'block' }">{{item.title}}</span>
                    <input class="right" v-model="item.title" v-show="currentEditItem === item.id" @keypress.enter="onSave(item)" />
                    <span class="close" v-show="currentEditItem === item.id" @click="onCancel(item)">X</span>
                </div>
            </li>
        </ul>
        <div class="footer">
            <div>
                {{ unCompleteDataRef.length }} items uncomplete
            </div>
            <div class="tab">
                <span :class="{'active': filterRef === 'all'}" @click="footBtn('all')">全部</span>
                <span :class="{'active': filterRef === 'uncomplete'}" @click="footBtn('uncomplete')">未完成</span>
                <span :class="{'active': filterRef === 'completed'}" @click="footBtn('completed')">已完成</span>
            </div>
            <div class="clear" @click="clearBtn">清楚完成</div>
        </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue"
import useTodoList from '../../composition/TodoList/useTodoList.js'
import addTodoList from '../../composition/TodoList/addTodoListItem.js'
import useFilter from '../../composition/TodoList/useFilter.js'
import useEdit from '../../composition/TodoList/useEdit.js'

export default {
    setup () {
        const { todosRef } = useTodoList()
        const { newItemRef, addItem, selectItem } = addTodoList(todosRef)
        const { filterRef, filteredDataRef, unCompleteDataRef, clearBtn } = useFilter(todosRef)
        const { onEdit, currentEditItem, onSave, onCancel, allSelected } = useEdit(todosRef)

        const footBtn = (type) => {
            window.location.hash = `#/${type}`
            filterRef.value = type
        }
        return {
            todosRef,
            newItemRef,
            addItem,
            selectItem,
            filterRef,
            filteredDataRef,
            unCompleteDataRef,
            footBtn,
            onEdit,
            currentEditItem,
            onSave,
            onCancel,
            allSelected,
            clearBtn,
        }
    }
}
</script>

<style lang="less" scoped>
.todolist-wrap{
    width: 500px;
    @blue: rgb(24, 144, 255);
    margin: 0 auto;
    .todolist-box{
        width: 100%;
        height: 400px;
        box-shadow: 0px 0px 3px 3px #ccc;
        padding: 20px 20px;
        box-sizing: border-box;
        position: relative;
        .select-wrap{
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            border-radius: 50%;
            display: block;
            position: relative;
        }
        .select-wrap-active::after{
            display: block;
            content: '';
            position: absolute;
            width: 70%;
            height: 70%;
            border-radius: 50%;
            background: @blue;
            left: 15%;
            top: 15%;
        }
        
        .entry-wrap{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            .left{
                width: 10%;
            }
            input{
                width: 90%;
                height: 30px;
                border: 1px solid #ccc;
                border-radius: 20px;
                outline: none;
                padding: 0 20px;
            }
        }
        .list-wrap{
            margin: 10px 0;
            padding: 0;
            .list-item{
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                position: relative;
                .left{
                    width: 10%;
                }
                .right{
                    width: 90%;
                    text-align: left;
                    position: relative;
                    .close{
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translate(0,-50%);
                        cursor: pointer;
                    }
                }
            }
            .list-item-active::before{
                display: block;
                content: '';
                position: absolute;
                width: 80%;
                height: 2px;
                background: rgba(0, 0, 0, 0.1);
                top: 50%;
            }
        }
        .footer{
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            font-size: 13px;
            cursor: pointer;
            .tab{
                span{
                    padding: 3px 8px;
                    margin: 0 2px;
                }
                .active{
                    border: 1px solid @blue;
                    border-radius: 3px;
                    color: @blue;
                }
            }
        }
    }
}
</style>
<template>
    <div class="select-input-wrap">
        <div class="check-box" :class="{'checked': modelValue }" @click="selectHandle"></div>
        <input type="text" class="edit" :value="title" @input="inputHandle">
    </div>
</template>

<script>



export default {
    props: {
        modelValue: Boolean,
        title: String,
        titleModifiers:Object
    },
    setup(props,cxt){

        const selectHandle = () => {
            console.log(props.modelValue)
            cxt.emit('update:modelValue', !props.modelValue)
        }

        const inputHandle = (e) => {
            console.log('titleModifiers', props.titleModifiers)
            let val = e.target.value
            if (props.titleModifiers.tirm && val) { // 去除左右空格
                cxt.emit('update:title', val.trim())
            } else {
                cxt.emit('update:title', e.target.value)
            }
            
        }

        return{
            selectHandle,
            inputHandle,
        }
    }
}
</script>

<style lang="less" scoped>
    .select-input-wrap{
        display: flex;
        justify-content: left;
        align-items: center;
        .check-box{
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            &.checked{
                background: cornflowerblue;
            }
        }
        .edit{
            margin-left: 8px;
            border: none;
            outline: none;
            border-bottom: 1px solid #ccc;
            
        }
    }
</style>
<template>
  <div class="bar-wrap">
        <div class="item" v-for="(item,index) in gdpArr" :key="index">
            <label>{{item.country}}</label>
            <div class="bar" :style="{'width':item.size+'px','background': item.color}"></div>
            <div class="value">{{item.value}}万亿</div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import useGdp from '../../../composition/compositionApi/useGdp.js'
export default {
    props: ['gdp'],
    setup(props){
        console.log('props',props.gdp)
        const gdpRef = computed(()=>props.gdp)
        return {
            ...useGdp(gdpRef,300) 
        }
    }
}
</script>

<style scoped>
.bar-wrap{

}
.item{
    display: flex;
    height: 45px;
    line-height: 45px;
    position: relative;
    align-items: center;
    
}
.item label{
    border-right: 2px solid #ccc;
    padding: 0 10px;
}
.bar{
    width: 100px;
    height: 20px;
    background: #000;
}
.value{
    font-size: 14px;
    margin: 0 0 0 8px;
}
</style>
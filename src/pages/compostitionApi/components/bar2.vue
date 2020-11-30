<template>
  <div class="bar-wrap">
        <div class="item" v-for="(item,index) in gdpArr" :key="index">
            <label>{{item.country}} {{item.value}}万亿</label>
            <div class="bar" :style="{'width':item.size+'px','background': item.color}"></div>
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
        const { gdpArr } = useGdp(gdpRef,300) 
        // const { gdpArr } = useGdp(props.gdp,300) 
        return {
           gdpArr
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
    font-size: 14px;
    margin: 0 0 0 8px;
    position: relative;
    z-index: 2;
    color: #fff;
}
.bar{
    width: 100px;
    height: 20px;
    background: #ccc;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    z-index: 1s;
}
</style>
import { ref, computed, watch } from 'vue'
import gsap from 'gsap'
const arrColor = ['#fcf', '#ccc', '#1890ff', '#1200ff', '#108ff']
export default function useGdp(gdpRef,size){
    const max = computed(()=>{ // 算出最大值
        if(gdpRef.value.length){
            return Math.max(...gdpRef.value.map(it=>it.value))
        }
        return 0
    })
    const gdp = computed(()=>{
        console.log('rdpRef',gdpRef)
        return gdpRef.value.map((item,index)=>{
            console.log('item.value/max.value*size',item.value/max.value*size)
            return {
                ...item,
                size: item.value/max.value*size,
                color: arrColor[index%arrColor.length]
            }
        })
    })
    const gdpArr = ref([])
    watch(gdp,()=>{
        for(let i = 0; i <gdp.value.length; i++){
            if(!gdpArr.value[i]){ // 初始值
                gdpArr.value[i] = {
                    ...gdp.value[i],
                    size: 0,
                    value: 0
                }
            }
            // 动画
            gsap.to(gdpArr.value[i],{
                ...gdp.value[i],
                duration: 1
            })
        }
    },{deep:true})

    // const max = computed(()=>{ // 算出最大值
    //     if(gdpRef.length){
    //         return Math.max(...gdpRef.map(it=>it.value))
    //     }
    //     return 0
    // })
    // const gdp = computed(()=>{
    //     console.log('rdpRef',gdpRef)
    //     return gdpRef.map((item,index)=>{
    //         console.log('item.value/max.value*size',item.value/max.value*size)
    //         return {
    //             ...item,
    //             size: item.value/max.value*size,
    //             color: arrColor[index%arrColor.length]
    //         }
    //     })
    // })
    // const gdpArr = ref([])
    // watch(gdp,()=>{
    //     for(let i = 0; i <gdp.value.length; i++){
    //         if(!gdpArr.value[i]){ // 初始值
    //             gdpArr.value[i] = {
    //                 ...gdp.value[i],
    //                 size: 0,
    //                 value: 0
    //             }
    //         }
    //         // 动画
    //         gsap.to(gdpArr.value[i],{
    //             ...gdp.value[i],
    //             duration: 1
    //         })
    //     }
    // },{deep:true})
    
    
    return {
        gdpArr
    }
}
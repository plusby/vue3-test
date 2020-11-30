import { reactive, readonly, toRefs} from 'vue'
import * as loginSer from '../api/user'

// 创建默认的全局单例响应式数据，仅供该模块使用
const state = reactive({
    user: null,
    loading: false
})

// 对外暴露的数据是只读的，可以使用toRefs进行转换，从而避免在解构或展开后丢失响应
export const LoginUserstate = readonly(state)

// 登录
export async function login(name,pw){
    state.loading = true
    const user = await loginSer.login(name,pw)
    state.user = user
    state.loading = false
}

// 退出登录
export async function loginOut(name,pw){
    state.loading = true
    const user = await loginSer.loginOut()
    state.user = null
    state.loading = false
}

// 恢复登录状态
export async function whoAmI(){
    state.loading = true
    const user = await loginSer.whoAmI()
    state.user = user
    state.loading = false
}



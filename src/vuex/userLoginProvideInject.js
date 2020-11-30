import { readonly, reactive, inject} from 'vue'
import * as loginSer from '../api/user'
// provide的key
const key = Symbol()

// 在传入的vue应用实例中提供数据
export function provideStore(app){
    // 创建默认的响应式数据
    const state = reactive({
        user: null,
        loading: false
    })
    // 登录
    async function login(name,pw){
        state.loading = true
        const user = await loginSer.login(name,pw)
        state.user = user
        state.loading = false
    }

    // 退出登录
    async function loginOut(name,pw){
        state.loading = true
        const user = await loginSer.loginOut()
        state.user = null
        state.loading = false
    }

    // 恢复登录状态
    async function whoAmI(){
        state.loading = true
        const user = await loginSer.whoAmI()
        state.user = user
        state.loading = false
    }

    // 提供全局共享数据
    app.provide(key,{
        state: readonly(state), // 对外只读
        login,
        loginOut,
        whoAmI
    })
    
}

// 使用数据
export function useProvideInjectStore(defaultValue = null){
    return inject(key, defaultValue)
}


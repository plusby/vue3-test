<template>
  <div class="login-wrap">
    <p>用户名: <input type="text" v-model="name"></p>
    <p>密码: <input type="password" v-model="pw"></p>
    <button :disabled="loading" @click="submit">{{ loading ? '加载中...' : '登录'}}</button>

    <pre>
        全局共享数据有以下三种方案：
        1. vuex:
            安装vuex@4.x
            两个重要变动：
                1. 去掉了构造函数vuex,而使用createStore创建仓库
                2. 为了配合composition api,新增了useStore函数
                    获得仓库对象

        2. global state
            由于vue3的响应式系统本身可以脱离组件而存在，因此可以充分利用这一点，
            轻松制造多个全局响应式数据

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

        3. Provide和Inject
            vue3中在composition api中添加了provide和inject方法，可以在setup函数中注入
            和使用数据，vue3中还在应用的实例中加入了provide方法，用于提供整个应用的数据共享

            // 全局注入共享数据
            app.provide('user',{
                state: readonly(state), // 对外只读
                login,
                loginOut,
                whoAmI
            })
            // 组件中使用共享数据
            const store = inject('user')
            store.state.name
            store.login()
            store.loginOut()
            store.whoAmI()

        以上三种方法的区别：
            1. 都可以实现组件之间的数据共享
            2. vuex和global state可以脱离组件使用，而Provide和Inject只能在组件中使用
            3. vuex的数据是状态树型，后两者可以实现状态树也可以不实现
            4. vuex是重量级，而其他两个都是轻量级，因此在中小型项目中可以使用后两个
            5. Provide和Inject相比前两个可以更好的实现多个子应用之前的共享数据分离



    </pre>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import  { useRouter } from 'vue-router'
import { useProvideInjectStore } from '../../vuex/userLoginProvideInject'
export default {
    setup(){
        const name = ref('')
        const pw = ref('')
        const store = useStore()
        // 使用provide和inject提供的全局共享数据
        // const store = useProvideInjectStore()
        // store.login()  // 登录
        // store.user.name // 获取用户名
        const router = useRouter()
        const submit = async () => {
            const user = await store.dispatch('userLogin/login',{ loginId: name.value, loginPwd: pw.value})
            console.log('user',user)
            if(user){
                router.push('/')
            }else{
                alert('登录失败')
            }
        }

        const loading = computed(()=>{
            return store.state.userLogin.loading
        })

        return {
            name,
            pw,
            submit,
            loading
        }
    }
}
</script>

<style>

</style>
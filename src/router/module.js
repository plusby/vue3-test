import { defineAsyncComponent } from 'vue'
import Loading from '../pages/home/componets/loading.vue'
import { delay } from '../utils/todoStorage'
import TodoList from '../pages/todoList/index.vue';
import Reactive from '../pages/reactive/index.vue'
import CompositionApi from '../pages/compostitionApi/index.vue'
import Login from '../pages/Login/index.vue'

// 异步路由 初始加载的时候会异步获取，以后都是读取缓存
const Home = defineAsyncComponent({
    loader: async() => {
        // NProgress.start() // 进度条开始加载
        await delay() // 模拟异步延迟
        const com = await import('../pages/home/index.vue')
        // NProgress.end()
        return com
    },
    loadingComponent: Loading, // 加载时的显示的组件
})

const About = defineAsyncComponent({
    loader: async() => {
        // NProgress.start()
        await delay() // 模拟异步延迟
        const com = await import('../pages/about/index.vue')
        // NProgress.end()
        return com
    },
    loadingComponent: Loading, // 加载时的显示的组件
})

const Mark = defineAsyncComponent({
    loader: async() => {
        // NProgress.start()
        await delay() // 模拟异步延迟
        const com = await import('../pages/mark/index.vue')
        // NProgress.end()
        return com
    },
    loadingComponent: Loading, // 加载时的显示的组件
})

const SelectList = defineAsyncComponent({
    loader: async() => {
        // NProgress.start()
        await delay() // 模拟异步延迟
        const com = await import('../pages/selectList/index.vue')
        // NProgress.end()
        return com
    },
    loadingComponent: Loading, // 加载时的显示的组件
})



export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/About',
        component: About
    },
    {
        path: '/Mark',
        component: Mark
    },
    {
        path: '/SelectList',
        component: SelectList
    },
    {
        path: '/TodoList',
        component: TodoList
    },
    {
        path: '/Reactive',
        component: Reactive
    },
    {
        path: '/CompositionApi',
        component: CompositionApi
    },
    {
        path: '/Login',
        component: Login
    }
]

import { createRouter, createWebHistory} from 'vue-router'
import routes from './module.js'

export default createRouter({
    history: createWebHistory(),
    routes,
})
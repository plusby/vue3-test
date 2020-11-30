import { createRouter, createWebHistory} from 'vue-router'
import routes from './module.js'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    console.log('beforeEach')
    next()
})
export default router
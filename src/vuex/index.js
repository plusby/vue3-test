import { createStore } from 'vuex'
import userLogin from './userLoginVuex'

export default createStore({
    modules: {
        userLogin
    }
})
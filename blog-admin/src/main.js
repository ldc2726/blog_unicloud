import App from './App.vue'
import './index.css'
import { getApi } from './utils/common'
import { createApp, defineAsyncComponent } from 'vue'
import router from './router/index'
import store from './store/index'
import '/@/http/axios'
import ElementPlus from 'element-plus'
// console.log(ElementPlus)
import 'element-plus/lib/theme-chalk/index.css'
// import api from '@/http/index'
// console.log(api)
const Demo = defineAsyncComponent(() => import('/@/components/demo.vue'))

const app = createApp(App)
router.beforeEach((to,from,next) => {
    store.commit('user/getUserInfo')
    console.log(store.state.user)
    if(!store.state.user.userinfo.token&&to.path!='/login'&&to.path!='/Register'){
        next('/login')
        return;
    }
    next()
})
app.component('AsyncDemo', Demo)
app.config.globalProperties.$api = getApi
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

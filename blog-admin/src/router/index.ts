import { createRouter, createWebHashHistory } from 'vue-router'
import Routes from './routes'
export default createRouter({
	history: createWebHashHistory(),
	routes: Routes
})

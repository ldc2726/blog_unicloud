import { createStore } from 'vuex'
import user from './user'
interface State {
	name: string
}

export default createStore({
	state: <State>{
		name: 'hello word!',
		isSearch:false
	},
	modules:{
		user
	}
})

// import { Message } from 'element-ui';
import store from '/@/store'
import Axios from 'axios'
import { ElMessage,ElLoading } from 'element-plus'
// const Axios = import('axios')
/**
 * 请求拦截操作
 */
let num = 0,loading:any
Axios.interceptors.request.use(
	(config: any) => {
		if (!config.headers.isIgnore) {
			if (num == 0) {
				store.state.isSearch = true
				loading = ElLoading.service({
					lock: true,
					text: '加载中。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.6)'
				})
			}
			num++
		}
		return config
	},
	(error: object) => {
		return Promise.reject(error)
	}
)
/**
 * 响应拦截操作
 */
 Axios.interceptors.response.use(
	(response: any) => {
		if (!response.config.headers.isIgnore) {
			num--
			if (num == 0) {
				store.state.isSearch = true
				loading.close();
			}
			if (response.data.code||response.data.code==0) {
				switch (response.data.code) {
					case 0:
						return response.data
					case 200:
						ElMessage.success(response.data.message)
						return response.data
					case 30203:
						ElMessage.warning(response.data.message);
						setTimeout(()=>{
							store.commit('user/loginOut')
						},1500)
						return Promise.reject(response)
					case 406:
						ElMessage.warning(response.data.message);
						// store.commit('loginOut')
						return Promise.reject(response)
					default:
						ElMessage.warning(response.data.message);
						return Promise.reject(response)
				}
			} else {
				return Promise.resolve(response)
			}
		} else {
			return Promise.resolve(response)
		}
	},
	(error: any) => {
		if (num > 0) {
			num--
		}
		ElMessage.warning('系统繁忙，请稍后再试');
		if (num == 0) {
			store.state.isSearch = true
		}
		const response= error.response
		switch (response.data.code) {
			case 0:
				return response.data
			case 200:
				ElMessage.success(response.data.message)
				return response.data
			case 30203:
				ElMessage.warning(response.data.message);
				setTimeout(()=>{
					store.commit('user/loginOut')
				},1500)
				return Promise.reject(response)
			default:
				ElMessage.warning(response.data.message);
				return Promise.reject(response)
		}
	}
)

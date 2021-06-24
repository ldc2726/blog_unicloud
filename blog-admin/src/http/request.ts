import axios from 'axios'
import Store from '/@/store'
import Config from './config'
import { isValidKey } from './../utils/common'
const index = process.env.NODE_ENV != undefined ? process.env.NODE_ENV : 'test'
let val:any
if (isValidKey(index, Config)) {
	val = Config[index]
}
export const $post = (url: string, data: object, header = {}) => {
	let host:string = ''
	if(url.indexOf('/user/')!=-1){
		host = val['userapi']
	}
	if(url.indexOf('/msgLog/')!=-1){
		host = val['msgLogapi']
	}
	const postda = {
		...data,
		token:Store.state.user.userinfo?.token
	}
	return axios.post(`${host}${url}`, postda, {
		headers: {
			'Content-Type': 'application/json',
			...header
		}
	})
}

export const $get = (url: string, params = {}, header = {}) => {
	return axios.get(`${url}`, {
		params: params,
		headers: {
			'Content-Type': 'application/json',
			...header
		}
	})
}

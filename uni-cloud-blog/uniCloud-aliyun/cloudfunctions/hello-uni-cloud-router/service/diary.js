const {
	Service
} = require('uni-cloud-router')
const filterTime = require('./../utils/filtertime.js')
const asyncAll = require('./../utils/asyncAll.js')
module.exports = class DiaryService extends Service {
	async add(data) {
		const collection = this.db.collection('user-diary');
		return await collection.add({
			"createTime":filterTime(new Date().getTime()),
			"createTimeStmp":new Date().getTime(),
			"userid":data.userid,
			"content":data.content
		})
	}
	async update(data){
		const collection = this.db.collection('user-diary');
		return await collection.where({
			_id:data.id,
			userid:data.userid
		})
		.update({
			"content":data.content
		})
	}
	async getListAuth(data){
		const collection = this.db.collection('user-diary');
		const {page=1,size=10,userid} = data;
		const list = async function(){
			return await collection
			.where({
				userid:userid
			}).orderBy('createTimeStmp','desc').skip((page-1)*size).limit(size).get();
		}
			
		const total = async function(){
			return await collection
			.where({
				userid:userid
			}).count()
		}
		const result = await asyncAll(list,total)
		return result
	}
	async remove(data){
		const collection = this.db.collection('user-diary');
		return await collection.where({
			_id:data.id,
			userid:data.userid
		})
		.remove()
	}
}

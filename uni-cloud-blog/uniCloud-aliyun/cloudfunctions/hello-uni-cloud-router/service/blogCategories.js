const {
	Service
} = require('uni-cloud-router')
const filterTime = require('./../utils/filtertime.js')
const asyncAll = require('./../utils/asyncAll.js')
module.exports = class BlogCategoriesService extends Service {
	async add(data) {
		const collection = this.db.collection('opendb-blog-categories');
		return await collection.add({
			"createTime":filterTime(new Date().getTime()),
			"userid":data.userid,
			"name":data.name,
			"description":data.description,
			"icon":data.icon||"",
			"sort":data.sort||0,
			"article_count":0
		})
	}
	async update(data){
		const collection = this.db.collection('opendb-blog-categories');
		return await collection.where({
			_id:data.id,
			userid:data.userid
		})
		.update({
			"name":data.name,
			"description":data.description,
			"icon":data.icon||"",
			"sort":data.sort||0
		})
	}
	async getListAuth(data){
		const collection = this.db.collection('opendb-blog-categories');
		const {page=1,size=10,userid} = data;
		const list = async function(){
			return await collection
			.where({
				userid:userid
			}).orderBy('sort','desc').skip((page-1)*size).limit(size).get();
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
		const collection = this.db.collection('opendb-blog-categories');
		return await collection.where({
			_id:data.id,
			userid:data.userid
		})
		.remove()
	}
}

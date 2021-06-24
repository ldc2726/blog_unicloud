const {
	Service
} = require('uni-cloud-router')
const filterTime = require('./../utils/filtertime.js')
const asyncAll = require('./../utils/asyncAll.js')
module.exports = class ArticlesService extends Service {
	async add(data) {
		const collection = this.db.collection('opendb-blog-articles');
		const collection2 = this.db.collection('opendb-blog-categories')
		const dbCmd = this.db.command 
		const res = async function(){
			return await collection.add({
				"publish_date":filterTime(new Date().getTime()),
				"user_id":data.userid,
				"category_id":data.category_id,
				"title":data.title,
				"content":data.content,
				"excerpt":data.excerpt||'',
				"article_status":data.article_status,
				"view_count":0,
				"like_count":0,
				"tag":data.tag||[],
				"is_sticky":data.is_sticky || 0,
				"is_essence":data.is_essence || false,
				"comment_status":data.comment_status || 1,
				"comment_count":0,
				"last_comment_user_id":data.last_comment_user_id||'',
				"avatar":data.avatar || '',//封面
				"publish_ip":data.ip,
				"last_modify_date":filterTime(new Date().getTime()),
				"last_modify_ip":data.ip
			})
		}
		const total = async function(){
			return await collection2.where({
				_id:dbCmd.in(data.category_id)
			}).update({
				article_count:dbCmd.inc(1)
			})
		}
		const result = await asyncAll(res,total)
		return result
	}
	async update(data){
		function formatArr(oldArr,newArr){
		    const obj = {
		        add:[],
		        delete:[]
		    }
		    newArr.map(item=>{
		        if(!oldArr.includes(item)){
		            obj.add.push(item)
		        }
		    })
		    oldArr.map(item=>{
		        if(!newArr.includes(item)){
		            obj.delete.push(item)
		        }
		    })
		    return obj;
		}
		const collection = this.db.collection('opendb-blog-articles');
		const collection2 = this.db.collection('opendb-blog-categories')
		const dbCmd = this.db.command 
		const categoryArr = await collection
		.field({
			category_id:true
		})
		.where({
			_id:data._id,
			user_id:data.userid
		}).get();
		console.log('--',categoryArr.data[0].category_id,'++')
		const obj = formatArr(categoryArr.data[0].category_id,data.category_id)
		const add = async function(){
			return await collection2.where({
				_id:dbCmd.in(obj.add)
			}).update({
				article_count:dbCmd.inc(1)
			})
		}
		const del = async function(){
			return await collection2.where({
				_id:dbCmd.in(obj.delete)
			}).update({
				article_count:dbCmd.inc(-1)
			})
		}
		const updateList = async function(){
			await collection.where({
				_id:data._id,
				user_id:data.userid
			})
			.update({
				"category_id":data.category_id,
				"title":data.title,
				"content":data.content,
				"excerpt":data.excerpt||'',
				"article_status":data.article_status,
				"tag":data.tag||[],
				"is_sticky":data.is_sticky || 0,
				"is_essence":data.is_essence || false,
				"comment_status":data.comment_status || 1,
				"last_comment_user_id":data.last_comment_user_id || '',
				"avatar":data.avatar || '',//封面
				"publish_ip":data.ip,
				"last_modify_date":filterTime(new Date().getTime()),
				"last_modify_ip":data.ip
			})
		}
		const result = await asyncAll(add,del,updateList)
		return result
		
	}
	async getListAuth(data){
		const collection = this.db.collection('opendb-blog-articles');
		const dbCmd = this.db.command 
		const {page=1,size=10,title,article_status,category_id,userid,is_sticky='',is_view_count} = data;
		var sortString = 'is_sticky'
		if(is_view_count){
			sortString = 'view_count'
		}
		const list = async function(){
			return await collection
			.field({
				"_id":true,
				'category_id': true,
				"title":true,
				"excerpt":true,
				"article_status":true,
				"view_count":true,
				"like_count":true,
				"is_sticky":true,
				"avatar":true,
				"comment_status":true,
				"publish_date":true,
				"tag":true
			})
			.where({
				user_id:userid,
				title:title?title:new RegExp('^'),
				article_status:article_status==-1?dbCmd.gte(article_status):article_status,
				category_id:category_id==''?dbCmd.neq(""):category_id,
				is_sticky:is_sticky===''?dbCmd.neq(""):is_sticky
			}).orderBy(sortString,'desc').skip((page-1)*size).limit(size).get();
		}
			
		const total = async function(){
			return await collection
			.where({
				user_id:userid,
				title:title?title:new RegExp('^'),
				article_status:article_status==-1?dbCmd.gte(article_status):article_status,
				category_id:category_id==''?dbCmd.neq(""):category_id,
				is_sticky:is_sticky===''?dbCmd.neq(""):is_sticky
			}).count()
		}
		const result = await asyncAll(list,total)
		return result
	}
	
	async getListDetailAuth(data){
		const collection = this.db.collection('opendb-blog-articles');
		return await collection.where({
			_id:data._id,
			user_id:data.userid
		}).get()
	}
	
	async remove(data){
		const collection = this.db.collection('opendb-blog-articles');
		return await collection.where({
			_id:data.id,
			user_id:data.userid
		})
		.remove()
	}
	async updateViewCountAuth(data){
		const collection = this.db.collection('opendb-blog-articles');
		const dbCmd = this.db.command 
		return await collection.where({
			_id:data._id,
			user_id:data.userid
		})
		.update({
			view_count:dbCmd.inc(1)
		})
	}
}

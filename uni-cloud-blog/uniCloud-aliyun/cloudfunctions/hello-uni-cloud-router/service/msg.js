const {
	Service
} = require('uni-cloud-router')
const filterTime = require('./../utils/filtertime.js')
const asyncAll = require('./../utils/asyncAll.js')
module.exports = class MsgService extends Service {
	async addAuth(data) {
		const collection = this.db.collection('opendb-feedback');
		const {userid,blog_id,content,contact,email,is_reply=false,feedback_id=''} = data;
		return await collection.add({
			"create_date":filterTime(new Date().getTime()),
			"create_date_time":new Date().getTime(),
			"user_id":userid,
			"blog_id":blog_id,
			"content":content,
			"contact":contact,
			"email":email,
			"create_address":data.ip,
			"is_reply":is_reply,
			"feedback_id":feedback_id
		})
	}
	async getListAuth(data){
		const collection = this.db.collection('opendb-feedback');
		const dbCmd = this.db.command 
		const {page=1,size=100,userid,blog_id='',email='',is_reply} = data;
		const list = async function(){
			return await collection
			.field({
				'email': true,
				"content":true,
				"blog_id":true,
				"create_date":true,
				"is_reply":true,
				"contact":true
			})
			.where({
				user_id:userid,
				"email":email==''?dbCmd.neq(""):email,
				"blog_id":blog_id==''?dbCmd.neq(""):blog_id
			}).orderBy('create_date_time','desc').skip((page-1)*size).limit(size).get();
		}
			
		const total = async function(){
			return await collection
			.where({
				user_id:userid,
				"email":email==''?dbCmd.neq(""):email,
				"blog_id":blog_id==''?dbCmd.neq(""):blog_id
			}).count()
		}
		const result = await asyncAll(list,total)
		return result
	}
	async remove(data){
		const collection = this.db.collection('opendb-feedback');
		return await collection.where({
			_id:data.id,
			user_id:data.userid
		})
		.remove()
	}
}

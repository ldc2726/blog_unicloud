const {
	Controller
} = require('uni-cloud-router')
const reqformat = require('./../utils/reqformat.js')
module.exports = class DiaryController extends Controller {
	async add() { //添加日记
		const {
			ctx,
			service
		} = this;
		//校验参数
		ctx.validate({
			content: {
				type: "string"
			},
		});
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		});
		return this.service.diary.add(post)
	}
	async update() { //更新日记
		const {
			ctx,
			service
		} = this;
		//校验参数
		ctx.validate({
			content: {
				type: "string"
			},
			id:{
				type:"string"
			}
		});
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		});
		return this.service.diary.update(post)
	}
	async getListAuth() { //获取日记列表
		const {
			ctx,
			service
		} = this;
		//校验参数
		// ctx.validate({
		// 	userid:{
		// 		type:"string"
		// 	},
		// 	page:{
		// 		type:"number"
		// 	},
		// 	size:{
		// 		type:"number"
		// 	}
		// });
		const data = reqformat(ctx.event)
		return this.service.diary.getListAuth(data.body)
	}
	async remove(){//删除日记
		const {
			ctx,
			service
		} = this;
		//校验参数
		ctx.validate({
			id:{
				type:"string"
			}
		});
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		});
		return this.service.diary.remove(post)
	}
}

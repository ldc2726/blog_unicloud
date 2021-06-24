const {
	Controller
} = require('uni-cloud-router')
const reqformat = require('./../utils/reqformat.js')
module.exports = class BlogCategoriesController extends Controller {
	async add() { //添加博客分类
		const {
			ctx,
			service
		} = this;
		//校验参数
		ctx.validate({
			name: {
				type: "string"
			},
			description:{
				type:"string"
			},
			sort:{
				type:"number"
			}
		});
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		});
		return this.service.blogCategories.add(post)
	}
	async update() { //更新博客分类
		const {
			ctx,
			service
		} = this;
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		});
		return this.service.blogCategories.update(post)
	}
	async getListAuth() { //获取博客分类列表
		const {
			ctx,
			service
		} = this;
		const data = reqformat(ctx.event)
		return this.service.blogCategories.getListAuth(data.body)
	}
	async remove(){//删除博客分类列表
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
		return this.service.blogCategories.remove(post)
	}
}

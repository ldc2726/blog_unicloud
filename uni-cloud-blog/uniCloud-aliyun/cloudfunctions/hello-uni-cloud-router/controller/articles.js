const {
	Controller
} = require('uni-cloud-router')
const reqformat = require('./../utils/reqformat.js')
module.exports = class ArticlesController extends Controller {
	async add() { //添加博客分类
		const {
			ctx,
			service
		} = this;
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		},{
			ip:ctx.context.CLIENTIP
		});
		return this.service.articles.add(post)
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
		return this.service.articles.update(post)
	}
	async getListAuth() { //获取博客分类列表
		const {
			ctx,
			service
		} = this;
		const data = reqformat(ctx.event)
		return this.service.articles.getListAuth(data.body)
	}
	async getListDetailAuth() { //获取博客分类详情
		const {
			ctx,
			service
		} = this;
		const data = reqformat(ctx.event)
		return this.service.articles.getListDetailAuth(data.body)
	}
	async updateViewCountAuth() { //获取博客分类详情
		const {
			ctx,
			service
		} = this;
		const data = reqformat(ctx.event)
		return this.service.articles.updateViewCountAuth(data.body)
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
		return this.service.articles.remove(post)
	}
}

export default {
	HomePageList: {
		//获取商城首页数据
		url: '/mall/homepage/detail',
		header: {
			'Content-Type': 'application/json', //可省略默认
			isIgnore: true //是否过滤拦截，默认false
		}
	},
	userRegister:{//注册
		url:'/user/register'
	},
	userLogin:{//登陆
		url:'/user/login'
	},
	userList:{//获取用户列表
		url:'/user/getlist'
	},
	userAddrole:{//添加角色
		url:'/user/addrole'
	},
	userBindrole:{//绑定角色
		url:"/user/bindrole"
	},
	userRoleList:{//获取角色列表
		url:"/user/role/list"
	},
	userStopEnabled:{//停用启用
		url:"/user/stop/enabled"
	},
	userDelRole:{//删除角色
		url:"/user/deleterole"
	},
	diaryAdd:{//添加日记
		url:"/msgLog/diary/add"
	},
	diaryRemove:{//删除日记
		url:"/msgLog/diary/remove"
	},
	diaryUpdate:{//更新日记
		url:"/msgLog/diary/update"
	},
	diaryGetListAuth:{//获取日记列表
		url:"/msgLog/diary/getListAuth"
	},
	msgAddAuth:{//添加留言
		url:"/msgLog/msg/addAuth"
	},
	msgGetListAuth:{//获取留言列表
		url:"/msgLog/msg/getListAuth"
	},
	msgRemove:{//删除留言
		url:"/msgLog/msg/remove"
	},
	blogCategoriesAdd:{//添加分类
		url:"/msgLog/blogCategories/add"
	},
	blogCategoriesUpdate:{//更新分类
		url:"/msgLog/blogCategories/update"
	},
	blogCategoriesRemove:{//删除分类
		url:"/msgLog/blogCategories/remove"
	},
	blogCategoriesGetlist:{//获取分类列表
		url:"/msgLog/blogCategories/getListAuth"
	},
	blogArticlesAdd:{//添加博客
		url:"/msgLog/articles/add"
	},
	blogArticlesUpdate:{//博客更新
		url:"/msgLog/articles/update"
	},
	blogArticlesList:{//获取博客列表
		url:"/msgLog/articles/getListAuth"
	},
	blogArticlesDetail:{//博客详情
		url:"/msgLog/articles/getListDetailAuth"
	},
	blogArticlesRemove:{//删除博客
		url:"/msgLog/articles/remove"
	},
	
}

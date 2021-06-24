# blog_unicloud
博客系统的开发,无需要服务器部署，含前端响应式博客页面，后台管理系统，以及基于unicloud免费的server端，统统免费，基本满足个人需求，此项目为个人毕设用途，有空的话会继续做相应的维护。

### blog-admin  后台管理系统
###### 技术选型
	采用vue3+typescript+axios+vite
###### 启动项目
	npm install
	num run serve
###### 打包
	num run build:test
	num run build:master
	
### blog-web 响应式前端博客界面


	配置文件 /static/js/config.js （统统改成自己的即可）
```javascript
var config = {
    name:"LDC",//博客名
    headlogo:"Mr.li",//博客logo，文字
    path:"http://blog.decong.icu",//博客域名
    title:"LDC的技术博客",
    address:"上海市徐汇区",
    QQ:"940093547",
    email:"ldc27261@gmail.com",
    github:"https://github.com/ldc2726",
    userid:"6064565b8781a50001f64e24",//个人博客在数据库中的userid
    banquan:`Copyright © 2021-2022 LDC个人博客 All Rights Reserved V.1.0 <a href="https://www.beian.miit.gov.cn" target="blank" class="tiao">沪ICP备2021008871</a>`,//备案号
    url:"https://4ad780fd-7314-43e9-a81f-5daac4f25b07.bspapp.com/http/"// server端接口
}
document.title = config.title +'-'+ document.title;
setTimeout(()=>{
    if(layui){
        var $ = layui.jquery
    }
    $('.uesername').empty().append(`<span>${config.name}</span>`)
    $('.head-logo').empty().append(`<span>${config.headlogo}</span>`)
    $('.address').empty().append(`<span>${config.address}</span>`)
    $('.QQ').empty().append(`<span>${config.QQ}</span>`)
},50)
```
### uniCloudBlog 博客用户体系的相关实现
uniCloud-aliyun/cloudfunctions 下边存储的均为用户的所有云函数

	common 通用函数
		async-all  多个异步处理汇总，类似promise-all
		req-format request统一格式
	get-blog-list 获取博客列表
	get-role-list 获取角色列表
	user-addrole 添加角色
	user-bindrole 角色绑定
	user-getlist 获取用户列表
	user-login 用户登陆
	user-register 用户注册
	user-role-delete 删除角色
	user-stop-enabled 停用角色
测试
	在每个云函数下边可以添加测试参数，以获取角色列表为例
	get-role-list.param.json
	
	{
		"token":"xxx"
	}

### uni-cloud-blog 博客相关api的实现
**需要借助hubilderx工具运行测试，借助了uni-cloud-router插件，借助一个云函数中进行区分不同接口，解决云函数数量的限制问题**
	
	/uniCloud-aliyun/cloudfunctions/hello-uni-cloud-router
	controller  处理视图层的交互
		articles.js 博客列表/博客详情相关处理
		blogCategories.js 博客分类
		diary.js 日记的相关处理
		msg.js 留言的相关处理
	
	service 处理请求和数据库的交互
		articles.js 博客列表/博客详情服务
		blogCategories.js 博客分类服务
		diary.js 日记的相关服务处理
		msg.js 留言的相关服务处理
		
	middleware 中间件，统一拦截
		auth.js token的统一校验
接口测试

	hello-uni-cloud-router.param.json 测试参数配置
	**注意需要用action来区分，以articles更新接口为例**
	{
		"action":"/articles/update",
		xxx...（具体的请求参数）
	}
## 前端发布
1.前端资源，使用uniCloud官方提供的阿里云服务器中的前端页面托管功能，上传文件即可
2.在参数配置中可添加cname域名，自己去云服务器-域名管理中添加cname解析（本身是有免费域名的，但是访问有限制，博客是给自己用的，最好是申请一个）
## 服务端的使用和发布
1.在hubilderx中鼠标右键-关联阿里云服务器-开发完上传即可

## 致谢
感谢[unicloud官方](https://unicloud.dcloud.net.cn/login "unicloud")提供的阿里云免费空间
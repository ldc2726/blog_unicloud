const Home = () => import('/@/pages/home/index.vue')
const About = () => import('/@/pages/about.vue')
const My = () => import('/@/pages/my.vue')
const Login = () => import('/@/pages/login/index.vue')
const Register = () => import('/@/pages/register/index.vue')
const UserList = () => import('/@/pages/userlist/index.vue')
const Role = () => import('/@/pages/role/index.vue')
const Diary = () => import('/@/pages/diary/index.vue')
const Msg = () => import('/@/pages/msg/index.vue')
const BlogList = () => import('/@/pages/blog/blogList/index.vue')
const Categories = () => import('/@/pages/blog/Categories/index.vue')

export default [
	{
		path: '/',
		redirect: '/userlist'
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children:[
			{
				path: '/userlist',
				name: 'userlist',
				component: UserList
			},
			{
				path: '/Role',
				name: 'Role',
				component: Role
			},
			{
				path: '/Diary',
				name: 'Diary',
				component: Diary
			},
			{
				path: '/Msg',
				name: 'Msg',
				component: Msg
			},
			{
				path: '/BlogList',
				name: 'BlogList',
				component: BlogList
			},
			{
				path: '/Categories',
				name: 'Categories',
				component: Categories
			}
		]
		
	},
	{
		path: '/About',
		name: 'About',
		component: About
	},
	{
		path: '/My',
		name: 'My',
		component: My
	},
	{
		path: '/Login',
		name: 'Login',
		component: Login
	},
	{
		path: '/Register',
		name: 'Register',
		component: Register
	}
]

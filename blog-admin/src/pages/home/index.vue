<!-- home -->
<template>
	<div id="home">
		<el-container>
			<el-aside width="200px" style="background-color: #171d31">
				<div class="logo">
					<img src="/@/assets/ldc.png"/>
				</div>
				<el-menu
					background-color="#171d31"
					text-color="#fff"
					:default-active="activeIndex"
					active-text-color="#ffd04b"
					:unique-opened='true'
				>
					<el-submenu :index="(i+1).toString()" v-for="(item,i) in menu" :key="i">
						<template #title>
							<i :class="item.icon"></i>{{item.name}}
						</template>
						<el-menu-item 
							v-for="(item2,j) in item.children" 
							:key="j" 
							@click="routerLink(item,item2,i,j)"
							:index="(i+1)+'-'+(j+1)">
								<span>{{item2.name}}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header style="text-align: right; font-size: 16px">
					<el-dropdown>
						<div class="user">
							<i class="el-icon-setting" style="margin-right: 15px;"></i>
							<span>{{user.username}}</span>
						</div>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="loginOut">退  出</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-header>
				<el-main>
					<div class="breadcrumb">
						<el-breadcrumb separator="/">
						<el-breadcrumb-item  v-for="(item,i) in branArr" :key='i' :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
						<!-- <el-breadcrumb-item><a href="/">{{menu[activeIndex.split('-')[0]-1].name}}</a></el-breadcrumb-item> -->
						<!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
						<el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
					</el-breadcrumb>	
					</div>
					<div class="content">
						<router-view></router-view>
					</div>
					<!-- <el-table :data="tableData">
						<el-table-column prop="date" label="日期" width="140"></el-table-column>
						<el-table-column prop="name" label="姓名" width="120"></el-table-column>
						<el-table-column prop="address" label="地址"></el-table-column>
					</el-table> -->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue'
const HelloWorld: Object = defineAsyncComponent(() => import('/@/components/HelloWorld.vue'))
export default {
	name: 'Home',
	components: {
		HelloWorld: HelloWorld
	},
	setup(props: Object, context: Object) {
		const { proxy }: any = getCurrentInstance()
		//请求案例
		proxy.$api('Login', { name: 222 }).then((res: object) => {
			console.log(res)
		})
		//定义数据
		let 
		user = reactive({username:''}),
		activeIndex:any = ref('1-1'),
		branArr:any = ref([
			{name:'用户管理'},
			{name:"用户列表",path:"/userlist"}
		]),
		menu = ref([
				{
					name:'用户管理',
					icon:"el-icon-message",
					children:[
						{
							name:"用户列表",
							path:"/userlist"
						},{
							name:"角色管理",
							path:"/Role"
						}
					]
				},
				{
					name:"留言管理",
					icon:"el-icon-message",
					children:[
						{
							name:"留言管理",
							path:"/Msg"
						}
					]
				},
				{
					name:"博客管理",
					icon:"el-icon-message",
					children:[
						{
							name:"管理分类",
							path:"/Categories"
						},
						{
							name:"文章管理",
							path:"/BlogList"
						},
					]
				},
				{
					name:'日记管理',
					icon:"el-icon-message",
					children:[
						{
							name:"日记管理",
							path:"/Diary"
						}
					]
				},
				// {
				// 	name:'广告管理',
				// 	icon:"el-icon-message"
				// },
				// {
				// 	name:'个人信息',
				// 	icon:"el-icon-message"
				// }
				
			])
		//生命周期
		onMounted(() => {
			activeIndex.value = sessionStorage.getItem('menuIndex') || '1-1'
			user.username = proxy.$store.state.user.userinfo.username
			if(sessionStorage.getItem('menuBran')){
				const ban:any = sessionStorage.getItem('menuBran')
				branArr.value = JSON.parse(ban) || branArr.value
			}
		})
		//子组件传值
		const changed = (a: any) => {
			console.log(a)
		}
		//点击跳转
		const routerLink = (item:any,item2:any,index:any,index2:any) => {
			const active:string = (index+1)+'-'+(index2+1)
			sessionStorage.setItem('menuIndex',active)
			proxy.$router.push(item2.path)
			branArr.value = []
			branArr.value.push({
				name:item.name
			})
			branArr.value.push({
				name:item2.name,
				path:item2.name
			})
			sessionStorage.setItem('menuBran',JSON.stringify(branArr.value))
		}
		const loginOut = () => {
			proxy.$store.commit('user/loginOut')
		}
		return {
			user,
			changed,
			menu,
			activeIndex,//选中menu
			branArr,
			routerLink,//跳转
			loginOut,//退出
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>

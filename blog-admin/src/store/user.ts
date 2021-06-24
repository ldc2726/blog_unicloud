interface State {
    readonly namespaced:boolean,
	state: {
        [propName: string]: any
    },
    mutations:{
        
    }
}
const Store: State = {
    namespaced: true,
	state: {
        userinfo:{}
	},
    mutations:{
        //设置用户信息
        setUserInfo(state:any,n:any){
            state.userinfo = {
                token:n.token,
                username:n.username,
                tokenExpired:n.tokenExpired,
                uid:n.uid
            }
            localStorage.setItem('t_',JSON.stringify(state.userinfo))
        },
        //获取用户信息
        getUserInfo(state:any){
            const user:any = localStorage.getItem('t_');
            if(user){
                state.userinfo = JSON.parse(user)
            }
        },
        //退出登陆
        loginOut(state:any){
            state.userinfo = {}
            localStorage.removeItem('t_')
            sessionStorage.clear()
            location.href = '/'
        }
    }
}

export default Store

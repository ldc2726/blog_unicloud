<!--  -->
<template>
    <div>
        <!-- bg effect -->
        <div id="bg">
            <canvas></canvas>
            <canvas></canvas>
            <canvas></canvas>
        </div>
        <!-- //bg effect -->
        <!-- title -->
        <h1>Effect Login Form</h1>
        <!-- //title -->
        <!-- content -->
        <div class="sub-main-w3">
            <form action="javascript:;">
                <h2>
                    博客管理后台
                    <i class="fa fa-long-arrow-down"></i>
                </h2>
                <div class="form-style-agile">
                    <label>
                        <i class="fa fa-user"></i>
                        用户名
                    </label>
                    <input placeholder="Username" name="Name" type="text" required  v-model="search.username"/>
                </div>
                <div class="form-style-agile">
                    <label>
                        <i class="fa fa-unlock-alt"></i>
                        密码
                    </label>
                    <input placeholder="Password" name="Password" type="password" required v-model="search.password"/>
                </div>
                <!-- checkbox -->
                <div class="wthree-text">
                    <ul>
                        <li>
                           
                        </li>
                        <li>
                            <a href="#">Forgot Password?</a>
                        </li>
                    </ul>
                </div>
                <!-- //checkbox -->
                <input type="submit" value="注 册" id="submit" @click="Register"/>
            </form>
        </div>
        <!-- copyright -->
        <div class="footer">
            <p>Copyright &copy; 2021-2022 LDC个人博客后台 All Rights Reserved V.1.0 <a href="https://www.beian.miit.gov.cn" target="blank" class="tiao">沪ICP备2021008871</a></p>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus'
import canvasBack from './canvas.js'
export default {
    name: 'register',
    setup() {
        const { proxy }: any = getCurrentInstance()
        //定义数据
        let search = reactive({
            username: "",
            password: ""
        })
        onMounted(() => {
            canvasBack()
        })
        //注册
        const Register = () => {
            console.log(proxy, search, 'xxx')
            if(search.username&&search.password){
                proxy.$api('userRegister', search).then((res: any) => {
                    ElMessage.success(res.message)
                    proxy.$router.push('/login')
                })
            }
        }
        return {
            search,
            Register
        }
    },
    components: {
    }
}

</script>

<style lang='scss' scoped>
    @import './register.scss'
</style>

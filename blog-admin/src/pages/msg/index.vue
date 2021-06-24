<!-- msg -->
<template>
    <div>
        <div class="search-head">
            <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
                <el-form-item label="邮箱">
                    <el-input v-model="search.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <!-- <el-form-item label="是否回复">
                    <el-select v-model="search.is_reply" placeholder="是否回复">
                        <el-option label="已回复" value="1"></el-option>
                        <el-option label="未回复" value="2"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clear">清空</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="search-table">
            <el-table :data="list.data" border style="width: 100%">
                <el-table-column label="用户名" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.contact }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="邮箱" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.email }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="博客id" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.blog_id }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="留言日期" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.create_date }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="留言内容" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.content }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" header-align="center">
                    <template #default="scope">
                        <!-- <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                        >回复</el-button> -->
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 翻页器 -->
        <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="search.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="search.size"
                layout="total, sizes, prev, pager, next"
                :total="list.total"
            ></el-pagination>
        </div>
    </div>
</template>

<script lang='ts'>
import {ref, reactive, onMounted, getCurrentInstance} from 'vue';
export default {
    name:'Msg',
    setup() {
        const { proxy }: any = getCurrentInstance()
        let list: any = reactive({
            data: [],
            roidList: [],
            total: 0
        }),
        search = reactive({
            "email": "",
            "is_reply": "",
            "page": 1,
            "size": 10
        })
        onMounted(() => {
            query()
        })
        //查询
        const query = () => {
            proxy.$api('msgGetListAuth', {...search,...{userid:proxy.$store.state.user.userinfo.uid}}).then((res: any) => {
                list.data = res.data.data
                list.total = res.data.total
            })
        }
        //清空
        const clear = () => {
            search.email = ''
            search.is_reply = ''
        }
        //删除
        const handleDelete = (data:any) => {
            proxy.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('msgRemove', {id:data._id}).then((res: any) => {
                    query()
                })
            }).catch(() => {
            
            });
        }
        //回复
        const handleEdit = (index:number,item:any) => {
            proxy.$api('msgAddAuth',{
                feedback_id:item._id,
                is_reply:true,
                content:'',
                contact:'Admin',
                userid:proxy.$store.state.user.userinfo.uid
            }).then(res=>{

            })
        }
        //每页多少条
        const handleSizeChange = (size: number) => {
            search.size = size
            query()
        }
        //当前的页
        const handleCurrentChange = (index: number) => {
            search.page = index
            query()
        }
        return {
            list,
            search,
            query,
            clear,
            handleSizeChange,
            handleCurrentChange,
            handleDelete,
            handleEdit

        }
    },
    components:{
    }
}

</script>

<style lang='scss' scoped>
.search-head {
    display: flex;
    margin-top: 20px;
}
.search-table {
    min-height: 500px;
}
.pagination {
    margin: 20px;
    float: right;
}
</style>

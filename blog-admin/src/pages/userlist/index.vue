<!-- userlist -->
<template>
    <div>
        <div class="search-head">
            <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="search.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="search.role" placeholder="选择角色">
                        <el-option
                            :label="item.comment"
                            :value="item.role_id"
                            v-for="(item,i) in list.roidList"
                            :key="i"
                        ></el-option>
                    </el-select>
                </el-form-item>
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
                        <p>{{ scope.row.username }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="角色组" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.role }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="注册ip" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.register_ip }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="注册日期" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.register_date }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="最近登陆日期" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.last_login_date }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" header-align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-if="!scope.row.role.includes('1')"
                        >{{!scope.row.role.includes('2')?'设为管理':'取消管理'}}</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-if="!scope.row.role.includes('1')"
                        >{{scope.row.status===0?'禁用':'启用'}}</el-button>
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
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
export default {
    name: 'userlist',
    setup() {
        const { proxy }: any = getCurrentInstance()
        let list: any = reactive({
            data: [],
            roidList: [],
            total: 0
        }),
        search = reactive({
            "username": "",
            "role": "",
            "page": 1,
            "size": 10
        })
        onMounted(() => {
            proxy.$api('userRoleList', search).then((res: any) => {
                list.roidList = res.roleList
            })
            getList()
        })
        //获取列表
        const getList = () => {
            proxy.$api('userList', search).then((res: any) => {
                list.data = res.data.data
                list.total = res.data.total
            })
        }
        //查询
        const query = () => {
            getList()
        }
        //清空
        const clear = () => {
            search.username = ''
            search.role = ''
        }
        //编辑
        const handleEdit = (index:number,item:any) => {
            let role = '3',
            text = '确定将该用户管理员身份取消?'
            if(!item.role.includes('2')){
                role = '2'
                text = '确定将该用户设为管理员?'
            }
            proxy.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('userBindrole', {'roleList':role,"_id":item._id}).then((res: any) => {
                    query()
                })
            }).catch(() => {
            
            });
        }
        //删除
        const handleDelete = (index:number,item:any) => {
            let status = 0,
            text = '确定将该用户启用?'
            if(item.status == 0){
                text = '确定将该用户禁用?'
                status = 1
            }
            proxy.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('userStopEnabled', {'status':status,"_id":item._id}).then((res: any) => {
                    query()
                })
            }).catch(() => {
            
            });
        }
        //每页多少条
        const handleSizeChange = (size: number) => {
            search.size = size
            getList()
        }
        //当前的页
        const handleCurrentChange = (index: number) => {
            search.page = index
            getList()
        }
        return {
            query,
            clear,
            search,
            list,
            handleEdit,
            handleDelete,
            handleSizeChange,
            handleCurrentChange

        }
    },
    components: {
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

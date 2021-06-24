<!-- userlist -->
<template>
    <div>
        <div class="search-head">
            <el-button type="primary" @click="Addrole" size="small">新增</el-button>
        </div>
        <div class="search-table">
            <el-table :data="list.roleList" border style="width: 100%">
                <el-table-column label="角色类型" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.comment }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="角色名称" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.role_name }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="角色id" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.role_id }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.create_date }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" header-align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 弹窗 -->
            <el-dialog
                title="新增"
                v-model="isAddEditRole"
                width="500px"
                center>
                <div>
                    <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
                        <el-form-item  label="角色类别:">
                            <el-input v-model="search.comment" placeholder="请输入角色类别,如：管理员"></el-input>
                        </el-form-item>
                        <el-form-item  label="角色名称:">
                            <el-input v-model="search.role_name" placeholder="请输入角色名称,如：admin"></el-input>
                        </el-form-item>
                        <el-form-item  label="角色的ID:">
                            <el-input v-model="search.role_id" placeholder="请输入角色id,如：2"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="isAddEditRole = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
export default {
    name: 'Role',
    setup() {
        const { proxy }: any = getCurrentInstance()
        let list: any = reactive({
            roleList: []
        }),
        search = reactive({
            "role_id": "",
            "role_name": "",
            "comment": "",
            "permission":[]
        }),
        isAddEditRole = ref(false)//显示新增角色
        onMounted(() => {
            getList()
        })
        //获取列表
        const getList = () => {
            proxy.$api('userRoleList').then((res: any) => {
                list.roleList = res.roleList
            })
            isAddEditRole.value = false;
        }
        //新增
        const Addrole = () => {
            isAddEditRole.value = true
            search.role_id = ''
            search.role_name = ''
            search.comment = ''
        }        
        //编辑
        const handleEdit = (index:number,item:any) => {
            isAddEditRole.value = true
            search.role_id = item.role_id
            search.role_name = item.role_name
            search.comment = item.comment
        }
        //提交
        const onSubmit = () => {
            if(!search.role_id||!search.role_name||!search.comment){
                proxy.$message.error('参数不能为空')
                return;
            }
            proxy.$api('userAddrole',search).then((res: any) => {
                proxy.$message.success('添加成功')
                getList()
            })
        }
        //删除
        const handleDelete = (index:number,item:any) => {
            proxy.$confirm('确定删除该角色？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('userDelRole',{role_id:item.role_id}).then((res: any) => {
                    proxy.$message.success('删除成功')
                    getList()
                })
            }).catch(() => {
            
            });
        }
        return {
            isAddEditRole,//是否弹窗
            Addrole,//添加事件
            onSubmit,//提交
            search,//表单
            list,//列表
            handleEdit,//编辑
            handleDelete,//删除
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
    margin-bottom: 20px;
}
.search-table {
    min-height: 500px;
}
.pagination {
    margin: 20px;
    float: right;
}
.el-input{
    min-width: 240px;
}
</style>

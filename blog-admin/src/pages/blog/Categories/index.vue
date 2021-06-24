<!-- userlist -->
<template>
    <div>
        <div class="search-head">
            <el-button type="primary" @click="AddCategories" size="small">新增分类</el-button>
        </div>
        <div class="search-table">
            <el-table :data="list.data" border style="width: 100%">
                <el-table-column label="类型名称" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.name }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="类型图标" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.icon }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="类型介绍" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.description }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="类型排序" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.sort }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="文章数量" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.article_count }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="180" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.createTime }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" header-align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
            <!-- 弹窗 -->
            <el-dialog
                title="新增"
                v-model="isAddEditRole"
                width="500px"
                center>
                <div>
                    <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
                        <el-form-item  label="类别名称:">
                            <el-input v-model="form.name" placeholder="请输入类别名称"></el-input>
                        </el-form-item>
                        <el-form-item  label="类别介绍:">
                            <el-input v-model="form.description" placeholder="请输入类别介绍"></el-input>
                        </el-form-item>
                        <el-form-item  label="类别排序:">
                            <el-input v-model.number="form.sort" placeholder="请输入顺序,数字越大越往前"></el-input>
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
    name: 'Categories',
    setup() {
        const { proxy }: any = getCurrentInstance()
        let list: any = reactive({
            data: [],
            total:0
        }),
        search = reactive({
            page:1,
            size:10
        }),
        form = reactive({
            "name": "",
            "description": "",
            "sort": ""
        }),
        isAddEditRole = ref(false),//显示新增角色
        add:boolean = false,
        editid:string = ''
        onMounted(() => {
            getList()
        })
        //获取列表
        const getList = () => {
            proxy.$api('blogCategoriesGetlist',{...search,...{userid:proxy.$store.state.user.userinfo.uid}}).then((res: any) => {
                list.data = res.data.data
                list.total = res.data.total
            })
            isAddEditRole.value = false;
        }
        const clear = () =>{
            form.name = ''
            form.description = ''
            form.sort = ''
        }
        //新增
        const AddCategories = () => {
            isAddEditRole.value = true
            add = true
            clear()
        }        
        //编辑
        const handleEdit = (index:number,item:any) => {
            isAddEditRole.value = true
            add = false
            editid = item._id
            form.name = item.name
            form.description = item.description
            form.sort = item.sort
        }
        //提交
        const onSubmit = () => {
            if(!form.name||!form.description||!form.sort){
                proxy.$message.error('参数不能为空')
                return;
            }
            if(add){
                proxy.$api('blogCategoriesAdd',form).then((res: any) => {
                    proxy.$message.success('添加成功')
                    getList()
                })
                return;
            }
            proxy.$api('blogCategoriesUpdate',{...form,...{id:editid}}).then((res: any) => {
                proxy.$message.success('修改成功')
                getList()
            })
        }
        //删除
        const handleDelete = (index:number,item:any) => {
            if(item.article_count!==0){
                proxy.$message.error('该分类文章不为0，不可删除')
                return;
            }
            proxy.$confirm('确定删除该分类？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('blogCategoriesRemove',{id:item._id}).then((res: any) => {
                    proxy.$message.success('删除成功')
                    getList()
                })
            }).catch(() => {
            
            });
        }
        //每页多少条
        const handleSizeChange = (size: number) => {
            if(size){
                search.size = size
                getList()
            }
        }
        //当前的页
        const handleCurrentChange = (index: number) => {
            if(index){
                search.page = index
                getList()
            }
        }
        return {
            isAddEditRole,//是否弹窗
            AddCategories,//添加事件
            onSubmit,//提交
            search,//分页
            form,//表单
            list,//列表
            handleEdit,//编辑
            handleDelete,//删除
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

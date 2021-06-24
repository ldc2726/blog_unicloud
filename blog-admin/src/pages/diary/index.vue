<!-- diary -->
<template>
    <div>
        <div class="search-head">
            <el-button type="primary" @click="Add">新增</el-button>
        </div>

        <div class="search-table">
            <el-table :data="list.data" border style="width: 100%">
                <el-table-column label="创建日期" width="280" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.createTime }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="内容" width="780" align="center" header-align="center">
                    <template #default="scope">
                        <p>{{ scope.row.content }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align="center" header-align="center">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
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
        <!-- 弹窗 -->
        <el-dialog
                title="新增"
                v-model="isAddEditRole"
                width="500px"
                center>
                <div>
                    <el-form :inline="true" :model="form" class="demo-form-inline" size="medium">
                        <el-form-item  label="内容编辑:">
                            <el-input type="textarea" v-model="form.content" rows=12 placeholder="请添加你今日的日记吧，会更新到博客哦。。"></el-input>
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
</template>

<script lang='ts'>
import {ref, reactive, onMounted, getCurrentInstance} from 'vue';
export default {
    name:'diary',
    setup() {
        const { proxy }: any = getCurrentInstance()
        let list = reactive({
            data:[],
            total:0,
        }),
        search = reactive({
            page:1,
            size:10
        }),
        form = reactive({
            content:''
        }),
        isAddEditRole = ref(false),
        type = 'add',
        id = ''
        onMounted(() => {
            getList()
        })
        const getList = () => {
            proxy.$api('diaryGetListAuth', {...search,...{userid:proxy.$store.state.user.userinfo.uid}}).then((res: any) => {
                list.data = res.data.data
                list.total = res.data.total
                isAddEditRole.value = false;
            })
        }
        //新增日记
        const Add = () => {
            isAddEditRole.value = true;
            form.content = ''
            type = 'add'
        }
        //编辑
        const handleEdit = (data:any) => {
            isAddEditRole.value = true;
            form.content = data.content
            type = 'update'
            id = data._id
            // onSubmit(data._id)
        }
        //删除
        const handleDelete = (data:any) => {
            proxy.$confirm('确定删除该条日记？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('diaryRemove',{id:data._id}).then((res: any) => {
                    proxy.$message.success('删除成功')
                    getList()
                })
            }).catch(() => {
            
            });
        }
        const onSubmit = () => {
            if(type == 'update'){
                proxy.$api('diaryUpdate', {...form,...{id:id}}).then((res: any) => {
                    proxy.$message.success('更新成功')
                    getList()
                })
                return;
            }
            proxy.$api('diaryAdd', form).then((res: any) => {
                proxy.$message.success('添加成功')
                getList()
            })
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
            Add,//新增
            list,//列表数据
            search,//请求数据
            isAddEditRole,//是否显示探出窗
            form,//提交内容
            handleEdit,//编辑
            handleDelete,//删除
            handleSizeChange,
            handleCurrentChange,
            onSubmit,//提交
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
.el-textarea{
    min-width: 444px;
    min-height: 300px;
}
</style>

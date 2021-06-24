<!-- bloglist -->
<template>
    <div>
        <div v-if="!isAddEdit">
            <div class="search-head">
                <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
                    <el-form-item  label="博文名称:">
                        <el-input v-model="search.title" placeholder="请输入类别名称"></el-input>
                    </el-form-item>
                    <el-form-item  label="状态:">
                        <el-select v-model.number="search.article_status" placeholder="选择状态">
                            <el-option label="全部" :value="-1"></el-option>
                            <el-option label="草稿箱" :value="0"></el-option>
                            <el-option label="已发布" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="类别:">
                        <el-select v-model="search.category_id" placeholder="选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label="item.name" :value="item._id" v-for="(item,i) in categoryArr" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item  label="发布时间:">
                        <el-date-picker
                            v-model="search.time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" size="small" @click="getList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="clear">清空</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="Add">新增博文</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="search-table">
                <el-table :data="list.data" border style="width: 100%">
                    <el-table-column label="名称" width="180" align="center" header-align="center">
                        <template #default="scope">
                            <p>{{ scope.row.title }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="文章状态" width="180" align="center" header-align="center">
                        <template #default="scope">
                            <p>{{ scope.row.article_status==1?'已发布':'草稿箱' }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否置顶" width="180" align="center" header-align="center">
                        <template #default="scope">
                            <p>{{ scope.row.is_sticky == 1?'是':'否' }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="评论开放" width="180" align="center" header-align="center">
                        <template #default="scope">
                            <p>{{ scope.row.comment_status==1?'是':'否' }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="发表时间" width="180" align="center" header-align="center">
                        <template #default="scope">
                            <p>{{ scope.row.publish_date }}</p>
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
            </div>
        </div>
        <Detail v-if="isAddEdit" @Close="Close" :editData="editData"></Detail>
    </div>
</template>

<script lang='ts'>
import { ref, reactive, onMounted, getCurrentInstance,defineAsyncComponent } from 'vue';
const Detail: Object = defineAsyncComponent(() => import('./detail.vue'))
export default {
    name: 'bloglist',
    components:{
        Detail
    },
    setup() {
        const { proxy }: any = getCurrentInstance()
        interface Search{
            [propName: string]: any
        }
        let list: any = reactive({
            data: [],
            total:0
        }),
        search:Search = reactive({
            title:'',
            article_status:-1,
            category_id:'',
            // time: [new Date(), new Date()],
            page:1,
            size:10
        }),
        form = reactive({
            "name": "",
            "description": "",
            "sort": ""
        }),
        categoryArr:any = ref([]),//类别下啦
        isAddEdit = ref(false),//显示新增角色
        add:boolean = false
        let editData = ref("")
        onMounted(() => {
            getList()
        })
        //获取列表
        const getList = () => {
            proxy.$api('blogCategoriesGetlist',{...search,...{userid:proxy.$store.state.user.userinfo.uid}}).then((res: any) => {
                categoryArr.value = res.data.data
            })
            proxy.$api('blogArticlesList',{...search,...{userid:proxy.$store.state.user.userinfo.uid}}).then((res: any) => {
                list.data = res.data.data
                list.total = res.data.total
            })
            isAddEdit.value = false;
        }
        const clear = () =>{
            for(let i in search){
                if(i!='page'&& i!='size'){
                    search[i] = ''
                }
            }
        }
        //关闭
        const Close = () => {
            isAddEdit.value = false
            getList();
        }
        //新增
        const Add = () => {
            editData.value = ""
            isAddEdit.value = true
        }        
        //编辑
        const handleEdit = (index:number,item:any) => {
            editData.value = item._id
            isAddEdit.value = true
        }
        //删除
        const handleDelete = (index:number,item:any) => {
            proxy.$confirm('确定删除该文章？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                proxy.$api('blogArticlesRemove',{id:item._id}).then((res: any) => {
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
            isAddEdit,//是否新增
            Add,//添加
            search,//分页
            form,//表单
            list,//列表
            editData,//编辑值
            categoryArr,//类别下拉
            getList,
            clear,
            handleEdit,//编辑
            handleDelete,//删除
            Close,//发布成功
            handleSizeChange,
            handleCurrentChange
        }
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
.el-input{
    min-width: 240px;
}
</style>

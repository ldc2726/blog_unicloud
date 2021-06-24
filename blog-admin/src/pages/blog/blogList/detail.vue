<!-- detail -->
<template>
    <div>
        
        <div class="head">
            <div class="head-goback">
                <el-page-header @click="goback"></el-page-header>
            </div>
            <el-input
                placeholder="请输入标题"
                v-model="search.title"
            >
                <template #append>
                    <el-button type="primary" @click="getCode">发布文章</el-button>
                </template>
            </el-input>
        </div>
        <iframe id="iframeEd" src="/demo.html" width="100%" height="800" frameborder="no" border="0"  scrolling="no"></iframe>
        <el-dialog
            title="发布"
            v-model="isAddEditRole"
            width="800px"
            center>
            <div>
                <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
                    <el-form-item  label="上传封面:">
                        <!-- <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <el-input v-model="search.avatar" disabled width="200px"></el-input>
                    </el-form-item>
                    <el-form-item  label="博文概要:">
                        <el-input type="textarea" v-model="search.excerpt" placeholder="请输入概要"  maxlength="300" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item  label="博文类别:">
                        <el-checkbox-group v-model="search.category_id">
                            <el-checkbox :label="item._id" :value="item._id" v-for="(item,i) in categoryArr" :key="i">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item  label="标签:">
                        <el-tag
                            :key="tag"
                            v-for="tag in search.tag"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-form-item>
                    <el-form-item  label="是否置顶:">
                        <el-switch
                            v-model="search.is_sticky"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item  label="评论开放:">
                        <el-switch
                            v-model="search.comment_status"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="onSubmit(false)">保存草稿</el-button>
                <el-button type="primary" @click="onSubmit">直接发布</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import {ref, reactive, onMounted, getCurrentInstance} from 'vue';
export default {
    name:'blogDetail',
    props: {
        editData: {
            type: String,
            default: ''
        }
    },
    setup(props: any, context: any) {
        const { proxy }: any = getCurrentInstance()
        interface Search{
            [propName: string]: any
        }
        let search:Search = reactive({
            title:"",
            content:"",
            category_id:[],//分类
            excerpt:"",
            article_status:1,//0草稿，1发布
            tag:["web"],//标签
            is_sticky:0,//是否置顶
            comment_status:1,//评论开发
            avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4ad780fd-7314-43e9-a81f-5daac4f25b07/a1dae4ec-4ca7-47ce-85c4-176475ab0616.jpeg",//封面
        }),
        categoryArr:any = ref([]),
        isAddEditRole = ref(false),
        inputValue = ref(''),
        inputVisible = ref(false)
        onMounted(() => {
            if(props.editData){
                proxy.$api('blogArticlesDetail',{_id:props.editData}).then((res: any) => {
                    const data = res.data.data[0]
                    for(let i in search){
                        search[i] = data[i]
                    }
                    const dom:any = document.getElementById('iframeEd');
                    setTimeout(()=>{
                        dom.contentWindow.postMessage(data['content'], '*')
                    },1000)
                })
            }
            window.addEventListener('message', function(result){
                var data = JSON.parse(result.data);
                search.content = data.content
                isAddEditRole.value = true
            })
        })
        // 返回
        const goback = ()=> {
            context.emit('Close','success')
        }
        // 发出通信获取代码
        const getCode = ()=> {
            proxy.$api('blogCategoriesGetlist',{...{size:50},...{userid:proxy.$store.state.user.userinfo.uid}}).then((res: any) => {
                categoryArr.value = res.data.data
            })
            const dom:any = document.getElementById('iframeEd');
            dom.contentWindow.postMessage('getcode', '*')
        }
        //tag关闭
        const handleClose = (tag:string) =>{
            search.tag.splice(search.tag.indexOf(tag), 1);
        }
        //
        const handleInputConfirm = ()=> {
            if (inputValue.value) {
                search.tag.push(inputValue.value);
            }
            inputVisible.value = false;
            inputValue.value = '';
        }
        //添加tag
        const showInput = () => {
            if(search.tag.length>=5){
                return;
            }
            inputVisible.value = true;
            setTimeout(()=>{
                proxy.$refs.saveTagInput.focus();
            })
        }
        // 发布文章
        const onSubmit = (a:any) =>{
            if(!a){
                search.article_status=0
            }
            if(props.editData){
                proxy.$api('blogArticlesUpdate',{...search,...{_id:props.editData}}).then((res: any) => {
                    proxy.$message.success("修改成功，系统审核中")
                    goback()
                })
                return;
            }
            proxy.$api('blogArticlesAdd',search).then((res: any) => {
                proxy.$message.success("操作成功")
                goback()
            })
            
        }
        return {
            search,
            isAddEditRole,
            categoryArr,
            inputVisible,
            inputValue,
            getCode,
            handleClose,
            goback,
            handleInputConfirm,
            showInput,
            onSubmit
        }
    },
    components:{
    }
}

</script>

<style lang='scss' scoped>
.head{
    margin: 20px 0;
    .head-goback{
        margin: 0px 0px 20px;
    }
}
.el-form--inline .el-form-item{
    display: block;
    .el-input--small{
        width: 600px;
    }
    .input-new-tag{
        width:90px;
    }
    .el-button--small{
        float: right;
    }
    .el-checkbox__label{
        float: right;
        margin-top: 6px;
    }
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

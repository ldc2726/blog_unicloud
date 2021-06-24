const data = {
    userid:config.userid
}
//获取留言列表

function getMsgList(){
    $post('msgLog/msg/getListAuth',data).then(res=>{
        $('#message-list').empty()
        res.data.map(item=>{
            $('#message-list').append(`
                <li class="zoomIn article"> 
                    <div class="comment-parent">
                        <a name="remark-1"></a>
                        <img src="static/picture/t2.png"/>
                        <div class="info">
                            <span class="username">${item.contact}</span>
                        </div>
                        <div class="comment-content">
                            ${item.content}
                        </div>
                        <p class="info info-footer">
                            <span class="comment-time">${item.create_date}</span>
                        </p>
                    </div>
                </li>
            `)
        })
    })
};getMsgList()

//提交留言
$('.layui-btn').on('click',function(){
    var contact = $('.layui-input-name').val()
    var email = $('.layui-input-email').val()
    var content = $('#remarkEditor').val()
    if(contact&&email&&content){
        layer.load(1);
        $post('msgLog/msg/addAuth',{
            content:content,
            contact:contact,
            email:email,
            userid:config.userid
        }).then(res=>{
            layer.close(1)
            layer.msg('留言成功');
            setTimeout(()=>{
                location.reload()
            },500)
        })
    }
})
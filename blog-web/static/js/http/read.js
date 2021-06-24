var readId;
$('.fc-link')[0].innerHTML = config.name
$('.path').append(`
    <a href="${config.path}" class="path">${config.path}</a>
`)
if(location.search){
    readId = location.search.split('=')[1]
    const data = {
        userid:config.userid,
        _id:readId
    }
    $post('msgLog/articles/getListDetailAuth',data).then(res=>{
        const resdata = res.data;
        if(resdata){
            $('.title h4')[0].innerHTML = resdata[0].title
            $('.r-title')[0].innerHTML = resdata[0].title
            $('.readcount')[0].innerHTML = resdata[0].view_count
            $('.read-tiem')[0].innerHTML = resdata[0].last_modify_date
            $('.day')[0].innerHTML = resdata[0].publish_date.split('-')[2].split(' ')[0]
            $('.month span').innerHTML = resdata[0].publish_date.split('-')[1]
            $('.year')[0].innerHTML = resdata[0].publish_date.split('-')[0]
            $('#read-cotent').append(resdata[0].content)
        }
    })
    $post('msgLog/articles/updateViewCountAuth',data).then(res=>{
        
    })
    
    $post('msgLog/msg/getListAuth',{
        userid:config.userid,
        blog_id:location.search.split('=')[1]
    }).then(res=>{
        $('#blog-comment').empty()
        res.data.map(item=>{
            $('#blog-comment').append(`
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
   
}



$('.submitMsg').on('click',function(){
    var contact = $('.layui-input-name').val()
    var email = $('.layui-input-email').val()
    var content = $('#remarkEditor').val()
    if(contact&&email&&content){
        layer.load(1);
        $post('msgLog/msg/addAuth',{
            content:content,
            contact:contact,
            email:email,
            blog_id:location.search.split('=')[1],
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
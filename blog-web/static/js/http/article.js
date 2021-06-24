const data = {
    userid:config.userid,
    page:1,
    size:50
}

if(location.search){
    let search = location.search.split('?blogCategories=')[1]
    data.category_id = search.split('&index=')[0]
    $('.slider').css({ 'top': ((parseInt(search.split('&index=')[1]) - 1) * 40) + 'px' });
}
$('.search-icon').on('click',function(){
    data.title = $('#searchtxt').val()
    getList(true)
})
//获取分类
$post('msgLog/blogCategories/getListAuth',data).then(res=>{
    res.data.map((item,i) => {
        $('.article-category').append(`
            <a href="/article.html?blogCategories=${item._id}">${item.name}</a>
        `)
        $('.category').append(`
            <li data-index="${i+2}"><a href="/article.html?blogCategories=${item._id}&index=${i+2}">${item.name}</a></li>
        `)
    })
})

//获取博客列表
function getList(search=false){
    $post('msgLog/articles/getListAuth',data).then(res=>{
        if(search){
            $('#LAY_bloglist').empty()
        }
        res.data.map((item,i)=>{
            $('#LAY_bloglist').append(`
            <section class="article-item zoomIn article">
                <div class="${item.is_sticky?'fc-flag':''}">${item.is_sticky?'置顶':''}</div>
                <h5 class="title">
                    <span class="fc-blue">【原创】</span>
                    <a href="read.html?id=${item._id}">${item.title}</a>
                </h5>
                <div class="time">
                    <span class="day">${new Date(item.publish_date.replace(/-/g, "/")).getDate()}</span>
                    <span class="month fs-18">${new Date(item.publish_date.replace(/-/g, "/")).getMonth()+1}<span class="fs-14">月</span></span>
                    <span class="year fs-18 ml10">${new Date(item.publish_date.replace(/-/g, "/")).getFullYear()}</span>
                </div>
                <div class="content">
                    <a href="read.html?id=${item._id}" class="cover img-light">
                        <img src="${item.avatar}">
                    </a>
                    ${item.excerpt}
                </div>
                <div class="read-more">
                    <a href="read.html?id=${item._id}" class="fc-black f-fwb">继续阅读</a>
                </div>
                <aside class="f-oh footer">
                    <div class="f-fl tags tags-${i}">
                        <span class="fa fa-tags fs-16"></span>
                    </div>
                    <div class="f-fr">
                        <span class="read">
                            <i class="fa fa-eye fs-16"></i>
                            <i class="num">${item.view_count}</i>
                        </span>
                        <span class="ml20">
                            <i class="fa fa-comments fs-16"></i>
                            <a href="javascript:void(0)" class="num fc-grey">${item.comment_count || 0}</a>
                        </span>
                    </div>
                </aside>
            </section>
            `)
            item.tag.map((item)=>{
                $('.tags-'+i).append(`
                    <a class="tag">${item}</a>
                `)
            })
    
        })
    })
};getList()


 //热门文章
 $post('msgLog/articles/getListAuth',{
    userid:config.userid,
    page:1,
    size:8,
    is_view_count:true
}).then(res=>{
    res.data.map(item=>{
        $('.hot-list-article-1').append(`
            <li> <a href="read.html?id=${item._id}">${item.title}</a></li>
        `)
    })
})

//置顶推荐

$post('msgLog/articles/getListAuth',{
    userid:config.userid,
    page:1,
    size:3,
    is_sticky:1
}).then(res=>{
    res.data.map(item=>{
        $('.hot-list-article-2').append(`
            <li> <a href="read.html?id=${item._id}">${item.title}</a></li>
        `)
    })
})
/**
 * post 请求
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
 function $post(url,data){
    let host = config.url
    if(url.indexOf('msgLog/')!=-1){
        host = config.url
    }
    return new Promise((resolve,reject)=>{
        console.log(data)
        $.ajax({
            type: "POST",
            url: host+url,
            data: JSON.stringify(data),
            dataType: "json",
            contentType:"application/json;charset=utf-8",
            success: function(res){
                resolve(res)
            },
            error: function(err){
                reject(err)
            }
        });
    })
}

//统一更改底部配置
$('.copyright').replaceWith(`
<div class="copyright">
    <div class="info">
        <div class="contact">
            <a href="${config.github}" class="github" target="_blank"><i class="fa fa-github"></i></a>
            <a href="https://wpa.qq.com/msgrd?v=3&uin=${config.QQ}&site=qq&menu=yes" class="qq" target="_blank" title="${config.QQ}"><i class="fa fa-qq"></i></a>
            <a href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=${config.email}" class="email" target="_blank" title="${config.email}"><i class="fa fa-envelope"></i></a>
            <a href="javascript:void(0)" class="weixin"><i class="fa fa-weixin"></i></a>
        </div>
        <p class="mt05">
            ${config.banquan}
        </p>
    </div>
</div>
`)



const data = {
    userid:config.userid,
    page:1,
    size:50
}
$post('msgLog/diary/getListAuth',data).then(res=>{
    const year = [],//新的以年为单位的数据
    arr = []//年份数组
    res.data.map(item=>{
        let years = new Date(item.createTime.replace(/-/g, "/")).getFullYear(),
        time = item.createTime.split(" ")[0]
        item.time = time;
        if(!arr.includes(years)){
            arr.push(years)
            year.push({
                year:years,
                child:[item]
            })
        }else{
            const index = arr.indexOf(years);
            year[index]['child'].push(item)
        }
    })
    console.log(year)
    year.map((item,i)=>{
        $('.timeline-year').append(`
            <h2><a class="yearToggle">${item.year} 年</a><i class="fa fa-caret-down fa-fw"></i></h2>
            <div class="timeline-month ">
                <ul class="mounth-${i}">

                </ul>
            </div>
        `)
        item.child.map(item2=>{
            `
                ${
                    $('.mounth-'+i).append(
                        `
                        <li>
                            <div class="h4 animated fadeInLeft">
                                <p class="date">${item2.time.split('-')[1]}月${item2.time.split('-')[2]}日</p>
                            </div>
                            <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                            <div class="content animated fadeInRight"><p>${item2.content}。&nbsp; &nbsp;--${item2.createTime}</p></div>
                            <div class="clear"></div>
                        </li>
                        `
                    )
                }
            `
        })
    
    })
})

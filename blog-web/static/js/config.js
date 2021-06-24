// var oldArr = ['123','234','ads','12321','453'];
// var newArr = ['234','ads','oopp']

// function formatArr(oldArr,newArr){
//     const obj = {
//         add:[],
//         delete:[]
//     }
//     newArr.map(item=>{
//         if(!oldArr.includes(item)){
//             obj.add.push(item)
//         }
//     })
//     oldArr.map(item=>{
//         if(!newArr.includes(item)){
//             obj.delete.push(item)
//         }
//     })
//     return obj;
// }

// formatArr(oldArr,newArr)

var config = {
    name:"LDC",
    headlogo:"Mr.li",
    path:"http://blog.decong.icu",
    title:"LDC的技术博客",
    address:"上海市徐汇区",
    QQ:"940093547",
    email:"ldc27261@gmail.com",
    github:"https://github.com/ldc2726",
    userid:"6064565b8781a50001f64e24",
    banquan:`Copyright © 2021-2022 LDC个人博客 All Rights Reserved V.1.0 <a href="https://www.beian.miit.gov.cn" target="blank" class="tiao">沪ICP备2021008871</a>`,
    url:"https://4ad780fd-7314-43e9-a81f-5daac4f25b07.bspapp.com/http/"
}
document.title = config.title +'-'+ document.title;
setTimeout(()=>{
    if(layui){
        var $ = layui.jquery
    }
    $('.uesername').empty().append(`<span>${config.name}</span>`)
    $('.head-logo').empty().append(`<span>${config.headlogo}</span>`)
    $('.address').empty().append(`<span>${config.address}</span>`)
    $('.QQ').empty().append(`<span>${config.QQ}</span>`)
},50)





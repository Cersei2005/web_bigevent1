//获取用户基本信息
//注意写headers请求头：值是从localStorage里面取出来的，没有键给''空字符串
$(function () {
    //一、调用getUserInfo获取用户基本信息
    getUserInfo()

    //二、实现退出功能
    let layer = layui.layer
    $('#btnLogin').on('click', function () {
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //1.清空本地存储的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
             location.href ='/login.html'
            //关闭询问框confirm
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //!!headers就是配置的请求头
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success(res) {
            //如果请求失败 用layui.layer.msg弹出信息
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            } else {
                //如果请求成功 则调用渲染头像的函数renderAvatar
                renderAvatar(res.data)
            }
        }
       
    })
}

function renderAvatar({
    nickname,
    username,
    user_pic
}) {
    //1.获取数据里面的用户名
    let name = nickname || username
    //2.设置welcome文本 
    $('#welcome').html(`欢迎  ${name}`)
    //3.按需渲染用户头像 如果有user_pic就渲染图片头像show()，并隐藏文本头像
    if (user_pic !== null) {
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
    //如果没有就隐藏用户头像，并渲染文本头像
}
  
    /* function renderAvatar(user) {
        //1.获取数据里面的用户名
        let name = user.nickname || user.username //(nickname优先级最高，如果没有就用username)
        //2.设置welcome文本 
        $('#welcome').html(`欢迎 ${name}`)
        //3.按需渲染用户头像 如果有user_pic就渲染图片头像show()，并隐藏文本头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else { //如果没有就隐藏用户头像，并渲染文本头像
            $('.layui-nav-img').hide()
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        } */
$(function () {
    let form = layui.form
    let layer = layui.layer
    //验证表单昵称
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })

    //初始化用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //调用form.val()快速为表单赋值 注意要给指定的form添加lay-filter属性
                form.val('formUserInfo', res.data);
            }
        })
    }

    //重置表单的数据
        //先阻止表单的默认重置行为
        //调用初始化用户信息的函数
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    //监听表单的提交事件
    //调用父页面中的方法重新渲染用户头像和信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }else{
                    layer.msg('更新用户信息成功！')
                    window.parent. getUserInfo()
                }
            }
        })
    })
    
})
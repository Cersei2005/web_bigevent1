//校验密码的自定义
$(function(){
    let form = layui.form
    let layer = layui.layer
    //注意书写格式，没有=！！
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
        },
        rePwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
        }

    })
    //实现修改密码功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success(res){
                if(res.status !==0){
                    return layer.msg('重置密码失败！')
                }else{
                    layer.msg('重置密码成功！')
                    $('.layui-form')[0].reset()
                }
            }
        })
    })
})
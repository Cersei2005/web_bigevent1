$(function () {
    $('#link_reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })
    $('#link_login').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })

    // 从layui中获取form对象
    let form = layui.form
    // 从layui中获取layer对象
    let layer = layui.layer

    //通过form.verify函数自定义校验规则
    form.verify({
        //自定义pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致的规则
        repwd: function (value) {
            let pwd = $('#psd').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //14.登录注册-调用接口发起注册用户的请求
    //监听注册表单的提交事件 给form整个id哦
    $('#form_reg').on('submit', function (e) {
        //阻止默认行为
        //发起post请求http://www.liulongbin.top:3007/api/reguser
        //传递2个参数username password 从Input的val()值拿过来 获取元素的方式$('#form_reg [name=username])
        e.preventDefault()
        //优化
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            // url: 'http://www.liulongbin.top:3007/api/reguser',
            //17.在ajaxfilter中统一拼接请求的根路径
            url:'/api/reguser',
            data,
            success(res) {
                if (res.status !== 0) {
                    //return console.log(res.message);
                    //15.登录注册-使用layer提示消息
                    return layer.msg(res.message)
                }
                //console.log('注册成功！');
                layer.msg('注册成功,请登录哦')
                //模拟人的点击行为
                $('#link_login').click()

            }
        })
    })
    //15.登录注册-使用接口发起登录请求
    //监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        //发起post请求  /api/login
        $.ajax({
            method:'POST',
            // url:'http://www.liulongbin.top:3007/api/login',
            url:'/api/login',
            //使用快速获取表单中的数据的方法去传数据
            data: $(this).serialize(),
            success(res){
                if(res.status!==0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //!!由于之后请求接口有身份认证要求，所以需要将登录成功得到的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                 //!!跳转到后台主页用location.herf='/index.html'
                location.href='/index.html'
            }
        })
    })

    //18.登录注册-提交login分支的代码到GitHub
    
 
    

    














})
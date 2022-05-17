  //17.在ajaxfilter中统一拼接请求的根路径
  //在js文件夹中新建一个baseAPI.js文件，注意这个js文件只能放在jquery之后自己的js之前，调用$.ajaxPrefilter(function(options){})
  //注意每次调用$.get()或$.post()或$.ajax()会先调用这个函数，可以拿到给ajax提供的配置对象
  //在发起真正的Ajax之前，统一拼接请求的根路径
  $.ajaxPrefilter(function (options) {
    //console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限的接口设置headers请求头
    if (options.url.includes('/my')) {
      options.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    }

    //全局统一怪载complete回调函数
    options.complete = function(res){       
        //在complete回调函数中，可以使用res.responseJSON拿到服务器相应回来的数据
        //如果出现responseJSON: {status: 1, message: '身份认证失败！'}
        //那么就1.强制清空token 2.强制跳转到登录页面
        if(res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    
    }

  })
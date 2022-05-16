  //17.在ajaxfilter中统一拼接请求的根路径
   //在js文件夹中新建一个baseAPI.js文件，注意这个js文件只能放在jquery之后自己的js之前，调用$.ajaxPrefilter(function(options){})
   //注意每次调用$.get()或$.post()或$.ajax()会先调用这个函数，可以拿到给ajax提供的配置对象
   //在发起真正的Ajax之前，统一拼接请求的根路径
   $.ajaxPrefilter(function(options){
       //console.log(options.url);
       options.url='http://www.liulongbin.top:3007'+options.url
   })
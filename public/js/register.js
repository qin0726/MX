$("#bt-register").click(function(){
    //2.1:验证用户名  14:20---14:30
    var unamereg = /^[a-z0-9]{6,12}$/i;
    if(!unamereg.test($("#uname").val())){
        $('.uname-msg').html("用户名格式不正确").css('color','#c30d23')
        return;
    }
    //2.2:验证密码
    var upwdreg = /^[a-z0-9]{6,12}$/i;
    if(!upwdreg.test($("#upwd").val())){
        $('.upwd-msg').html("密码格式不正确").css('color','#c30d23')
        return;
    }
    //2.3:验证确认密码
    if($("#upwd").val()!= $("#upwd1").val()){
        $('.upwd-msg1').html("确认密码与密码不相同").css('color','#c30d23')
        return;
    }

    //如果用户名己存在禁止提交
    if($("span.error").length>0){
        return;
    }


    //2.5:通过验证，发送ajax请示
    //2.6:并且接收服务器返回数据
    var u = $("#uname").val();
    var p = $("#upwd").val();

    $.ajax({
        url:"http://127.0.0.1:3000/addUser",
        type:"post",
        data:{uname:u,upwd:p},
        success:function(data){
            if(data.code==1){
                alert(data.msg);
                location.href = "index.html";
            }else{
                alert(data.msg)
            }
        },
        error:function(){
            alert("网络出现故障请稍候");
        }

    });
});


//功能点二:判断注册的用户名是否存在
uname.onblur = function(){
    //1:获取用户输入用户名
    var u = this.value;
    //2:发送ajax请求 /existsuname
    $.ajax({
        url:"http://127.0.0.1:3000/finUser",
        data:{uname:u},
        success:function(data){
            //3:获取返回结果
            
            if(data.code==-1){
                $('.uname-msg').html(data.msg)
                $('.uname-msg').removeClass("error");
            }else{
                $('.uname-msg').html(data.msg).css('color','#c30d23');;
                $('.uname-msg').addClass("error")
            }
        }
    });
}


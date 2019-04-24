$(
//轮播图
function (){
    $.ajax({
        url:"http://127.0.0.1:3000/banner",
        type:"get",
        dataType:"json",
        success:function(imgs){
    var $ulImgs=$("#imgs"),
        LIWIDTH=100,
        $ulIdxs=$("#indexs"),
        moved=0;
        interval=500,
        WAIT=3000+interval,
        timer=null;
    var str="",strIdxs="",i=1;
    for(var src of imgs){
        str+=`<li><img src="${src}"></li>`
        strIdxs+=`<li>${i++}</li>`
    }
    // 添加图片
    str+=`<li><img src="${imgs[0]}"></li>`
    $ulImgs.append(str).css("width",(imgs.length+1)*100+'%');
    $ulImgs.children().css("width",100/(imgs.length+1)+'%');
    $ulImgs.children().children().css("width",100+'%').css("height",600);
    // 添加圆标
    $ulIdxs.append(strIdxs).children().first().addClass("hover");
    // 启动周期定时器
    function play(){
        timer=setInterval(function(){
            moved++;
            // 图片移动效果
            $ulImgs.animate({
                left:-moved*LIWIDTH+'%'
            },interval,()=>{    // 每次移动后判断位置
                if(moved==5){   // 如果移动到最后一张
                    moved=0;    // 瞬间返回第一张
                    $ulImgs.css("left",0);
                }
                // 将$ulIndex下当前li设为hover
                $ulIdxs.children(":eq("+moved+")") //:eq 选中带有指定内容的选择器
                    .addClass("hover")
                    .siblings().removeClass("hover");
            })  // 每次移动耗时 0.5秒
        },WAIT);    //每隔3.5秒动一次
    }
    play();
    // 当鼠标进入slider时
    $("#slider").hover(
        ()=>{
            clearInterval(timer);
            timer=null;
        },
        ()=>play()
    );
    //  为$ulIdxs绑定单击事件
    $ulIdxs.on("click","li",e=>{
        var $tar=$(e.target);
        moved=$tar.index();
        $ulImgs.stop(true).animate({
            left:-moved*LIWIDTH+'%'
        },interval,()=>{
            $tar.addClass("hover").siblings().removeClass("hover");
        })
    })
}})}
)

//product图片和news-pic获取
$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/indexImg",
        type:"get",
        dataType:"json",//自动JSON.parse()
        success:function(data){
        //添加product图片

        var img=document.querySelectorAll(".item-pic");
        var pro=data.slice(0,4);
        $.each(pro,function(i,v){
            img[i].innerHTML=`<img src="${v}" alt="loading...">`;
        })
        //添加news-pic
        var html=`
            <img src="${data[4]}" class="show" alt="">
            <img src="${data[5]}" alt="">
            <img src="${data[6]}" alt="">
            <img src="${data[7]}" alt="">
        `
        var dt=document.querySelector("dl.news-pic>dt");
        dt.innerHTML=html;
        }
    })
})

//登录
$("#userLogin").click(function(e){
    e.preventDefault()
    $(this).parent().next().css("display","block");

})
$("#bt-cancel").click(function(){
    $(this).parent().parent().parent().parent().hide();
})
$("#bt-login").click(function(){
    var uname = $("#uname").val();
    var upwd = $("#upwd").val();
    $.ajax({
        url:"http://127.0.0.1:3000/login",
        type:"POST",
        data:{uname:uname,upwd:upwd},
        success:function(data){
            if(data.code==1){
                
                //隐藏模态框
                $(".modal").hide();
                sessionStorage.setItem("uname",data.msg[0].uname);
                sessionStorage.setItem("uid",data.msg[0].uid);
                $("#login-box").hide();
                $("#welcome-box").show();
            }else{
                $("p.alert").html(data.msg);
            }
        },
        error:function(){
            alert("网络故障，请重试");
        }
    });

});


//首页新闻图片
function task(){
    var img=document.querySelector('.show');
    img.className='';
    var next=img.nextElementSibling;
    if(next===null){
      img.parentNode.children[0].className="show";
    }else{ 
      img.nextElementSibling.className="show";
    }
  }
  var a=setInterval(task,3000);
  //鼠标上去之后停止，鼠标禁用事件 查找div
  var $div=$('.news-pic dt');
  //当鼠标进入时 停用计时器
  $div.onmouseover=function(){
    clearInterval(a);
  }
  //鼠标离开启动
  $div.onmouseout=function(){
    a=setInterval(task,3000);
  }
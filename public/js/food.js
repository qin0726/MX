//小图文字标题淡入淡出效果
$(".food-small-intro").mouseover(function(){
    $(this).find("h3").fadeIn();
})
$(".food-small-intro").mouseleave(function(){
    $(this).find("h3").fadeOut()
})
//获取food图片
$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/foodImg",
        type:"get",
        datatype:"json",
        success:function(data){
            //加载大图
            var bigImg=document.querySelector(".food-big-intro"); //大图父元素
            var big=data.slice(0,4);//截取大图数组
            var html="";
            $.each(big,function(i,v){
                html+=`<li>
                <div class="food-big-pic">
                    <img src="${v.url}">
                </div>
                <div class="big-text">
                    <h3>${v.name}</h3>
                    <p>入口时嫩嫩的，香气扑鼻，滑滑的奶油一下子就吞了进去，甜丝丝的奶油丝毫不滑腻，微微的甜，谁尝了，都绝对会忍不住吃上第二口。
                    </p>
                </div>
            </li>`
        })
        bigImg.innerHTML=html;
            //加载小图
            var smallImg=document.querySelectorAll(".food-small-intro");//小图上层元素
            var small=data.slice(4); //截取小图数组
            $.each(small,function(i,v){
                var html=`<a href="#">
                            <img src="${v.url}" alt="">
                            <h3>${v.name}</h3>
                        </a>`;
                smallImg[i].innerHTML=html;
            })
        }
    })
})
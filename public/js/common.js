//顶部导航浮动
$(function(){
    $(document).scroll(function(){
            var height = $(document).scrollTop();
                if(height > 100){
                    $('#header').css(
                        "position","fixed"
                    );
                }else{
                    $('#header').css("position","relative");
                };

});
});

//histroy成长之路特效
$(".time-item div").mouseover(function(){
    $(this).css("transition","1s")
    $(this).addClass("scale");
})
$(".time-item div").mouseleave(function(){
    $(this).removeClass("scale")
})
// 销售额 
 $(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/sales",
        type:"get",
        dataType:"json",//自动JSON.parse()
        success:function(data){
            console.log(data);
            //年销售额
            var cash=document.getElementById("sale-cash");
            var res=data[0];
            var s1=[],m1=[];
            for(var i=0;i<res.length;i++){
                s1[i]=res[i].sa;
                m1[i]=res[i].ye+"年";
            }
            
            //创建echarts对象
            var titleCash=echarts.init(cash);
            //创建信息
            var option={
                title:{text:"单位：万元"},
                color: ['#ff1b1b'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {          
                        type : 'line'     
                    }
                },
                xAxis:{data:m1},
                yAxis:{},
                series:[{type:"line",data:s1}]
                
            }
            titleCash.setOption(option);
            
        }
    })
})
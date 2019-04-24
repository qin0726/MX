//引入功能模块
const express=require("express");
const cors=require("cors"); //解决跨域
const pool = require("./pool");//数据连接池
const bodyParser = require('body-parser'); //post数据处理

//创建服务器和监听端口
const app=express();
app.listen(3000,function(){
    console.log("服务器开始监听、、、")
});
//托管文件夹
app.use(express.static("public"));
//解决跨域 origin允许跨域访问域名列表 credentials跨域访问保存session id
app.use(cors({
    origin:'*',
    credentials:true
  }));
//接受处理post数据
app.use(bodyParser.urlencoded({extended:false}));


//创建路由
//登录
app.post("/login",(req,res)=>{
   var name=req.body.uname;
   var pwd=req.body.upwd;
    if(name==""||pwd==""){
        res.send({code:-1,msg:"不能为空"});
        return;
    }
    var sql="SELECT uid,uname,upwd from mx_user WHERE uname=? AND upwd=?";
    pool.query(sql,[name,pwd],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:-1,msg:"用户信息有误"})
        }else{
            res.send({code:1,msg:result})
        }
    })
})
//注册
app.post("/addUser",(req,res)=>{
    var name=req.body.uname;
   var pwd=req.body.upwd;
   console.log(name,pwd)
    if(name==""||pwd==""){
        res.send({code:-1,msg:"不能为空"});
        return;
    }
    var sql="INSERT INTO mx_user VALUES(null,?,?)";
    pool.query(sql,[name,pwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"注册成功"})
        }else{
            res.send({code:-1,msg:"注册失败"})
        }
    })
})
//注册查重用户
app.get("/finUser",(req,res)=>{
    var name=req.query.uname;
    var sql="SELECT uname FROM mx_user WHERE uname=?";
    pool.query(sql,[name],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:"用户已存在"})
        }else{
            res.send({code:-1,msg:"可以使用"})
        }
    })
})
//轮播图
app.get("/banner",(req,res)=>{
    res.send([
        "http:127.0.0.1:3000/img/index/banner-1.jpg",
        "http:127.0.0.1:3000/img/index/banner-2.jpg",
        "http:127.0.0.1:3000/img/index/banner-3.jpg",
        "http:127.0.0.1:3000/img/index/banner-4.jpg",
        "http:127.0.0.1:3000/img/index/banner-5.jpg",
    ])
})
//获取index图片
app.get("/indexImg",(req,res)=>{
    res.send([
        "http:127.0.0.1:3000/img/index/icon-1.jpg",
        "http:127.0.0.1:3000/img/index/icon-2.jpg",
        "http:127.0.0.1:3000/img/index/icon-3.jpg",
        "http:127.0.0.1:3000/img/index/icon-4.jpg",
        "http:127.0.0.1:3000/img/index/news-1.jpg",
        "http:127.0.0.1:3000/img/index/news-2.jpg",
        "http:127.0.0.1:3000/img/index/news-3.jpg",
        "http:127.0.0.1:3000/img/index/news-4.jpg",
    ])
})
//获取food图片
app.get("/foodImg",(req,res)=>{
    res.send([
        {name:"抹茶蛋糕",url:"http:127.0.0.1:3000/img/food/ad-1.jpg"},
        {name:"水果蛋糕",url:"http:127.0.0.1:3000/img/food/ad-2.jpg"},
        {name:"奶香蛋糕",url:"http:127.0.0.1:3000/img/food/ad-3.jpg"},
        {name:"绿叶珍珠",url:"http:127.0.0.1:3000/img/food/ad-4.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-1.jpg"},
        {name:"浓香曲奇",url:"http:127.0.0.1:3000/img/food/f-2.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-3.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-4.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-5.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-6.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-7.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-8.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-9.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-10.jpg"},
        {name:"雪山草莓",url:"http:127.0.0.1:3000/img/food/f-11.jpg"},
    ])
})
//获取销售情况
app.get("/sales",(req,res)=>{
    res.send([
        [
        {ye:2010,sa:95},
        {ye:2011,sa:560},
        {ye:2012,sa:1280},
        {ye:2013,sa:2000},
        {ye:2014,sa:2300},
        {ye:2015,sa:2600},
        {ye:2016,sa:2800},
        {ye:2017,sa:3000},
        {ye:2018,sa:3560},],
        [
        {na:"草莓慕斯",hc:6},
        {na:"芝士蛋糕",hc:5.7},
        {na:"蜂巢蛋糕",hc:5.3},
        {na:"椰青菜糕",hc:5},
        {na:"白森林",hc:4.9},
        ],
    ])
})
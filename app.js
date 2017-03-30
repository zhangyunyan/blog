var express=require('express');
var user=require('./routes/user');
var path=require('path');
var article=require('./routes/article');
var index=require('./routes/index');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);//可以吧会话信息放在数据库
var url=require('./config').url;
var flash=require('connect-flash');
//调用express返回app
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//设置模板引擎 模板文件后缀
app.set('view engine','html');
//设置模板引擎目录
app.set('views',path.resolve('views'));
//针对html类型模板如何渲染
app.engine('html',require('ejs').__express);
//使用静态文件中间件
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx',
    store:new MongoStore({//指定会话的存储位置
        url
    })
}))
app.use(flash()); //req上多了个flash方法 req.flash(消息类型，消息内容）
app.use(function (req, res, next) {
    //吧写入的消息取出来给res
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    res.locals.user=req.session.user;
    res.locals.keyword='';
    next();
})
//当客户端发过来的url路径为/user时候，
app.use('/user',user);
app.use('/article',article);
app.use('/',index);


app.listen(8080);

var express=require('express');
var multer=require('multer');
var upload=multer({dest:'./public/uploads'});
var User=require('../model').User;
var router=express.Router();
router.get('/signup',function (req, res) {
    //给末班变量的赋值：1.写在render的第二个参数中，2.给res.locals.user=req.session.user
    res.render('user/signup',{title:'注册'});
    // res.send('注册')
})
//在路由中使用中信建
router.post('/signup',upload.single('avatar'),function (req, res) {
    var user=req.body;
    console.log(req.file);  //文件内容
    user.avatar=`/uploads/${req.file.filename}`;
    User.create(user,function (err, docs) {
        if(err){
            //给error增加消息

            // req.flash('error');//如果值传消息类型，代表取值，吧传入的消息取出来
            res.redirect('back');
        }else {

            res.redirect('/user/signin')
        }
    })
    // res.send(req.body);
});
router.get('/signin',function (req, res) {
    res.render('user/signin',{title:'登录',flag:req.session.avatar});
})
router.post('/signin',function (req, res) {
    // res.render('user/signin',{title:'登录'});
    var user=req.body;
    User.findOne(user,function (err, doc) {//只是数据库操作失败err才为null
        if(err){

            res.redirect('back');
        }else {
            if(doc){
                req.flash('success','登录成功')
                req.session.user=doc;
                res.redirect('/');
            }else {
                req.flash('error','登录失败')
                res.redirect('back');
            }

        }
    })
})
router.get('/signout',function (req, res) {
    // res.render('user/signout',{title:'退出'});
    req.session.user=null;
    res.redirect('/');

    // res.send('退出')
})

module.exports=router;
var express=require('express');
var router=express.Router();
var Article=require('../model').Article;

router.get('/add',function (req, res) {
    // res.send('发表文章')
    res.render('article/add',{title:'文章',article:{}})
})
router.post('/add',function (req, res) {
    var article=req.body;
    console.log(article)
    article.author=req.session.user._id;
    console.log(article);
    Article.create(article,function (err, docs) {
        if(err){
            req.flash('error','发表文章失败');
            res.redirect('back');
        }else {
            req.flash('success','发表文章成功');
            res.redirect('/');
        }
    })
})

router.get('/list',function (req, res) {
    res.send('文章列表')
})

router.get('/detail/:_id',function (req, res) {
    var _id=req.params._id;
    Article.findById(_id,function (err, article) {
        res.render('article/detail',{title:'文章详情',article})
    })
})

router.get('/delete/:_id',function (req, res) {
    var _id=req.params._id;
    Article.remove({_id},function (err, result) {
        if(err){
            req.flash('error','操作失败');
            res.redirect('back')
        }else {
            req.flash('success','操作成功')
            res.redirect('/')
        }
    })
})

router.get('/update/:_id',function (req, res) {
    var _id=req.params._id;
    Article.findById(_id,function (err, article){
        res.render('article/add',{title:'修改',article})
    })
})

router.post('/update/:_id',function (req, res) {
    var _id=req.params._id;
    Article.update({_id},req.body,function (err,doc){
        if(err){
            req.flash('error','修改失败')
            res.redirect('back')
        }else {
            req.flash('success','修改成功')
            res.redirect('/article/detail/'+_id);
        }
    })
})

module.exports=router;
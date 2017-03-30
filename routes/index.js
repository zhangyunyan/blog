var express=require('express');
var Article=require('../model').Article;
var router=express.Router();
router.get('/',function (req, res) {
    var keyword=req.query.keyword;
    var query={};
    if(keyword){
        query.title=new RegExp(keyword);
    }
    Article.find({query}).populate('author').exec(function (err, articles) {
        console.log(articles)
        res.render('index',{title:'首页',articles,keyword})
    })
    /*Article.find({},function (err, articles) {
        res.render('index',{title:'首页',articles})
    });
    res.render('index',{title:'首页'})*/
});

module.exports=router;
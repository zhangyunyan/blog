var mongoose=require('mongoose');
var url=require('./config').url;
var ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://localhost/11111');
var UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
var ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    author:{type:ObjectId,ref:'User'},
    createAt:{type:Date,default:Date.now}
})
var Article=mongoose.model('Article',ArticleSchema);
var User=mongoose.model('User',UserSchema);
exports.Article=Article;
exports.User=User;
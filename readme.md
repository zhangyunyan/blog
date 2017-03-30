# 博客
此博客是一个集注册、登录、上传头像、发表文章、退出于一体的
# 初始化
1.创建项目
```
mpm init -y
```
2.安装依赖的模块
```
npm install express bootstrap jquery body-parser express-session multer connect-flash connect-mongo morgan debug mongoose --save
```
# 配置理由
用户相关
```
/user/signup  注册
/user/signin  登录
/user/signout  退出
```
文章
```
/artical/add  增加
/article/list 查看文章列表
```
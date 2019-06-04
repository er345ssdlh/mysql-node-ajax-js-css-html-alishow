const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const art = require('art-template');
const template = require('express-art-template');
const session = require('express-session');

app.listen(5000, () => console.log('Start 端口5000'));

///获取项目的根目录地址
global.aliRootDir = __dirname;






///处理POST获得的资源
app.use(bodyParser.urlencoded({
    extended: false
}));


///处理静态资源  (接口在哪个文件 静态就以哪个作为根目录)
app.use('/addmin/*/assets/', express.static(aliRootDir + '/view/addmin/assets/'));

app.use('/*assets/', express.static(aliRootDir + '/view/home/assets/'));
app.use('/*uploads/', express.static(aliRootDir + '/view/home/uploads/'));

app.use('/*assets/', express.static(aliRootDir + '/view/admin/assets/'));
app.use('/*uploads/', express.static(aliRootDir + '/view/admin/uploads/'));
app.use('/*upload/', express.static(aliRootDir + '/upload/'));



///第三方包express-art-template 让html页面使用模板引擎
app.engine('html', template);

// session配置
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'sasdwfqa',
    cookie: {
        maxAge: 3600000
    }
}))
// 没登录就去登录
app.use((req, res, next) => {
    if (req.session.isLogin || req.url == '/admin/login.html' || req.url === '/api/login/checkLogin') {
        next();
    } else {
        res.send('<script>alert("请先登录！");location.href="/admin/login.html"</script>');
        return;
    }
});


// admin路由模块 导入
const home = require(aliRootDir + '/router/home');
app.use(home);
const admin = require(aliRootDir + '/router/admin');
app.use(admin);
const admin_user = require(aliRootDir + '/router/admin_user');
app.use(admin_user);
const admin_other = require(aliRootDir + '/router/admin_other');
app.use(admin_other);
const admin_comment = require(aliRootDir + '/router/admin_comment');
app.use(admin_comment);
const admin_center = require(aliRootDir + '/router/admin_center');
app.use(admin_center);
const admin_cate = require(aliRootDir + '/router/admin_cate');
app.use(admin_cate);
const admin_post = require(aliRootDir + '/router/admin_post');
app.use(admin_post);
const api = require(aliRootDir + '/api');
app.use(api);
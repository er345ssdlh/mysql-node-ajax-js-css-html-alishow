////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();
// admin文件页面
router.get('/admin/index.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/index.html");
})
///////////////////////////登录页面
router.get('/admin/login.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/login.html");
})


// 导出路由模块
module.exports=router;
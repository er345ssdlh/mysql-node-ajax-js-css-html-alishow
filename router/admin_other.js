////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();

// admin-other文件页面
router.get('/admin/other/nav-menus.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/other/nav-menus.html");
})
router.get('/admin/other/settings.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/other/settings.html");
})
router.get('/admin/other/slides.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/other/slides.html");
})

// 导出路由模块
module.exports=router;
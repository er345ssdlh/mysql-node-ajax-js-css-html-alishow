
////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();

// admin-center文件页面
router.get('/admin/center/password-reset.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/center/password-reset.html");
})
router.get('/admin/center/profile.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/center/profile.html");
})

// 导出路由模块
module.exports=router;
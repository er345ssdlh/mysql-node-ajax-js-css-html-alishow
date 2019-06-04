////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();

// admin-comment文件页面
router.get('/admin/comment/comments.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/comment/comments.html");
})

// 导出路由模块
module.exports=router;
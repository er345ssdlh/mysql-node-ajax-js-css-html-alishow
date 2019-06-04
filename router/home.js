// //////////////////////////////前台路由

const express = require('express');
const router = express.Router();

// home 文件页面
router.get('/', (req, res) => {
    res.render(aliRootDir + '/view/home/index.html');
})
router.get('/detail.html', (req, res) => {
    res.render(aliRootDir + '/view/home/detail.html');
})
router.get('/list.html', (req, res) => {
    res.render(aliRootDir + '/view/home/list.html');
})


module.exports = router;
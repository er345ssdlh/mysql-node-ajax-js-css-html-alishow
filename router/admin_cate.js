////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment');
const art = require('art-template');

//过滤器
art.defaults.imports.mytime = function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
}

// admin-cate-addcate.html文件页面
router.get('/admin/cate/addcate.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/cate/addcate.html");
})



///////////////////////////// admin-cate-cate.html文件页面
router.get('/admin/cate/cate.html', (req, res) => {
    db('select * from ali_cate', null, (err, result) => {
        if (err) throw err;
        res.render(aliRootDir + "/view/admin/cate/cate.html", {
            shuju: result
        });
    })
})
///添加
router.post('/admin/cate/add', (req, res) => {
    req.body.cate_addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    db('insert into ali_cate set?', req.body, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: '200',
                message: '添加成功！'
            });
        } else {
            res.send({
                code: '201',
                message: '添加失败！'
            });
        }
    })
})
//删除
router.get('/admin/cate/del', (req, res) => {
    db('delete  from ali_cate where cate_id=?', req.query.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send('<script>alert("删除成功");location.href="/admin/cate/cate.html";</script>');;
        } else {
            res.send('<script>alert("删除失败");location.href="/admin/cate/cate.html";</script>');

        }
    })
})
//编辑
router.get('/admin/cate/upcate.html', (req, res) => {
    db('select * from ali_cate where cate_id=?', req.query.id, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render(aliRootDir + "/view/admin/cate/upcate.html", {
            shuju: result[0]
        })
    })
})
///////////////////////////// admin-cate-upcate.html文件页面

// 修改
router.post('/admin/cate/upl', (req, res) => {
    console.log(req.body);
    db('update ali_cate set ? where cate_id=?', [req.body, req.body.cate_id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: '200',
                message: '数据修改成功！'
            });
        } else {
            res.send({
                code: '201',
                message: '数据修改失败！'
            });
        }
    })
})



// 导出路由模块
module.exports = router;
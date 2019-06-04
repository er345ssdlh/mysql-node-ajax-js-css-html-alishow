////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();
const db = require('../db');

/////////////////////////////////////// admin-user-adduser文件页面
router.get('/admin/user/adduser.html', (req, res) => {
    res.render(aliRootDir + "/view/admin/user/adduser.html");
})
//////////添加功能
router.post('/admin/user/aduser', (req, res) => {
    // console.log(req.body);
    db('insert into ali_admin set?', req.body, (err, result) => {
        if (err) throw err;
        // console.log(result);
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                message: 'ok'
            });
        }
    })
})


// /////////////////////////////////////admin-user-users文件页面
router.get('/admin/user/users.html', (req, res) => {
    db('select * from ali_admin', null, (err, result) => {
        if (err) throw err;
        res.render(aliRootDir + "/view/admin/user/users.html", {
            arr: result
        });
    })

})
//////删除功能
router.post('/admin/user/del', (req, res) => {
    console.log(req.body);
    db('DELETE FROM ali_admin WHERE admin_id=?', req.body.a, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})


/////////////////////////////////////// admin-user-upuser.html文件页面
router.get('/admin/user/upuser.html', (req, res) => {
    db('select * from ali_admin where admin_id=?', req.query.id, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render(aliRootDir + "/view/admin/user/upuser.html", {
            shuju: result[0]
        });
    })

})
//修改功能
router.post('/admin/user/upl', (req, res) => {
    console.log(req.body, Number(req.body.admin_id));
    db('update ali_admin set ? where admin_id=?', [req.body, req.body.admin_id], (err, result) => {
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
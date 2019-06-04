////////////////////////////// 后台路由

const express = require('express');
const router = express.Router();
const db = require('../db');

///////////////////////////////// admin-post-addpost.html文件页面
router.get('/admin/post/addpost.html', (req, res) => {
    db('select * from ali_cate', null, function (err,result) {
        if(err) throw err;
        console.log(result)
        res.render(aliRootDir + "/view/admin/post/addpost.html",{
            arr:result
        });

    })
})









// admin-post-posts.html文件页面
router.get('/admin/post/posts.html', (req, res) => {
    // --  ali_article   .article(文章标题) 
    // -- ali_admin   .admin_nickname(管理员姓名) 
    // -- ali_cate   .cate_name(所属分类) 
    // -- ali_article   .article_addtime(发布时间) 
    // -- ali_article   .article_state(发布状态)
    let sql = `SELECT ali_article.article_title,ali_article.article_addtime,ali_article.article_state,ali_admin.admin_nickname,ali_cate.cate_name  FROM ali_article
JOIN ali_admin ON ali_article.article_adminid=ali_admin.admin_id
JOIN ali_cate ON ali_article.article_cateid=ali_cate.cate_id`
    db(sql, null, (err, result) => {
        console.log(result);
        if (err) throw err;
        res.render(aliRootDir + "/view/admin/post/posts.html", {
            arr: result
        });
    })
})

// 导出路由模块
module.exports = router;
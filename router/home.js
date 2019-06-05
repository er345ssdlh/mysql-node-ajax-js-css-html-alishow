// //////////////////////////////前台路由

const express = require('express');
const router = express.Router();
const db = require('../db');

// home-index.html 文件页面
router.get('/', (req, res) => {
    //查轮播图
    //焦点关注
    //一周热门
    //热门推荐
    //最新
    // 发布
    //随机推荐
    let sql = `select * from ali_pic; 
               select * from ali_article where article_state="已发布" and article_focus=1 limit 5;
               select * from ali_article order by article_click desc limit 5;
               select * from ali_article order by article_good desc limit 4;
               select e.article_title,e.article_id, e.article_addtime,e.article_text,e.article_file,e.article_click,e.article_good,t.cate_name,m.admin_nickname from ali_article e 
join ali_cate t on e.article_cateid=t.cate_id 
join ali_admin m on e.article_adminid=m.admin_id 
order by article_id desc limit 8;
               SELECT * from ali_article WHERE article_state='已发布' ORDER BY rand() LIMIT 5;
               select * from ali_cate;
            `;
    db(sql, null, (err, result) => {
        if (err) throw err;
        res.render(aliRootDir + '/view/home/index.html', {
            lunbotu: result[0],
            guanzhu: result[1],
            remen: result[2],
            tuijian: result[3],
            fabu: result[4],
            suiji: result[5],
            lanmu: result[6],
        });
    })
})



// home-detail.html 文件页面
router.get('/detail.html', (req, res) => {
    // /detail.html?id=6
    let ids = req.query.id ? req.query.id : 1;
    //随机推荐
    //栏目
    let sql = `
               SELECT * from ali_article WHERE article_state='已发布' ORDER BY rand() LIMIT 5;
               select * from ali_cate;
               select * from ali_article where article_state='已发布' and article_focus='1' limit 4; 
               select e.article_title,e.article_id, e.article_addtime,e.article_text,e.article_file,e.article_click,e.article_good,t.cate_name,m.admin_nickname from ali_article e 
               join ali_cate t on e.article_cateid=t.cate_id 
               join ali_admin m on e.article_adminid=m.admin_id 
               where e.article_id=${ids} limit 10;
               
            `;
    db(sql, null, (err, result) => {
        if (err) throw err;
        console.log(result[3][0]);
        res.render(aliRootDir + '/view/home/detail.html', {
            suiji: result[0],
            lanmu: result[1],
            tj:result[2],
            wenzhang:result[3][0],
        });
    })
})
// home-list.html 文件页面
router.get('/list.html', (req, res) => {
    let id = req.query.id ? req.query.id : 1;
    let tit = req.query.name ? req.query.name : '随便看看';
    //随机推荐
    //栏目
    //查相关栏目
    let sql = `
               SELECT * from ali_article WHERE article_state='已发布' ORDER BY rand() LIMIT 5;
               select * from ali_cate;
               select e.article_title,e.article_id, e.article_addtime,e.article_text,e.article_file,e.article_click,e.article_good,t.cate_name,m.admin_nickname from ali_article e 
               join ali_cate t on e.article_cateid=t.cate_id 
               join ali_admin m on e.article_adminid=m.admin_id 
               where article_cateid=${id} limit 10;
            `;
    db(sql, null, (err, result) => {
        if (err) throw err;
        res.render(aliRootDir + '/view/home/list.html', {
            suiji: result[0],
            lanmu: result[1],
            xg:result[2],
            tit:tit,
        });
    })
})


module.exports = router;
////////////////////////////////////////数据库连接
let fn = function (sql, data, callback) {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'alishow'
    })
    conn.connect();
    conn.query(sql, data, callback);
    conn.end();
}
module.exports=fn;
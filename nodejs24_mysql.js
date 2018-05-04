var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ZDMedTech#123',
    database: 'test'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
    if (err) throw err
    console.log('The solution is:', results[0].solution)
})

// 查询ID
function getIdByAlexa(number) {
    var sql = 'SELECT id FROM websites WHERE alexa=' + number
    connection.query(sql, (err, result) => {
        if (err) {
            return console.log('[SELECT ERROR] - ', err.message)
        }
        return result[0].id
    })
}

// 查询一个
function queryOne(id) {
    var sql = 'SELECT * FROM websites WHERE id=' + id
    connection.query(sql, (err, result) => {
        if (err) {
            return console.log('[SELECT ERROR] - ', err.message)
        }
        console.log('------------------- SELECT ONE -------------------')
        console.log(result)
        console.log('----------------------------------------------\n\n')
    })
}

// 查询所有
function queryAll() {
    var sql = 'SELECT * FROM  websites'
    connection.query(sql, (err, result) => {
        if (err) {
            return console.log('[SELECT ERROR] - ', err.message)
        }
        console.log('------------------- SELECT ALL -------------------')
        console.log(result)
        console.log('----------------------------------------------\n\n')
    })
}

// 插入
function insertOne(addWebsite) {
    var sql = 'INSERT INTO websites(name, url, alexa, country) VALUES(?, ?, ?, ?)'
    connection.query(sql, addWebsite, (err, result) => {
        if (err) {
            return console.error('[INSERT ERROR] - ', err.message)
        }
        console.log('------------------- INSERT ---------------------')
        console.log('INSERT ID:', result)
        console.log('----------------------------------------------\n\n')
    })
}

// 修改
function updateOne(modWebSite) {
    var sql = 'UPDATE websites SET name = ?,url = ?,alexa = ?,country=?  WHERE id = ?'
    connection.query(sql, modWebSite, (err, result) => {
        if (err) {
            return console.error('[UPDATE ERROR] - ', err.message)
        }
        console.log('------------------- UPDATE ---------------------')
        console.log('UPDATE INFO:', result)
        console.log('----------------------------------------------\n\n')
    })
}

// 删除
function deleteOne(id) {
    var sql = "DELETE FROM websites WHERE id=" + id
    connection.query(sql, (err, result) => {
        if (err) {
            return console.error('[DELETE ERROR] - ', err.message)
        }
        console.log('------------------- DELETE ---------------------')
        console.log('DELETE INFO:', result)
        console.log('----------------------------------------------\n\n')
    })
}

queryAll()

//var addWebsite = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN']
//insertOne(addWebsite)

// X 这里是异步的，没法立刻拿到值
//var modWebsite = ['菜鸟移动站', 'https://m.runoob.com', '23453', 'CN', getIdByAlexa('23453')]
//updateOne(modWebsite)

// X 这里是异步的，没法立刻拿到值
//deleteOne(getIdByAlexa('23453'))

connection.end()

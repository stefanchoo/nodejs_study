// REST(Representational State Transfer, 简称REST), 其为设计风格，而非标准

var express = require('express')
var app = express()
var fs = require('fs')

// 添加的新用户数据
var new_user = {
    "user4": {
        "name": "stefanchoo",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

app.get('/users/:id', (req, res, next) => {
    var id = req.params.id
    if (/^[\d]$/.test(id)) {
        // 首先我们读取已存在的用户
        fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            var user = data["user" + id]
            console.log(user)
            res.end(JSON.stringify(user))
        })
    } else {
        next()
    }
})

app.get('/users/add', (req, res) => {
    // 读取已存在的数据
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        data['user4'] = new_user['user4']
        console.log(data)
        res.end(JSON.stringify(data))
        fs.writeFile(__dirname + '/' + 'users.json',
            JSON.stringify(data),
            (err, data) => {
                console.log('添加成功')
            })
    })
})

app.get('/users/all', (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        console.log(data)
        res.end(data)
    })
})

app.get('/users/delete/:id', (req, res) => {
    var id = req.params.id
    if (/^[\d]$/.test(id)) {
        fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            console.log(data['user' + id])
            delete data['user' + id]
            fs.writeFile(__dirname + '/' + 'users.json', JSON.stringify(data), (err, data) => {
                console.log('删除成功')
            })
            res.end('删除User' + id + '成功')
        })
    } else {
        console.err('用户id错误')
        res.end('用户id错误，请重新输入')
    }
})

var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('访问地址为 http://%s:%s', host, port)
})

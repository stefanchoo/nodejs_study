var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var util = require('util')
var multer = require('multer')
var cookieParser = require('cookie-parser')


var app = express()
app.use(express.static('public'))

app.use(cookieParser())

// 创建解析器 application/x-www-form-urlencoded
var urlencodeParser = bodyParser.urlencoded({
    extended: false
})
app.use(urlencodeParser)

var destMulter = multer({
    dest: '/tmp/'
}).array('image')
app.use(destMulter)


app.get('/', (req, res) => {
    console.log("Cookies: " + util.inspect(req.cookies))
})

// GET 请求
app.get('/index.htm', (req, res) => {
    //    console.log('主页 GET 请求')
    //    res.send('Hello World')
    res.sendFile(__dirname + "/" + "index.html")
})

app.get('/process_get', (req, res) => {
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
})

// POST 请求
app.post('/process_post', urlencodeParser, (req, res) => {
    //    console.log('主页 POST 请求')
    //    res.send('Hello POST')
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
})

//  /del_user 页面响应
app.get('/del_user', (req, res) => {
    console.log('/del_user 响应 DELETE 请求')
    res.send('删除页面')
})

//  /list_user 页面 GET 请求
app.get('/list_user', (req, res) => {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', (req, res) => {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})

app.post('/file_upload', (req, res) => {
    // 上传的文件信息
    console.log(req.files[0])
    var des_file = __dirname + "/" + req.files[0].originalname
    fs.readFile(req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, err => {
            if (err) {
                console.error(err)
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                }
            }
            console.log(response)
            res.end(JSON.stringify(response))
        })
    })
})

var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

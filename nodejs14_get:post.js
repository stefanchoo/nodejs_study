var http = require('http')
var url = require('url')
var util = require('util')

// GET
//http.createServer((req, res) => {
//    res.writeHead(200, {
//        'Content-Type': 'text/plain; charset=utf-8'
//    })
//    // 解析 URL 参数
//    var params = url.parse(req.url, true).query
//    res.write("网站名: " + params.name)
//    res.write("\n")
//    res.write("网站URL: " + params.url)
//    res.end()
//}).listen(3000)

// POST
var querystring = require('querystring')

var postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';

http.createServer((req, res) => {
    var body = ''
    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        // 解析参数
        body = querystring.parse(body)
        // 设置响应头部信息及编码
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        if (body.name && body.url) {
            res.write("网站名：" + body.name)
            res.write("<br>")
            res.write("网站 URL：" + body.url)
        } else {
            // 输出表单
            res.write(postHTML)
        }
    })
}).listen(3000)

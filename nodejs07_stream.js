// Node.js Stream(流) 是EventEmitter的实例
// Readable: 可读操作
// Writable: 可写操作
// Duplex: 可读可写操作
// Transform： 操作被写入数据，然后读出结果
// data - 当有数据可读时
// end - 没有更多的数据可读时触发
// error - 在接收和写入过程中发生错误时触发
// finish - 所有数据已被写入到底层系统时触发

var fs = require('fs')
var zlib = require('zlib')

// 1. 读取
var data = ''
var readerStream = fs.createReadStream('input.txt')
readerStream.setEncoding('UTF8')

readerStream.on('data', chunk => data += chunk)
readerStream.on('end', () => console.log(data))
readerStream.on('error', err => console.log(err.stack))

// 2. 写入
//var myData = "This is my company"
//var writableStream = fs.createWriteStream('output.txt')
//writableStream.write(myData, 'UTF8')
//// 标记文件末尾
//writableStream.end()
//writableStream.on('finish', () => console.log('写入完成'))
//writableStream.on('error', err => console.log(err.stack))

// 3. 管道流
var writableStream = fs.createWriteStream('output.txt')
readerStream.pipe(writableStream)

// 4. 链式流
readerStream.pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'))

console.log('文件压缩完成。')


// New Method
//var data = "\r\nThis is my company"
//fs.appendFile('input.txt', data, 'UTF8', (err, data) => {
//    if (err) {
//        if (err.code === 'EEXIST') {
//            console.error('myfile already exists')
//            return
//        }
//
//        throw err
//    }
//    console.log('写入完成')
//});
//
//
fs.readFile('output.txt', (err, data) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(data.toString())
    }
})

console.log('程序执行完毕')

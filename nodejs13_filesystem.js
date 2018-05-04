var fs = require('fs')

// 异步读取
//fs.readFile('input.txt', (err, data) => {
//    if (err) return console.error(err)
//    console.log("异步读取：" + data.toString())
//})
//
//// 同步读取
//var data = fs.readFileSync('input.txt')
//console.log('同步读取：' + data.toString())
//
//console.log('程序读取完毕')

// 打开文件
// fs.open(path, flags[, mode], callback)
// path - 文件路径
// flags - 文件打开的行为 r w a 等
// mode - 设置文件模式，默认 0666（可读，可写）

// 获取文件信息
// fs.stat(path, callback)
// stats.isFile isDirectory isBlockDevice isCharacterDevice isSymbolicLink isFIFO isSocket

// fs.stat('nodejs01_helloworld.js', (err, stats) => {
//    if (err) return console.error(err)
//    console.log(stats)
//    console.log("读取文件信息成功！")
//    console.log("是否为文件？ " + stats.isFile())
//    console.log("是否为目录？ " + stats.isDirectory())
// })
// 写入文件
// fs.writeFile(file, data[, options], callback)
// 默认是w模式，如果文件存在，则写入的内容会覆盖旧的文件内容
// options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'

// 读取文件
//fs.read(fd, buffer, offset, length, position, callback)
// fd - 通过fs.open()方法返回的文件描述符
// buffer - 数据写入的缓冲区
// offset - 缓冲区写入的写入偏移量
// length - 要从文件中读取的字节数
// position - 文件读取的起始位置，如果position的值为null， 则会从当前文件指针的位置读取
// callback - 回调函数，三个参数err, bytesRead, buffer, err为错误信息，bytesRead表示读取字节数，buffer为缓冲区对象

//var buf = new Buffer(1024)
//console.log('准备打开已存在的文件！')
//fs.open('input.txt', 'r+', (err, fd) => {
//    if (err) {
//        return console.error(err)
//    }
//    console.log('文件打开成功')
//    console.log('准备读取文件：')
//    // 截取文件
//    fs.ftruncate(fd, 10, err => {
//        if (err) console.log(err)
//        console.log("文件被截取成功")
//        console.log("读取相同文件")
//        fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
//            if (err) console.error(err)
//            console.log(bytes + " 字节被读取")
//            if (bytes > 0) {
//                console.log(buf.slice(0, bytes).toString())
//            }
//            // 关闭文件
//            fs.close(fd, err => {
//                if (err) console.log(err)
//                console.log('文件关闭成功')
//            })
//        })
//    })
//})

// 删除文件
////fs.unlink(path, callback)
//console.log("准备删除文件！")
//fs.unlink('input_backup.txt', err => {
//    if (err) return console.error(err)
//    console.log('文件删除成功')
//})

// 创建目录
//fs.mkdir(path[,mode], callback)
// mode - 设置目录权限，默认为 0777

//fs.mkdir("/Users/choostefan/Study/nodejs/test", err => {
//    if (err) console.error(err)
//    console.log("创建目录成功")
//})
//
//// 读取目录
//fs.readdir("/Users/choostefan/Study/nodejs", (err, files) => {
//    if (err) return console.log(err)
//    files.forEach(file => console.log(file))
//})

// 删除目录
// 只能删除空目录
fs.rmdir("/Users/choostefan/Study/nodejs/test", err => {
    if (err) return console.error(err)
    console.log('读取 /tmp 目录')
    // 读取目录
    fs.readdir("/Users/choostefan/Study/nodejs", (err, files) => {
        if (err) return console.log(err)
        files.forEach(file => console.log(file))
    })
})

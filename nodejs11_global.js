// global 所有全局变量都是 global 的属性
// ECMAScript的全局变量定义
// 在最外层定义的变量
// 全部对象的属性
// 隐式定义的变量（未定义直接赋值的变量）

console.log(__filename)
console.log(__dirname)

var counter = 10
console.log('计数： %d', counter)

console.time('获取数据')
console.trace()
// once
var t1 = setTimeout(() => {
    console.log("Hello World")
}, 2000)

clearTimeout(t1)

// repeated
var t2 = setInterval(() => {
    console.log("Hello World")
}, 1000)

clearInterval(t2)
console.timeEnd('获取数据');

process.on('exit', code => {
    setTimeout(() => console.log('该代码不会执行'), 0)
    console.log('退出码：', code)
})

process.stdout.write('Hello World!' + '\n')
process.argv.forEach((val, index, array) => {
    console.log(index + ': ' + val)
})
console.log(process.execPath)
console.log(process.platform)
console.log('当前目录：' + process.cwd())
console.log('当前版本：' + process.version)
console.log('内存使用情况：' + process.memoryUsage())

console.log("程序执行结束")

// Node.js Buffer(缓冲区)
// Javascript 没有二进制数据，使用Buffer来存放二进制数据 类似整形数组

buf = Buffer.from('runoob', 'ascii')

console.log(buf)

console.log(buf.toString('hex'))

console.log(buf.toString('base64'))

buf1 = Buffer.alloc(10)

buf2 = Buffer.alloc(10, 1)
console.log(buf2[9])

buf3 = Buffer.allocUnsafe(10)

buf4 = Buffer.from([1, 2, 3])

buf5 = Buffer.from('test')

buf6 = Buffer.from('test', 'latin1')

buffer = Buffer.alloc(256)
len = buffer.write('www.zdmedtech.com')
console.log('写入字节数：', len)

buf = Buffer.alloc(26)
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97
}
console.log(buf.toString('ascii'))
console.log(buf.toString('ascii', 0, 5))
console.log(buf.toString('utf8', 0, 5))
console.log(buf.toString(undefined, 0, 5))

buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5])
const json = JSON.stringify(buf)
console.log(json)

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ? Buffer.from(value.data) : value
})

console.log(copy)

var buffer1 = Buffer.from('www.zdmedtech.com')
var buffer2 = Buffer.from('www.runood.com')
// 拼接
var buffer3 = Buffer.concat([buffer1, buffer2])
console.log(buffer3.toString())

// 或替换
buffer2.copy(buffer1, 4)

console.log(buffer1.toString())

// 剪切
var buffer4 = buffer1.slice(0, 4)
console.log(buffer4.toString())

// Node.js EventEmitter
// Node.js 所有的异步I/O操作在完成时都会发送一个事件到事件队列

var EventEmitter = require('events').EventEmitter
var event = new EventEmitter()
event.on('some_event', function (arg1, arg2) {
    console.log('listener1', arg1, arg2)
})

event.on('some_event', function (arg1, arg2) {
    console.log('listener2', arg1, arg2)
})

// 单次触发
event.once('some_event', function (arg1, arg2) {
    console.log('listener3', arg1, arg2)
})

var listeners = event.listeners('some_event')
console.log(listeners.length)

var count = event.listenerCount('some_event')
console.log(count)

event.emit('some_event', 'You1', 'I1')
event.emit('some_event', 'You2', 'I2')

var callback1 = function () {
    console.log("connection1")
}
var callback2 = function () {
    console.log("connection2")
}
// max listeners default 10
// event.setMaxListeners(20)
event.addListener('connection', callback1)
event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)
//event.addListener('connection', callback2)

event.emit('connection')

event.removeListener('connection', callback1)

event.emit('connection')

event.removeAllListeners('some_event')
event.emit('some_event')

event.addListener('error', function (err) {
    console.log("Err Msg:", err)
})

event.emit('error', 'something went wrong!') // 为error设置监听器

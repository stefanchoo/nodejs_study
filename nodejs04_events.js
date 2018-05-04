// Node.js 事件循环

// Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所有性能非常高
// Node.js 的每一个API都是异步的，并作为一个独立的线程运行，使用异步函数调用，并处理并发
// Node.js 基本上所有的事件机制都是使用设计模式中观察者模式实现
// Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每一个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数

// 事件驱动程序

// 当web server接受到请求，就把它关闭然后进行处理，然后去服务下一个web请求，请求完成时，就会被放回处理队列，当到达队列开头，就把结果返回给用户【非阻塞式IO或者事件循环驱动IO】

// EventEmitters --> Events --> Event Loop --> Event Handlers

// 事件相当于一个主题 subject，而所有注册到这个事件上的处理函数都相当于观察者


// 1. 引入 events 模块
var events = require('events')

// 2. 创建 eventEmitters
var eventEmitter = new events.EventEmitter()

// 3. 创建事件处理程序
var connectHandler = function connected() {
    console.log('连接成功。')

    // 触发 data_received 事件
    eventEmitter.emit('data_received')
}

// 4. 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler)

eventEmitter.on('data_received', function () {
    console.log('数据接收成功。')
})

// 5. 触发connection 事件
eventEmitter.emit('connection')
console.log('程序执行完毕。')

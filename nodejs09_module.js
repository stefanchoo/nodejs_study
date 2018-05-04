// Node.js 模块系统，JavaScript JSON C/C++扩展

var Hello = require('./nodejs01_helloworld')
hello = new Hello()
hello.setName('World')
hello.sayHello()

// 优先级： 文件模块缓存区 > 原生模块 > 文件

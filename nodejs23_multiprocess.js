// Nodejs 多进程
// Nodejs 单线程模式运行（JavaScript 本身就是），通过创建多个子进程来提高性能
// 子进程带有三个流对象：child.stdin, child.stdout, child.stderr。可能共享父进程的stdio流，或者也可以是独立的被导流的流对象

// child_process 模块来创建子进程，方法有：
// exec - 子进程执行命令，缓存子进程的输出，以回调函数参数的形式返回
// spawn - 使用指定的命令行参数来创建新进程
// fork - spawn的特殊形式，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信

// child_process.exec(command[, options], callback)

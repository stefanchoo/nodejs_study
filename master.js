const fs = require('fs')
const child_process = require('child_process')

// 1. exec
//for (var i = 0; i < 3; i++) {
//    var workerProcess = child_process.exec('node support.js ' + i, (err, stdout, stderr) => {
//        if (err) {
//            console.log(err.stack)
//            console.log('Error code:' + err.code)
//            console.log('Signal received:' + err.signal)
//        }
//        console.log('stdout: ' + stdout)
//        console.log('stderr: ' + stderr)
//    })
//    workerProcess.on('exit', code => {
//        console.log('子进程已退出，退出码 ' + code)
//    })
//}

// 2. spawn
//for (var i = 0; i < 3; i++) {
//    var workerProcess = child_process.spawn('node', ['support.js', i])
//    workerProcess.stdout.on('data', data => {
//        console.log('stdout:' + data)
//    })
//    workerProcess.stderr.on('data', data => {
//        console.log('stdout:' + data)
//    })
//    workerProcess.on('close', code => {
//        console.log('子进程已退出，退出码 ' + code)
//    })
//}

// 3. fork
for (var i = 0; i < 3; i++) {
    var worker_process = child_process.fork("support.js", [i]);

    worker_process.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code);
    });
}

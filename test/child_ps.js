// const http = require('http');
// const longComputation = () => {
//   let sum = 0;
//   for (let i = 0; i < 1e10; i++) {
//     sum += i;
//   };
//   return sum;
// };
// const server = http.createServer();
// server.on('request', (req, res) => {
//   if (req.url === '/compute') {
//     console.info('计算开始',new Date());
//     const sum = longComputation();
//     console.info('计算结束',new Date());
//     return res.end(`Sum is ${sum}`);
//   } else {
//     res.end('Ok')
//   }
// });

// server.listen(3000);

const http = require('http');
const fork = require('child_process').fork;
const path = require('path')

const server = http.createServer((req, res) => {
    if(req.url == '/compute'){
        const file = path.join(__dirname, './fork_compute.js')
        const compute = fork(file);
        compute.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        // IPC的全称是Inter-Process Communication,即进程间通信。
        // 实现进程间通信的技术有很多，如命名管道，匿名管道，socket，信号量，共享内存，消息队列等。
        // Node中实现IPC通道是依赖于libuv。
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
            compute.kill();
        });

        // 子进程监听到一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            compute.kill();
        })
    }else{
        res.end(`ok haha...`);
    }
});
server.listen(3000, () => {
    console.log(`server started at http://127.0.0.1:3000`);
});
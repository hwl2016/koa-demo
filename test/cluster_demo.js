const http = require('http');
const CPUs = require('os').cpus();
const numCPUs = CPUs.length;
const cluster = require('cluster');
if(cluster.isMaster){
    console.log('Master proces id is',process.pid);
    // fork workers  负载均衡使用了Round-robin算法
    for(let i= 0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',function(worker,code,signal){
        console.log('worker process died,id',worker.process.pid)
    })
}else{
    console.log('start http server, proces id is',process.pid);
    // Worker可以共享同一个TCP连接
    // 这里是一个http服务器
    http.createServer(function(req,res){
        console.log('Inner http server, proces id is',process.pid);
        res.writeHead(200);
        res.end('hello word');
    }).listen(8000);
}

// console.log(CPUs)
// console.log(numCPUs)
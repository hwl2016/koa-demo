const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path')
import Koa from 'koa';
const serve = require("koa-static");
import HomeRouter from './src/router/home';
import BillRouter from './src/router/bill';
import UserRouter from './src/router/user';

// const Koa = require('koa');
// const UserRouter = require('./src/user/user');

class Server {

    constructor() {
        this.PORT = 3000;
        this.app = new Koa();
    }

    async logger(ctx, next) {
        await next();
        const rt = ctx.response.get('X-Response-Time');
        console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    }

    async XResponseTime(ctx, next) {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    }

    async test(ctx) {
        ctx.cookies.set('haha', 'huwl123', { signed: true });
        ctx.body = 'Just like this!!!';
    }

    init() {
        this.app.keys = ['im a newer secret', 'i like turtle'];
        this.app.use(this.logger);
        this.app.use(this.XResponseTime);
        // this.app.use(serve({ 
        //     dir: path.join(__dirname, './dev'),
        //     router: '/dev/'
        // }));
        this.app.use(serve(path.join(__dirname, './dev')));
        this.app.use(HomeRouter);
        this.app.use(BillRouter);
        this.app.use(UserRouter);
        // this.app.use(this.test);
        
        // this.app.listen(this.PORT);
        http.createServer(this.app.callback()).listen(this.PORT, () => {
            console.log(`Server is starting at http://127.0.0.1:${this.PORT}`)
        });
        // const httpsOption = {
        //     key: fs.readFileSync(path.resolve(__dirname, './ssl/privatekey.pem')),
        //     cert: fs.readFileSync(path.resolve(__dirname, './ssl/certificate.pem'))
        // }
        // https.createServer(httpsOption, this.app.callback()).listen(3002);
    }

    run() {
        this.init();
    }
}

new Server().run();

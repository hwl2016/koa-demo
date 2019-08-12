const http = require('http');
const https = require('https');
const fs = require('fs');
import Koa from 'koa';
import UserRouter from './src/user/user';

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
        this.app.use(UserRouter.routes());
        this.app.use(this.test);
        this.app.listen(this.PORT);

        // http.createServer(this.app.callback()).listen(this.PORT);
        // const httpsOption = {
        //     key: fs.readFileSync('./ssl/privatekey.pem'),
        //     cert: fs.readFileSync('./ssl/certificate.pem')
        // }
        // https.createServer(httpsOption, this.app.callback()).listen(3002);
    }

    run() {
        this.init();
    }
}

new Server().run();

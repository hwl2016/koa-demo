const router = require('koa-router')();
router.prefix('/bill')

router.get('/list', async (ctx, next) => {
    ctx.body = {
        code: 200,
        data: {
            name: 'Michael',
            age: 20
        },
        msg: 'ok'
    };
})

export default router.routes();
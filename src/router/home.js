const router = require('koa-router')();
router.prefix('/home')
import { getStatic } from '../utils/url'

import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import Home from '../pages/home/home.jsx'

router.get('/index', async (ctx, next) => {
    const page = getPage(ctx, next);
    ctx.body = page;
})

function getPage(ctx, next) {
    const page = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KOA</title>
    <link rel="stylesheet" href="${getStatic('home', 'css')}">
</head>
<body>
    <div id="root">${getTemplate()}</div>
    <script src="${getStatic('home', 'js')}"></script>
</body>
</html>   
    `
    return page;
}

function getTemplate(ctx) {
    const url = ctx.req.url;
    const content = renderToString(
        // <StaticRouter
        //     location={url}
        //     context={{}}
        // >
        //     <Home />
        // <StaticRouter/>
    )
    return content
}

export default router.routes();
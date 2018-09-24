import express from 'express'
import utils from 'utility'
import bodyParser from 'body-parser'
import cookParser from 'cookie-parser'
import path from 'path'
import userRouter from './user'
import models from './model'

import csshook from 'css-modules-require-hook/preset' // 需要放在前面
import assetHook from 'asset-require-hook'
assetHook({
    extensions: ['png'],
    limit: 8000
})

import {renderToNodeStream} from 'react-dom/server'
import React from 'react'
import {Provider} from 'react-redux'
import App from '../src/app.js'
import {StaticRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../src/reducer'
import thunk from 'redux-thunk'
import staticPath from '../build/asset-manifest.json'
import axios from 'axios'
import {loadData} from '../src/redux/user.redux'

const Chat = models.getModel('chat')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})


app.use(cookParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
// app.use(function(req,res,next){
// 	if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
// 		return next()
// 	}
//     return res.sendFile(path.resolve('build/index.html'));
// })

app.use(function(req,res,next){
	if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
		return next()
	}

	const context = {}
	const store = createStore(reducers, compose(
		applyMiddleware(thunk),
	))

    res.write(`<!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <link rel="stylesheet" href="/${staticPath['main.css']}">
            <meta name="description" content="React开发招聘 App" />
            <meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
            <meta name="author" content="Imooc" >
            <title>Redux+React Router+Node.js全栈开发聊天App</title>

        </head>
        <body>
            <noscript>
            You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">`
    )

    const markupStream = renderToNodeStream(
		(<Provider store={store}>
			<StaticRouter
				location={req.url}
		        context={context}
	        >
			<App></App>
			</StaticRouter>
		</Provider>)
	)

    markupStream.pipe(res, { end: false });
    markupStream.on('end', () => {
        res.write(`
                </div>
                    <script src="/${staticPath['main.js']}"></script>
                </body>
                </html>
        `);
        res.end();
    });
})


app.use('/', express.static(path.resolve('build')))
server.listen(9093, function () {
    console.log('node start al port 9093')
})
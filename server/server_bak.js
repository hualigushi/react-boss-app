const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const userRouter = require('./user')
const models = require('./model')
const Chat = models.getModel('chat')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        //io.emit('recvmsg', data)
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

server.listen(9093, function () {
    console.log('node start al port 9093')
})
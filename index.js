
const express = require('express');
const app = express()
const http = require('http');
const serverHttp = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(serverHttp)


app.use(express.static("public"))


serverHttp.listen(3000,()=>{
    console.log('server is running on port 3000')
})


io.on('connection',(client)=>{
console.log('user connected',client.id)

client.emit('user-connected',{message:"welcome you connected now in the socket"})

client.on("push-card-in-space",(div)=>{
io.emit('push-card-in-space',div)
})

client.on('join-game',(name)=>{
io.emit('join-game',name)
})

client.on('start-game',(body)=>{
io.emit('start-game',body)
})


client.on('trump-color',(body)=>{
    io.emit('trump-color',body)
    })


    client.on('turn-round',(body)=>{
        io.emit('turn-round',body)
        })

        client.on('add-guess',(body)=>{
            io.emit('add-guess',body)
            })
            client.on('players-switch',(body)=>{
                io.emit('players-switch',body)
                })

            

})






app.get('',(req,res)=>{

res.sendFile(__dirname+'/public/main.html')


})


app.get('/test',(req,res)=>{

res.sendFile(__dirname+'/public/testl.html')


})
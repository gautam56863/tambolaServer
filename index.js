const express = require('express')
const app = express()
const port = 8080
const io = require('socket.io')(4567, {
    cors: {
        origin: ["http://localhost:3000"],
    }
})
const ids= new Set();
io.on('connection',
    socket => {
        socket.on("random-number", (num,roomId) => {
                socket.to(roomId).emit("recieve-random-number", num);
        })
        socket.on("Create-room", roomId =>{
            console.log("create-room"+roomId);
            const g=ids.has(roomId)
            if(g==false)
            {
                ids.add(roomId);
                socket.join(roomId);
            }
            console.log(ids);
            if(g==false)
            {
                console.log(1);
                socket.emit("Room Already Created","Joined Room");
            }
            else
            {
                console.log(2);
                socket.emit("Room Already Created","Room Already Created");
            }
            console.log(ids);
        })
        socket.on("join-room", roomId =>{
            // console.log(roomId);
            if(ids.has(roomId))
            socket.join(roomId);
            if(ids.has(roomId))
            {
                socket.emit("Error","Joined Room");
            }
            else
            {
                socket.emit("Error","Incorrect RoomId");
            }
        })
        socket.on("delete-room",roomId=>{
            console.log(ids);
            ids.delete(roomId);
            console.log(ids);
            console.log("Entered Delete");
        })
        socket.on("leave-room",roomId=>{
            console.log("Entered leave");
            socket.leave(roomId);
        })
        // socket.on("end-game",endGameNumber=>{
        //     socket.to(roomId).emit("end-game-player",endGameNumber);
        // })
        // socket.on("End-Game",(endGameNumber,roomId)=>{
        //     socket.to(roomId).emit("EndGameSignal",endGameNumber);
        // })
    })
app.get('/', (req, res) => res.send('Server is Running!'))
app.listen(port,()=> console.log(`Example app listening on port${port}!`))
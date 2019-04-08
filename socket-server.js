'use strict'

var socketIO = require('socket.io');
var ot = require('ot');
var roomList = {};

module.exports = function(server){

    var str = "";


    var io =  socketIO(server);
    io.on('connection',function(socket){


        socket.on('joinRoom',function(data){

            if(!roomList[data.room]) {
                var socketIOserver = new ot.EditorSocketIOServer(str,[],data.room,function(socket,cb){
                    var self = this;
                    //console.log("doc",self.document);
                    Task.findByIdAndUpdate(data.room,{content:self.document}, function(err){
                        if(err) {
                            return cb(false);
                        }
                        cb(true);
                    });
                    
                });
                roomList[data.room]=socketIOserver;
            }
            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);


            socket.room = data.room;
            socket.join(data.room);
        });

        socket.on('chatMessage',function(data){
            io.to(socket.room).emit('chatMessage',data);
        });

        socket.on('codeOutput',function(data){
            io.to(socket.room).emit('codeOutput',data);
        });

        socket.on('disconnect',function(){
             socket.leave(socket.room);
        });
    });
}
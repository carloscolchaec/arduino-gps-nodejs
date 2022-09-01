module.exports.respond = function(endpoint,socket){
    socket.on('chats',function(newsreel){
        endpoint.emit(newsreel);
    });
}
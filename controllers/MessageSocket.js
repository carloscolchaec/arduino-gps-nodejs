module.exports.respond = function(endpoint,socket){
    // this function now expects an endpoint as argument

    socket.on('chats',function(newsreel){

        // as is proper, protocol logic like
        // this belongs in a controller:

        endpoint.emit(newsreel); // broadcast news to everyone subscribing
                                     // to our endpoint/namespace
    });
}
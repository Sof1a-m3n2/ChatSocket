module.exports = (io) => {
  let usuarios = [];

  io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
      if(!socket.nickname){
        return;
      }else{
        usuarios.splice(usuarios.indexOf(socket.nickname), 1);
        io.sockets.emit( "nombre usuario", usuarios );
      }
    });       

    socket.on("enviar mensaje", (data) => {
      io.sockets.emit("nuevo mensaje", { mensaje: data, username: socket.nickname });
    });
    socket.on("nuevo usuario", (data, callback) => {
      if(usuarios.indexOf(data) != -1){
        callback(false);
        }else{
          callback(true);
          socket.nickname = data;
          usuarios.push(socket.nickname);
          io.sockets.emit("nombre usuario", usuarios);
        }
    });
  });
};

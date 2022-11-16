const socket = io();

var nick = "";

const mensaje = document.getElementById("mensaje");
const MessageForm = document.getElementById("mensaje-form");
const chat = document.getElementById("chat");

const nickForm = document.getElementById("nick");
const nickError = document.getElementById("error-nick");
const nickName = document.getElementById("nombre");
const users = document.getElementById("usuarios");

MessageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("enviar mensaje", mensaje.value);
  mensaje.value = "";
});

socket.on("nuevo mensaje", (data) => {
  let color = "#0269BB";
  if (data.username == nick) {
    color = "#E5E4E4";
  }
  console.log(data.username)
console.log(data)
  chat.innerHTML += `<div class="msg-area mb-2" style="background-color:${color}"><b>${data.username}</b><p class="msg">${data.mensaje}</p></div>`;
});

nickForm.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("nuevo usuario", nickName.value, (data) => {
    if (data) {
      nick = nickName.value;
      document.getElementById("nick-wrap").style.display = "none";
      document.getElementById("contenedor").style.display = "block";
    } else {
      nickError.innerHTML = `
        <div class="alert alert-danger">
          Ese usuario ya existe.
        </div>
      `;
    }
    nickName.value = "";
  });
});

socket.on("nombre usuario", (data) => {
  let html = "";
  let color = "";
  let salir = "";

  for (let i = 0; i < data.length; i++) {
    if (nick == data[i]) {
      color = "#008B8B";
      salir = '<a class="salir" href="/">Salir</a>';
    } else {
      color = "#000000";
      salir = "";
    }
    html += `<p style="color:${color}">${data[i]} ${salir}</p>`;
  }
  users.innerHTML = html;
});



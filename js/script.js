const socket = io('http://localhost:8000'); // Assuming 'io' is globally available

const form = document.getElementById('send-container');
const input = document.getElementById('textinput');

const msgContainer = document.querySelector('.container');

const append = (message, position) => {
    const element = document.createElement('div');
    element.innerHTML = message;
    element.classList.add('message');
    element.classList.add(position);
    msgContainer.append(element);
};

form.addEventListener('submit', (e) => { // Corrected 'sumbit' to 'submit'
    e.preventDefault();
    const message = input.value; // Corrected 'messageInput' to 'input'
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    input.value = ''; // Corrected 'messageInput' to 'input'
});

const name = prompt('Enter Your Name to Join');

socket.emit('new-user-joined', name);

socket.on('user-join', (data) => {
    append(`${data} joined the chat`, 'right'); // Changed `${name}` to `${data}`
});

socket.on('received', (data) => { // Changed 'recived' to 'received'
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', (data) => { // Changed 'Leave' to 'leave'
    append(`${data} Left the Chat`, 'left'); // Changed `${name}` to `${data}`
});

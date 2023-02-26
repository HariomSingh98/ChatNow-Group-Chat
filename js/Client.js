const socket = io('http://localhost:8000' ,{ transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageIn');
const messageContainer = document.querySelector('.container')

var audio = new Audio('sound.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position =='left'){
        console.log('sound is playing');
        audio.play();
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message.trim()!==''){
    append(`You: ${message}`, 'right');
    socket.emit('send', message);//make a send event
    messageInput.value = '';
   }
})

const userName = prompt("Enter your name to join ChatNow");

socket.emit('new-user-joined', userName);

socket.on('user-joined', userName=>{//send message to other about joining
    append(`${userName} joined the chat`, 'left');
})

socket.on('recieve', data=>{//send your input message to the group
    append(`${data.userName }: ${data.message}`, 'left');
})

socket.on('left', userName=>{//invoke the left operation
    append(`${userName } left the chat`, 'left');
})
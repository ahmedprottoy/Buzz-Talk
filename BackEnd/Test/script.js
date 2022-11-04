const socket = io('http://localhost:3003')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

const userID = name

socket.on('chat-message', (data) => {
  if(userID == data.receiver){appendMessage(`${data.sender}: ${data.message}`)}
  
})

// socket.on('user-connected', name => {
//   appendMessage(`${name} connected`)
// })

// socket.on('user-disconnected', name => {
//   appendMessage(`${name} disconnected`)
// })

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  let str = message.split('/')
  appendMessage(`You: ${str[3]}`)
  console.log(str[0]);
  socket.emit('send-chat-message', {message: str[3], sender: str[0], receiver: str[1], conversationID: str[2]})
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
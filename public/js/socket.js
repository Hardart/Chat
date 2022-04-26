import { messageList } from './variables.js'
import chatApi from './components/chatMessages.js'
const socket = io()
let nsSocket = ''
const clientsCount = document.querySelector('.users-count')
const messageForm = document.querySelector('.message-form')
const usersOnline = document.querySelector('.users-online')

socket.on('clients-count', (users) => {
	chatApi.setUsersOnline(usersOnline, users, clientsCount)
})

socket.on('clients-disconnect', (users) => {
	chatApi.setUsersOnline(usersOnline, users, clientsCount)
})

socket.on('sendMessage', (msg) => {
	messageList.innerHTML += chatApi.newMessage(msg)
	const div = messageList.lastElementChild
	div.scrollIntoView({ block: 'start', behavior: 'smooth' })
})

socket.on('messageHistory', (historyArr) => {
	messageList.innerHTML = ''
	historyArr.forEach((msg) => {
		messageList.innerHTML += chatApi.newMessage(msg)
	})
	if (messageList.children.length > 0) {
		const div = messageList.lastElementChild
		div.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}
})

messageForm.addEventListener('submit', chatApi.clickSubmitBtn)

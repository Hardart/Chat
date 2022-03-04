const socket = io()
let nsSocket = ''
const clientsCount = document.querySelector('.users-count')
const messageForm = document.querySelector('.message-form')
const messageList = document.querySelector('.messages')
const usersOnline = document.querySelector('.users-online')

socket.on('clients-count', (users) => {
	setUsersOnline(usersOnline, users, clientsCount)
})

socket.on('clients-disconnect', (users) => {
	setUsersOnline(usersOnline, users, clientsCount)
})

socket.on('sendMessage', (msg) => {
	messageList.innerHTML += newMessage(msg)
	const div = messageList.lastElementChild
	div.scrollIntoView({ block: 'start', behavior: 'smooth' })
})

socket.on('messageHistory', (historyArr) => {
	messageList.innerHTML = ''
	historyArr.forEach((msg) => {
		messageList.innerHTML += newMessage(msg)
	})
	if (messageList.children.length > 0) {
		const div = messageList.lastElementChild
		div.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}
})

messageForm.addEventListener('submit', clickSubmitBtn)

function clickSubmitBtn(e) {
	e.preventDefault()
	const userName = document.querySelector('#user-name').innerText
	const chatInput = document.querySelector('.chat-input')

	if (chatInput.value.trim() != '') {
		socket.emit('newMessage', { text: chatInput.value, username: userName })
		chatInput.value = ''
	}
}

function newMessage(msg) {
	const options = {
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	}

	return `<li class="uk-flex">
		<div class="uk-width-auto">
			<img src=${msg.avatar} width="40px" />
		</div>
		<div class="uk-width-expand message-body uk-light">
			<h5 class="message-user-name">${msg.username} <span class="uk-text-small uk-text-muted">${new Date(msg.time).toLocaleString('ru', options)}</span></h5>
			<p class="message-text">${msg.text}</p>
		</div>
	</li>`
}

function newUser(name) {
	return `<li>${name}</li>`
}

function setUsersOnline(ulList, arrayOfUsers, clients) {
	let arr = []
	ulList.innerHTML = ''
	arrayOfUsers.forEach((i) => {
		const user = JSON.parse(`{"id":"${i.split('=').join('","name":"')}"}`)
		ulList.innerHTML += newUser(user.name)
		arr.push(user)
	})
	clients.innerText = arr.length
}

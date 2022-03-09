const socket = io()
let nsSocket = ''
const clientsCount = document.querySelector('.users-count')
const messageForm = document.querySelector('.message-form')
const usersOnline = document.querySelector('.users-online')

socket.on('clients-count', (users) => {
	// setUsersOnline(usersOnline, users, clientsCount)
})

socket.on('clients-disconnect', (users) => {
	setUsersOnline(usersOnline, users, clientsCount)
})

socket.on('sendMessage', (msg) => {
	messageList.innerHTML += newMessage(msg)
	const div = messageList.lastElementChild
	div.scrollIntoView({ block: 'start', behavior: 'smooth' })
})

// socket.on('messageHistory', (historyArr) => {
// 	messageList.innerHTML = ''
// 	historyArr.forEach((msg) => {
// 		messageList.innerHTML += newMessage(msg)
// 	})
// 	if (messageList.children.length > 0) {
// 		const div = messageList.lastElementChild
// 		div.scrollIntoView({ block: 'start', behavior: 'smooth' })
// 	}
// })

messageForm.addEventListener('submit', clickSubmitBtn)

function clickSubmitBtn(e) {
	e.preventDefault()
	const chatInput = document.querySelector('.chat-input')

	if (chatInput.value.trim() != '') {
		socket.emit('newMessage', { userId: userChatID.innerText, text: chatInput.value, username: userName.innerText, avatar: userAvatarBig.getAttribute('src') })
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
		<div class="uk-width-auto ">
			<img src=${msg.avatar} width="40px" />
		</div>
		<div class="uk-width-expand message-body uk-light">
			<h5 class="message-user-name">${msg.username} <span class="uk-text-small uk-text-muted">${new Date(msg.time).toLocaleString('ru', options)}</span></h5>
			<p class="message-text">${msg.text}</p>
		</div>
	</li>`
}

function newUser(user) {
	return `<li>
				<div class="uk-card uk-grid-collapse uk-flex-middle" uk-grid>
					<div class="uk-card-media-left uk-margin-small-right">
						<img src="${user.avatar}" width="30" alt="" />
					</div>
					<div>
						<h5 class="user-name">${user.name}</h5>
					</div>
				</div>
			</li>`
}

function setUsersOnline(ulList, arrayOfUsers, clients) {
	let arr = []
	ulList.innerHTML = ''
	arrayOfUsers.forEach((i) => {
		const user = JSON.parse(i)
		ulList.innerHTML += newUser(user)
		arr.push(user)
	})
	clients.innerText = arr.length
}

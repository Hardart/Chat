const socket = io()
let nsSocket = ''
const clientsCount = document.querySelector('.users-count')
const messageForm = document.querySelector('.message-form')
const messageList = document.querySelector('.messages')

socket.on('clients-count', (count) => {
	clientsCount.innerText = count
})

socket.on('clients-disconnect', (count) => {
	clientsCount.innerText = count
})

socket.on('sendMessage', (msg) => {
	messageList.innerHTML += newMessage(msg)
	const div = messageList.lastElementChild
	div.scrollIntoView({ block: 'start', behavior: 'smooth' })
})

socket.on('messageHistory', (historyArr) => {
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
			<h5 class="message-user-name">${msg.username} <span class="uk-text-small uk-text-muted">${new Date(msg.time).toLocaleString(
		'ru',
		options
	)}</span></h5>
			<p class="message-text">${msg.text}</p>
		</div>
	</li>`
}
/*
// получаем от сервера с массив со всеми Namespaces
socket.on('nsList', (nsData) => {
	let namespacesDiv = document.querySelector('.namespaces')
	namespacesDiv.innerHTML = ''
	nsData.forEach((ns) => {
		namespacesDiv.innerHTML += `<div class="namespace${ns.active}" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`
	})

	// вешаем обработчик Клика на одну из NS и получает список комнат
	const nsItems = document.querySelectorAll('.namespace')
	const activeel = activeElement(nsItems)

	nsItems.forEach((nsItem) => {
		nsItem.onclick = () => {
			Array.from(nsItems)
				.find((el) => el.classList.contains('active'))
				.classList.remove('active')
			nsItem.classList.add('active')
			const nsEndpoint = nsItem.getAttribute('ns')
			joinNS(nsEndpoint)
		}
	})

	joinNS(activeel.getAttribute('ns'))
})

function activeElement(elements) {
	const el = Array.from(elements).find((el) => el.classList.contains('active'))
	if (el) return el
	elements[0].classList.add('active')
	return elements[0]
}
*/

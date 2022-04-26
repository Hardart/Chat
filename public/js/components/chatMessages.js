export default {
	clickSubmitBtn: (e, socket) => {
		e.preventDefault()
		const chatInput = document.querySelector('.chat-input')

		if (chatInput.value.trim() != '') {
			socket.emit('newMessage', {
				userId: userChatID.innerText,
				text: chatInput.value,
				username: userName.innerText,
				avatar: userAvatarBig.getAttribute('src'),
			})
			chatInput.value = ''
		}
	},

	newMessage: (msg) => {
		const options = {
			timezone: 'UTC',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		}
		const messageDate = new Date(msg.time).toLocaleString('ru', options)
		return `<li class="uk-flex">
         <div class="uk-width-auto ">
            <img src=${msg.avatar} width="40px" />
         </div>
         <div class="uk-width-expand message-body uk-light">
            <h5 class="message-user-name">${msg.username} <span class="uk-text-small uk-text-muted">${messageDate}</span></h5>
            <p class="message-text">${msg.text}</p>
         </div>
      </li>`
	},

	newUser: (user) => {
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
	},

	setUsersOnline: function(usersList, usersArray, clientsCount) {
		let count
		usersList.innerHTML = ''
		usersArray.forEach((user, i) => {
			usersList.innerHTML += this.newUser(JSON.parse(user))
			count = i + 1
		})
		clientsCount.innerText = count
	},
}

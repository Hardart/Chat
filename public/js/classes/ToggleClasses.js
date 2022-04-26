export default class Toggle {
	constructor(className, app) {
		this.app = app
		this.listClass = className
		this.menuItem = settingsListItems
		this.isCardShow = false
	}

	get listItems() {
		return this.menuItem
	}

	elementSize(el) {
		return el.getBoundingClientRect()
	}

	selectMenuItem() {
		const menuList = [...document.querySelectorAll(this.listClass)]
		menuList.forEach((listItem, key) => {
			listItem.onclick = () => {
				if (listItem.classList.contains('uk-nav-header')) return
				menuList.filter((item, i) => {
					if (item.classList.contains('uk-active')) {
						item.classList.remove('uk-active')
						document.querySelector(this.menuItem[i - 1].selector).classList.add('uk-hidden')
					}
				})
				listItem.classList.add('uk-active')
				document.querySelector(this.menuItem[key - 1].selector).classList.remove('uk-hidden')
			}
		})
	}

	selectUserOnline() {
		const usersOnlineList = document.querySelector(this.listClass)
		const clickableUsers = usersOnlineList.querySelectorAll('.clickable')
		const card = document.querySelector('.user-card')
		const cardSize = this.elementSize(card)
		card.remove()
		clickableUsers.forEach((userListItem, key) => {
			userListItem.onclick = () => {
				const selestedUser = usersOnlineList.querySelector('.selected')
				selestedUser ? this.toggleSelectedClass(userListItem, selestedUser) : this.addSelectedClass(userListItem)
				if (!userListItem.classList.contains('selected')) return card.remove()
				this.showUserCard(card, cardSize, userListItem)
			}
		})
	}

	showUserCard(card, cardSize, userItem) {
		card.remove()
		const elSize = this.elementSize(userItem)
		card.style.left = `${elSize.x - cardSize.width - 10}px`
		card.style.top = `${elSize.y}px`
		this.app.insertAdjacentElement('afterend', card)
	}

	addSelectedClass(user) {
		user.classList.toggle('clickable')
		user.classList.toggle('selected')
	}

	toggleSelectedClass(activeUser, selestedUser) {
		this.addSelectedClass(activeUser)

		selestedUser.classList.add('clickable')
		selestedUser.classList.remove('selected')
	}
}

const settingsListItems = [
	{ id: '1', title: 'NOT USED', selector: '.my-acc' },
	{ id: '2', title: 'account', selector: '.my-friends' },
	{ id: '3', title: 'friends', selector: '.my-acc' },
	{ id: '4', title: 'account', selector: '.my-acc' },
	{ id: '5', title: 'account', selector: '.my-acc' },
	{ id: '6', title: 'account', selector: '.my-acc' },
	{ id: '7', title: 'account', selector: '.my-acc' },
	{ id: '8', title: 'account', selector: '.my-acc' },
	{ id: '9', title: 'account', selector: '.my-acc' },
	{ id: '10', title: 'account', selector: '.my-acc' },
]

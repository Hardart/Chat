export default function settingsListClick() {
	const settingsList = document.querySelectorAll('.user-setup-list li')
	const myAccount = document.querySelector('.my-acc')

	settingsList.forEach((listItem, key) => {
		listItem.onclick = () => {
			if (listItem.classList.contains('uk-nav-header')) return
			const item = [...settingsList].filter((item) => {
				return item.classList.contains('uk-active')
			})
			item[0].classList.remove('uk-active')
			listItem.classList.add('uk-active')
			if (settingsList[1].classList.contains('uk-active')) {
				myAccount.classList.remove('uk-hidden')
			} else {
				myAccount.classList.add('uk-hidden')
			}
		}
	})
}

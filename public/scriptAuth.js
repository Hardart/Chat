const btn = document.querySelector('button')
const inputs = [...document.querySelectorAll('input')]

btn.onclick = (e) => {
	let isValidate = inputs.every((input) => {
		input.setCustomValidity('')
		if (input.value.trim() === '') {
			input.value = ''
			input.setCustomValidity('Поле не может быть пустым')
		}
		return input.reportValidity()
	})
	if (isValidate) {
		inputs[2].setCustomValidity('')
		if (inputs[2].value.length >= 3 && inputs[2].value !== inputs[3].value) {
			inputs[2].setCustomValidity('Пароли не совавдают')
			inputs[2].reportValidity()
			isValidate = false
		}
	}
	return isValidate
}

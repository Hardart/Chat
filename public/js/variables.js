const chatApp = document.querySelector('.chat-container') // основной контейнер чата
const usersAsidePanel = document.querySelector('.users-panel') // боковая панель пользователей
const usersSettingsPanel = document.querySelector('.settings-container') // основное окно настроек пользователя
const closeButton = document.querySelector('[uk-close]')
const blockAvatar = document.querySelector('.avatar-block')
const selectAvatar = document.querySelector('.select-avatar')
const uploadAvatar = document.querySelector('form')
const inputElement = document.querySelector('.number-input')
const slider = document.querySelector('.track')
const selectAvatarInput = document.getElementById('select-avatar-input')

const setupAvatarBtn = document.getElementById('setupAvatar')
const cancelSetupAvatarBtn = document.getElementById('cancelSetupAvatar')
const userAvatarBig = document.querySelector('.user-avatar img')
const userAvatarSmall = document.querySelector('.user-profile-container img')
const userName = document.querySelector('.uk-user-name span')
const userChatID = document.querySelector('.uk-user-chat-id span')
const messageList = document.querySelector('.messages')

usersSettingsPanel.remove()
selectAvatar.remove()

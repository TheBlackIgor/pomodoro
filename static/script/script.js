let optPomodoro = document.getElementById('pomodoro')
let optSettings = document.getElementById('settings')
let clockContainer = document.getElementById('clockContainer')
let settings = document.getElementById('settingsContainer')

const handleShowPomodoro = () => {
    optPomodoro.classList.add('picked')
    optSettings.classList.remove('picked')
    clockContainer.classList.remove('hide')
    settings.classList.add('hide')
}

const handleShowSettings = () => {
    optPomodoro.classList.remove('picked')
    optSettings.classList.add('picked')
    clockContainer.classList.add('hide')
    settings.classList.remove('hide')
}

optPomodoro.addEventListener("click", handleShowPomodoro)
optSettings.addEventListener("click", handleShowSettings)



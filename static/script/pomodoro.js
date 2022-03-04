//Jak coś to przenieś to do html jak będzie łatwiej
let duration = 25
let shortBreak = 5
let longBreak = 10
let after = 4
let dailyGoal = 5
let state = ''  //state w jakim jest nasz timer
let pomodoroTime = 0
let breakCount = 0
let tasks = []
let pomodoroCount = 1

let hours = 0
let minutes = 0
let seconds = 0

let timer = document.getElementById('timer')
let start = document.getElementById('start')
let pause = document.getElementById('pause')
let reset = document.getElementById('reset')

let clock = document.getElementById('clock')

let autoBreak = false
let autoPomodoros = false
let pauseBool = false

//ustawia czas
let handleSetPomodoro = () => {
    clock.style.backgroundColor = "rgb(255, 81, 81)"
    console.log('setTimer')
    pomodoroTime = duration * 60
    hours = parseInt(pomodoroTime / 3600)
    pomodoroTime = pomodoroTime % 3600
    minutes = parseInt(pomodoroTime / 60)
    pomodoroTime = pomodoroTime % 60
    seconds = parseInt(pomodoroTime)

    pomodoroCount++
    document.getElementById('pomodoroNr').innerHTML == pomodoroCount

    setUpTimer()
}

//format wyświetlanego czasu
let setUpTimer = () => {
    hours = formatTime(hours)
    minutes = formatTime(minutes)
    seconds = formatTime(seconds)
    timer.innerHTML = `${hours} : ${minutes} : ${seconds}`
}
let formatTime = n => {
    n = n.toString()
    n.length == 1 ? n = "0" + n : n = n
    return n
}

//start pomodoro
let startTimer = () => {
    state = 'pomodoro'
}

//Obsługa zmiany czasu
let handleTimerChange = () => {
    if (state === 'pomodoro' || state === 'break') {
        hours = parseInt(hours)
        minutes = parseInt(minutes)
        seconds = parseInt(seconds)

        seconds--
        if (seconds < 0 && ((minutes > 0 && hours > 0) || minutes > 0)) {
            minutes--
            seconds = 59
        }
        if (minutes < 0 && hours > 0) {
            hours--
            minutes = 59
        }
        if (state == 'pomodoro' && hours === 0 && minutes === 0 && seconds === 0) {
            state = 'break'
            handleBreak()
            if (!autoBreak) state = 'pause'
        } else if (state == 'break' && hours === 0 && minutes === 0 && seconds === 0) {
            state = 'pomodoro'
            console.log('time for pomodoro')
            handleSetPomodoro()
            if (!autoPomodoros) state = 'pause'
        }
        setUpTimer()
    }
}

//obsługa przerw
let handleBreak = () => {
    breakCount++
    if (after === breakCount) {
        clock.style.backgroundColor = 'rgb(121, 152, 255)'
        console.log('setTimer')
        pomodoroTime = longBreak * 60
        hours = parseInt(pomodoroTime / 3600)
        pomodoroTime = pomodoroTime % 3600
        minutes = parseInt(pomodoroTime / 60)
        pomodoroTime = pomodoroTime % 60
        seconds = parseInt(pomodoroTime)

        setUpTimer()
    } else {
        clock.style.backgroundColor = 'rgb(132, 255, 121)'
        console.log('setTimer')
        pomodoroTime = shortBreak * 60
        hours = parseInt(pomodoroTime / 3600)
        pomodoroTime = pomodoroTime % 3600
        minutes = parseInt(pomodoroTime / 60)
        pomodoroTime = pomodoroTime % 60
        seconds = parseInt(pomodoroTime)

        setUpTimer()
    }
}

//obsługa pauzy
let pauseTimer = () => {
    state = 'pause'
    console.log(state)
}
let handleReset = () => {
    clock.style.backgroundColor = "rgb(255, 81, 81)"
    console.log('setTimer')
    pomodoroTime = duration * 60
    hours = parseInt(pomodoroTime / 3600)
    pomodoroTime = pomodoroTime % 3600
    minutes = parseInt(pomodoroTime / 60)
    pomodoroTime = pomodoroTime % 60
    seconds = parseInt(pomodoroTime)

    pomodoroCount = 1
    document.getElementById('pomodoroNr').innerHTML == pomodoroCount

    breakCount = 0

    state = 'pause'

    setUpTimer()
}

start.addEventListener('click', startTimer)
pause.addEventListener('click', pauseTimer)
reset.addEventListener('click', handleReset)

window.onload = () => {
    handleSetPomodoro()
    window.setInterval(handleTimerChange, 1000)
}

//Ustawienia

durationInp = document.getElementById('duration')
shortBreakInp = document.getElementById('shortBreak')
longBreakInp = document.getElementById('longBreak')
afterInp = document.getElementById('after')
dailyGoalInp = document.getElementById('dailyGoal')

durationInp.addEventListener('change', e => {
    if (e.target.value < 1) {
        duration = 1
        durationInp.value = 1
    } else {
        duration = e.target.value
    }
    console.log('duration = ' + duration)
    handleSetPomodoro()
    state = 'pause'
})
shortBreakInp.addEventListener('change', e => {
    if (e.target.value < 1) {
        shortBreak = 1
        shortBreakInp.value = 1
    } else {
        shortBreak = e.target.value
    }
    console.log('shortBreak = ' + shortBreak)
    handleSetPomodoro()
})
longBreakInp.addEventListener('change', e => {
    if (e.target.value < 1) {
        longBreak = 1
        longBreakInp.value = 1
    } else {
        longBreak = e.target.value
    }
    console.log('longBreak = ' + longBreak)
    handleSetPomodoro()
    state = 'pause'
})
afterInp.addEventListener('change', e => {
    if (e.target.value < 1) {
        after = 1
        afterInp.value = 1
    } else {
        after = e.target.value
    }
    console.log('after = ' + after)
    handleSetPomodoro()
    state = 'pause'
})
dailyGoalInp.addEventListener('change', e => {
    if (e.target.value < 1) {
        dailyGoal = 1
        dailyGoalInp.value = 1
    } else {
        dailyGoal = e.target.value
    }
    console.log('dailyGoal = ' + dailyGoal)
    handleSetPomodoro()
    state = 'pause'
})
let handleSetValues = (v1, v2, v3, v4, v5) => {
    duration = v1
    durationInp.value = v1
    shortBreak = v2
    shortBreakInp.value = v2
    longBreak = v3
    longBreakInp.value = v3
    after = v4
    afterInp.value = v4
    dailyGoal = v5
    dailyGoalInp.value = v5
}
document.getElementById('sc1').addEventListener('click', () => {
    handleSetValues(25, 5, 10, 4, 5)
    handleSetPomodoro()
    state = 'pause'
})
document.getElementById('sc2').addEventListener('click', () => {
    handleSetValues(30, 2, 25, 4, 5)
    handleSetPomodoro()
    state = 'pause'
})
document.getElementById('sc3').addEventListener('click', () => {
    handleSetValues(50, 10, 20, 2, 5)
    handleSetPomodoro()
    state = 'pause'
})

autoBreakInp = document.getElementById('autoBreak')
autoPomodorosInp = document.getElementById('autoPomodoro')

autoBreakInp.addEventListener('change', () => {
    autoBreak ? autoBreak = false : autoBreak = true
})
autoPomodorosInp.addEventListener('change', () => {
    autoPomodoros ? autoPomodoros = false : autoPomodoros = true
})
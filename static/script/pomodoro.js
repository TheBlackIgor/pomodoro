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

let obecneZadania = []

var songs = document.getElementById("songs"),
    myAudio = document.getElementById("myAudio");

function next(n) {
    var url = URL.createObjectURL(files[n]);
    myAudio.setAttribute('src', url);
    myAudio.play();
}
var _next = 0,
    files,
    len;
songs.addEventListener('change', function () {
    files = songs.files;
    len = files.length;
    if (len) {
        // next(_next);
    }
});
// myAudio.addEventListener("ended", function(){
//    _next += 1;
//    next(_next);
//    console.log(len, _next);
//    if((len-1)==_next){
//      _next=-1;
//    }
// });

function testDzwieku() {
    next(_next)
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(cssLinkIndex).replaceChild(newlink, oldlink);
}

themeSwitch = document.getElementById("themeSwitch")
let lightMode = true

themeSwitch.addEventListener('change', () => {
    if (lightMode) {
        changeCSS('./cssDark/styleDark.css', 0)
        lightMode = false
    } else {
        changeCSS('./css/style.css', 0)
        lightMode = true
    }
})

function fetchPostZaladuj() {
    pomodoroCount = 1
    console.log(pomodoroCount)

    fetch("/", { method: "post" })
        .then(response => response.json())
        .then(
            data => {
                console.log(data)
                let list = ""

                obecneZadania = data
                for (let x = 0; x < data.length; x++) {

                    if (x % 2 == 0) {
                        list += `<div class="listOne">Opis zadania: ${data[x].opis} | Kategoria: ${data[x].kategoria}</div><br>`
                    } else {
                        list += `<div class="listTwo">Opis zadania: ${data[x].opis} | Kategoria: ${data[x].kategoria}</div><br>`
                    }
                }
                if (obecneZadania.length > 0) {
                    document.getElementById("list").innerHTML = ""
                    document.getElementById("list").innerHTML += list
                    document.getElementById("newTaskName").value = ""
                    document.getElementById("newTaskCategory").value = ""
                    document.getElementById("taskDesc").innerHTML = ""
                    document.getElementById("taskDesc").innerHTML += `${obecneZadania[0].opis}`
                    document.getElementById("taskCat").innerHTML = ""
                    document.getElementById("taskCat").innerHTML += `${obecneZadania[0].kategoria}`
                } else {
                    document.getElementById("taskDesc").innerHTML = ""
                    document.getElementById("taskDesc").innerHTML += `-`
                    document.getElementById("taskCat").innerHTML = ""
                    document.getElementById("taskCat").innerHTML += `-`
                }
            }
        )
}

function fetchPostZaladujH() {
    fetch("/h", { method: "post" })
        .then(response => response.json())
        .then(
            data => {
                console.log(data)
                let list = ""


                for (let x = 0; x < data.length; x++) {

                    if (x % 2 == 0) {
                        list += `<div class="listOne">Pomodoro  session nr.${x + 1}: ${String(data[x].length)},${data[x].short},${data[x].long},${data[x].after},${data[x].goal}</div><br>`
                    } else {
                        list += `<div class="listTwo">Pomodoro session nr.${x + 1}: ${String(data[x].length)},${data[x].short},${data[x].long},${data[x].after},${data[x].goal}</div><br>`
                    }
                }
                if (data.length > 0) {
                    document.getElementById("historyList").innerHTML = ""
                    document.getElementById("historyList").innerHTML += list
                }
            }
        )
}

function fetchPostDodajTask() {
    let opis = document.getElementById("newTaskName").value
    let kategoria = document.getElementById("newTaskCategory").value

    const body = JSON.stringify({ opis: opis, kategoria: kategoria })
    const headers = { "Content-Type": "application/json" }
    fetch("/add", { method: "post", body, headers })
        .then(response => response.json())
        .then(
            data => {
                let list = ""
                console.log(data)
                obecneZadania = data
                for (let x = 0; x < data.length; x++) {
                    console.log(data[x])
                    if (x % 2 == 0) {
                        list += `<div class="listOne">Opis zadania: ${data[x].opis} | Kategoria: ${data[x].kategoria}</div><br>`
                    } else {
                        list += `<div class="listTwo">Opis zadania: ${data[x].opis} | Kategoria: ${data[x].kategoria}</div><br>`
                    }

                }
                console.log(list)
                document.getElementById("list").innerHTML = ""
                document.getElementById("list").innerHTML += list
                document.getElementById("newTaskName").value = ""
                document.getElementById("newTaskCategory").value = ""
                console.log("TEST DANYCH ")
                console.log(obecneZadania)
            }
        )

}

function fetchPostUstawTask() {
    if (obecneZadania.length > 0) {
        document.getElementById("taskDesc").innerHTML = ""
        document.getElementById("taskDesc").innerHTML += `${obecneZadania[0].opis}`
        document.getElementById("taskCat").innerHTML = ""
        document.getElementById("taskCat").innerHTML += `${obecneZadania[0].kategoria}`
    } else {
        document.getElementById("taskDesc").innerHTML = ""
        document.getElementById("taskDesc").innerHTML += `-`
        document.getElementById("taskCat").innerHTML = ""
        document.getElementById("taskCat").innerHTML += `-`
    }
    if (obecneZadania === null) {
        document.getElementById("taskDesc").innerHTML = ""
        document.getElementById("taskDesc").innerHTML += `-`
        document.getElementById("taskCat").innerHTML = ""
        document.getElementById("taskCat").innerHTML += `-`
    }
}

function fetchPostUsunTask() {
    if (obecneZadania.length > 0) {
        let id_usuwanego = obecneZadania[0]._id
        const body = JSON.stringify({ id: id_usuwanego })
        const headers = { "Content-Type": "application/json" }
        fetch("/del", { method: "post", body, headers })
            .then(response => response.json())
            .then(
                data => {
                    let list = ""
                    console.log(data)
                    obecneZadania = data
                    for (let x = 0; x < data.length; x++) {
                        console.log(data[x])
                        if (x % 2 == 0) {
                            list += `<div class="listOne">Opis zadania: ${data[x].opis} | Kategoria: ${data[x].kategoria}</div><br>`
                        } else {
                            list += `<div class="listTwo">Opis zadania: ${data[x].opis} | Kategoria: ${data[x].kategoria}</div><br>`
                        }

                    }
                    console.log(list)
                    document.getElementById("list").innerHTML = ""
                    document.getElementById("list").innerHTML += list
                    document.getElementById("newTaskName").value = ""
                    document.getElementById("newTaskCategory").value = ""
                    console.log("TEST DEL")
                    console.log(obecneZadania)
                }
            )
    }

}


document.getElementById("addTask").onclick = function () {
    fetchPostDodajTask()
}

fetchPostZaladuj()
fetchPostZaladujH()
window.onload = function () {
    fetchPostUstawTask()
    console.log(obecneZadania.length)
}

function fetchPostHistoria() {
    let length = durationInp.value
    let short = shortBreakInp.value
    let long = longBreakInp.value
    let after = afterInp.value
    let goal = dailyGoalInp.value
    const body = JSON.stringify({ length: length, short: short, long: long, after: after, goal: goal })
    const headers = { "Content-Type": "application/json" }
    fetch("/hist", { method: "post", body, headers })
        .then(response => response.json())
        .then(
            data => {
                console.log(data)
                let list = ""


                for (let x = 0; x < data.length; x++) {
                    console.log(data[x])
                    if (x % 2 == 0) {
                        list += `<div class="listOne">Pomodoro session nr.${x + 1}: ${String(data[x].length)},${data[x].short},${data[x].long},${data[x].after},${data[x].goal}</div><br>`
                    } else {
                        list += `<div class="listTwo">Pomodoro session nr.${x + 1}: ${data[x].length},${data[x].short},${data[x].long},${data[x].after},${data[x].goal}</div><br>`
                    }
                }
                if (data.length > 0) {
                    document.getElementById("historyList").innerHTML = ""
                    document.getElementById("historyList").innerHTML += list
                }
            }
        )

}
//ustawia czas
let handleSetPomodoro = () => {
    fetchPostUstawTask()
    clock.style.backgroundColor = "rgb(255, 81, 81)"
    console.log('setTimer')
    pomodoroTime = duration * 60
    hours = parseInt(pomodoroTime / 3600)
    pomodoroTime = pomodoroTime % 3600
    minutes = parseInt(pomodoroTime / 60)
    pomodoroTime = pomodoroTime % 60
    seconds = parseInt(pomodoroTime)

    console.log("??????")
    if (state === "pomodoro") {
        pomodoroCount++
    }
    document.getElementById('pomodoroNr').innerHTML = ""
    document.getElementById('pomodoroNr').innerHTML += pomodoroCount

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
    fetchPostUstawTask()
}

//Obsługa zmiany czasu
let handleTimerChange = () => {
    if (state === 'pomodoro') {

    }
    if (state === 'pomodoro' || state === 'break') {

        if (state === 'break') {

        }
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
            fetchPostUsunTask()
            testDzwieku()
            state = 'break'
            handleBreak()
            if (!autoBreak) state = 'pause'
        } else if (state === 'break' && hours === 0 && minutes === 0 && seconds === 0) {
            state = 'pomodoro'
            console.log('time for pomodoro')
            handleSetPomodoro()
            if (!autoPomodoros) state = 'pause'
            console.log("TEST: " + breakCount + "," + dailyGoal)
            if (breakCount == dailyGoal) {
                fetchPostHistoria()
                handleReset()
            }
        }
        setUpTimer()
    }

}

//obsługa przerw
let handleBreak = () => {
    breakCount++
    document.getElementById("taskDesc").innerHTML = ""
    document.getElementById("taskDesc").innerHTML += `break`
    document.getElementById("taskCat").innerHTML = ""
    document.getElementById("taskCat").innerHTML += `break`
    if (after === breakCount) {
        clock.style.backgroundColor = 'rgb(121, 152, 255)'
        console.log('long break')
        pomodoroTime = longBreak * 60
        hours = parseInt(pomodoroTime / 3600)
        pomodoroTime = pomodoroTime % 3600
        minutes = parseInt(pomodoroTime / 60)
        pomodoroTime = pomodoroTime % 60
        seconds = parseInt(pomodoroTime)

        setUpTimer()
    } else {
        clock.style.backgroundColor = 'rgb(132, 255, 121)'
        console.log('short break')
        pomodoroTime = shortBreak * 60
        hours = parseInt(pomodoroTime / 3600)
        pomodoroTime = pomodoroTime % 3600
        minutes = parseInt(pomodoroTime / 60)
        pomodoroTime = pomodoroTime % 60
        seconds = parseInt(pomodoroTime)

        setUpTimer()
    }
    // console.log("TEST: " + breakCount + "," + dailyGoal)
    // if(breakCount == dailyGoal){
    //     handleReset()
    // }

}

//obsługa pauzy
let pauseTimer = () => {
    state = 'pause'
    console.log(state)
}
let handleReset = () => {
    fetchPostUstawTask()
    clock.style.backgroundColor = "rgb(255, 81, 81)"
    console.log('setTimer')
    pomodoroTime = duration * 60
    hours = parseInt(pomodoroTime / 3600)
    pomodoroTime = pomodoroTime % 3600
    minutes = parseInt(pomodoroTime / 60)
    pomodoroTime = pomodoroTime % 60
    seconds = parseInt(pomodoroTime)

    pomodoroCount = 1
    document.getElementById('pomodoroNr').innerHTML = ""
    document.getElementById('pomodoroNr').innerHTML += pomodoroCount

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


document.getElementById('apply').addEventListener('click', () => {
    let val = document.getElementById('settingInp').value
    console.log(val)
    let tab = []
    let num = ''
    for (let i = 0; i < val.length; i++) {
        console.log(parseInt(val[i]))
        if (parseInt(val[i])) {
            num += val[i]
        }
        else if (num.length > 0) {
            tab.push(parseInt(num))
            num = ''
        }
        if (tab.length === 5) break;
    }
    if (num !== '') {
        tab.push(parseInt(num))
    }
    for (let i = tab.length; i < 5; i++) tab.push(0)
    handleSetValues(tab[0], tab[1], tab[2], tab[3], tab[4])
    handleSetPomodoro()
    state = 'pause'
})

rangeVolume = document.getElementById("range")

rangeVolume.addEventListener('change', function () {
    myAudio.volume = rangeVolume.value / 100
})

var songs = document.getElementById("songs"),
    myAudio = document.getElementById("myAudio");
function next(n) {
    if (songs.value != null) {
        var url = URL.createObjectURL(files[n]);
        myAudio.setAttribute('src', url);
        myAudio.play();
        const myTimeout = setTimeout(stopMusic, 15000)
    }
}
function stopMusic() {
    myAudio.pause()
}
var _next = 0,
    files,
    len;
songs.addEventListener('change', function () {
    files = songs.files;
    len = files.length;
    if (len) {
        // next(_next);
    }
});
// myAudio.addEventListener("ended", function(){
//    _next += 1;
//    next(_next);
//    console.log(len, _next);
//    if((len-1)==_next){
//      _next=-1;
//    }
// });

function testDzwieku() {
    next(_next)

}

rangeVolume = document.getElementById("range")

rangeVolume.addEventListener('change', function () {
    myAudio.volume = rangeVolume.value / 100
})

const apikey = "65b872123d3b7f1a90c26558"

document.getElementById('navstudy').addEventListener('click', function() {
    document.getElementById('studycontainer').classList.toggle('hidden')
})

document.getElementById('closestudycontainer').addEventListener('click', function() {
    document.getElementById('studycontainer').classList.toggle('hidden')
})

document.getElementById('closerewardcontainer').addEventListener('click', function() {
    document.getElementById('rewardcontainer').classList.toggle('hidden')
})

document.getElementById('hourslider').addEventListener('change', function() {
    document.getElementById('sliderdisplay').innerHTML = `${document.getElementById('hourslider').value} Hours`
    document.getElementById('coinsearned').innerHTML = `${(document.getElementById('hourslider').value)*10} Coins`
    document.getElementById('xpearned').innerHTML = `${document.getElementById('hourslider').value}0,000 XP`
})

// Start Study Session
function updateTime() {
    if (document.hasFocus()) {
        if (localStorage.getItem('studysessionsec') == 0) {
            endStudy
        } else {
            document.getElementById('focuscontainer').classList.add("hidden")
            let seconds = localStorage.getItem('studysessionsec')
            const hr = Math.floor(seconds / 3600)
            const min = Math.floor((seconds % 3600) / 60)
            const sec = seconds % 60


            document.getElementById('sessionhours').innerHTML = hr
            document.getElementById('sessionmins').innerHTML = min
            document.getElementById('sessionsecs').innerHTML = sec

            localStorage.setItem('studysessionsec',localStorage.getItem('studysessionsec')-1)
        }
      } else {
        console.log('Stay Focused!')
        document.getElementById('focuscontainer').classList.remove("hidden")
      }
}

function endStudy() {
    stopTimeDisplay()

    document.getElementById('rewardcontainer').classList.toggle('hidden')
    document.getElementById('coinsreward').innerHTML = `${localStorage.getItem('studysessioncoins')} Coins`
    document.getElementById('xpreward').innerHTML = `${localStorage.getItem('studysessionxp')} XP`
    
    localStorage.setItem('coins',Number(localStorage.getItem('coins'))+Number(localStorage.getItem('studysessioncoins')))
    localStorage.setItem('xp',Number(localStorage.getItem('xp'))+Number(localStorage.getItem('studysessionxp')))
    localStorage.setItem('studyhours',Number(localStorage.getItem('coins'))/10)
    localStorage.removeItem('studysessioncoins')
    localStorage.removeItem('studysessionxp')

    const postResponse = fetch(`https://studypal-c298.restdb.io/rest/studypalusers/${localStorage.getItem('id')}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": apikey
        },
        body: JSON.stringify({
            "username": localStorage.getItem('username'),
            "password": localStorage.getItem('password'),
            "email": localStorage.getItem('email'),
            "studyhours": localStorage.getItem('studyhours'),
            "coins": localStorage.getItem('coins'),
            "xp": localStorage.getItem('xp')
        })
    })
    console.log(postResponse.jsondata)
}

function stopTimeDisplay() {
    clearInterval(updateTimeDisplay.refresh)
    localStorage.removeItem('studysessionsec')
    localStorage.setItem('studysessionactive',false)
    document.getElementById('studysessioncontainer').classList.toggle('hidden')
}

function pauseTimeDisplay() {
    clearInterval(updateTimeDisplay.refresh)
    document.getElementById('pausestudybtn').classList.toggle('hidden')
    document.getElementById('continuestudybtn').classList.toggle('hidden')
}

function continueTimeDisplay() {
    updateTimeDisplay.refresh = setInterval(updateTime,1000)
    document.getElementById('pausestudybtn').classList.toggle('hidden')
    document.getElementById('continuestudybtn').classList.toggle('hidden')
}

function updateTimeDisplay() {
    localStorage.setItem('studysessionactive',true)
    localStorage.setItem('studysessionsec',(document.getElementById('hourslider').value)*3600)
    localStorage.setItem('studysessioncoins',(document.getElementById('hourslider').value)*10)
    localStorage.setItem('studysessionxp',(document.getElementById('hourslider').value)*10000)
    document.getElementById('studycontainer').classList.toggle('hidden')
    document.getElementById('studysessioncontainer').classList.toggle('hidden')
    updateTimeDisplay.refresh = setInterval(updateTime,1000)
}

document.getElementById('startstudybtn').addEventListener('click', updateTimeDisplay)

document.getElementById('pausestudybtn').addEventListener('click', pauseTimeDisplay)

document.getElementById('stopstudybtn').addEventListener('click', stopTimeDisplay)

document.getElementById('continuestudybtn').addEventListener('click', continueTimeDisplay)
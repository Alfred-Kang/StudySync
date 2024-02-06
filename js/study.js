document.getElementById('navstudy').addEventListener('click', function() {
    document.getElementById('studycontainer').classList.toggle('hidden')
})

document.getElementById('closestudycontainer').addEventListener('click', function() {
    document.getElementById('studycontainer').classList.toggle('hidden')
})

document.getElementById('hourslider').addEventListener('change', function() {
    document.getElementById('sliderdisplay').innerHTML = `${document.getElementById('hourslider').value} Hours`
    document.getElementById('coinsearned').innerHTML = `${(document.getElementById('hourslider').value)*10} Coins`
    document.getElementById('xpearned').innerHTML = `${document.getElementById('hourslider').value}0,000 XP`
})

document.getElementById('startstudybtn').addEventListener('click', function() {
    localStorage.setItem('studysessionmin',(document.getElementById('hourslider').value)*60)
})
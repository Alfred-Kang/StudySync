document.getElementById('navleaderboard').addEventListener('click', async function() {
    const apikey = "65b872123d3b7f1a90c26558"
    const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

    document.getElementById('leaderboardcontainer').classList.toggle('hidden')
    
    const sendResponse = await fetch(apiurl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": apikey
        }
    })
    const data = await sendResponse.json()

    function quickSort(list, xp) {
      if (list.length <= 1) {
          return list;
      }
  
      const pivot = list[Math.floor(list.length / 2)][xp];
      const left = [];
      const right = [];
  
      for (let i = 0; i < list.length; i++) {
          if (list[i][xp] > pivot) {
              left.push(list[i]);
          } else if (list[i][xp] < pivot) {
              right.push(list[i]);
          }
      }
  
      return [...quickSort(left, xp), ...list.filter(obj => obj[xp] === pivot), ...quickSort(right, xp)];
  }
  
  const sortedData = quickSort(data, 'xp');

  //creates divs for first 6 people on leaderboard
  for (let i = 0; i < 3; i++) {
    var div = document.createElement("div")
    div.className = 'h-full lg:w-4/5 w-full flex justify-between items-center bg-orange rounded-3xl m-4'
    var username = document.createElement("div")
    username.className = 'text-cream md:text-4xl text-2xl font-concert m-4'
    username.innerHTML = sortedData[i].username
    var xp = document.createElement("div")
    xp.className = 'text-cream md:text-4xl text-2xl font-concert m-4'
    xp.innerHTML = sortedData[i].xp
    div.appendChild(username)
    div.appendChild(xp)
    document.getElementById('leaderboard').appendChild(div)
  }
  for (let i = 0; i < 3; i++) {
    var dot = document.createElement("div")
    dot.className = 'text-cream md:text-4xl text-2xl font-concert'
    dot.innerHTML = '•'
    document.getElementById('leaderboard').appendChild(dot)
  }

  var div = document.createElement("div")
    div.className = 'h-full lg:w-4/5 w-full flex justify-between items-center bg-dorange rounded-3xl m-4'
    var username = document.createElement("div")
    username.className = 'text-cream md:text-4xl text-2xl font-concert m-4'
    username.innerHTML = `YOU (${localStorage.getItem('username')})`
    var xp = document.createElement("div")
    xp.className = 'text-cream md:text-4xl text-2xl font-concert m-4'
    xp.innerHTML = localStorage.getItem('xp')
    div.appendChild(username)
    div.appendChild(xp)
    document.getElementById('leaderboard').appendChild(div)
})

document.getElementById('closeleaderboardcontainer').addEventListener('click', function() {
    document.getElementById('leaderboardcontainer').classList.toggle('hidden')
})

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
    console.log(data)

    const quickSort = (data) => {
        if (data.length <= 1) {
          return data;
        }
      
        let pivot = data[0].xp;
        let leftdata = [];
        let rightdata = [];
      
        for (let i = 1; i < data.length; i++) {
          if (data[i].xp < pivot) {
            leftdata.push(data[i]);
          } else {
            rightdata.push(data[i]);
          }
        }
      
        return [...quickSort(leftdata), pivot, ...quickSort(rightdata)];
      };

    let sortedData = quickSort(data)
    console.log(sortedData)
    for (let i = 0; i < sortedData.length; i++) {
        document.getElementById('leaderboard').innerHTML = `${document.getElementById('leaderboard').innerHTML} ${sortedData[i].username} ${sortedData[i].xp} <br>`
      }
})

document.getElementById('closeleaderboardcontainer').addEventListener('click', function() {
    document.getElementById('leaderboardcontainer').classList.toggle('hidden')
})

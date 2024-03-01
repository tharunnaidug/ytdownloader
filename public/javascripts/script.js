console.log("Hello world")
const url = document.getElementById(`url`)
const audio = document.getElementById(`audio`)
const video = document.getElementById(`video`)
const submitBtn = document.getElementById(`btn`)
const loader = document.getElementById(`loader`)
const con = document.getElementsByClassName(`con`)
const con2 = document.getElementsByClassName(`con2`)
const linkscon = document.getElementsByClassName(`linksCon`)
const res = document.getElementById(`res`)
const text = document.getElementById(`text`)

let data;

submitBtn.addEventListener('click', () => {
    if (url.value == '') {
        url.focus()
        url.style.color = "red"
        return;
    }
    if (audio.checked) { getAudio() }
    else { getVideo() }
    loader.style.display = "flex"
    con[0].style.display = "none"
    con2[0].style.display = "none"
    text.innerText="Searching.."
})
// For video
getVideo = async () => {
    let host = "http://localhost:3000/"
    await fetch(host + 'api/video', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "url": url.value })
    })
        .then(response => response.json())
        .then(response => {
            console.log((response))
            data = response
            linksTemVideo()
        })
}

//For Audio
getAudio = async () => {
    let host = "http://localhost:3000/"
    await fetch(host + 'api/audio', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "url": url.value })
    })
        .then(response => response.json())
        .then(response => {
            console.log((response))
            data = response
            linksTem()
        })
}

//Returning HTML Based On Links length
const linksTem = () => {
    con2[0].style.display = "flex"
    loader.style.display = "none"
    con[0].style.display = "flex"
    if (!Array.isArray(data)) {
        if (data == `0`) {
            res.innerText = "Enter Vaild Url and Try again"
            return
        }
        res.innerText == "There was Some Error Report to Developer."
        return
    }
    res.innerText = `Audio Links Below`;
    linkscon[0].innerHTML = ``;

    // returning Links based on length
    for (let i = 0; i < data.length; i++) {
        let templete = `<div class="linkEle">
        <p>${data[i].audioBitrate}</p>
        <a href="${data[i].url}" target="_blank" rel="noopener noreferrer">Download</a>
        </div>`
        linkscon[0].innerHTML += templete;
    }
}
const linksTemVideo = () => {
    con2[0].style.display = "flex"
    loader.style.display = "none"
    con[0].style.display = "flex"
    if (!Array.isArray(data)) {
        if (data == "0") {
            res.innerText = "Enter Vaild Url and Try again"
            return
        }
        res.innerText == "There was Some Error Report to Developer."
        return
    }

    res.innerText = `Video Links Below`;
    linkscon[0].innerHTML = ``;

    // returning Links based on length
    for (let i = 0; i < data.length; i++) {
        let templete = `<div class="linkEle">
      <p>${data[i].qualityLabel}</p>
      <a href="${data[i].url}" target="_blank" rel="noopener noreferrer">Download</a>
    </div>`
        linkscon[0].innerHTML += templete;
    }
}


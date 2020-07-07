// add "Please add a link" text to small tag in form when user inputs nothing or incorrect input
// copy button in user's links needs to change to copied
// make POST request in form of users URL
// then make a GET request with the users shortened URL

const linksContainer = document.getElementById('shortened-links-container');
const toggle = document.getElementById('toggle');
const urlInput = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');

let hashArr = []


function readLink() {
    let link = {
        url: urlInput.value
    };
    return link;
}

function update(json) {
    if (hashArr.indexOf(json.hashid) === -1) {
      linksContainer.innerHTML += `<div class="result">
      <div class="normal-url">
        <a href="${json.url}" target="_blank">${json.url}</a>
      </div>
      <div class="shortened-url">
        <div id="short-url"><a href="https://rel.ink/${json.hashid}" target="_blank" id="url">https://rel.ink/${json.hashid}</a></div>
        <button class="copy btn">Copy</button>
      </div>`;
    } else {
      return;
    }
  }

async function getLink(data) {
    const URL = `https://rel.ink/api/links/`;
    const fetchResult = fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    }) 
    const response = await fetchResult
    if (response.ok) {
        const jsonData = await response.json();
        update(jsonData);
        hashArr.push(jsonData.hashid);
        console.log(jsonData)
    }
}


toggle.addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('show')
})


shortenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let data = readLink();
    getLink(data)
})

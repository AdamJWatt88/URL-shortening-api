// add "Please add a link" text to small tag in form when user inputs nothing or incorrect input
// copy button in user's links needs to change to copied
// make POST request in form of users URL
// then make a GET request with the users shortened URL

const linksContainer = document.getElementById('shortened-links-container');
const toggle = document.getElementById('toggle');
const urlInput = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');
const errorMessage = document.getElementById('error-message')

let hashArr = []


function readLink() {
  let link = {
    url: urlInput.value
  };
  return link;
}

const regex = new RegExp (/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig)

function checkUrl () {
 
  regex.test(readLink) === false ? errorMessage.innerText = "" :  errorMessage.innerText = "Please enter a valid url"

  
}


function update(json) {
  if (hashArr.indexOf(json.hashid) === -1) {
    linksContainer.innerHTML +=
    `<div class="result">
      <div class="normal-url">
        <a href="${json.url}" target="_blank">${json.url}</a>
      </div>
      <div class="shortened-url">
        <a href="https://rel.ink/${json.hashid}" target="_blank" id="url">https://rel.ink/${json.hashid}</a>
      </div>
      <button class="copy-btn btn">Copy</button>
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
  checkUrl()
})


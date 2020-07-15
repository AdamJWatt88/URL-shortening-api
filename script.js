const linksContainer = document.getElementById('shortened-links-container');
const toggle = document.getElementById('toggle');
const urlField = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');
const errorText = document.getElementById('error-message')

let hashArr = []


const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
let regex = new RegExp(expression);

function readLink() {
  let link = {
    url: urlField.value
  };
  return link;
}


function verifyLink(link) {
  if (link.match(regex)) {
    return true;
  } else {
    return false;
  }
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
  try {
    const fetchResult = fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const response = await fetchResult;
    if (response.ok) {
      const jsonData = await response.json();
      update(jsonData);
      hashArr.push(jsonData.hashid);
      console.log(jsonData);
    } else {
      alert('Failed to Fetch');
    }
  } catch (error) {
    alert('Failed to Fetch, check your internet connection');
  }
}

function copyText(newClip) {
  navigator.clipboard.writeText(newClip).then(() => {
    console.log('clip successful')
  }, () => {
    console.log('clip failed')
  })
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-btn')) {
    let text = e.target.previousElementSibling.textContent;
    copyText(text.trim())
    e.target.innerText = "Copied!";
    e.target.style = "background-color: #00FF00";
    const clearText = () => {
      e.target.innerText = "Copy";
      e.target.style = "background-color: #20b2aa";
    }
    setTimeout(clearText, 1000)
  }
})

toggle.addEventListener('click', () => {
  document.querySelector('header nav').classList.toggle('show')
})

shortenBtn.addEventListener('click', function (e) {
  e.preventDefault()
  if (urlField.value) {
    errorText.innerText = '';
    if (verifyLink(urlField.value)) {
      let data = readLink();
      getLink(data);
    } else {
      errorText.innerText = 'Please enter a valid url format e.g https://www.google.com';
    }
  } else {
    errorText.innerText = 'Please add a link';
  }
});
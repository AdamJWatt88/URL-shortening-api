// add "Please add a link" text to small tag in form when user inputs nothing or incorrect input
// copy button in user's links needs to change to copied

const linksContainer = document.getElementById('shortened-links-container');
const toggle = document.getElementById('toggle');





// example of links html to load dynamically

        // <li>
        //   <span id="input-link" class="input-link"
        //     >https://www.google.com/</span
        //   >
        //   <span id="shortened-link" class="shortened-link">google.com</span>
        //   <button id="copy-btn" class="btn copy-btn">Copy</button>
        // </li>




toggle.addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('show')
})
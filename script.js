const toggle = document.getElementById('toggle');




toggle.addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('show')
})
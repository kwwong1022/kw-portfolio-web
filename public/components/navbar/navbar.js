let isNavbarClosed = true;
let header = document.querySelector('header');
let navbar = document.querySelector('.navbar');
let btnShowMenu = document.querySelector('.btn-show-menu');
let btnCloseMenu = document.querySelector('.btn-close-menu');

btnShowMenu.addEventListener('click', () => {
    isNavbarClosed = false;
    toggleNavbar();
})

btnCloseMenu.addEventListener('click', () => {
    isNavbarClosed = true;
    toggleNavbar();
})

function toggleNavbar() {
    if (isNavbarClosed) {
        navbar.classList.add('disabled');
        btnShowMenu.style.display = "flex";   // inline => flex
        btnCloseMenu.style.display = "none";
    } else {
        navbar.classList.remove('disabled');
        btnShowMenu.style.display = "none";
        btnCloseMenu.style.display = "flex";
    }
}

window.onscroll = () => {
    this.scrollY > 20? header.classList.add('sticky'):header.classList.remove('sticky');
}

// get page
const currPage = document.querySelector("#curr-page").innerHTML;
// get all cats
const pageCats = document.querySelectorAll(".cat");
// if cats:
if (pageCats) {
    pageCats.forEach(pageCat => {
        pageCat.classList.forEach(c => {
            if (c == currPage) {
                pageCat.classList.add("current-page");
            }
        })
    })
}
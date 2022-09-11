// navbar toggler
const toggler = document.querySelector('.toggler');
const nav = document.querySelector('.nav');
let isNavHide = true;

const toggleNavbar = () => {
    if (!isNavHide) {
        nav.classList.remove('show');
        document.querySelector('.btn-show-menu').classList.remove('disabled');
        document.querySelector('.btn-close-menu').classList.add('disabled');
    } else {
        nav.classList.add('show');
        document.querySelector('.btn-show-menu').classList.add('disabled');
        document.querySelector('.btn-close-menu').classList.remove('disabled');
    }
    isNavHide = !isNavHide;
}

toggler.addEventListener('click', () => {
    toggleNavbar();
})


// switch cms content
const listingOptions = ["user", "blog-post", "testing"];
const navItems = document.querySelectorAll('.nav-item');
const navItemUser = document.querySelectorAll('.nav-item.user');
const navItemBlogPost = document.querySelectorAll('.nav-item.blog-post');
const mainContentTitle = document.querySelector('.curr-content-title');
const mainContentSections = document.querySelectorAll('.cms-section');
const mainContentUser = document.querySelectorAll('.cms-section.user');
const mainContentBlogPost = document.querySelectorAll('.cms-section.blog-post');

const getCurrListing = (el, validListingArr) => {
    let curr = el.innerText;
    let isListingValid = false;

    validListingArr.forEach((listing) => {
        if (listing.includes(curr)) isListingValid = true;
    });

    return isListingValid? curr.toLowerCase() : 'user';
}

const updateNavFocus = (currListing) => {
    navItems.forEach(item => {
        item.classList.remove('current');
        if (item.classList.contains(currListing)) item.classList.add('current');
    });
}

const updateListingVisibility = (currListing) => {
    mainContentTitle.innerText = currListing.charAt(0).toUpperCase() + currListing.slice(1);

    mainContentSections.forEach(section => {
        section.classList.remove('current');
        if (section.classList.contains(currListing)) section.classList.add('current');
    })
}

let currListing = getCurrListing(document.querySelector('#curr-listing'), listingOptions);
updateNavFocus(currListing);
updateListingVisibility(currListing);


// init main content
switch (currListing) {
    case 'user':
        initUser();
        break;
    case 'blog-post':
        initBlogPost();
        break;
}


// update main content
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // alert();
        listingOptions.forEach(option => {
            currListing = item.classList.contains(option)? option : currListing;
        })
        updateNavFocus(currListing);
        updateListingVisibility(currListing);
        toggleNavbar();
    });
});
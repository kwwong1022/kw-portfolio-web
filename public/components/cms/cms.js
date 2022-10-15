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


// user-nav
const userInfo = document.querySelector('.topbar .user');
const userMenu = document.querySelector('.user-menu');
userInfo.addEventListener('mouseenter', () => {
    userMenu.classList.add('show');
})
userMenu.addEventListener('mouseleave', () => {
    userMenu.classList.remove('show');
})
userInfo.addEventListener('click', () => {
    if (userMenu.classList.contains('show')) {
        userMenu.classList.remove('show');
    } else {
        userMenu.classList.add('show');
    }
})


// switch cms content
const listingOptions = ["user", "blog-post", "blog-post-form"];
const navItems = document.querySelectorAll('.nav-item');
const navItemUser = document.querySelectorAll('.nav-item.user');
const navItemBlogPost = document.querySelectorAll('.nav-item.blog-post');
const mainContentTitle = document.querySelector('.curr-content-title');
const mainContentSections = document.querySelectorAll('.cms-section');
const mainContentUser = document.querySelectorAll('.cms-section.user');
const mainContentBlogPost = document.querySelectorAll('.cms-section.blog-post');
const forms = document.querySelectorAll('.cms-form');
// func: to return current listing option
const getCurrListing = (el, validListingArr) => {
    let curr = el.innerText;
    let isListingValid = false;

    validListingArr.forEach((listing) => {
        if (listing.includes(curr)) isListingValid = true;
    });

    return isListingValid? curr.toLowerCase() : 'user';
}
// func: to update ui focus on cms nav
const updateNavFocus = (currListing) => {
    navItems.forEach(item => {
        item.classList.remove('current');
        if (item.classList.contains(currListing)) item.classList.add('current');
    });
}
// func: to update display based on current listing option
const updateListingVisibility = (currListing) => {
    mainContentTitle.innerText = currListing.charAt(0).toUpperCase() + currListing.slice(1);

    mainContentSections.forEach(section => {
        section.classList.remove('current');
        if (section.classList.contains(currListing)) section.classList.add('current');
    })
}
// func: to hide all main content
const hideMainContentAll = () => {
    mainContentSections.forEach(section => section.classList.remove('current'));
}
// func: to update display content based on current listing option
const initMainContent = (currListing) => {
    switch (currListing) {
        case 'user':
            initUser();
            break;
        case 'blog-post':
            initBlogPost();
            break;
    }
}
// - func: to show content form
const showContentForm = (isNewForm, id) => {
    // hide all main content
    hideMainContentAll();
    // show form based on current listing
    switch (currListing) {
        case 'blog-post':
            showBlogContentForm(isNewForm, id);
            break;
    }
}


// init
// - check current listing option first
let currListing = getCurrListing(document.querySelector('#curr-listing'), listingOptions);
// init - UI: check current listing option, update ui display accordingly
updateNavFocus(currListing);
updateListingVisibility(currListing);
// init - Content
initMainContent(currListing);
// init - add onclick logic to navItems
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // update current listing var
        listingOptions.forEach(option => {
            currListing = item.classList.contains(option)? option : currListing;
        })
        // update UI
        updateNavFocus(currListing);
        updateListingVisibility(currListing);
        toggleNavbar();
        // init listing based on current listing
        initMainContent(currListing);
        forms.forEach(form => form.classList.remove('current'));
    });
});
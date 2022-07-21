let sectionCV = document.querySelector('.section.cv');
let btnShowCV = document.querySelector('#btn-show-cv');
let textCVBtn = document.querySelector('#cv-btn-text');
let CVLeft = document.querySelector('.section.cv .left-section');
let CVRight = document.querySelector('.section.cv .right-section');

let isShowed = false;

btnShowCV.addEventListener('click', () => {
    isShowed = !isShowed
    if (isShowed) {
        textCVBtn.innerText = 'hide';
        CVLeft.classList.add('show');
        CVRight.classList.add('show');
        CVLeft.style.height = document.querySelector('body').clientHeight+'px';
        CVRight.style.height = document.querySelector('body').clientHeight+'px';
        sectionCV.style.zIndex = 9998;
    } else {
        textCVBtn.innerText = 'cv';
        CVLeft.classList.remove('show');
        CVRight.classList.remove('show');
    }
    setTimeout(() => {if (!isShowed) sectionCV.style.zIndex = 2}, 500);
});


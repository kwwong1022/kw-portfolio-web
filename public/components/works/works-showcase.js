const grid = document.querySelector('#works-showcase-grid');

let btnCat = document.querySelectorAll('.cat-item');
let work = document.querySelector("#curr-work")? document.querySelector("#curr-work").innerText:'all';
let sortedWorks = [];
let currActived = [];

if (!work) work = 'all';

// update ui based on requested work cat
btnCat.forEach(btn => {
    if (btn.classList.contains(work)) {
        btn.classList.add('active');
        currActived.push(work);
    }
})

// listener for each button
btnCat.forEach(btn => {
    btn.addEventListener('click', () => {
        let cat = btn.classList[1];

        // check is all
        if (cat == 'all') {
            currActived = [];
            currActived.push('all');
            // clear all active
            btnCat.forEach(b => b.classList.remove('active'));
            // add active to btn all
            active(btn);

        } else {
            // check is self
            if (btn.classList.contains(cat)) {
                if (cat != 'all') {
                    btnCat[0].classList.remove('active');
                    currActived.forEach((ca, i) => {
                        if (ca == 'all') currActived.splice(i, i+1);
                    })
                }

                if (btn.classList.contains('active')) {
                    currActived.forEach((ca, i) => {
                        if (ca == cat) currActived.splice(i, i+1);
                    })
                    btn.classList.remove('active');
                    if (currActived.length == 0) {
                        btnCat[0].classList.add('active');
                        currActived.push('all');
                    }
                } else {
                    currActived.push(cat);
                    active(btn);
                }
            }
        }

        // sort work
        sortWorks(currActived);
        showWorks();

        updateCardSize();
        updateMasks();
    })
})

// assign on touch event for each card
let cards = document.querySelectorAll('.card');
cards.forEach(c => {
    c.addEventListener('touchstart', () => {
        cards.forEach(c => c.firstElementChild.style.opacity = 0);
        c.firstElementChild.style.opacity = .5;
    })
})

let active = (btn) => {
    btn.classList.add('active');
}

let sortWorks = (...cats) => {
    cats = cats[0];

    // clear sortedWorks
    sortedWorks = [];

    // if selected = all
    cats.forEach(cat => {
        if (cat == 'all') {
            sortedWorks = workList;
            return;
        }
    })

    workList.forEach(work => {
        cats.forEach(cat => {
            // match cat
            if (work.category == cat) {
                // push to sortedWorks
                sortedWorks.push(work);
            }
        })
    })
}

let showWorks = () => {
    // clear grid div
    grid.innerHTML = '';
    // for each work in sortedWorks
    sortedWorks.forEach(sortWork => {
        // create card element
        let card = document.createElement('a');
        let mask = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        card.classList.add('card');
        mask.classList.add('mask');
        title.classList.add('title');
        description.classList.add('description');
        // add content
        title.innerText = sortWork.title;
        description.innerText = sortWork.description;
        if (sortWork.url!='#') card.href = sortWork.url;
        card.style.backgroundImage = `url(${sortWork.image[0]})`;
        mask.appendChild(title);
        mask.appendChild(description);
        card.appendChild(mask);
        // append to grid div
        grid.appendChild(card);
    })
}

let updateCardSize = () => {
    let currCards = document.querySelectorAll('.card');
    currCards.forEach(card => {
        card.style.height = `${card.clientWidth-card.style.paddingTop-card.style.paddingBottom}px`;
    })
}

let updateMasks = () => {
    let masks = document.querySelectorAll('.mask');
    masks.forEach(m => {
        m.addEventListener('touchstart', () => {
            masks.forEach(m => m.style.opacity = 0);
            m.style.opacity = 1;
        })
    })
}

// sort works
sortWorks(currActived);
showWorks();

updateCardSize();
updateMasks();

// for mobile - aspect ratio doesn't work on ipad
window.onresize = () => {
    updateCardSize();
    // console.log(`width: ${currCards[0].clientWidth}, height: ${currCards[0].clientHeight}`)
}

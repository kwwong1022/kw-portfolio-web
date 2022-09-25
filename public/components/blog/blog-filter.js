const btnCat = document.querySelectorAll('.cat-item');

let currActived = 'all';

btnCat.forEach((cat) => {
    cat.addEventListener('click', () => {
        currActived = cat.classList[1];
        // update UI
        updateFilterUI();

        // fetch data based on class
        if (currActived == 'study' || currActived == 'tutorial' || currActived == 'work' || currActived == 'document') {
            const type = `${currActived.slice(0, 1).toUpperCase()}${currActived.slice(1, currActived.length)}`
            fetchBlogPostListing(type);
        } else {
            fetchBlogPostListing('');
        }
    })
})

const updateFilterUI = () => {
    btnCat.forEach(cat => {
        cat.classList.remove('active');
        if (cat.classList.contains(currActived)) cat.classList.add('active');
    })
}
let blogTags = [];

const tagInput = document.querySelector('.cms-form.blog-post #tag');
const tagEnter = document.querySelector('.cms-form.blog-post .button.tag');
const tagList = document.querySelector('.cms-form.blog-post .tag-list');
tagEnter.addEventListener('click', () => {
    blogTags.push(tagInput.value);
    tagInput.value = "";
    updateTagList();
})

const updateTagList = () => {
    tagList.innerHTML = "";
    blogTags.forEach(t => {
        const tagItem = document.createElement('div');
        const tagSpan = document.createElement('span');
        const btnTagClose = document.createElement('div');
        tagItem.classList.add('tag-item');
        tagSpan.innerText = t;
        btnTagClose.innerText = 'x';
        btnTagClose.classList.add('btn-close');
        tagItem.appendChild(tagSpan);
        tagItem.appendChild(btnTagClose);
        tagList.appendChild(tagItem);
    })
}

const fetchBlogPost = () => {
    fetch("/blog-post", {
        method: "post",
        body: {}
    })
    .then((res) => res.json())
    .then((data) => { 
        const table = document.querySelector('.cms-section.blog-post table');
        const tds = document.querySelectorAll('.cms-section.blog-post td');
        tds.forEach(el => el.parentNode.removeChild(el));
        data.forEach((post, i) => {
            const tr = document.createElement('tr');
            // tr.setAttribute('onclick', `window.location='/';`);
            let td = document.createElement('td');
            td.innerText = post.status;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = post.type;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = post.title;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = post.creationTime.slice(0, 19);
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = post.modificationTime.slice(0, 19);
            tr.appendChild(td);
            table.appendChild(tr);
        });
    })
    .catch((err) => { console.log(err); });
}

const createBlogPost = () => {
    let data = new URLSearchParams();
    const postStatus = document.querySelector('.cms-form.blog-post #status').value;
    const postType = document.querySelector('.cms-form.blog-post #type').value;
    const postTitle = document.querySelector('.cms-form.blog-post #title').value;
    const postDescription = document.querySelector('.cms-form.blog-post #description').value;

    const postTags = JSON.stringify(blogTags);

    data.append("status", postStatus);
    data.append("type", postType);
    data.append("title", postTitle);
    data.append("description", postDescription);
    data.append("tags", postTags);
    
    fetch("/blog-post/create", {
        method: "post",
        body: data
    })
    .then((res) => res.status)
    .then((status) => { 
        console.log(typeof(status));
        switch (status) {
            case 200:
                console.log('success');
                location.assign('/cms?currListing=blog-post');
                break;
        }
     })
    .catch((err) => { console.log(err); });
}


const initBlogPost = () => {
    fetchBlogPost();
}
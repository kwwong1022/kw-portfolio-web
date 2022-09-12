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
            tr.setAttribute('onclick', `window.location='/';`);
            let td = document.createElement('td');
            td.setAttribute('id', post._id);
            td.innerText = post.status;
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('id', post._id);
            td.innerText = post.type;
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('id', post._id);
            td.innerText = post.title;
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('id', post._id);
            td.innerText = post.creationTime;
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('id', post._id);
            td.innerText = post.modificationTime;
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
    const postTags = ['dummy tag 1', 'dummy tag 2', 'dummy tag 3'];

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
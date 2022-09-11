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
            td.innerText = post.creationTime;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = post.modificationTime;
            tr.appendChild(td);
            table.appendChild(tr);
        });
    })
    .catch((err) => { console.log(err); });
}

const createBlogPost = () => {
    
}

const initBlogPost = () => {
    fetchBlogPost();
}
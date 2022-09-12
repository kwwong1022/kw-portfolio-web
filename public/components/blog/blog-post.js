const id = document.querySelector('#blog-id').innerText;

const initBlogPost = () => {
    let data = new URLSearchParams();
    data.append('id', id);

    fetch("/blog-post", {
        method: "post",
        body: data
    })
    .then((res) => res.json())
    .then((blog) => { 
        blog = blog[0];
        const title = document.querySelector('.blog-content .post-title .title');
        const date = document.querySelector('.blog-content .post-title .date');
        const tagList = document.querySelector('.blog-content .tags');
        title.innerText = blog.title;
        date.innerText = blog.creationTime.slice(0, 10);
        const tags = blog.tags;
        tags.forEach(t => {
            const tag = document.createElement('div');
            tag.classList.add('tag');
            tag.innerText = t;
            tagList.appendChild(tag);
        })
    })
    .catch((err) => { console.log(err); });
}

initBlogPost();
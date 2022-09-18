const id = document.querySelector('#blog-id').innerText;
const postContentList =document.querySelector('.section.blog-content .post-content-list');

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

        const contents = blog.data;
        contents.forEach(content => {
            const contentID = content.id;
            const contentType = content.type;
            // create new element
            const contentBlock = document.createElement('div');
            contentBlock.classList.add('post-content');
            contentBlock.classList.add(contentType);
            contentBlock.setAttribute('id', contentID);
            postContentList.appendChild(contentBlock);

            switch (contentType) {
                case 'text':
                    contentBlock.innerText = content.content;
                    break;
                case 'html':
                    contentBlock.innerHTML = content.content;
                    break;
                case 'p5':                  
                    contentBlock.style.width = content.width>1? `${content.width}px` : '100%';
                    contentBlock.style.height = `${content.width}px`;

                    const code = content.content;
                    eval(code);
                    break;
                }
        })
    })
    .catch((err) => { console.log(err); });
}

initBlogPost();
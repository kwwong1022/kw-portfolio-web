// func: get all blog post
const getBlogPost = async (id) => {
    const result = await fetch(`/api/blogpost/detail?id=${id}`, {
        method: "get",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' }
    })
    const blogPost = await result.json();
    return blogPost.data;
}
// func: get all blog post
const getBlogPostAll = async () => {
    const result = await fetch(`/api/blogpost`, {
        method: "get",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' }
    })
    const blogPosts = await result.json();
    return blogPosts.data;
}
// func: update blog post table
const updateBlogPostTable = async () => {
    const blogPosts = await getBlogPostAll();
    // update table
    const table = document.querySelector('.cms-section.blog-post table');
    const tds = document.querySelectorAll('.cms-section.blog-post td');
    // - clear table
    tds.forEach(el => el.parentNode.removeChild(el));
    // create table elements and assign value
    blogPosts.forEach((post, i) => {
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
        // set onclick to each row
        tr.addEventListener('click', async () => { 
            showContentForm(false, post._id);
        });
    })
}
// func: update create new content form
const showBlogContentForm = async (isNewForm, id) => {
    const blogPostForm = document.querySelector('.cms-form.blog-post');
    const submitBtn = document.querySelector('.cms-form.blog-post .button.submit');
    const patchBtn = document.querySelector('.cms-form.blog-post .button.patch');
    const deleteBtn = document.querySelector('.cms-form.blog-post .button.delete');
    submitBtn.style.display = 'none';
    patchBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    if (isNewForm) {
        blogPostForm.classList.add('current');
        submitBtn.style.display = 'flex';
    } else {
        // fetch and load blog post data
        const post = await getBlogPost(id);
        fillBlogPostContentForm(post);
        blogPostForm.classList.add('current');
        patchBtn.style.display = 'flex';
        deleteBtn.style.display = 'flex';
    }
}
// func: init
const initBlogPost = () => {
    // init table
    updateBlogPostTable();
    // init content form
    clearBlogData();
    syncInputByBlogData();
}
// load popular posts
const fetchPopularBlogPost = () => {
    let data = new URLSearchParams();
    data.append('status', 'Published');

    fetch("/blog-post", {
        method: "post",
        body: data
    })
    .then((res) => res.json())
    .then((data) => { 
        const popularBlogPostSection = document.querySelector('.blog-content .sub-content .popular-post');
        data.forEach((blog, i) => {
            const postItem = document.createElement('a');
            postItem.classList.add('post-item');
            postItem.href = `/blog/${blog._id}`;
            const postTitle = document.createElement('div');
            postTitle.classList.add('title');
            postTitle.innerText = blog.title;
            const postDate = document.createElement('div');
            postDate.classList.add('date');
            postDate.innerText = blog.creationTime.slice(0, 10);
            postItem.appendChild(postTitle);
            postItem.appendChild(postDate);
            popularBlogPostSection.appendChild(postItem);
        });
    })
    .catch((err) => { console.log(err); });
}

// load recent posts
const fetchRecentBlogPost = () => {
    let data = new URLSearchParams();
    data.append('status', 'Published');

    fetch("/blog-post", {
        method: "post",
        body: data
    })
    .then((res) => res.json())
    .then((data) => { 
        const recentBlogPostSection = document.querySelector('.blog-content .sub-content .recent-post');
        data.forEach((blog, i) => {
            const postItem = document.createElement('a');
            postItem.classList.add('post-item');
            postItem.href = `/blog/${blog._id}`;
            const postTitle = document.createElement('div');
            postTitle.classList.add('title');
            postTitle.innerText = blog.title;
            const postDate = document.createElement('div');
            postDate.classList.add('date');
            postDate.innerText = blog.creationTime.slice(0, 10);
            postItem.appendChild(postTitle);
            postItem.appendChild(postDate);
            recentBlogPostSection.appendChild(postItem);
        });
    })
    .catch((err) => { console.log(err); });
}

fetchPopularBlogPost();
fetchRecentBlogPost();
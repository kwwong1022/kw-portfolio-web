// load popular posts
const fetchPopularBlogPost = () => {
    fetch(`/api/blogpost?limit=7&current=0&sortType=desc&status=Published&type=&sortView=true`, {
        method: "get",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' }
    })
    .then((res) => res.json())
    .then((data) => { 
        data = data.data;
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
    fetch(`/api/blogpost?limit=7&current=0&sortType=desc&status=Published&type=`, {
        method: "get",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' }
    })
    .then((res) => res.json())
    .then((data) => { 
        data = data.data;
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
// load post list
const fetchBlogPostListing = (type) => {
    fetch(`/api/blogpost?limit=7&current=0&sortType=desc&status=Published&type=${type}`, {
        method: "get",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' }
    })
    .then((res) => res.json())
    .then((data) => { 
        data = data.data;
        const blogPostList = document.querySelector('.blog-content .main-content .blog-post-list');
        blogPostList.innerHTML = '';
        data.forEach((blog, i) => {
            const postItem = document.createElement('a');
            postItem.classList.add('card');
            postItem.href = `/blog/${blog._id}`;
            const postContent = document.createElement('div');
            postContent.classList.add('content');
            const itemMask = document.createElement('div');
            itemMask.classList.add('mask');
            const postThumbnail = document.createElement('div');
            postThumbnail.classList.add('thumbnail-img');
            if (blog.thumbnail) postThumbnail.style.backgroundImage = `url("${blog.thumbnail}")`;
            const postDescription = document.createElement('div');
            postDescription.classList.add('description');
            const postTitle = document.createElement('div');
            postTitle.classList.add('title');
            postTitle.innerText = blog.title;
            const postDescriptionText = document.createElement('div');
            postDescriptionText.classList.add('content-text');
            postDescriptionText.innerText = blog.description;
            const postDate = document.createElement('div');
            postDate.classList.add('date');
            postDate.innerText = blog.creationTime.slice(0, 10);

            postDescription.appendChild(postTitle);
            postDescription.appendChild(postDescriptionText);
            postDescription.appendChild(postDate);
            postContent.appendChild(postThumbnail);
            postContent.appendChild(postDescription);
            postItem.appendChild(postContent);
            postItem.appendChild(itemMask);
            blogPostList.appendChild(postItem);
        });
    })
    .catch((err) => { console.log(err); });
}

fetchBlogPostListing('');
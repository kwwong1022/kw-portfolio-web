// load post list
const fetchBlogPostListing = () => {
    fetch("/blog-post", {
        method: "post",
        body: {}
    })
    .then((res) => res.json())
    .then((data) => { 
        const blogPostList = document.querySelector('.blog-content .main-content .blog-post-list');
        data.forEach((blog, i) => {
            const postItem = document.createElement('a');
            postItem.classList.add('card');
            postItem.href = `/blog/post`;
            const postContent = document.createElement('div');
            postContent.classList.add('content');
            const itemMask = document.createElement('div');
            itemMask.classList.add('mask');
            const postThumbnail = document.createElement('div');
            postThumbnail.classList.add('thumbnail-img');
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

fetchBlogPostListing();
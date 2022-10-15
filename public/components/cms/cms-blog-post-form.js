const blog = {
    status: 'Draft',
    type: 'Study',
    title: '',
    description: '',
    tags: [],
    data: []
};

// form inputs
const blogPostStatus = document.querySelector('.cms-form.blog-post #status');
const blogPostType = document.querySelector('.cms-form.blog-post #type');
const blogPostTitle = document.querySelector('.cms-form.blog-post #title');
const blogPostDescription = document.querySelector('.cms-form.blog-post #description');
const blogPostTagInput = document.querySelector('.cms-form.blog-post #tag');
const blogPostTagEnter = document.querySelector('.cms-form.blog-post .button.tag');
const blogPostTagList = document.querySelector('.cms-form.blog-post .tag-list');
const contentContainer = document.querySelector('.cms-form.blog-post .content-container');
const btnNewContentBlock = document.querySelector('.cms-form.blog-post .button.new-content-block');
// input: status
blogPostStatus.addEventListener('change', () => {
    blog.status = blogPostStatus.value;
});
// input: type
blogPostType.addEventListener('change', () => {
    blog.type = blogPostType.value;
});
// input: title
blogPostTitle.addEventListener('change', () => {
    blog.title = blogPostTitle.value;
});
// input: description
blogPostDescription.addEventListener('change', () => {
    blog.description = blogPostDescription.value;
});
// input: tag
// - func: update tag display
const updateBlogPostTagList = () => {
    // clear container
    blogPostTagList.innerHTML = '';
    blog.tags.forEach(t => {
        const tagItem = document.createElement('div');
        const tagSpan = document.createElement('span');
        const btnTagClose = document.createElement('div');
        tagItem.classList.add('tag-item');
        tagSpan.innerText = t;
        btnTagClose.innerText = 'x';
        btnTagClose.classList.add('btn-close');
        tagItem.appendChild(tagSpan);
        tagItem.appendChild(btnTagClose);
        blogPostTagList.appendChild(tagItem);
    })
}
blogPostTagEnter.addEventListener('click', () => {
    if (blogPostTagInput.value != '') {
        blog.tags.push(blogPostTagInput.value);
        blogPostTagInput.value = '';
        updateBlogPostTagList();
    }
});

// input: content block
// - func: update content block list
const updateContentBlockList = () => {
    // clear content block container
    contentContainer.innerHTML = '';
    // updata content block display and value
    blog.data.forEach((block, i) => {
        const optionList = ['text', 'code', 'html', 'p5'];
        // create elements
        const contentBlock = document.createElement('div');
        const contentInfo = document.createElement('div');
        const contentTitle = document.createElement('span');
        const contentMenu = document.createElement('div');
        const contentTypeSelector = document.createElement('select');
        const contentCloseButton = document.createElement('i');
        const contentTextArea = document.createElement('textarea');
        const sketchSetting = document.createElement('div');
        let sketchLabel = document.createElement('label');
        const sketchWidthInput = document.createElement('input');  //sketchInput
        const sketchHeightInput = document.createElement('input');
        // set class
        contentTypeSelector.setAttribute('id', `type`);
        contentBlock.setAttribute('id', `block-${i+1}`);
        contentBlock.classList.add('content-block');
        contentInfo.classList.add('content-info');
        contentMenu.classList.add('menu');
        contentCloseButton.classList.add('fas');
        contentCloseButton.classList.add('fa-times');
        contentCloseButton.classList.add('btn-close-menu');
        sketchSetting.classList.add('scrollable-x');
        sketchSetting.classList.add('sketch-setting');
        // content type selection
        optionList.forEach(option => {
            const contentTypeOption = document.createElement('option');
            contentTypeOption.value = option;
            contentTypeOption.innerText = option;
            contentTypeSelector.appendChild(contentTypeOption);
        })
        // sketching setting
        sketchLabel.innerText = "Width: ";
        sketchWidthInput.value = block.width;
        sketchWidthInput.setAttribute('type', 'number');
        sketchWidthInput.setAttribute('id', 'sketch-width');
        sketchSetting.appendChild(sketchLabel);
        sketchSetting.appendChild(sketchWidthInput);
        sketchLabel = document.createElement('label');
        sketchLabel.innerText = "Height: ";
        sketchHeightInput.value = block.height;
        sketchHeightInput.setAttribute('type', 'number');
        sketchHeightInput.setAttribute('id', 'sketch-height');
        sketchSetting.appendChild(sketchLabel);
        sketchSetting.appendChild(sketchHeightInput);
        contentTypeSelector.value = block.type;
        contentTextArea.value = block.content;
        // title
        contentTitle.innerText = `Content block #${i+1}`
        // append element
        contentMenu.appendChild(contentTypeSelector);
        contentMenu.appendChild(contentCloseButton);
        contentInfo.appendChild(contentTitle);
        contentInfo.appendChild(contentMenu);
        contentInfo.appendChild(contentTextArea);
        contentBlock.appendChild(contentInfo);
        contentBlock.appendChild(contentTextArea);
        contentBlock.appendChild(sketchSetting);
        // add content block to content container
        contentContainer.appendChild(contentBlock);
        // block logic (close);
        contentCloseButton.addEventListener('click', () => {
            contentBlock.parentNode.removeChild(contentBlock);
            blog.data.splice(i, 1);
        });
        // change listener
        // - selector
        contentTypeSelector.addEventListener('change', () => {
            blog.data[i].type = contentTypeSelector.value;
        })
        // - textarea
        contentTextArea.addEventListener('change', () => {
            blog.data[i].content = contentTextArea.value;
        })
        // - width
        sketchWidthInput.addEventListener('change', () => {
            blog.data[i].width = sketchWidthInput.value;
        })
        // - height
        sketchHeightInput.addEventListener('change', () => {
            blog.data[i].height = sketchHeightInput.value;
        })
    })
    console.log(blog);
}
// create new content block
btnNewContentBlock.addEventListener('click', () => {
    const newBlock = {
        id: `block-${blog.data.length+1}`,
        type: 'text',
        content: '',
        width: -1,
        height: 400
    };
    blog.data.push(newBlock);
    updateContentBlockList();
});

// func: to fill blog content form
const fillBlogPostContentForm = (post) => {
    blog._id = post._id;
    blog.status = post.status;
    blog.type = post.type;
    blog.title = post.title;
    blog.description = post.description;
    blog.tags = post.tags;
    blog.data = post.data;
    // sync input by blog data
    syncInputByBlogData();
}
// func: to sync input by blog data
const syncInputByBlogData = () => {
    blogPostStatus.value = blog.status;
    blogPostType.value = blog.type;
    blogPostTitle.value = blog.title;
    blogPostDescription.value = blog.description;
    updateBlogPostTagList();
    updateContentBlockList();
}
// func: to clear blog post (obj) data
const clearBlogData = () => {
    blog._id = undefined;
    blog.status = 'Draft';
    blog.type = 'Study';
    blog.title = '';
    blog.description = '';
    blog.tags = [];
    blog.data = [];
}
// func: to delete blog post
const deleteBlogPost = () => {
    let data = new URLSearchParams();
    data.append("id", blog._id);
    fetch("/api/blogpost", {
        method: "delete",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' },
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
// func: to create blog post
const patchBlogPost = () => {
    let data = new URLSearchParams();
    data.append("id", blog._id);
    data.append("status", blog.status);
    data.append("type", blog.type);
    data.append("title", blog.title);
    data.append("description", blog.description);
    data.append("tags", JSON.stringify(blog.tags));
    data.append("data", JSON.stringify(blog.data));

    fetch("/api/blogpost", {
        method: "PATCH",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' },
        body: data
    })
    .then((res) => res.status)
    .then((status) => { 
        console.log(status);
        switch (status) {
            case 200:
                console.log('success');
                location.assign('/cms?currListing=blog-post');
                break;
        }
     })
    .catch((err) => { console.log(err); });
}
// func: to create blog post
const createBlogPost = () => {
    let data = new URLSearchParams();
    data.append("status", blog.status);
    data.append("type", blog.type);
    data.append("title", blog.title);
    data.append("description", blog.description);
    data.append("tags", JSON.stringify(blog.tags));
    data.append("data", JSON.stringify(blog.data));
    fetch("/api/blogpost", {
        method: "post",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' },
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
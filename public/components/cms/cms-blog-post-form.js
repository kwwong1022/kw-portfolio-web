const contentContainer = document.querySelector('.cms-form.blog-post .content-container');
const btnNewContentBlock = document.querySelector('.cms-form.blog-post .button.new-content-block');

// create new content block function
let currBlock = 0;
btnNewContentBlock.addEventListener('click', () => {
    const optionList = ['text', 'code', 'html', 'p5'];
    // create content block
    const contentBlock = document.createElement('div');
    const contentInfo = document.createElement('div');
    const contentTitle = document.createElement('span');
    const contentMenu = document.createElement('div');
    const contentTypeSelector = document.createElement('select');
    const contentCloseButton = document.createElement('i');
    const contentTextArea = document.createElement('textarea');
    const sketchSetting = document.createElement('div');
    let sketchLabel = document.createElement('label');
    let sketchInput = document.createElement('input');

    contentTypeSelector.setAttribute('id', `type`);
    contentBlock.setAttribute('id', `block-${currBlock+1}`);
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
    sketchInput.value = -1;
    sketchInput.setAttribute('type', 'number');
    sketchInput.setAttribute('id', 'sketch-width');
    sketchSetting.appendChild(sketchLabel);
    sketchSetting.appendChild(sketchInput);
    sketchLabel = document.createElement('label');
    sketchInput = document.createElement('input');
    sketchLabel.innerText = "Height: ";
    sketchInput.value = 400;
    sketchInput.setAttribute('type', 'number');
    sketchInput.setAttribute('id', 'sketch-height');
    sketchSetting.appendChild(sketchLabel);
    sketchSetting.appendChild(sketchInput);
    // title
    contentTitle.innerText = `Content block #${currBlock+1}`
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
        // update block id
        // const contents = document.querySelectorAll('.cms-form.blog-post .content-block');
        // contents.forEach((content, i) => {
        // })
    });

    currBlock ++;
});
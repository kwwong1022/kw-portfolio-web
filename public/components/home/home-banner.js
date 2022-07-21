const ABOUT = 0, SKILLS = 1, FEATURED = 2, EXP = 3;

let catAbout = document.querySelector('.cat.about-me');
let catSkills = document.querySelector('.cat.skills');
let catFeatured = document.querySelector('.cat.featured-works');
let catExp = document.querySelector('.cat.experience');

let catAboutContent = document.querySelector('.card-content-about');
let catSkillsContent = document.querySelector('.card-content-skills');
let catFeaturedContent = document.querySelector('.card-content-featured-works');
let catExpContent = document.querySelector('.card-content-experience');

if (catAbout) {
    catAbout.addEventListener('click', () => {
        updateCat(ABOUT);
    });
}
if (catSkills) {
    catSkills.addEventListener('click', () => {
        updateCat(SKILLS);
    });
}
if (catFeatured) {
    catFeatured.addEventListener('click', () => {
        updateCat(FEATURED);
    });
}
if (catExp) {
    catExp.addEventListener('click', () => {
        updateCat(EXP);
    });
}

function updateCat(cat) {
    catAbout.classList.remove('active');
    catSkills.classList.remove('active');
    catFeatured.classList.remove('active');
    catExp.classList.remove('active');

    catAboutContent.classList.remove('active');
    catSkillsContent.classList.remove('active');
    catFeaturedContent.classList.remove('active');
    catExpContent.classList.remove('active');

    switch(cat) {
        case ABOUT:
            catAbout.classList.add('active');
            catAboutContent.classList.add('active');
            break;
        case SKILLS:
            catSkills.classList.add('active');
            catSkillsContent.classList.add('active');
            break;
        case FEATURED:
            catFeatured.classList.add('active');
            catFeaturedContent.classList.add('active');
            break;
        case EXP:
            catExp.classList.add('active');
            catExpContent.classList.add('active');
            break;
    }
}
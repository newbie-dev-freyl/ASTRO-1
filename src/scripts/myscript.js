//HERO SLIDE
const heroContainer = document.querySelector('.hero-container');
const heroSlide = document.querySelector('.hero-slide');
const heroSlideItemAll = document.querySelectorAll('.hero-slide > a');
const heroSlideItem = heroSlideItemAll[0];
const heroSlideItemWidth = heroSlideItemAll[0].getBoundingClientRect().width

//HERO NAV
const heroNav = document.querySelector('.hero-nav');
const heroNavMenu = document.querySelector('.hero-navmenu');
const heroNavMenuItemAll = document.querySelectorAll('.hero-navmenu > a');
const heroNavMenuItem = heroNavMenuItemAll[0];
const heroNavMenuItemWidth = heroNavMenuItemAll[0].clientWidth;

//HERO BUTTON
const heroButtonAll = document.querySelectorAll('.hero-button')

let heroCounter = 0;
let totalHeroSlide = heroNavMenuItemAll.length - 1;

//FUNCTIONS
function nextSlide() {
    if (heroCounter == totalHeroSlide)  {
        heroCounter = 0;
        heroNavMenu.classList.toggle('disable-slide');
        heroNavMenu.scrollLeft = 0;
        heroNavMenu.classList.toggle('disable-slide');
    } else {
        heroCounter += 1;
    }

    reloadHeroSlider(heroCounter);
}

function previewSlide() {
    if (heroCounter == 0)  {
        heroCounter = totalHeroSlide;
        heroNavMenu.classList.toggle('disable-slide');
        heroNavMenu.scrollLeft = (heroNavMenuItemAll.length - 1) * heroNavMenuItemWidth;
        heroNavMenu.classList.toggle('disable-slide');
        console.log(heroNavMenu.scrollLeft)
    } else {
        heroCounter -= 1;
    }

    reloadHeroSlider(heroCounter);
}

function reloadHeroSlider(heroCounter){
    heroNavMenuItemAll.forEach((item) => {
        item.classList.remove('active');
        heroNavMenuItemAll[heroCounter].classList.add('active');
    });
}
//FUNCTIONS

//CLICK EVENTS ON BUTTON AND NAV
heroButtonAll.forEach(button => {
    button.addEventListener('click', () => {
        heroSlide.scrollLeft += button.id === "prev" ? -heroSlideItemWidth : heroSlideItemWidth;
        button.id === "prev" ? previewSlide() : nextSlide();
    })
})
heroNavMenuItemAll.forEach((item, index) => {
    item.addEventListener('click', () => {
        heroCounter = index;
        reloadHeroSlider(heroCounter);
        heroSlide.scrollLeft = (heroCounter + 1) * heroSlideItemWidth;
    })
});
//CLICK EVENTS ON BUTTON AND NAV

//DUPLICATE FIRST AND LAST ITEM IN THE SLIDER
const heroSlideChildren = [...heroSlide.children];
let heroSlideChildrenPerView = Math.round(heroSlide.clientWidth / heroSlideItemWidth);

heroSlideChildren.slice(-heroSlideChildrenPerView).reverse().forEach(child => {
    heroSlide.insertAdjacentHTML('afterbegin', child.outerHTML);
})

heroSlideChildren.slice(0, heroSlideChildrenPerView).forEach(child => {
    heroSlide.insertAdjacentHTML('beforeend', child.outerHTML);
})
//DUPLICATE FIRST AND LAST ITEM IN THE SLIDER


//INFINITE SCROLLING
function infiniteScroll() {
    if (heroSlide.scrollLeft === 0) {   
        //checking the formula
        console.log(heroSlide.scrollLeft)
        console.log(heroSlide.scrollWidth)
        console.log(Math.ceil(2 * heroSlide.clientWidth))
        //checking the formula

        heroSlide.classList.toggle('disable-slide');
        heroSlide.scrollLeft = heroSlide.scrollWidth - Math.ceil(2 * heroSlide.clientWidth);
        heroSlide.classList.toggle('disable-slide');
    
    } else if (Math.ceil(heroSlide.scrollLeft) === Math.ceil(heroSlide.scrollWidth - heroSlide.clientWidth)) {
        //checking the formula
        console.log(Math.ceil(heroSlide.scrollLeft))
        console.log(Math.ceil(heroSlide.scrollWidth - heroSlide.clientWidth))
        //checking the formula

        heroSlide.classList.toggle('disable-slide');
        heroSlide.scrollLeft = heroSlide.clientWidth;
        heroSlide.classList.toggle('disable-slide');
    }
} 
heroSlide.addEventListener('scroll', infiniteScroll);
//INFINITE SCROLLING

//AUTO PLAY SECTION
let playHeroSlider;
let autoPlayInterval = 2000;

function autoPlayCommand() {
    heroSlide.scrollLeft += heroSlideItemWidth;
    heroCounter = Math.ceil(heroSlide.scrollLeft / heroSlideItemWidth);
    heroCounter > totalHeroSlide ? reloadHeroSlider(0) : reloadHeroSlider(heroCounter);   
}
function startHeroSlider() {
    playHeroSlider = setInterval(() => {
        autoPlayCommand();
    }, autoPlayInterval);
}
function stopHeroSlider() {
    clearInterval(playHeroSlider);
}
heroContainer.addEventListener('mouseenter', stopHeroSlider);
heroContainer.addEventListener('mouseleave', startHeroSlider);


//AUTO PLAY SECTION

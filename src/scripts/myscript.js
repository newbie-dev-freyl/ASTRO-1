//HERO SLIDE
const heroContainer = document.querySelector('.hero-container');
const heroSlider = document.querySelector('.hero-slider');
const heroSliderItemAll = document.querySelectorAll('.hero-slider > a');
const heroSliderItem = heroSliderItemAll[0];
const heroSliderItemWidth = heroSliderItemAll[0].getBoundingClientRect().width;

//HERO NAV
const heroNav = document.querySelector('.hero-nav');
const heroNavMenu = document.querySelector('.hero-navmenu');
const heroNavMenuItemAll = document.querySelectorAll('.hero-navmenu > a');
const heroNavMenuItem = heroNavMenuItemAll[0];
const heroNavMenuItemWidth = heroNavMenuItemAll[0].clientWidth;

//HERO BUTTON
const heroButtonAll = document.querySelectorAll('.hero-button');

let heroCounter = 0;
let totalHeroSlide = heroNavMenuItemAll.length - 1;

//FUNCTIONS
function nextSlide() {
    if (heroCounter == totalHeroSlide)  {
        heroCounter = 0;
        heroNavMenu.classList.toggle('disable-slider');
        heroNavMenu.scrollLeft = 0;
        heroNavMenu.classList.toggle('disable-slider');
    } else {
        heroCounter += 1;
    }

    reloadHeroSlider(heroCounter);
}

function previewSlide() {
    if (heroCounter == 0)  {
        heroCounter = totalHeroSlide;
        heroNavMenu.classList.toggle('disable-slider');
        heroNavMenu.scrollLeft = (heroNavMenuItemAll.length - 1) * heroNavMenuItemWidth;
        heroNavMenu.classList.toggle('disable-slider');
        console.log(heroNavMenu.scrollLeft);
    } else {
        heroCounter -= 1;
    }

    reloadHeroSlider(heroCounter);
}

function reloadHeroSlider(heroCounter){
    heroNavMenuItemAll.forEach((item) => {
        item.classList.remove('active');
        heroNavMenuItemAll[heroCounter].classList.add('active');
    })
}
//FUNCTIONS

//CLICK EVENTS ON BUTTON AND NAV
heroButtonAll.forEach(button => {
    button.addEventListener('click', () => {
        heroSlider.scrollLeft += button.id === "prev" ? -heroSliderItemWidth : heroSliderItemWidth;
        button.id === "prev" ? previewSlide() : nextSlide();
        console.log(button.id)
    })
})

heroNavMenuItemAll.forEach((item, index) => {
    item.addEventListener('click', () => {
        heroCounter = index;
        reloadHeroSlider(heroCounter);
        heroSlider.scrollLeft = (heroCounter + 1) * heroSliderItemWidth;
    })
})
//CLICK EVENTS ON BUTTON AND NAV

//DUPLICATE FIRST AND LAST ITEM IN THE SLIDER
const heroSliderChildren = [...heroSlider.children];
let heroSliderChildrenPerView = Math.round(heroSlider.clientWidth / heroSliderItemWidth);

heroSliderChildren.slice(-heroSliderChildrenPerView).reverse().forEach(child => {
    heroSlider.insertAdjacentHTML('afterbegin', child.outerHTML);
})

heroSliderChildren.slice(0, heroSliderChildrenPerView).forEach(child => {
    heroSlider.insertAdjacentHTML('beforeend', child.outerHTML);
})
//DUPLICATE FIRST AND LAST ITEM IN THE SLIDER


//INFINITE SCROLLING
function infiniteScroll() {
    if (heroSlider.scrollLeft === 0) {   
        //checking the formula
        console.log(heroSlider.scrollLeft)
        console.log(heroSlider.scrollWidth)
        console.log(Math.ceil(2 * heroSlider.clientWidth))
        //checking the formula

        heroSlider.classList.toggle('disable-slider');
        heroSlider.scrollLeft = heroSlider.scrollWidth - Math.ceil(2 * heroSlider.clientWidth);
        heroSlider.classList.toggle('disable-slider');
    
    } else if (Math.ceil(heroSlider.scrollLeft) === Math.ceil(heroSlider.scrollWidth - heroSlider.clientWidth)) {
        //checking the formula
        console.log(Math.ceil(heroSlider.scrollLeft))
        console.log(Math.ceil(heroSlider.scrollWidth - heroSlider.clientWidth))
        //checking the formula

        heroSlider.classList.toggle('disable-slider');
        heroSlider.scrollLeft = heroSlider.clientWidth;
        heroSlider.classList.toggle('disable-slider');
    }
} 
heroSlider.addEventListener('scroll', infiniteScroll);
//INFINITE SCROLLING

//AUTO PLAY SECTION
let playHeroSlider;
let autoPlayInterval = 5000;

function autoPlayCommand() {
    heroButtonAll[1].click();
}

function startHeroSlider() {
    playHeroSlider = setInterval(() => {
        autoPlayCommand();
    }, autoPlayInterval);
}

startHeroSlider();

function stopHeroSlider() {
    clearInterval(playHeroSlider);
}
heroContainer.addEventListener('mouseenter', stopHeroSlider);
heroContainer.addEventListener('mouseleave', startHeroSlider);


//AUTO PLAY SECTION

//=================================CAROUSEL HERO ITEMS===================================
const carousel = document.querySelector('.carousel-hero')
const carouselItems = carousel.querySelectorAll('a')

const carouselItemWidth = carouselItems[0].clientWidth
const totalCarouselItems = carouselItems.length - 1

//=================================CAROUSEL NAV ITEM===================================
const carouselNavMenu = document.querySelector('.carousel-navmenu')
const carouselNavMenuItems = carouselNavMenu.querySelectorAll('a')
const carouselNavItem = carouselNavMenu.querySelector('a')

const carouselNavItemWidth = carouselNavMenuItems[0].clientWidth
const totalCarouselNavMenuItems = carouselNavMenuItems.length - 1

let counterCarouselItem = 0
let carouselNavItemPerView = Math.round(carouselNavMenu.clientWidth / carouselNavItemWidth) - 1;
//=================================CLICK FUNCTIONS=====================================
function nextCarouselItem() {
    if (counterCarouselItem == totalCarouselItems) {
        counterCarouselItem = 0;
        carouselNavMenu.classList.toggle('transition-disabled');
        carouselNavMenu.scrollLeft = 0;
        carouselNavMenu.classList.toggle('transition-disabled');
    } else {
        counterCarouselItem += 1
        if (counterCarouselItem > carouselNavItemPerView) {
            carouselNavMenu.scrollLeft += carouselNavItemWidth;
        } 
    }
    reloadCarousel(counterCarouselItem)
}

function previewCarouselItem() {
    if (counterCarouselItem == 0) {
        counterCarouselItem = totalCarouselItems
        carouselNavMenu.classList.toggle('transition-disabled');
        carouselNavMenu.scrollLeft = totalCarouselNavMenuItems * carouselNavItemWidth;
        carouselNavMenu.classList.toggle('transition-disabled');
    } else {
        counterCarouselItem -= 1
        if (counterCarouselItem < (totalCarouselItems - carouselNavItemPerView)) {
            carouselNavMenu.scrollLeft -= carouselNavItemWidth;
        }
    }
    reloadCarousel(counterCarouselItem)
}

function reloadCarousel(counterCarouselItem) {
    carouselNavMenuItems.forEach(item => {
        item.classList.remove('active')
        carouselNavMenuItems[counterCarouselItem].classList.add('active');
    })
    console.log(carouselItemPerView, carouselNavItemPerView , totalCarouselItems, totalCarouselNavMenuItems, counterCarouselItem, carouselItemWidth, carouselNavItemWidth, carouselNavItemPerView)
}
//================================BUTTON CLICK=========================================

const carouselButtons = document.querySelectorAll('.carousel-button')

carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        carousel.scrollLeft += button.id === "prev" ? -carouselItemWidth : carouselItemWidth;
        button.id === "prev" ? previewCarouselItem() : nextCarouselItem();
    })
})

carouselNavMenuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        counterCarouselItem = index;
        reloadCarousel(counterCarouselItem);
        carousel.scrollLeft = carouselItemWidth * (index + 1);
    })
})


const carouselChildren = [...carousel.children];
let carouselItemPerView = Math.round(carousel.clientWidth / carouselItemWidth)

//===============================ADD LAST SLIDE AS -1 INDEX====================
carouselChildren.slice(-carouselItemPerView).reverse().forEach(child => {
    carousel.insertAdjacentHTML('afterbegin', child.outerHTML);
})

carouselChildren.slice(0, carouselItemPerView).forEach(child => {
    carousel.insertAdjacentHTML('beforeend', child.outerHTML);
})


function infinitSlide() {
    if (carousel.scrollLeft === 0) {
        carousel.classList.toggle('transition-disabled');
        carousel.scrollLeft = carousel.scrollWidth - Math.ceil(2 * carousel.clientWidth);
        carousel.classList.toggle('transition-disabled');
    } else if(Math.ceil(carousel.scrollLeft) === Math.ceil(carousel.scrollWidth - carousel.clientWidth)) {
        carousel.classList.toggle('transition-disabled');
        carousel.scrollLeft = carousel.clientWidth;
        carousel.classList.toggle('transition-disabled');
    }
}

carousel.addEventListener('scroll', infinitSlide);

window.onload = function (){
    console.log(carouselItemPerView, carouselNavItemPerView , totalCarouselItems, counterCarouselItem, carouselItemWidth, carouselNavItemWidth, carouselNavItemPerView)
}

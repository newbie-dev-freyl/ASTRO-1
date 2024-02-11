const carouselSlide = document.querySelector('.carousel')
const carouselSlideItems = document.querySelectorAll('.carousel > a')
const carouselSlideItem = document.querySelector('.carousel > a')

const caroueslButtonHoverAll = document.querySelectorAll('.carousel__button_hover')
const carouselButtonHoverNext = document.querySelectorAll('.carousel__button_hover')[1]
const carouselButtonHoverBack = document.querySelectorAll('.carousel__button_hover')[0]

const carouselNavMenu = document.querySelector('.carousel__nav_menu')
const caruoselNavMenuItems = document.querySelectorAll('.carousel__nav_menu > a')
const caruoselNavMenuItem = document.querySelector('.carousel__nav_menu > a')

const getCarouselNavMenuItemsPerView = getComputedStyle(caruoselNavMenuItem)
let carouselNavMenuItemsPerView = getCarouselNavMenuItemsPerView.getPropertyValue('--carousel-nav-item-per-view') - 1
let totalCarouselSlides = carouselSlideItems.length - 1
let carouselKeyCounter = 0

// START HOVER BUTTONS HERE =====
function clickNext() {
    if (carouselKeyCounter == totalCarouselSlides) {
        carouselKeyCounter = 0
        carouselSlide.style.left = 0;
        carouselNavMenu.scrollLeft = 0;
    } else {
        carouselKeyCounter += 1
        if (carouselKeyCounter > carouselNavMenuItemsPerView) {
            carouselNavMenu.scrollLeft += caruoselNavMenuItem.clientWidth + 1
        }
    }
    reloadCarousel(carouselKeyCounter)
}

function clickBack() {
    if (carouselKeyCounter == 0) {
        carouselKeyCounter = totalCarouselSlides
        carouselSlide.style.left = -carouselSlideItems[carouselKeyCounter].offsetLeft + 'px';
        carouselNavMenu.scrollLeft = carouselKeyCounter * (caruoselNavMenuItem.clientWidth + 1);
    } else {
        carouselKeyCounter -= 1
        if (carouselKeyCounter < totalCarouselSlides - carouselNavMenuItemsPerView) {
            carouselNavMenu.scrollLeft -= caruoselNavMenuItem.clientWidth + 1
        }
    }
    reloadCarousel(carouselKeyCounter)
}// END HOVER BUTTONS HERE =====

// START NAV BUTTONS HERE =====
const carouselButtonNavAll = document.querySelectorAll('.carousel__button_nav')
const carouselButtonNavLastPage = document.querySelectorAll('.carousel__button_nav')[1]
const carouselButtonNavFirstPage = document.querySelectorAll('.carousel__button_nav')[0]

function gotoFirstPage(){
    carouselKeyCounter = 0
    carouselNavMenu.scrollLeft = 0;
    reloadCarousel(carouselKeyCounter)
}

function gotoLastPage(){
    carouselKeyCounter = totalCarouselSlides
    carouselNavMenu.scrollLeft = carouselKeyCounter * (caruoselNavMenuItem.clientWidth + 1);
    reloadCarousel(carouselKeyCounter)
}

carouselButtonNavLastPage.addEventListener('click', gotoLastPage)
carouselButtonNavFirstPage.addEventListener('click', gotoFirstPage)
// END NAV BUTTONS HERE =====


function reloadCarousel(carouselKeyCounter) {
    carouselSlide.style.left = -carouselSlideItems[carouselKeyCounter].offsetLeft + 'px'

    caruoselNavMenuItems.forEach(item => {
        item.classList.remove('active')
        caruoselNavMenuItems[carouselKeyCounter].classList.add('active')
    })

    carouselButtonNavAll.forEach(btn => {
        btn.classList.remove('disabled')
        if (carouselKeyCounter == 0) carouselButtonNavAll[0].classList.add('disabled')
        if (carouselKeyCounter == totalCarouselSlides) carouselButtonNavAll[1].classList.add('disabled')
    })
}

caruoselNavMenuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        carouselKeyCounter = index
        reloadCarousel(carouselKeyCounter)
    })
})

carouselButtonHoverNext.addEventListener('click', clickNext)
carouselButtonHoverBack.addEventListener('click', clickBack)

// START CAROUSEL AUTO PLAY HERE =====
let playCarousel
let playCarouselStoppers = [carouselSlide,
                            carouselNavMenu, 
                            carouselButtonHoverBack, 
                            carouselButtonHoverNext,
                            carouselButtonNavFirstPage,
                            carouselButtonNavLastPage]

function startCarouselSlider() {
    playCarousel = setInterval(() => {
        clickNext()
    }, 4000)
}

function stopCarouselSlider() {
    clearInterval(playCarousel)
}

startCarouselSlider()

playCarouselStoppers.forEach(el => {
    el.addEventListener('mouseenter', stopCarouselSlider)
    el.addEventListener('mouseleave', startCarouselSlider)
})
// END CAROUSEL AUTO PLAY HERE =====

window.addEventListener('resize', () => {
    reloadCarousel(carouselKeyCounter)
    carouselNavMenu.scrollLeft = carouselKeyCounter * (caruoselNavMenuItem.clientWidth + 1);
})
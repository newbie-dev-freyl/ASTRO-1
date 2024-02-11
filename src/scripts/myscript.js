const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.arrow');
const cardWidth = document.querySelector('.card').offsetWidth;

let isDragging = false;
let startX, startScrollLeft;



function dragStart(e) {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    console.log(startX, startScrollLeft);
}

function dragging(e) {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStop() {
    isDragging = false;
    carousel.classList.remove('dragging');
}



carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);

arrowBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        carousel.scrollLeft += btn.id === "btn-prev" ? -cardWidth : cardWidth;
    })
})

const cardAll = [...carousel.children];
let perCard = Math.round(carousel.offsetWidth / cardWidth);
console.log(perCard);

cardAll.slice(-perCard).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
})

cardAll.slice(0, perCard).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
})


function infiniteLoop() {
    if (carousel.scrollLeft === 0) {
        carousel.classList.toggle('transition-disabled');
        carousel.scrollLeft = carousel.scrollWidth - Math.ceil(2 * carousel.offsetWidth);
        carousel.classList.toggle('transition-disabled');
    } else if(Math.ceil(carousel.scrollLeft) === Math.ceil(carousel.scrollWidth - carousel.offsetWidth)) {
        carousel.classList.toggle('transition-disabled');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.toggle('transition-disabled');
    }
}

carousel.addEventListener('scroll', infiniteLoop);
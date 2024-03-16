let windowWidth = document.documentElement.getBoundingClientRect().width;
const headerNavToggle = document.querySelector('.header-toggle');


function fn_resize(size) {
    headerNavToggle.removeAttribute('toggled');

    if (windowWidth < size) {//if

        headerNavToggle.onclick = () => {
            headerNavToggle.toggleAttribute('toggled');
        }

        
    }//if 
}

let resizeTimer;
function fn_disable_animation() {
    
    document.documentElement.setAttribute('disabled-animation', '');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.documentElement.removeAttribute('disabled-animation');
    }, 100);

}

window.onresize = () => {
    fn_disable_animation();

    
    fn_resize(843.2);
    
}

window.onload = () => {
    fn_resize(843.2);
}


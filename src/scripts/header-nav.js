const headerNavToggle = document.querySelector('.header-toggle');
const headerNavLinkAll = document.querySelectorAll('.header-navmenu a');
const headerNavMenuAll = document.querySelectorAll('[toggle-menu] + ul');




function fn_resize(size) {//function

    //remove all toggled attribute on window resize
    headerNavToggle.removeAttribute('toggled');
    headerNavMenuAll.forEach(menu => {
        menu.removeAttribute('toggled');
    });//remove all toggled attribute on window resize

    if (document.documentElement.getBoundingClientRect().width > size) {//if
        console.log('desktop mode')

        //disable toggle menu click on desktop mode
        headerNavLinkAll.forEach(link => {
            link.onclick = function() {
                if (link.hasAttribute('toggle-menu')) {
                    link.nextElementSibling.removeAttribute('toggled');
                }
            } 
        })//disable toggle menu click on desktop mode

    } else {    
        console.log('tablet mode')

         //close all submenu on header toggle click
        headerNavToggle.onclick = function() {
            headerNavToggle.toggleAttribute('toggled');
            headerNavMenuAll.forEach(menu => {
                menu.removeAttribute('toggled');
            })
        }//close all submenu on header toggle click

        headerNavLinkAll.forEach(link => {
            link.onclick = function() {
                if (link.hasAttribute('toggle-menu')) {
                    link.nextElementSibling.toggleAttribute('toggled');
                }

                if (link.hasAttribute('toggle-back')) {
                    link.parentElement.parentElement.toggleAttribute('toggled');
                }
            }   
        })

    }//if else

}//function

let resizeTimer;
function fn_disable_animation() {//function
    
    document.documentElement.setAttribute('disabled-animation', '');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        document.documentElement.removeAttribute('disabled-animation');
    }, 100);

}//function

window.onresize = function() {
    fn_disable_animation();
    fn_resize(843.20);
    
}

window.onload = function() {
    fn_resize(843.20);
}


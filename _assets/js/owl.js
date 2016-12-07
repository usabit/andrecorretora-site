$(document).ready(function() {

    $('.banner-fullwidth').owlCarousel({
        items: 1,
        nav: false,
        loop: true,
        autoplay: true,
        autoplaySpeed: 1200,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        slideSpeed: 1300
    });

    $('.slider').owlCarousel({
        items: 2,
        loop: true,
        nav: true,
        navText: [
            "<i class='fa fa-caret-left'></i>",
            "<i class='fa fa-caret-right'></i>"
        ],
        dots: false,
        navContainerClass: 'custom-nav',
        responsive:{
            0:{
                items:1
            },
            800:{
                items:2
            }
        }
    });

});

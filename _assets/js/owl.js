$(function() {

    $('.owl-carousel').owlCarousel({
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

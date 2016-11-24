$(function() {
    $('header.site-header .site-nav .menu-icon').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            $('header.site-header .site-nav .responsive-menu').css('display', 'flex').hide().fadeIn();
            $('body, html').css('overflow', 'hidden');
        }else{
            $('header.site-header .site-nav .responsive-menu').fadeOut();
            $('body, html').css('overflow', 'initial');
        }
    });
});

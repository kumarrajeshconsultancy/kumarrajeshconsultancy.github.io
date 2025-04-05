$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-menu-btn').click(function() {
        $('.navbar').toggleClass('active');
    });

    // Sticky Header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Counter Animation
    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).data('count')
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    // Testimonial Slider
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 80,
            },
            500,
            'linear'
        );
    });

    // Form Submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
});

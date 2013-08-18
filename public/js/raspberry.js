'use strict';

$(document).ready(function () {
    $('.menuButton').mouseenter(function () {
        $(this).fadeTo('fast', 1);
    });
    $('.menuButton').mouseleave(function () {
        $(this).fadeTo('fast', 0.7);
    });
});// JavaScript Document



//Scroll capabilities for 'Learn More' button on top screen
$(document).ready(function () {
    $('#learnMoreLink').click(function () {
        $('html,body').animate({
            scrollTop: $('#sectionTwo').offset().top - 87
        });
    });
});


//Scroll capabilities for 'about' button on top screen
$(document).ready(function () {
    $('#aboutLink').click(function () {
        $('html,body').animate({
            scrollTop: $('#sectionTwo').offset().top - 87
        });
    });
});

//Scroll capabilities for 'features' button on top screen
$(document).ready(function () {
    $('#featuresLink').click(function () {
        $('html,body').animate({
            scrollTop: $('#features').offset().top - 87
        });
    });
});

//Scroll capabilities for 'faqs' button on top screen
$(document).ready(function () {
    $('#faqsLink').click(function () {
        $('html,body').animate({
            scrollTop: $('#faqs').offset().top - 86
        });
    });
});

//Scroll capabilities for 'contact' button on top screen
$(document).ready(function () {
    $('#contactLink').click(function () {
        $('html,body').animate({
            scrollTop: $('#footer').offset().top - 87
        });
    });
});

//Scroll capabilities for 'about' button on top screen small
$(document).ready(function () {
    $('#aboutSmall').click(function () {
        $('html,body').animate({
            scrollTop: $('#sectionTwo').offset().top
        });
    });
});

//Scroll capabilities for 'features' button on top screen small
$(document).ready(function () {
    $('#featuresSmall').click(function () {
        $('html,body').animate({
            scrollTop: $('#features').offset().top
        });
    });
});

//Scroll capabilities for 'faqs' button on top screen small
$(document).ready(function () {
    $('#faqsSmall').click(function () {
        $('html,body').animate({
            scrollTop: $('#faqs').offset().top
        });
    });
});

//Scroll capabilities for 'contact' button on top screen small
$(document).ready(function () {
    $('#contactSmall').click(function () {
        $('html,body').animate({
            scrollTop: $('#footer').offset().top
        });
    });
});

//Scroll capabilities for 'home' button on side bar
$(document).ready(function () {
    $('#homeBar').click(function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });
});

//Scroll capabilities for 'about' button on side bar
$(document).ready(function () {
    $('#aboutBar').click(function () {
        $('html,body').animate({
            scrollTop: $('#sectionTwo').offset().top - 87
        });
    });
});

//Scroll capabilities for 'features' button on side bar
$(document).ready(function () {
    $('#featuresBar').click(function () {
        $('html,body').animate({
            scrollTop: $('#features').offset().top - 87
        });
    });
});

//Scroll capabilities for 'faqs' button on side bar
$(document).ready(function () {
    $('#faqsBar').click(function () {
        $('html,body').animate({
            scrollTop: $('#faqs').offset().top - 87
        });
    });
});

//Scroll capabilities for 'contact' button on side bar
$(document).ready(function () {
    $('#contactBar').click(function () {
        $('html,body').animate({
            scrollTop: $('#footer').offset().top - 87
        });
    });
});

//Scroll capabilities for 'WheeTalks' title at top of page
$(document).ready(function () {
    $('#title').click(function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });
});


//Makes side menubar static when it hits the header
$(document).ready(function () {
    var top = $('.menuBar').offset().top - 103;
    $(window).scroll(function (event) {
        var y = $(this).scrollTop();
        if (y >= top) {
            $('.menuBar').addClass('menuBarFixed');
        } else {
            $('.menuBar').removeClass('menuBarFixed');
        }
    });
});


//Makes 'about' section static 
$(document).ready(function () {
    var top = $('#wrapperTwo').offset().top + 200;
    $(window).scroll(function (event) {
        var y = $(this).scrollTop();
        if (y >= top) {
            $('#wrapperTwo').addClass('wrapperTwoFixed');
        } else {
            $('#wrapperTwo').removeClass('wrapperTwoFixed');
        }
    });
});


//Display name on pages.
//ADD CODE FOR THIS

//Display answer to FAQs on click
$(document).ready(function() {
    $('.question').click( function () {
        $('.answer').slideToggle("fast");
    });
});


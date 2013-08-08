
$(document).ready(function() {
    $('.button').mouseenter(function() {
        $(this).fadeTo('fast', 1);;
    });
    $('.button').mouseleave(function(){
        $(this).fadeTo('fast', .7);;
    });
});// JavaScript Document

//Scroll capabilities for 'Learn More' button on top screen
$(document).ready(function() {
    $('#learnMore').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        //$(window).scrollTop(y+559);
        $('html,body').animate({
            scrollTop: $('#scrollTop').offset().top
        });
    });
});

//Scroll capabilities for 'about' button on top screen
$(document).ready(function() {
    $('#about').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#scrollTop').offset().top
        });
    });
});

//Scroll capabilities for 'features' button on top screen
$(document).ready(function() {
    $('#features').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#wrapperSeven').offset().top
        });
    });
});

//Scroll capabilities for 'faqs' button on top screen
$(document).ready(function() {
    $('#faqs').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#wrapperTen').offset().top
        });
    });
});

//Scroll capabilities for 'contact' button on top screen
$(document).ready(function() {
    $('#contact').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#wrapperFooter').offset().top
        });
    });
});

//Scroll capabilities for 'features' button on side bar
$(document).ready(function() {
    $('#featuresBar').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#wrapperSeven').offset().top
        });
    });
});

//Scroll capabilities for 'faqs' button on side bar
$(document).ready(function() {
    $('#faqsBar').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#wrapperTen').offset().top
        });
    });
});

//Scroll capabilities for 'contact' button on side bar
$(document).ready(function() {
    $('#contactBar').click(function () {
        var y = $(window).scrollTop();  //your current y position on the page
        $('html,body').animate({
            scrollTop: $('#wrapperFooter').offset().top
        });
    });
});

$(document).ready(function () {  
  var top = $('#menuBar').offset().top - parseFloat($('#menuBar').css('marginTop').replace(/auto/, 0));
  $(window).scroll(function (event) {
    // what the y position of the scroll is
    var y = $(this).scrollTop();
  
    // whether that's below the form
    if (y >= top) {
      // if so, ad the fixed class
      $('#menuBar').addClass('menuBarFixed');
    } else {
      // otherwise remove it
      $('#menuBar').removeClass('menuBarFixed');
    }
  });
});
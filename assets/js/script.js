/*
Formanda: Alesandra Batista
    Linkedin: https://www.linkedin.com/in/alesandra-batista-0a1b3b1a2/
    Github: https://github.com/alesandrabatista
*/

//window scroll
$(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= 100) {
        $('body').addClass('fixed-header');
    } else {
        $('body').removeClass('fixed-header')
    }
});

// Document Ready
$(document).ready(function(){

    //Typing animation
    new Typed('.type-it', {
        strings:['Designer', 'Developer', 'Freelancer'], 
        typeSpeed: 100,
        loop: true
    });

    //Owl Carousel Aqui não funcionou
    // $('.owl-carousel').owlCarousel({
    // loop:true,
    // items: 2,
    // margin:30,
    // autoplay:true,
    // autoplayTimeout:2000,
    // responsive:{
    //    0:{
    //        items:1
    //   },
    //   900:{
    //        items:2
    //    }
  //  }
// }) ;

//One Page Scroll
$.ScrollIt();


})


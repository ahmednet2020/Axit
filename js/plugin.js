/*global $, alert, document, window, console */
$(document).ready(function () {
    "use strict";
    $(window).on('scroll', function () {
        $(".navbar").find('.timeline-effect').animate({
            "width": (($(window).scrollTop() * 100 ) / ($("body").outerHeight() - $(window).height())) + "%"
        }, 10);
    });
    $(".nav-item").on("click", function (e) {
    	$(this).siblings('.nav-item').removeClass('active').end().addClass('active');
    });
    $("header").css("height",$(window).height());
});
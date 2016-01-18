// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//function to store user name and password
   function store(theForm) {
    var inputUsername= theForm["username"];
    var inputPassword= theForm["password"];
    localStorage.setItem("username", inputUsername.value);
    localStorage.setItem("password", inputPassword.value);

    window.location.href = 'drawroom.html';
    return false;
   } // end store()

//function to sign in
   function login(theForm) {
    var inputUsername = theForm["username"];
    var inputPassword = theForm["password"];
    var username = inputUsername.value;
    var password = inputPassword.value;
    if ((username == localStorage.getItem('username')) && (password == localStorage.getItem('password'))) {

        window.location.href = 'drawroom.html';
      } else {

          alert("Invalid Log-in!");
    }
    return false;
   } // end login()

$(document).ready(function() { 
    "use strict";


    // Mobile nav

    $('.mobile-toggle').click(function() {
        $(this).closest('nav').toggleClass('nav-open');
    });

    // Navbar Sticky

    (function() {
        var docElem = document.documentElement,
            didScroll = false,
            stickynav = 50;
            document.querySelector( '.nav-container' );
        function init() {
            window.addEventListener( 'scroll', function() {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 50 );
                }
            }, false );
        }
        
        function scrollPage() {
            var sy = scrollY();
            if ( sy >= stickynav ) {
                $( '.nav-container' ).addClass('sticky');
            }
            else {
                $( '.nav-container' ).removeClass('sticky');
            }
            didScroll = false;
        }
        
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }        
        init();        
    })();


    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
        $(this).css('background-size', 'cover');
        $(this).css('background-position', '50% 0');
        $(this).css('background-repeat', 'no-repeat');
    });

    // Fade in background images

    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);

    // Owl Carousel Options

    $("#slider").owlCarousel({
 
    navigation : false,
    pagination: true,
    responsive: true,
    items: 1,
    touchDrag: true,
    navigationText: false,
    mouseDrag: true,
    itemsDesktop: [3000,1],
    itemsDesktopSmall: [1440,1],
    itemsTablet:[1024,1],
    itemsTabletSmall: [600,1],
    itemsMobile: [360,1],
    autoPlay: true,
    autoHeight: true
 
    });

    // Progress Bars

    $('.progress-bar').each(function() {
        $(this).css('width', $(this).attr('data-progress') + '%');
    });

    // Map Holder Overlay
    
    $('.map-holder').click(function(){
        $(this).addClass('on');
    });
    
    $(window).scroll(function(){
        if($('.map-holder').hasClass('on')){
            $('.map-holder').removeClass('on');
        }
    });
    
    // Map Details Holder
    
    $('.details-holder').each(function(){
        $(this).css('height', $(this).width());
    });
    
    $('.details-holder').mouseenter(function(){
        $(this).closest('.map-overlay').addClass('fade-overlay');
    }).mouseleave(function(){$(this).closest('.map-overlay').removeClass('fade-overlay');});

    // Video Modals
    $('section').closest('body').find('.modal-video[video-link]').remove();

    $('.modal-video-container').each(function(index) {
        $(this).find('.play-button').attr('video-link', index);
        $(this).find('.modal-video').clone().appendTo('body').attr('video-link', index);
    });

    $('.modal-video-container .play-button').click(function() {
        var linkedVideo = $('section').closest('body').find('.modal-video[video-link="' + $(this).attr('video-link') + '"]');
        linkedVideo.toggleClass('reveal-modal');

        if (linkedVideo.find('video').length) {
            linkedVideo.find('video').get(0).play();
        }

        if (linkedVideo.find('iframe').length) {
            var iframe = linkedVideo.find('iframe');
            var iframeSrc = iframe.attr('data-src');
            var autoplayMsg;
            if(iframeSrc.indexOf('vimeo') > -1){
                autoplayMsg = '&autoplay=1';
            }else{
                autoplayMsg = '?autoplay-1';
            }
            var iframeSrc = iframe.attr('data-src') + autoplayMsg;
            iframe.attr('src', iframeSrc);
        }
    });

    $('section').closest('body').find('.close-iframe').click(function() {
        $(this).closest('.modal-video').toggleClass('reveal-modal');
        $(this).siblings('iframe').attr('src', '');
        $(this).siblings('video').get(0).pause();
    });

    // Local Videos

    $('section').closest('body').find('.local-video-container .play-button').click(function() {
        $(this).siblings('.background-image-holder').removeClass('fadeIn');
        $(this).siblings('.background-image-holder').css('z-index', -1);
        $(this).css('opacity', 0);
        $(this).siblings('video').get(0).play();
    });

    // Youtube Videos

    $('section').closest('body').find('.player').each(function() {
        var section = $(this).closest('section');
        section.find('.container').addClass('fadeOut');
        var src = $(this).attr('data-video-id');
        var startat = $(this).attr('data-start-at');
        $(this).attr('data-property', "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}");
    });

    if($('.player').length){
        $('.player').each(function(){

            var section = $(this).closest('section');
            var player = section.find('.player');
            player.YTPlayer();
            player.on("YTPStart",function(e){
                section.find('.container').removeClass('fadeOut');
                section.find('.masonry-loader').addClass('fadeOut');
            });

        });
    }


});


$(document).ready(function(){
            
    "use strict";

//------------------------------------------------------------------------  
//                    MAGNIFIC POPUP(LIGHTBOX) SETTINGS
//------------------------------------------------------------------------  
              
    $('.portfolio-list li').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

//------------------------------------------------------------------------
//                  SUBSCRIBE FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------          
    $('#subscribe_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo( element.closest("form"));
        },
        messages: {
            email: {
                required: "We need your email address to contact you",
                email: "Please, enter a valid email"
            }
        },
                    
        highlight: function(element) {
            $(element)
        },                    
                    
        success: function(element) {
            element
            .text('').addClass('valid')
        }
    }); 
    
            
//------------------------------------------------------------------------------------
//                      SUBSCRIBE FORM MAILCHIMP INTEGRATIONS SCRIPT
//------------------------------------------------------------------------------------      
    $('#subscribe_form').submit(function() {
        $('.error').hide();
        $('.error').fadeIn();
        // submit the form
        if($(this).valid()){
            $('#subscribe_submit').button('loading'); 
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    newsletter_email: $('#subscribe_email').val()
                },
                success: function(data) {
                    $('#subscribe_submit').button('reset');
                    
                    //Use modal popups to display messages
                    $('#modalMessage .modal-title').html('<i class="icon ion-ios-checkmark"></i>' + data);
                    $('#modalMessage').modal('show');
                    
                },
                error: function() {
                    $('#subscribe_submit').button('reset');
                    
                    //Use modal popups to display messages
                    $('#modalMessage .modal-title').html('<i class="icon ion-ios-close"></i>Oops!<br>Something went wrong!');
                    $('#modalMessage').modal('show');
                    
                }
            });
        }
        return false; 
    });
      
          
//------------------------------------------------------------------------------------
//                      CONTACT FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------------------        
    $('#contact_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        messages: {
            name: "What's your name?",
            message: "Type your message",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },
                    
        highlight: function(element) {
            $(element)
            .text('').addClass('error')
        },                    
                    
        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });   




//------------------------------------------------------------------------------------
//                              CONTACT FORM SCRIPT
//------------------------------------------------------------------------------------  
    
    $('#contact_form').submit(function() {
        // submit the form
        if($(this).valid()){
            $('#contact_submit').button('loading'); 
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                    $('#contact_submit').button('reset');
                    $('#modalContact').modal('hide');
                    
                    //Use modal popups to display messages
                    $('#modalMessage .modal-title').html('<i class="icon ion-ios-checkmark"></i>Well done!<br>Your message has been successfully sent!');
                    $('#modalMessage').modal('show');
                },
                error: function() {
                    $('#contact_submit').button('reset');
                    $('#modalContact').modal('hide');
                    
                    //Use modal popups to display messages
                    $('#modalMessage .modal-title').html('<i class="icon ion-ios-close"></i>Oops!<br>Something went wrong!');
                    $('#modalMessage').modal('show');
                }
            });
        } else {
            $('#contact_submit').button('reset')
        }
        return false; 
    });           

});

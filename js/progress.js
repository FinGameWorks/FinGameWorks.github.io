$(document).ready(function() { 
    "use strict";

    // Progress Bars

    $('.progress-bar').each(function() {
        $(this).css('width', $(this).attr('data-progress') + '%');
    });   

});
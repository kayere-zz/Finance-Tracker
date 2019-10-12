$(document).ready(function(){
    function blink_text(){
        $('.total').fadeOut(500);
        $('.total').fadeIn(500);
    }
    setInterval(blink_text, 1000);
});
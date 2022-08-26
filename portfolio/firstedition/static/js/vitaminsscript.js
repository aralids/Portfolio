$(document).ready(function (){
    $('#reel-1').scrollTop(725);
    console.log($('.slot').outerHeight());
    console.log($('.reel').outerHeight());
    console.log($('.slot').outerHeight()*4);
    $('#reel-1').on('scroll', function () {
        if ($('#reel-1').scrollTop() < 201.1) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() + 804.4);
        }else if ($('#reel-1').scrollTop() >= 804.4) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - 804.4);
        }
        console.log($('#reel-1').scrollTop());
    })
})
$(document).ready(function (){
    $('#reel-1').scrollTop(725);
    console.log($('.slot').outerHeight());
    console.log($('.reel').outerHeight());
    console.log($('.slot').outerHeight()*4);
    $('#reel-1').on('scroll', function () {
        if ($('#reel-1').scrollTop() < 181) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() + 725.5999755859375);
        }else if ($('#reel-1').scrollTop() >= 725.5999755859375) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - 725.5999755859375);
        }
        console.log($('#reel-1').scrollTop());
    })
})
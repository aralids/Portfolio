$(document).ready(function (){
    console.log($('#reel-1').height());
    console.log($('.slot').height());
    var y = $('#reel-1').scrollTop();  //your current y position on the page
    console.log(y);
    $('#reel-1').scrollTop(y+4*181.33);
    console.log($('#reel-1').scrollTop());
    $('#reel-1').on('scroll', function () {
        if ($('#reel-1').scrollTop() >= 753.5999755859375) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - 753.5999755859375);
        }
    })
})
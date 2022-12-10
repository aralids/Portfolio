$(document).ready(function (){
    let slotHeight = $('.slot').outerHeight();

    $('#reel-1').scrollTop(slotHeight);
    $('#reel-1').on('scroll', function() { 
        if ($('#reel-1').scrollTop() < slotHeight) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() + slotHeight * 22);
        } else if ($('#reel-1').scrollTop() >= slotHeight * 23) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - slotHeight * 22);
        }
    });

    $('#reel-2').scrollTop(slotHeight);
    $('#reel-2').on('scroll', function() { 
        if ($('#reel-2').scrollTop() < slotHeight) {
            $('#reel-2').scrollTop($('#reel-2').scrollTop() + slotHeight * 22);
        } else if ($('#reel-2').scrollTop() >= slotHeight * 23) {
            $('#reel-2').scrollTop($('#reel-2').scrollTop() - slotHeight * 22);
        }
    });

    console.log($("#reel-3").scrollTop())
    $('#reel-3').on('scroll', function() { 
        if ($('#reel-3').scrollTop() < slotHeight) {
            $('#reel-3').scrollTop($('#reel-3').scrollTop() + slotHeight * 4);
        } else if ($('#reel-3').scrollTop() >= slotHeight * 5) {
            $('#reel-3').scrollTop($('#reel-3').scrollTop() - slotHeight * 4);
        }
    });

    /*

    $('#reel-1').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
      })

    */
})
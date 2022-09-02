$(document).ready(function (){
    let slotHeight = $('.slot').outerHeight();
    
    console.log($("#reel-2").scrollTop())
    $('#reel-2').on('scroll', function() { 
        if ($('#reel-2').scrollTop() < slotHeight) {
            $('#reel-2').scrollTop($('#reel-2').scrollTop() + slotHeight * 4);
        } else if ($('#reel-2').scrollTop() > slotHeight * 5) {
            $('#reel-2').scrollTop($('#reel-2').scrollTop() - slotHeight * 4);
        }
        
    });

    console.log($("#reel-3").scrollTop())
    $('#reel-3').on('scroll', function() { 
        if ($('#reel-3').scrollTop() < slotHeight) {
            $('#reel-3').scrollTop($('#reel-3').scrollTop() + slotHeight * 4);
        } else if ($('#reel-3').scrollTop() > slotHeight * 5) {
            $('#reel-3').scrollTop($('#reel-3').scrollTop() - slotHeight * 4);
        }
        
    });

    $('#reel-1').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
      })
})
$(document).ready(function (){
    let slotHeight = $('.slot').outerHeight();
    let slotHeight4 = $('.slot').outerHeight()*4;
    let reel = $('.reel').outerHeight();
    $('#reel-1').scrollTop(slotHeight);
    console.log("slot: ", slotHeight)
    console.log("slot x 4: ", slotHeight4)
    console.log("reel: ", reel)
    setInterval(function(){ 
        if ($('#reel-1').scrollTop() < slotHeight) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() + slotHeight4);
            window.setTimeout(function () {
                disableScroll = false;
            }, 40);
        } else if ($('#reel-1').scrollTop() >= slotHeight * 5) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - slotHeight4);
            window.setTimeout(function () {
                disableScroll = false;
            }, 40);
        }
    }, 40);
})
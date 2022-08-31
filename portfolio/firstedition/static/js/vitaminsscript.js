$(document).ready(function (){
    let slotHeight = $('.slot').outerHeight();
    let slotHeight4 = $('.slot').outerHeight()*4;
    let reel = $('.reel').outerHeight();
    let pastScroll = 0
    let currentScroll = 0
    
    console.log($("#reel-1").scrollTop())
    $('#reel-1').on('scroll', function() { 
        pastScroll = currentScroll
        if ($('#reel-1').scrollTop() <= slotHeight) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() + slotHeight4 + 10);
        } else if ($('#reel-1').scrollTop() >= slotHeight * 5) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - slotHeight * 4);
            console.log("TRUE")
        }
        currentScroll = $('#reel-1').scrollTop()
        console.log($("#reel-1").scrollTop())
        
    });

    console.log("Well, ", $("#reel-1").scrollTop())
})

function scrollUp() {
    $('#reel-1').animate({scrollTop: 910}, 1000).animate({scrollTop: 200}, 800)
}
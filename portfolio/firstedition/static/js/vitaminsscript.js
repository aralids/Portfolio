$(document).ready(function (){
    setInterval(function(){ 
        if ($('#reel-1').scrollTop() < 201.1) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() + 804.4);
        }else if ($('#reel-1').scrollTop() >= 804.4) {
            $('#reel-1').scrollTop($('#reel-1').scrollTop() - 804.4);
        }
      }, 40);
})
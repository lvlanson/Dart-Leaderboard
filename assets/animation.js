$(document).ready(function(){

  //Animiert die Navigation, vergrößert die Schrift, wenn die Mouse drüber fährt
  $('nav').on('mouseenter', 'a', function(){
    $(this).animate({"font-size": "45px"},'fast');
  });
  $('nav').on('mouseleave', 'a', function(){
    $(this).animate({"font-size":"30px"},'fast');
  });

  //Färbt den Tabellenkopf ein bei click
  $('.content').on('click','th', function(){
    if($(this).hasClass('highlighted')){
      $(this).removeClass('highlighted');
    }else{
      $('.highlighted').removeClass('highlighted');
      $(this).addClass('highlighted');
    }
  });
});

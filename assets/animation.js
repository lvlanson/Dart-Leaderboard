$(document).ready(function(){
  $('nav').on('mouseenter', 'a', function(){
    $(this).animate({"font-size": "45px"},'fast');
  });
  $('nav').on('mouseleave', 'a', function(){
    $(this).animate({"font-size":"30px"},'fast');
  });
});

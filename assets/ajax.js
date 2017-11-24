$(document).ready(function(){
  $('nav').on('click', 'a', function(){
    var page = $(this).text().toLowerCase();
    $.ajax(page,{
      success: function(response){
        $('.content').html(response);
      }
    });
  });
  $('.content').on('submit','form', function(event){
    event.preventDefault();
    var player = $(this).find('input').val();
    var html = "<p>Spieler \"" + player +"\" wurde hinzugefügt!";
    $.ajax($(this).attr('action'),{
      type:'POST',
      data: {"player": player},
      complete: function(){
        $(".content").find('.addPlayer').append(html);
      }
    });
  });
});

function getPage(page){
  $.ajax(page,{
    success: function(response){
      $('.content').html(response);
    }
  });
}

$(document).ready(function(){


  // Click Handling navigation

  $('nav').on('click', 'a', function(){
    var page = $(this).text().toLowerCase();
    getPage(page);
  });

  $('.content').on('submit','form', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var player = $(this).find('input').val();

    console.log('Form Submitted with "' + player + '"');

    if(player.length > 0){
      var html = "<p id='added'>Spieler \"" + player +"\" wurde hinzugefügt!";
      $.ajax($(this).attr('action'),{
        type:'POST',
        data: {"player": player},
        complete: function(){
          $('.content').find('#added').remove();
          $('.content').find('.addPlayer').append(html);
          $('.content').find('#playerList').remove();
          getPage('konfiguration');
        }
      });
      return false;
    }
  });
  /*
   * DELETE PLAYER FROM KONFIGURATION PAGE
   */


  $('.content').on('click', '.delete', function(){
    let name = $(this).closest('tr').find('.playerName').text().trim();
    console.log(name);
    $.ajax({
      url: 'delete',
      type: 'POST',
      data:{"name": name},
      success: function(){
        console.log(name + " has been removed!");
        $('.content').find('#playerList').remove();
        getPage('konfiguration');
      }
    });
  });
});

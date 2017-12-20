function getPage(addPage, removePage){
  $.ajax({
    url: addPage,
    type:'GET',
    success: function(response){
      removePage.remove();
      $('.content').append(response);
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log("Error" + errorThrown);
    }
  });
}

$(document).ready(function(){


  // Click Handling navigation

  $('nav').on('click', 'a', function(){
    var page = $(this).text().toLowerCase();
    if(page === 'konfiguration'){
      var passwort = prompt("Alter! Ohne Passwort kommst du hier nicht rein!");
      $.ajax({
        url: 'passwort',
        type: 'POST',
        data: {'data': passwort},
        success: function(response){
          $('.injectedPage').remove();
          $('.content').append(response);

        }
      })
    }else{
      var remove=$(".injectedPage");
      getPage(page,remove);
    }

  });

  $('.content').on('submit','.addPlayer', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var player = $(this).find('input').val();

    if(player.length > 0){
      var html = "<p id='added'>Spieler \"" + player +"\" wurde hinzugefügt!";
      console.log('Form submitted with "' + player + '"');
      $.ajax({
        url: $(this).attr('action'),
        type:'POST',
        data: {'player': player},
        success: function(){
          console.log("Test");
          var remove=$(".injectedPage");
          getPage('konfiguration', remove);
        },
        error: function(){
          console.log('Error');
        }
      });
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
      data:{'name': name},
      success: function(){
        console.log(name + " has been removed!");
        var remove=$(".injectedPage");
        getPage('konfiguration', remove);
      }
    });
  });

  $('.content').on('change', '#updateForm', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    let names = [];
    let namesCount = $(this).find('.playerSelection').length;

    for(var i = 0; i<namesCount; i++){
      let isChecked = $(this).find('.playerSelection:eq('+i+')').is(':checked');
      if(isChecked){
        let currentName = $(this).find('.playerSelectionOption:eq('+i+')').text().trim();
        names.push(currentName);
      }
    }

    let selectedGame;
    let isCricketChecked = $(this).find('.gameSelection:eq(0)').is(':checked');
    let is501Checked = $(this).find('.gameSelection:eq(1)').is(':checked');
    if(isCricketChecked){
      selectedGame = 'cricket';
    }else{
      selectedGame = '501';
    }
    let data = {selectedGame: selectedGame,
                names: names};

    if(names.length===0){
      $('.updateGamePage').remove();
    }

    if(isCricketChecked || is501Checked){
      $.ajax({
        url: 'updateGamePage',
        type: 'POST',
        data:{'game': selectedGame,
              'names': names},
        success: function(response){
          $('.updateGamePage').remove();
          $('.content').append(response);

        }
      });
    }
  });
});

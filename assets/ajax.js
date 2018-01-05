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


  /*=====================================================
                    NAVIGATION HANDLER
  =====================================================*/

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

/*==========================================================
                  ADDING PLAYER HANDLER
==========================================================*/

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
        error: function(data){
          $('.addPlayer').append(data);
        }
      });
    }
  });
  /*=====================================================
                DELETE PLAYER HANDLER
   ====================================================*/


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

  /*=====================================================
                  UPDATE FORM HANDLER
  =====================================================*/

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

  /*******************************************************
                    UPDATE SUBMITTER
  *******************************************************/

  $('.content').on('submit', '#sendUpdate', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    var names = [];
    var points = [];
    var ranks = [];
    var game = $(this).attr('name');
    var playerCount = $(this).find('.playerName').length;
    for(var i = 0; i<playerCount; i++){
      names.push($(this).find('#'+i)
                        .find('.playerName')
                        .text()
                        .trim()
                      );
      points.push($(this).find('#'+i)
                         .find('.updateScore')
                         .val()
                         .trim()
                       );
      ranks.push($(this).find('#'+i)
                        .find('.updateRang option:selected')
                        .text()
                        .trim()
                );
    }
    var data={
      names: names,
      points: points,
      ranks: ranks,
      game: game
    };
    $.ajax({
      url:'pushUpdate',
      type:'POST',
      data: data,
      success: function(){
        $('.injectedPage').remove();
        $('.content').append('<p class="injectedPage">Update Erfolgreich.</p>');
      }
    });
    console.log(data);
  });
});

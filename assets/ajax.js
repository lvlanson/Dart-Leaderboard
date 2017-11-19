$(document).ready(function(){
  $('nav').on('click', 'a', function(){
    var page = $(this).text().toLowerCase();
    $.ajax(page,{
      success: function(response){
        $('.content').html(response);
      }
    });
  });

});

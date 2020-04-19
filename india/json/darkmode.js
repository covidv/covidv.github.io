$( ".inner-switch" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
      $( "body" ).removeClass( "dark" );
    } else {
      $( "body" ).addClass( "dark" );
    }
});
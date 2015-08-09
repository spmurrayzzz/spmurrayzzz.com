(function() {

  var $ = document.querySelectorAll.bind( document );

  document.addEventListener( 'DOMContentLoaded', function() {

    var portrait = null;

    [ 'h1', 'p', '.portrait' ].forEach(function( classStr ) {
      var elem = $( 'header ' + classStr )[ 0 ];
      if ( elem ) {
        elem.classList.add('slide');
      }
    });

    $('main')[ 0 ].classList.add('visible');

  });

})();

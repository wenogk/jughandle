

(function($){
  $(function(){
    repeatFunction()
    $('.sidenav').sidenav();
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space

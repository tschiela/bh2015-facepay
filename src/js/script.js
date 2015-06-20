(function ($) {
  // TODO: migrate to angularjs (+ngAnimate)

  var showBackdrop = function () {
    var $backdrop = $('<div class="sidenav-backdrop"></div>');
    $('main').append($backdrop);
  };

  var hideBackdrop = function () {
    $('.sidenav-backdrop').remove();
  };

  var showSidenav = function () {
    $('body').addClass('sidenav-open');
    showBackdrop();
  };

  var hideSidenav = function () {
    $('body').removeClass('sidenav-open');

    setTimeout(function () {
      hideBackdrop();
    }, 400);
  };

  var toggleSideNav = function () {
    if ($('body').hasClass('sidenav-open')) {
      hideSidenav();
    } else {
      showSidenav();
    }
  };

  var addHeaderAccent = function () {
    $('header').addClass('accent');
  };

  var removeHeaderAccent = function () {
    $('header').removeClass('accent');
  };

  $(function () {
    $('.button-collapse').click(function (event) {
      toggleSideNav();
      event.stopPropagation();
    });

    $(document).click(function () {
      hideSidenav();
    });

    // add shadow to header after  scrolling
    $('main').scroll(function (event) {
      if (event.target.scrollTop > 0) {
        addHeaderAccent();
      } else {
        removeHeaderAccent();
      }
    });

    console.log("init waves");

    // init waves plugin
    Waves.init();
    Waves.attach('.waves-effect');
  });

})(window.jQuery);

(function ($) {

  function addCSSRule (selector, rules) {
    $('head').append('<style type="text/css">' + selector + ' { ' + rules + ' }</style>');
  }

  $.fn.sticky = function () {
    addCSSRule('.stuck', 'position: fixed !important; top: 0 !important; z-index: 10')
    addCSSRule('.stuck-wedge', 'padding: 0 !important; margin: 0 !important; height: 0')

    var elem = $(this),
        initialOffset = elem.offset().top,
        wedge = $('<div class="stuck-wedge"></div>').prependTo(elem.parent()),
        stuck = false

    $(window).on('scroll', function () {
      var currentPosition = $(window).scrollTop(),
          offset = elem.offset().top

      if (currentPosition < initialOffset && offset !== initialOffset && !stuck) {

        // Update the initialOffset, because the DOM has caused the element's position to change
        initialOffset = offset

      } else if (currentPosition >= Math.max(offset, initialOffset)) {

        if (stuck) return;

        // The page has scrolled past the top position of the element, so fix it and
        // apply its height as a margin to the next visible element so it doesn't jump
        elem.addClass('stuck')
        wedge.css('height', elem.height() + 'px')
        stuck = true

      } else {

        // Unstick, because the element can now rest in its original position
        elem.removeClass('stuck')
        wedge.css('height', '')
        stuck = false
      }
    })
  }
})(jQuery)

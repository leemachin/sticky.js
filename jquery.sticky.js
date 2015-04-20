(function ($) {

  function addCSS (styles) {
    var styleSheet = ""

    for (var style in styles) {
      styleSheet += style + "{" + styles[style] + "} "
    }

    $('head').append('<style type="text/css">' + styleSheet + '</style>')
  }

  var addCSSdone = false;

  $.fn.sticky = function () {
    if (!addCSSdone) {
      addCSS({
        '[data-stuck]': 'position: fixed !important; top: 0 !important; z-index: 10;',
        '[data-wedge]': 'padding: 0 !important; margin: 0 !important; height: 0;'
      })
      addCSSdone = true;
    }

    var elem = $(this);

    if (elem.data('alreadySticky')) return;

    var initialOffset = elem.offset().top,
        wedge = $('<div data-wedge></div>').prependTo(elem.parent()),
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
        elem.attr('data-stuck', '')
        wedge.css('height', elem.height() + 'px')
        stuck = true

      } else {

        if(!stuck) return;

        // Unstick, because the element can now rest in its original position
        elem.removeAttr('data-stuck')
        wedge.css('height', '')
        stuck = false
      }
    })

    elem.data('alreadySticky', true);

    return elem;
  }
})(jQuery)

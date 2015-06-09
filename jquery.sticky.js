(function ($) {

  function addCSS (styles) {
    var styleSheet = ""

    for (var style in styles) {
      styleSheet += style + "{" + styles[style] + "} "
    }

    $('head').append('<style type="text/css">' + styleSheet + '</style>')
  }

  function makeSticky(_, elemData) {
    var $elem = elemData.$elem,
        $wedge = elemData.$wedge;

    var currentPosition = $(window).scrollTop()
        initialOffset = elemData.initialOffset,
        currentOffset = $elem.offset().top;
        stuck = elemData.stuck;

    if (currentPosition < initialOffset && currentOffset !== initialOffset && !stuck) {
      // Update the initialOffset, because the DOM has caused the element's position to change
      initialOffset = currentOffset
    } else if (currentPosition >= Math.max(currentOffset, initialOffset)) {
      if (stuck) return;

      // The page has scrolled past the top position of the element, so fix it and
      // apply its height as a margin to the next visible element so it doesn't jump
      $elem.attr('data-stuck', '')
      $wedge.css('height', $elem.outerHeight() + 'px')
      elemData.stuck = true
    } else {
      if (!stuck) return;

      // Unstick, because the element can now rest in its original position
      $elem.removeAttr('data-stuck')
      $wedge.css('height', '')
      elemData.stuck = false
    }

    $elem.data('alreadySticky', true);
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

    var $elems = $(this),
        stickyElems = [];

    $elems.each(function (_, elem) {
      $elem = $(elem)
      if ($elem.data('alreadySticky')) return;

      stickyElems.push({
        $elem: $elem,
        $wedge: $('<div data-wedge></div>').prependTo($elem.parent()),
        initialOffset: $elem.offset().top,
        stuck: false
      })
    });


    $(window).on('scroll', function () {
      $.each(stickyElems, makeSticky)
    });

    return $elems;
  }
})(jQuery)

(function ($) {

  function addCSS (styles) {
    var styleSheet = ""

    for (var style in styles) {
      styleSheet += style + "{" + styles[style] + "} "
    }

    $('head').append('<style type="text/css">' + styleSheet + '</style>')
  }

  function offsetBottom($elem) {
    return $elem.offset().top + $elem.outerHeight()
  }

  function makeSticky(_, elemData) {
    var $elem = elemData.$elem,
        $wedge = elemData.$wedge,
        currentPosition = $(window).scrollTop(),
        initialOffset = elemData.initialOffset,
        currentOffset = $elem.offset().top,
        initialWidth = elemData.initialWidth,
        stickyUntil = elemData.stickyUntil,
        stuck = elemData.stuck,
        collided = elemData.collided;

    if (currentPosition < initialOffset && currentOffset !== initialOffset && !stuck && !collided) {
      // Update the initialOffset, because the DOM has caused the element's position to change
      initialOffset = currentOffset
    } else if (currentPosition >= Math.max(currentOffset, initialOffset)) {

      if (stuck) {
        if (stickyUntil && offsetBottom($elem) >= $(stickyUntil).offset().top) {
          // The element is going to crash into another element and we want it to stop!
          $elem.removeAttr('data-stuck')
          elemData.stuck = false
          elemData.collided = true
        }

        return;
      }

      if (collided) {
        // Element won't collide with the one below it, make it sticky again
        if (currentPosition < currentOffset) {
          $elem.attr('data-stuck', true)
          elemData.stuck = true
          elemData.collided = false
        }

        return;
      }

      // The page has scrolled past the top position of the element, so fix it and
      // apply its height as a margin to the next visible element so it doesn't jump.
      // Also set the width so non-full width elements don't break.
      $elem.attr('data-stuck', true)
      $elem.css('width', initialWidth + 'px')
      $wedge.css('height', $elem.outerHeight() + 'px')
      elemData.stuck = true
    } else {
      if (!stuck) {

        if (collided && currentPosition < currentOffset) {
          console.log('what happens here?')
        }

        return;
      }

      // Unstick, because the element can now rest in its original position
      $elem.removeAttr('data-stuck')
      $elem.css('width', '')
      $wedge.css('height', '')
      elemData.stuck = false
    }

    $elem.data('alreadySticky', true)
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
      var $elem = $(elem);

      if ($elem.data('alreadySticky')) return;

      stickyElems.push({
        $elem: $elem,
        $wedge: $('<div data-wedge></div>').prependTo($elem.parent()),
        initialOffset: $elem.offset().top,
        initialWidth: $elem.outerWidth(),
        stickyUntil: $elem.attr('data-sticky-until'),
        collided: false,
        stuck: false
      })
    })

    $(window).on('scroll', function () {
      $.each(stickyElems, makeSticky)
    })

    return $elems;
  }
})(jQuery)

(function ($) {

  // http://davidwalsh.name/ways-css-javascript-interact
  function addCSSRule (sheet, selector, rules, index) {
   if (sheet.insertRule) {
      sheet.insertRule(selector + '{ ' + rules + ' }', index)
    } else {
      sheet.addRule(selector, rules, index)
    }
  }

  $.fn.sticky = function () {

    var elem = $(this)

    if (elem.css('position') == 'sticky' || elem.css('position') == '-webkit-sticky') return;

    var initialOffset = elem.offset().top,
        nextVisible = elem.siblings().first(':visible'),
        stuck = false,
        styleSheet = document.styleSheets[0]

    addCSSRule(styleSheet, '.stuck', 'position: fixed !important; top: 0 !important; z-index: 10')

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
        nextVisible.css('margin-top', elem.outerHeight())
        stuck = true

      } else {

        // Unstick, because the element can now rest in its original position
        elem.removeClass('stuck')
        nextVisible.css('margin-top', "")
        stuck = false
      }
    })
  }
})(jQuery)

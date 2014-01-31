(function ($) {
  $.fn.sticky = function (opts) {
    var elem = $(this),
        nextVisible = elem.siblings().first(':visible'),
        stuck = false,
        height = 0
        
    // http://davidwalsh.name/ways-css-javascript-interact
    var addCSSRule = function (sheet, selector, rules, index) {
      if (sheet.insertRule) {
        sheet.insertRule(selector + '{ ' + rules + ' }', index)
      } else {
        sheet.addRule(selector, rules, index)
      }
    }
    
    addCSSRule(document.styleSheets[0], '.stuck', 'position: fixed; top: 0; z-index: 5')
    addCSSRule(document.styleSheets[0], '.stuck-offset', 'margin-top: ' + elem.outerHeight())
  
    if (opts.offsetFrom) {
      // offsetFrom can contain multiple elements, so get the total outerHeight
      opts.offsetFrom.each(function (_, offsetElem) {
        var elem = $(offsetElem)
        if (elem.is(':visible')) {
          height += $(offsetElem).outerHeight()
        }
      })
    } else {
      height = elem.outerHeight()
    }
  
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > height) {
        if (!stuck) {
          elem.addClass('stuck')
          nextVisible.addClass('stuck-offset')
          stuck = true
        }
      } else {
        elem.removeClass('stuck')
        nextVisible.removeClass('stuck-offset')
        stuck = false
      }
    })
  }
})(jQuery)

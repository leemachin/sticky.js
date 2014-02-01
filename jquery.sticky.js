(function ($) {
  
  // http://davidwalsh.name/ways-css-javascript-interact
  function addCSSRule (sheet, selector, rules, index) {
   if (sheet.insertRule) {
      sheet.insertRule(selector + '{ ' + rules + ' }', index)
    } else {
      sheet.addRule(selector, rules, index)
    }   
  }
  
  function heightOffset (elem, defaultHeight) {
    var height = 0
    
    elem.prevAll(':visible').each(function (_, sibling) {
      height += $(sibling).outerHeight()
    })
    
    return height || defaultHeight
  }
  
  $.fn.sticky = function () {
    var elem = $(this),
        stuck = false,
        defaultHeight = elem.outerHeight(),
        styleSheet = document.styleSheets[0]
        
    addCSSRule(styleSheet, '.stuck', 'position: fixed !important; top: 0 !important; z-index: 10')
    addCSSRule(styleSheet, '.stuck-offset', 'margin-top: ' + defaultHeight ' !important')
  
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > heightOffset(elem, defaultHeight)) {
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

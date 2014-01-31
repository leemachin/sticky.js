var req = function ($) {
  $.fn.sticky = function (opts) {
    var elem = $(this),
        nextVisible = elem.siblings().first(':visible'),
        stuck = false,
        height = 0
  
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
}

// So you can use require.js
(function (req) {
  if (typeof define === 'function' && define.amd) {
    return req(['jQuery'], sticky)
  } else {
    return req(jQuery)
  }
})(req)

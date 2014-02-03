(function ($) {

  $(function () {

    var scroller = $('#scroller'),
        scrollerWindow = scroller.get(0).contentWindow,
        header = scroller.contents().find('#header'),
        cookieWarning = scroller.contents().find('#cookie-warning'),
        scrollPos = 250


    cookieWarning.on('click', function () {
      $(this).hide()
    })

    asyncTest("header sticks when scrolled", function () {
      expect(2)

      scrollerWindow.scrollTo(0, 0)

      $(scrollerWindow).one('scroll', function () {
        ok(header.hasClass('stuck'), "header has stuck class")
        ok(header.offset().top == scrollPos, "header is at top of page")

        start()
      })

      scrollerWindow.scrollTo(0, scrollPos)
    })

    asyncTest("header unsticks when scrolled back", function () {
      expect(2)

      var initialOffset = header.offset().top

      scrollerWindow.scrollTo(0, scrollPos)

      $(scrollerWindow).one('scroll', function () {
        ok(!header.hasClass('stuck'), "header doesn't have stuck class any more")
        ok(header.offset().top == initialOffset, "header is at original position")

        start()
      })

      scrollerWindow.scrollTo(0, 0)
    })
  })
})(jQuery)

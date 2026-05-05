(function ($) {

  // Hash routing: show/hide sections, highlight nav
  $(window).on('load hashchange', function () {
    var region = location.hash || $('.main-menu a:first').attr('href');

    $('.content-region').addClass('hide');
    $('.main-menu a').removeClass('active');
    $(region).removeClass('hide');
    $('.main-menu a[href="' + region + '"]').addClass('active');

    // Reset project view when navigating away
    if (region !== '#projects') {
      $('#projects-list-view').show();
      $('#project-detail-view').hide();
    }
  });

  // Open project detail
  $(document).on('click', '.project-card', function () {
    var id = $(this).data('project');
    $('#projects-list-view').hide();
    $('#project-detail-view').show();
    $('.project-detail').hide();
    $('.project-detail[data-detail="' + id + '"]').show();
    $('html, body').animate({ scrollTop: 0 }, 250);
  });

  // Back to grid
  $(document).on('click', '.back-btn', function () {
    $('#project-detail-view').hide();
    $('#projects-list-view').show();
    $('html, body').animate({ scrollTop: 0 }, 250);
  });

})(jQuery);

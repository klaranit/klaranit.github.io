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

  // Featured project slideshow
  var slideIndex = 0;
  var slideTimer;

  function showSlide(index) {
    var slides = $('.slide');
    var dots = $('.slide-dot');
    slideIndex = (index + slides.length) % slides.length;
    slides.removeClass('active').eq(slideIndex).addClass('active');
    dots.removeClass('active').attr('aria-selected', 'false').eq(slideIndex)
      .addClass('active').attr('aria-selected', 'true');
  }

  function startSlideshow() {
    clearInterval(slideTimer);
    slideTimer = setInterval(function () {
      showSlide(slideIndex + 1);
    }, 5000);
  }

  $('.slide-next').on('click', function () {
    showSlide(slideIndex + 1);
    startSlideshow();
  });
  $('.slide-prev').on('click', function () {
    showSlide(slideIndex - 1);
    startSlideshow();
  });
  $('.slide-dot').on('click', function () {
    showSlide($(this).index());
    startSlideshow();
  });
  $('.project-slideshow').on('mouseenter focusin', function () {
    clearInterval(slideTimer);
  }).on('mouseleave focusout', function () {
    startSlideshow();
  });
  startSlideshow();

  // Artwork detail modal
  var artworkModal = $('#artwork-modal');

  $(document).on('click', '.artwork-item', function () {
    var item = $(this);
    $('#artwork-modal-image').attr({
      src: item.find('img').attr('src'),
      alt: item.find('img').attr('alt')
    });
    $('#artwork-modal-title').text(item.data('title'));
    $('#artwork-modal-description').text(item.data('description'));
    artworkModal.removeAttr('hidden');
    $('body').css('overflow', 'hidden');
    $('.artwork-modal-close').trigger('focus');
  });

  function closeArtworkModal() {
    artworkModal.attr('hidden', true);
    $('body').css('overflow', '');
  }

  $(document).on('click', '[data-close-artwork]', closeArtworkModal);
  $(document).on('keydown', function (event) {
    if (event.key === 'Escape' && !artworkModal.is('[hidden]')) {
      closeArtworkModal();
    }
  });

})(jQuery);

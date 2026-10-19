(function ($) {
  window.filterSelection = function (category, event) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.style.display = category === 'all' || card.classList.contains(category) ? '' : 'none';
    });
    document.querySelectorAll('.filter-buttons .btn').forEach(function (button) {
      button.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  };

  var slideIndex = 0;
  var slideTimer;
  var slides = $('.slide');
  var dots = $('.slide-dot');

  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.removeClass('active').eq(slideIndex).addClass('active');
    dots.removeClass('active').attr('aria-selected', 'false').eq(slideIndex)
      .addClass('active').attr('aria-selected', 'true');
  }

  function startSlideshow() {
    clearInterval(slideTimer);
    if (!slides.length) return;
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
  }).on('mouseleave focusout', startSlideshow);
  startSlideshow();

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

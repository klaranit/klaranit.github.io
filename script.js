// Wait for the document to load before running the script 
(function ($) {
  
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions, then show the content-region specified in the URL hash 
    // (or if no hash URL is found, default to first menu item)
    $('.content-region').hide();
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash
    $(region).show();
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 
    
    // Smooth scroll to top when changing sections
    $('html, body').animate({ scrollTop: 0 }, 300);
    
  });
  
  // Smooth scrolling for anchor links
  $('.main-menu a').on('click', function(e) {
    var href = $(this).attr('href');
    if (href.indexOf('#') === 0) {
      $('html, body').animate({ scrollTop: 0 }, 300);
    }
  });
  
  // Portfolio item interactions - Add lightbox or modal functionality
  $('.portfolio-item').on('click', function(e) {
    // Only trigger if not clicking a link
    if (!$(e.target).is('a') && !$(e.target).closest('a').length) {
      $(this).toggleClass('expanded');
    }
  });
  
  // Add fade-in animation when portfolio items come into view
  function fadeInPortfolioItems() {
    $('.portfolio-item').each(function(i) {
      var $item = $(this);
      if (!$item.hasClass('animated')) {
        setTimeout(function() {
          $item.addClass('animated').css({
            'opacity': '0',
            'transform': 'translateY(20px)'
          }).animate({
            'opacity': '1'
          }, 600, function() {
            $(this).css('transform', 'translateY(0)');
          });
        }, i * 100); // Stagger the animation
      }
    });
  }
  
  // Trigger animation when content region is shown
  $(window).on('load hashchange', function() {
    setTimeout(fadeInPortfolioItems, 100);
  });
  
  // Skill tags hover animation enhancement
  $('.skill-tag').on('mouseenter', function() {
    $(this).css('cursor', 'pointer');
  });
  
  // Contact form validation and submission
  $('.contact-form').on('submit', function(e) {
    e.preventDefault();
    
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();
    var isValid = true;
    
    // Clear previous error styling
    $('.form-group input, .form-group textarea').css('border-color', '#3D85C6');
    
    // Basic validation
    if (name === '') {
      $('#name').css('border-color', '#EF6D3D');
      isValid = false;
    }
    
    if (email === '' || !isValidEmail(email)) {
      $('#email').css('border-color', '#EF6D3D');
      isValid = false;
    }
    
    if (message === '') {
      $('#message').css('border-color', '#EF6D3D');
      isValid = false;
    }
    
    if (isValid) {
      // Show success message
      showFormMessage('Thank you! Your message has been sent.', 'success');
      
      // Reset form
      this.reset();
      
      // Here you would typically send the form data to a server
      // Example: $.post('/send-email', { name: name, email: email, message: message });
    } else {
      showFormMessage('Please fill in all fields correctly.', 'error');
    }
  });
  
  // Email validation helper function
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show form message helper function
  function showFormMessage(message, type) {
    // Remove any existing messages
    $('.form-message').remove();
    
    var messageClass = type === 'success' ? 'form-message-success' : 'form-message-error';
    var bgColor = type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(239, 109, 61, 0.9)';
    
    var $message = $('<div class="form-message ' + messageClass + '">' + message + '</div>');
    $message.css({
      'padding': '15px',
      'margin-bottom': '20px',
      'border-radius': '4px',
      'background-color': bgColor,
      'color': 'white',
      'font-size': '1.4rem',
      'display': 'none'
    });
    
    $('.contact-form').prepend($message);
    $message.slideDown(300);
    
    // Auto-hide after 5 seconds
    setTimeout(function() {
      $message.slideUp(300, function() {
        $(this).remove();
      });
    }, 5000);
  }
  
  // Add loading animation for images
  $('img').on('load', function() {
    $(this).addClass('loaded').css({
      'opacity': '0'
    }).animate({ 'opacity': '1' }, 400);
  });
  
  // Add parallax effect to background (if desired)
  $(window).on('scroll', function() {
    var scrolled = $(window).scrollTop();
    $('html').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
  });
  
  // Add click-to-copy functionality for email or contact info
  $('.copy-email').on('click', function(e) {
    e.preventDefault();
    var email = $(this).text();
    
    // Create temporary input to copy text
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val(email).select();
    document.execCommand('copy');
    $temp.remove();
    
    // Show feedback
    var originalText = $(this).text();
    $(this).text('Copied!');
    setTimeout(function() {
      $('.copy-email').text(originalText);
    }, 2000);
  });
  
  // Filter portfolio items by category (if you add category data attributes)
  $('.portfolio-filter').on('click', function() {
    var filterValue = $(this).attr('data-filter');
    
    $('.portfolio-filter').removeClass('active');
    $(this).addClass('active');
    
    if (filterValue === 'all') {
      $('.portfolio-item').fadeIn(400);
    } else {
      $('.portfolio-item').hide();
      $('.portfolio-item[data-category="' + filterValue + '"]').fadeIn(400);
    }
  });
  
  // Add keyboard navigation for accessibility
  $(document).on('keydown', function(e) {
    // Press 'Escape' to close expanded portfolio items
    if (e.key === 'Escape') {
      $('.portfolio-item.expanded').removeClass('expanded');
    }
  });
  
  // Lazy load images for better performance
  function lazyLoadImages() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
  
  // Initialize lazy loading if supported
  if ('IntersectionObserver' in window) {
    lazyLoadImages();
  }
  
  // Mobile menu toggle (if you add a hamburger menu)
  $('.menu-toggle').on('click', function() {
    $('.main-menu').toggleClass('active');
    $(this).toggleClass('active');
  });
  
  // Close mobile menu when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.main-menu, .menu-toggle').length) {
      $('.main-menu').removeClass('active');
      $('.menu-toggle').removeClass('active');
    }
  });
  
  // Add animation to skill tags on scroll
  function animateSkillTags() {
    if ($('.skills-container').length) {
      var skillsPosition = $('.skills-container').offset().top;
      var scrollPosition = $(window).scrollTop() + $(window).height();
      
      if (scrollPosition > skillsPosition) {
        $('.skill-tag').each(function(i) {
          var $tag = $(this);
          setTimeout(function() {
            $tag.addClass('animate-in');
          }, i * 50);
        });
      }
    }
  }
  
  $(window).on('scroll', animateSkillTags);
  
})(jQuery);

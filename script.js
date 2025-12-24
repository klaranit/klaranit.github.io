// Wait for the document to load before running the script 
(function ($) {
  
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions by adding the hide class
    $('.content-region').addClass('hide');
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash by removing the hide class
    $(region).removeClass('hide');
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 
    
    // When navigating away from projects, reset the view
    if (region !== '#projects') {
      $('.projects-grid').show();
      $('#project-details-section').hide();
    }
    
  });
  
  // Handle project card clicks
  $(document).on('click', '.project-card', function() {
    var projectId = $(this).attr('data-project');
    
    // Hide the projects grid
    $('.projects-grid').hide();
    
    // Show the project details section
    $('#project-details-section').show();
    
    // Hide all project details
    $('.project-detail').hide();
    
    // Show the specific project detail
    $('.project-detail[data-detail="' + projectId + '"]').show();
    
    // Scroll to top
    $('html, body').animate({ scrollTop: 0 }, 300);
  });
  
  // Handle back button clicks
  $(document).on('click', '.back-button', function(e) {
    e.preventDefault();
    
    // Hide project details section
    $('#project-details-section').hide();
    
    // Show projects grid
    $('.projects-grid').show();
    
    // Scroll to top
    $('html, body').animate({ scrollTop: 0 }, 300);
  });
  
})(jQuery);

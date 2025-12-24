// Wait for the document to load before running the script 
(function ($) {
  
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions by adding the hide class
    $('.content-region').addClass('hide');
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    
    // Get the current hash or default to first menu item
    var region = location.hash.toString() || '#aboutme';
    
    // Now show the region specified in the URL hash by removing the hide class
    $(region).removeClass('hide');
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 
    
  });
  
  // Handle project card clicks
  $(document).on('click', '.project-card', function(e) {
    e.preventDefault();
    var projectId = $(this).attr('data-project');
    
    // Hide all content regions
    $('.content-region').addClass('hide');
    
    // Show the specific project detail page
    $('#project-' + projectId).removeClass('hide');
    
    // Remove active class from menu
    $('.main-menu a').removeClass('active');
    
    // Update the URL hash
    window.location.hash = 'project-' + projectId;
  });
  
  // Handle back button clicks
  $(document).on('click', '.back-button', function(e) {
    e.preventDefault();
    window.location.hash = 'projects';
  });
  
})(jQuery);

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
    
  });
  
  // Handle project card clicks
  $('.project-card').on('click', function() {
    var projectId = $(this).attr('id');
    
    // Hide all content regions
    $('.content-region').hide();
    
    // Show the specific project detail page
    $('#project-' + projectId).show();
    
    // Update the URL hash (optional, for back button support)
    location.hash = '#project-' + projectId;
  });
  
  // Handle back button clicks
  $('.back-button').on('click', function(e) {
    e.preventDefault();
    location.hash = '#projects';
  });
  
})(jQuery);
    

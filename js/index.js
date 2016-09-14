$(function() {
  $("button").click(function() { 
    getQuote()
    changeTweet()
  })
  getQuote()
  changeTweet()
})

var getQuote = function() { 
  //e.preventDefault();
  $.ajax({
    url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      $('#quote-title').text(post.title);
      $('#quote-content').html(post.content);
      
      // If the Source is available, use it. Otherwise hide it.
      if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
        $('#quote-source').html('Source:' + post.custom_meta.Source);
      } else {
        $('#quote-source').text('');
      }
    },
    cache: false,
    async: true//false
  });
};

function changeTweet() {
  var tweetText = $('#quote-content').text() + "\n--" + $('#quote-title').text();
  $(tweet).html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="blank" data-size="large" data-text="' + tweetText + '" data-count="none">Tweet</a>');
  twttr.widgets.load();
}
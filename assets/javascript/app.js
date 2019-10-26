$(document).ready(function () {
  $(document).on("click", ".search-button", function () {
    var topics = $(this).attr("data-topics");
    //API search query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topics + "&api_key=Li4fJuAb969MxbQpL9hf9IvZCuZhbB1i";
    //ajax GET info
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;
        //Gifs returned 10
        for (var i = 0; i < 10; i++) {
          var gifDiv = $("<div>");



          var rating = results[i].rating;
          //Include rating of the Gif to be displated
          var p = $("<p>").text("Rating: " + rating);
          //dynamically write the IMG's to the HTML page
          var topicsImage = $("<img>");
          //Images will start off still
          topicsImage.attr({
            "src": results[i].images.original_still.url,
            "data-still": results[i].images.original_still.url,
            "data-animate": results[i].images.original.url,
            "data-state": "still",
            "class": "gif"
          });


          //Make sure the newest search populated at the top/most recent
          gifDiv.prepend(p);
          gifDiv.prepend(topicsImage);
          //Wriet the images to the placeholder in HTML
          gifDiv.addClass('gif');
          $("#gifs-appear-here").prepend(gifDiv);
          $(".gif").on("click", function () {

            // $(this) just means "the element with class 'gif' that was clicked"
            var state = $(this).attr("data-state");
            // $(this).attr("data-state") will either be "still" or "animate"
            // IF it's still: we change it to animate
            if (state === "still") {

              var newSrc = $(this).attr("data-animate");
              $(this).attr("src", newSrc);
              $(this).attr("data-state", "animate");

              // OR it's animate already, so we change it to still
            } else {
              var newSrc = $(this).attr("data-still");
              $(this).attr("src", newSrc);
              $(this).attr("data-state", "still");
            }
          }); // end of click handler
        }
      });
  });
  //Click functions!
  $('#add').on('click', function () {
    // Get value of input to create new button
    const newButtonValue = $('#add-button').val().trim()

    // create a blank button
    const btn = $('<button>');
    // give the button an attribute called data-topic and give that attribute a value
    // of input value
    // we will use this value in our query string
    btn.attr('data-topics', newButtonValue);
    // give the blank button a label
    btn.text(newButtonValue);
    // give the blank button a class that we can add a click listener so when you click
    // it, it will do a search based on the data-topics
    btn.addClass('search-button');
    // add button to screen
    $('#buttons').prepend(btn)

  })
})

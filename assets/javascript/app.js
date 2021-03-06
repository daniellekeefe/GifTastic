$(document).ready(function () {
  $(document).on("click", ".search-button", function () {
    let topics = $(this).attr("data-topics");
    //API search query
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topics + "&api_key=Li4fJuAb969MxbQpL9hf9IvZCuZhbB1i&limit=10";
    //ajax GET info
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        let results = response.data;
        //Gifs returned 10
        for (let i = 0; i < 10; i++) {
          let gifDiv = $("<div>");

          let rating = results[i].rating;
          //Include rating of the Gif to be displated
          let p = $("<p>").text("Rating: " + rating);
          //dynamically write the IMG's to the HTML page
          let topicsImage = $("<img>");
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
          //Write the images to the placeholder in HTML
          gifDiv.addClass('.gif');
          $("#gifs-appear-here").prepend(gifDiv);
          $(".gif").on("click", function () {

            // $(this) means "the element with class 'gif' that was clicked"
            let state = $(this).attr("data-state");
            // $(this).attr("data-state") will either be "still" or "animate"
            // IF it's still: we change it to animate

            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
            console.log(state);
          }); // end of animation click handler
        }
      });
  });
  //Click functions!
  //If blank do not allow a button to be made
  $('#add').attr('disabled', true);
  $('#add-button').keyup(function () {
    if ($(this).val().length != 0)
      $('#add').attr('disabled', false);
    else
      $('#add').attr('disabled', true);
  })
  //if details in the field you can add a button

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
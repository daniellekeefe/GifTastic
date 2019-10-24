
$("button").on("click", function() {
    var topics = $(this).attr("data-topics");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topics + "&api_key=Li4fJuAb969MxbQpL9hf9IvZCuZhbB1i";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < 10; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var topicsImage = $("<img>");
          topicsImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(topicsImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });
//create a gif search

//Input search field (topics)
//connect to API

//Return Images

//have button populate at top of page

//API Info
// Li4fJuAb969MxbQpL9hf9IvZCuZhbB1i api key https://api.giphy.com/v1/gifs/random?api_key=Li4fJuAb969MxbQpL9hf9IvZCuZhbB1i"
//
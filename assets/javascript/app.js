
var animals = ["cats", "dogs", "lions", "zebra"]
var addButtons = function (){
    $("#buttonArea").empty();
    $.each(animals, function(){
        var buttons = $("<button>").addClass("btn btn-primary giphyButton").text(this).attr("data-name", this);
        $("#buttonArea").append(buttons);
    });
};








$(document).ready(function(){ 
    addButtons();
   
   

    $(document).on('click', '.submitButton', function(){
        event.preventDefault();
        var newInput = $("#userInput").val().trim();
        animals.push(newInput);
        addButtons();
     
    });

    // function to execute when one of the buttons is selected 
    $(document).on('click', '.giphyButton', function(){
        var selectedValue = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selectedValue +"&api_key=ZXEZT6LCZ0bf7cVZYbgW0sCzr1SSNhH9"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
           var results = response.data;

            // initialize the giphy area with a variable
            var giphDiv = $('#giphyArea')
            giphDiv.empty();

            $.each(results, function(index){
                var gifContainer = $("<div class='col-4 gif-container'>");

                // console.log("this: " + JSON.stringify(this.images.downsized.url));
                // var test = JSON.stringify(this.images.downsized.url);
               
                var animateUrl = results[index].images.fixed_height.url;
                var ratings = results[index].rating;
                var stillUrl = results[index].images.fixed_height_still.url;

               
            
                var image = $("<img>").attr("src", stillUrl).addClass("gif-image");
                image.attr("data-still", stillUrl);
                image.attr("data-animate", animateUrl);
                image.attr("data-state", "still")
                var ratingDisplay = $("<p class='ratings'>").text("Ratings: " + ratings);
               gifContainer.append(image);
               gifContainer.append(ratingDisplay);
                giphDiv.append(gifContainer);
            })

            $(document).on('click', ".gif-image", function(){
                var state = $(this).attr("data-state");
                
                if (state === "still"){
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            
            });
           
            console.log(response)
        })
        console.log(queryURL);
    });


    









});

// var giphDiv = $('#giphyArea')
//             var giphUrl = response.data[0].images.original.url;
            
//             var image = $("<img>").attr("src", giphUrl);
           
//             giphDiv.html(image);
//             console.log(response)
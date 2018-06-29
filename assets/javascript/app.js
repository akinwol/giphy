

$(document).ready(function () {

    // initial array of animals 
    var animals = ["cats", "dogs", "lions", "zebra"]

    // function to add buttons for each item in the array 
    var addButtons = function () {
        $("#buttonArea").empty();
        $.each(animals, function () {
            // for each item create a button with these classes and give it a value of the array
            var buttons = $("<button>").addClass("btn btn-primary giphyButton").text(this).attr("data-name", this);
            //    append the button to the button section in the html 
            $("#buttonArea").append(buttons);
        });
    };

    // run the function to add the buttons once the document is ready 
    addButtons();

    // variable to hold where the giph images go 
    var giphDiv = $('#giphyArea')


    var loadGifs = {
        initialOffset: 0,
        total: 0,
        limit: 25,
        offset: 0,
        selectedValue: " ",
        newLoad: function(){
            giphDiv.empty();
            loadGifs.limit = 25;
            loadGifs.initialOffset = 0;
        },
        moreLoad: function(){
            loadGifs.total += loadGifs.limit;
            loadGifs.limit = 10;
            loadGifs.offset = loadGifs.total;
        },
        getPost: function () {
            // $("#more-button").html()
            var moreButton = $("<button>").addClass("btn btn-outline-info more-button").text("Load more: " + loadGifs.selectedValue);
            var totalGifs = $("<span>").addClass("total-Gifs").text("total loaded: " + loadGifs.total + loadGifs.limit)
            $("#more-button-area").html(moreButton );
            //  add selected value to the search in the API URL 
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + loadGifs.selectedValue + "&offset=" + loadGifs.offset + "&limit=" + loadGifs.limit + "&api_key=ZXEZT6LCZ0bf7cVZYbgW0sCzr1SSNhH9"
            // call the API
            $.ajax({
                url: queryURL,
                method: "GET"
                // call back function to get the response of the API
            }).then(function (response) {
               
                var results = response.data;
                $.each(results, function (index) {
                    var gifContainer = $("<div class='col-4 gif-container'>");

                    // console.log("this: " + JSON.stringify(this.images.downsized.url));
                    // var test = JSON.stringify(this.images.downsized.url);

                    var animateUrl = results[index].images.fixed_height.url;
                    var ratings = results[index].rating;
                    var stillUrl = results[index].images.fixed_height_still.url;



                    var image = $("<img>").attr("src", stillUrl).addClass("gif-image");
                    image.attr("data-still", stillUrl);
                    image.attr("data-animate", animateUrl);
                    image.attr("data-state", "still");
                    var ratingDisplay = $("<p class='ratings'>").text("Ratings: " + ratings);
                    var favButton = $("<button class='btn btn-info fav' >").html("<i class='material-icons fav-icon'>favorite_border</i>");
                    favButton.attr("data-still", stillUrl);

                    gifContainer.append(image);
                    gifContainer.append(favButton);
                    // gifContainer.append(ratingDisplay);
                    giphDiv.prepend(gifContainer);
                });

                console.log(response)
            });

            console.log(queryURL);
        }

    };

  





    //    when a user submits a new button to add

    $(document).on('click', '.submitButton', function () {
        // prevent the default functionality of the form submission 
        event.preventDefault();
        // get the value of the user input, trim the spaces and store that in a new variable
        var newInput = $("#userInput").val().trim();
        // push the value of the user input to the animals array
        animals.push(newInput);
        // run function to show all the new buttons on the screen 
        addButtons();

    });

    // function to execute when one of the buttons is selected 
    $(document).on('click', '.giphyButton', function () {
    
        // store the name of the button (which we stored) in the variable 
        loadGifs.selectedValue = $(this).attr("data-name");
        loadGifs.newLoad();
        loadGifs.getPost();

    });

    $(document).on('click', ".gif-image", function () {
        console.log(this)
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    $(document).on('click', ".more-button", function(){
        loadGifs.moreLoad();
        loadGifs.getPost();
    });

// $(document).on('hover', ".fav"), 
$(document).on('click', ".fav",function(){
    $(this).html("<i class='material-icons fav-icon'>favorite</i>");
});
// write  a function to record thew active state of the heart and inactive state 

$(".fav").hover(function() {
		$(this).html("<i class='material-icons fav-icon'>favorite</i>");
			}, function() {
        $(this).html("<i class='material-icons fav-icon'>favorite_border</i>");
        console.log("hover" + this)
	});






});

// var giphDiv = $('#giphyArea')
//             var giphUrl = response.data[0].images.original.url;

//             var image = $("<img>").attr("src", giphUrl);

//             giphDiv.html(image);
//             console.log(response)
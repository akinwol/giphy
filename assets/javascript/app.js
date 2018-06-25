
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
            var giphDiv = $('#giphyArea')
            var giphUrl = response.data[0].images.original.url;
            console.log(giphUrl);
            var image = $("<img>").attr("src", giphUrl);
            console.log(image)
            giphDiv.html(image);
            console.log(response.data[0].images)
        })
        console.log(queryURL);
    });


    









});
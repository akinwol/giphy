
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


    









});
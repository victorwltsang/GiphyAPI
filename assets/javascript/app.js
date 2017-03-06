$(document).ready(function() {


    var myGif = {
        fixed: [],
        gif: [],
        rating: []
    };

    var animals = {

        animal: ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'ram', 'monkey', 'dog', 'pig'],
        renderAnimals: function() {
            // remove old buttons and render new ones
            $("#buttons-view").empty();

            // loop through animal array and make a button of it
            for (var an of this.animal) {
                var animalBtn = $("<button>");
                animalBtn.addClass("animal");
                animalBtn.attr("data-animal", an);
                animalBtn.text(an);

                $("#buttons-view").append(animalBtn);
            }
        },
        addAnimal: function(event) {
            //prevent refresh because lack of form url
            event.preventDefault();
            // add animal only if there is input
            if ($("#animal-input").val().length > 0) {
                //grab value from input box
                var newAnimal = $("#animal-input").val().trim();

                //now sure why cant use 'this'
                animals.animal.push(newAnimal);
                animals.renderAnimals();
                $("#animal-input").val("");
                animals.animalGiphy(newAnimal)
            }

        },
        animalGiphy: function(newAnimal) {

            // lets you add and show giphy of the animal you just added

            var myAnimal = $(this).attr("data-animal");

            //replace this value if added an animal
            if (typeof newAnimal == "string") {
                var myAnimal = newAnimal;
            }

            var api_key = "dc6zaTOxFJmzC";
            var limit = 10;
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + myAnimal + "&limit=" + limit + "&api_key=" + api_key;

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                $("#giphy-view").empty();
                // made an object to store the links of the images and rating
                myGif = {
                    fixed: [],
                    gif: [],
                    rating: []
                };
                // shortcut to respsonse data callback
                var imgUrl = response.data;

                // add fixed, animated, and rating to myGif
                for (var img of imgUrl) {
                    myGif.fixed.push(img.images.fixed_height_still.url);
                    myGif.gif.push(img.images.fixed_height.url);
                    myGif.rating.push(img.rating);

                }
                // add images and rating to the #giphy-view
                for (var i = 0; i < myGif.fixed.length; i++) {
                    var div = $("<div>");
                    div.addClass("float-l");
                    var a = $("<img>");
                    a.attr("src", myGif.fixed[i]);
                    a.attr("data-position", i)
                    a.attr("data-static", "true")
                    a.addClass("giphy");
                    var rating = $("<p>");
                    rating.addClass("rating")
                    rating.text("Rating: " + myGif.rating[i]);

                    div.append(rating);
                    div.append(a);
                    $("#giphy-view").append(div);

                }

            });
        }
    };

    animals.renderAnimals();

    // Adding a click event listener to all elements with a id of "add-animal"
    $(document).on("click", "#add-animal", animals.addAnimal);
    $(document).on("click", ".animal", animals.animalGiphy);
    // on click event for swapping fixed and animated gifs
    $(document).on("click", ".giphy", function() {
        var idx = $(this).attr("data-position");

        // if gif is static then make it animated else turn off animated and make it static
        if ($(this).attr("data-static") == "true") {

            var newImgSrc = myGif.gif[idx];
            var img = $("<img>");
            img.attr("src", newImgSrc);
            $(this).attr("src", newImgSrc);
            $(this).attr("data-static", "false")

        } else {
            var newImgSrc = myGif.fixed[idx];
            var img = $("<img>");
            img.attr("src", newImgSrc);
            $(this).attr("src", newImgSrc);
            $(this).attr("data-static", "true")

        }


    });









});

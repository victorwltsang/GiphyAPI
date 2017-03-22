// great job wrapping all of your code inside of this `$(document).ready` callback function
$(document).ready(function() {

    var animals = {
        // you generally want variable and property names that represent collections to be plural.
        // For instance I think the following array should be `animals` and then you'd probably
        // want to name the containing objectt something slightly different' perhaps `animalGiphyFactory`
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

                
                this.animal.push(newAnimal);
                this.renderAnimals();
                $("#animal-input").val("");
                this.animalGiphy(newAnimal)
            }

        },
        animalGiphy: function(newAnimal) {

            // lets you add and show giphy of the animal you just added

            var myAnimal = $(this).attr("data-animal");

            //replace this value if added an animal
            // you should get in the habit of using strict equality checking `===` as opposed to type coercion equality checking `==`.
            // This is because many developers who aren't intimately familiar with the difference will think misunderstand how to use them
            // and that can lead to some very finicky bugs 🐛

            if (typeof newAnimal === "string") {
                var myAnimal = newAnimal;
            }

            var api_key = "dc6zaTOxFJmzC";
            var limit = 10;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+animal+" + myAnimal + "&limit=" + limit + "&api_key=" + api_key;

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                $("#giphy-view").empty();

                // shortcut to respsonse data callback
                var imgUrl = response.data;

                // add fixed, animated, and rating to #giphy-view
                for (var img of imgUrl) {

                    var div = $("<div>").addClass("float-l");

                    var a = $("<img>");
                    a.attr("src", img.images.fixed_height_still.url);
                    a.attr("data-static", img.images.fixed_height_still.url);
                    a.attr("data-animate", img.images.fixed_height.url)
                    a.attr("data-state", "static")
                    a.addClass("giphy");

                    var rating = $("<p>").addClass("rating").text("Rating: " + img.rating);

                    div.append(rating);
                    div.append(a);
                    $("#giphy-view").append(div);
                }

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    // You are in mobile browser
                    $('html, body').animate({
                        scrollTop: $("#giphy-view").offset().top
                    }, 500);

                    $('.scrollToTop').click(function() {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 500);

                    });

                }
            });
        }
    };

    animals.renderAnimals();

    // Adding a click event listener to all elements with a id of "add-animal"
    // By binding the context to `animals`, you can use the more generic `this` value
    // within your methods which gives your code more flexibility.
    $(document).on("click", "#add-animal", animals.addAnimal.bind(animals));
    $(document).on("click", ".animal", animals.animalGiphy);
    // on click event for swapping fixed and animated gifs
    $(document).on("click", ".giphy", function() {
        var state = $(this).attr("data-state");

        // you should get in the habit of using strict equality checking `===` as opposed to type coercion equality checking `==`.
        // This is because many developers who aren't intimately familiar with the difference will think misunderstand hwo to use them
        // and that can lead to very finicky bugs 🐛
        if (state === "static") {
            $(this).attr("src", $(this).attr("data-animate"));
                $(this).addClass("giphy-animate");
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-static"));
            // you want to keep your indentation consistent 🙃
            $(this).removeClass("giphy-animate");
            $(this).attr("data-state", "static");


        }

    });

});

const jokeAPI =
    "https://official-joke-api.appspot.com/jokes/programming/random";
$(document).ready(() => {
    var $jokeSetup = $(".jokeSetup");
    var $jokePunchLine = $(".jokePunchLine");
    var $jokeScreen = $(".contentContainer");
    var currentJoke = {
        setup: "",
        punchline: ""
    };
    var savedJokes = [];

    processJoke();

    $(".arrow").click(() => {
        $("html, body")
            .stop()
            .animate({
                    scrollTop: $jokeScreen.offset().top
                },
                1000
            );
    });

    $(".saveJoke").click(() => {
        savedJokes.push(currentJoke);
        renderSavedJokes(savedJokes, $(".jokeContainer"));
    });

    $(".newJoke").click(() => {
        processJoke();
    });

    function renderSavedJokes(jokes, element) {
        element.text("");
        jokes.forEach(joke => {
            element.append(`<p>${joke.setup} / ${joke.punchline}</p>`);
        });
    }

    function renderJoke(currentJoke) {
        $jokeSetup.text("");
        $jokePunchLine.text("");
        $jokeSetup.text(currentJoke.setup);
        setTimeout(() => $jokePunchLine.text(currentJoke.punchline), 2000);
    }

    async function processJoke() {
        getJoke()
            .then(joke => {
                currentJoke = {
                    setup: joke[0].setup,
                    punchline: joke[0].punchline
                };
                renderJoke(currentJoke);
            })
            .catch(err => console.error(err));
    }

    async function getJoke() {
        let request = await fetch(jokeAPI);
        let jokeJson = await request.json();
        return jokeJson;
    }
});
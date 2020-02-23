const jokeAPI = "https://official-joke-api.appspot.com/jokes/programming/random";
$(document).ready(() => {
    var $jokeSetup = $(".jokeSetup");
    var $jokePunchLine = $(".jokePunchLine");
    var $jokeScreen = $(".contentContainer");
    var jokeJson;
    var savedJokes = [];


    $(".arrow").click(() => {
        $('html, body').stop().animate({
            'scrollTop': $jokeScreen.offset().top
        }, 1000)
    });

    $(".saveJoke").click(() => {
        savedJokes.push(jokeJson[0]);
        displaySavedJokes(savedJokes, $(".jokeContainer"));
    });

    $(".newJoke").click(() => {
        getJoke().then(result => {
            $jokeSetup.text(result.setup);
            $jokePunchLine.text("");
            setTimeout(() => $jokePunchLine.text(result.punchline), 1000);
        }).catch(err => console.error(`Error is: ${err}`));
    })

    async function getJoke() {
        let request = await fetch(jokeAPI);
        jokeJson = await request.json();
        return {
            setup: jokeJson[0].setup,
            punchline: jokeJson[0].punchline
        };
    }

    getJoke().then(result => {
        $jokeSetup.text(result.setup);
        $jokePunchLine.text(result.punchline);
    }).catch(err => console.error(`Error is: ${err}`));


    function displaySavedJokes(array, element) {
        element.text("");
        array.forEach((jokeObj) => {
            element.append(`<p>${jokeObj.setup} / ${jokeObj.punchline}</p>`);
        });
    }
});
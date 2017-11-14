/*
 * Create a list that holds all of your cards
 */

let openCards = [];

let cards = [
    "fa-diamond",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-paper-plane-o",
    "fa-bomb",
    "fa-bomb",
    "fa-anchor",
    "fa-anchor",
    "fa-bolt",
    "fa-bolt",
    "fa-cube",
    "fa-cube",
    "fa-leaf",
    "fa-leaf",
    "fa-bicycle",
    "fa-bicycle"
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards() {
    $(".deck").empty();

    shuffle(cards);

    cards.forEach(function(s) {
        $(".deck").append('<li class="card"><i class="fa ' + s + '"></i></li>');
    });
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function openCard(clickedCard) {
    const $clickedCard = $(event.target);
    if (!$clickedCard.hasClass("open show") && openCards.length < 2) {
        $clickedCard.addClass("open show");
        openCards.push($clickedCard);

        if (openCards.length === 2) {
            const firstCard = openCards[0].children().attr("class");
            const secondCard = openCards[1].children().attr("class");

            if (firstCard === secondCard) {
                openCards[0].addClass("match");
                openCards[1].addClass("match");
                openCards = [];
            } else {
                setTimeout(function() {
                    openCards[0].removeClass("open show");
                    openCards[1].removeClass("open show");
                    openCards = [];
                }, 500)
            }
        }
    }
}

function clickCards() {
    $(".deck").click(function(event) {
        if (event.target.tagName === "LI") {
            openCard(event.target);
        }
    });
}

displayCards();
clickCards();

/*
 * Create a list that holds all of your cards
 */

let openCards = [];
let moveCounter = 0;
let time = 0;
let matchedCards = 0;
let timerGo;

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

function lockCards() {
    openCards[0].addClass("match");
    openCards[1].addClass("match");
    matchedCards++;
    openCards = [];
    if (matchedCards === 8) showModal("You Win!");
}

function hideCards() {
    openCards[0].removeClass("open show");
    openCards[1].removeClass("open show");
    openCards = [];
}

function incrementMoveCounter() {
    moveCounter++;
    $(".moves").text(moveCounter);
}

function resetMoves() {
    $(".moves").text(0);
}

function removeStar() {
    const removeStar = [20, 15, 2];
    $(".stars")
        .children()
        .each(function(index, element) {
            if (moveCounter === removeStar[index])
                $(element).addClass("star-rm-color");
        });
}

function resetStars() {
    $(".stars")
        .children()
        .removeClass("star-rm-color");
}

function resetTimer() {
    $(".timer").text("00");
    startTimer();
}

function startTimer() {
    var old;
    function getNow() {
        var now = new Date();
        var seconds = now.getSeconds();
        if (seconds > old) {
            time += 1;
            $(".timer").text(time < 10 ? "0" + time : time);
        }
        old = seconds;
        if (time > 99) showModal("Time Out!");
    }
    timerGo = setInterval(getNow, 500);
}

function showModal(label) {
    const starRating = 3 - $(".stars .star-rm-color").length;
    clearInterval(timerGo);
    $("#modalLabel").text(label);
    $("#time").text(time + " /100");
    $("#star-rating").text(starRating);
    $("#modal").modal("show");
}

function openCard(clickedCard) {
    const $clickedCard = $(event.target);
    const isNotOpen = !$clickedCard.hasClass("open show");
    if (isNotOpen && openCards.length < 2) {
        $clickedCard.addClass("open show");
        openCards.push($clickedCard);
        if (openCards.length === 2) {
            const firstCard = openCards[0].children().attr("class");
            const secondCard = openCards[1].children().attr("class");
            if (firstCard === secondCard) {
                lockCards();
            } else {
                setTimeout(hideCards, 500);
            }
            incrementMoveCounter();
            removeStar();
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

function restart() {
    openCards = [];
    matchedCards = 0;
    moveCounter = 0;
    time = 0;
    resetMoves();
    resetStars();
    resetTimer();
    displayCards();
}

$("#modal").modal({ show: false });
$(".restart").click(restart);

displayCards();
clickCards();
startTimer();

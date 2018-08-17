
const game = {};

document.addEventListener('DOMContentLoaded', function () {
    initGame();
    startGame();
});

function initGame() {
    game.deck = document.querySelector('.deck');
}

function startGame() {
    const cardClasses = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
    const doubledShuffled = shuffle(cardClasses.concat(cardClasses));

    game.deck.innerHTML = '';
    game.deck.appendChild(createCardsFragment(doubledShuffled));
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function createCardsFragment(cardClasses) {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardClasses.length; i++) {

        const newCard = document.createElement('li');
        newCard.classList.add('card');

        const newCardContent = document.createElement('i');
        newCardContent.classList.add('fa')
        newCardContent.classList.add('fa-' + cardClasses[i]);

        newCard.appendChild(newCardContent);
        fragment.appendChild(newCard);
    }

    return fragment;
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

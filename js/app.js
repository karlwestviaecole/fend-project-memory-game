
const game = {
    deck: null,
    cardTypes: ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'],
    openCards: [],
    moves: 0,
    movesTarget: null,
    restartTarget: null
};

document.addEventListener('DOMContentLoaded', function () {
    initGame();
    startGame();
});

function initGame() {
    game.deck = document.querySelector('.deck');
    game.movesTarget = document.querySelector('.moves');
    game.restartTarget = document.querySelector('.restart');
    game.restartTarget.onclick = startGame;
}

function startGame() {
    const doubledShuffledCardTypes = shuffle(game.cardTypes.concat(game.cardTypes));
    game.deck.innerHTML = '';
    game.deck.appendChild(createCardsFragment(doubledShuffledCardTypes));
    game.openCards = [];
    setMoveCounter(0);
}

function createCardsFragment(cardTypes) {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardTypes.length; i++) {

        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.setAttribute('data-card-type', cardTypes[i]);
        newCard.onclick = cardClickHandler;

        const newCardContent = document.createElement('i');
        newCardContent.classList.add('fa')
        newCardContent.classList.add('fa-' + cardTypes[i]);

        newCard.appendChild(newCardContent);
        fragment.appendChild(newCard);
    }

    return fragment;
}

function cardClickHandler(event) {
    const card = event.currentTarget;
    showCard(card);
    openCard(card);
    if (game.openCards.length === 2) {
        tryMatch(game.openCards[0], game.openCards[1]);
    }
}

function showCard(card) {
    card.classList.add('show', 'open');
}

function hideCard(card) {
    window.setTimeout(function() {
        card.classList.remove('show', 'open');
    }, 1000);
}

function showCardAsMatching(card) {
    card.classList.add('match');
}

function openCard(card) {
    if(game.openCards.includes(card)) {
        return; // already open
    }
    game.openCards.push(card);
}

function tryMatch(cardA, cardB) {
    if (doesMatch(cardA, cardB)) {
        console.log('MATCH!');
        showCardAsMatching(cardA);
        showCardAsMatching(cardB);
    } else {
        console.log('no match');
        hideCard(cardA);
        hideCard(cardB);
    }
    incrementMoves();
    game.openCards = [];
    console.log(game.moves + ' moves');
}

function doesMatch(cardA, cardB) {
    return cardA.getAttribute('data-card-type') === cardB.getAttribute('data-card-type');
}

function incrementMoves() {
    setMoveCounter(game.moves + 1)
}

function setMoveCounter(count) {
    game.moves = count;
    game.movesTarget.innerHTML = game.moves;
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
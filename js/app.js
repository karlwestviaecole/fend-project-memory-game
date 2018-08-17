
const game = {
    deck: null,
    cardTypes: ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'],
    openCards: [],
    moves: 0,
    movesTarget: null,
    starTargets: null,
    restartTarget: null,
    finalScoreTarget: null,
    finalMovesTarget: null,
    finalStarsTarget: null
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
    game.starTargets = document.querySelectorAll('.fa-star, .fa-star-o');
    game.finalScoreTarget = document.querySelector('.final-score');
    game.finalMovesTarget = document.querySelector('.final-moves');
    game.finalStarsTarget = document.querySelector('.final-stars');
}

function startGame() {
    const doubledShuffledCardTypes = shuffle(game.cardTypes.concat(game.cardTypes));
    game.deck.innerHTML = '';
    game.deck.appendChild(createCardsFragment(doubledShuffledCardTypes));
    game.openCards = [];
    setMoveCounter(0);
    updateStars();
    hideFinalScore();
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
    if (cardIsOpen(card)) {
        return;
    }
    showCard(card);
    openCard(card);
    if (game.openCards.length === 2) {
        tryMatch(game.openCards[0], game.openCards[1]);
        incrementMoves();
        updateStars();
        game.openCards = [];
    }

    if (allCardsMatch()) {
        window.setTimeout(showFinalScore, 1000);
    }
}

function showCard(card) {
    card.classList.add('show', 'open');
}

function hideCard(card) {
    window.setTimeout(function () {
        card.classList.remove('show', 'open');
    }, 1000);
}

function showCardAsMatching(card) {
    card.classList.add('match');
}

function openCard(card) {
    game.openCards.push(card);
}

function cardIsOpen(card) {
    return card.matches('.open');
}

function tryMatch(cardA, cardB) {
    if (doesMatch(cardA, cardB)) {
        showCardAsMatching(cardA);
        showCardAsMatching(cardB);
    } else {
        hideCard(cardA);
        hideCard(cardB);
    }
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

function starCount() {
    if (game.moves < 11) {
        return 3;
    }
    if (game.moves < 16) {
        return 2;
    }
    if (game.moves < 21) {
        return 1;
    }
    return 0;
}

function updateStars() {
    for (let i = 0; i < game.starTargets.length; i++) {
        if ((i + 1) <= starCount()) {
            game.starTargets[i].classList.add('fa-star');
            game.starTargets[i].classList.remove('fa-star-o');
        } else {
            game.starTargets[i].classList.remove('fa-star');
            game.starTargets[i].classList.add('fa-star-o');
        }
    }
}

function allCardsMatch() {
    return game.deck.querySelectorAll('.card:not(.match)').length === 0;
}

function showFinalScore() {
    game.finalMovesTarget.innerHTML = game.moves + ' moves';
    game.finalStarsTarget.innerHTML = starCount() + ' stars';
    game.finalScoreTarget.classList.add('open');
}

function hideFinalScore() {
    game.finalScoreTarget.classList.remove('open');
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
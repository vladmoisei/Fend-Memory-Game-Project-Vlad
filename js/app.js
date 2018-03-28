/*
 * Create a list that holds all of your cards
 */

const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o",
 "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
 "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond",
 "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt",
 "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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


//Declaring variables
let listOfCardsShuffled = [];
let listOfCardsShow = [];
let listOfCardsMatch = [];
const cards = document.querySelectorAll('.deck li');

/*
 * Set Grid with shuffled cards
 * - populate array of shuffled cards
 * - create a function for adding cards to grid's deck
 */

function createListOfShuffledCards() {
	listOfCardsShuffled = shuffle(listOfCards);
	return listOfCardsShuffled;
}

function addShuffledCardsToGrid() {
	createListOfShuffledCards();
	let i = 0;
	for (let card of cards) {
		card.className = "card";
		card.firstElementChild.className = listOfCardsShuffled[i];
		i++;
	}
}

addShuffledCardsToGrid(); //Add random cards to grid

/*
 * Add event listener for each card
 * - add function for Show Card List
 * - add function for Match card List
 */

cards.forEach(elem => elem.addEventListener("click", handlerEventClickOnCard));
function handlerEventClickOnCard () {
	//console.log(this.className);
	addCardToShowList(this);
};

// Function for adding Card to Show list
function addCardToShowList(card) {
	card.className += " open show";
	listOfCardsShow.push(card.firstElementChild.className);
	addCardToMatchList(listOfCardsShow);
	setTimeout(function() {
		checkCardMatch(listOfCardsShow, listOfCardsMatch);
	}, 2000);
}

// Clear list function
function clearList(list) {
	for (let i = 0; i < 2; i++) {
            list.shift();
        }
    return list;
}

// Function for adding card to Match List
function addCardToMatchList(list) {
	if (list.length === 2) {
		if (list[0] === list[1]) {
			let mySearchString = "." + list[0].toString().split(" ")[1];
			//console.log(mySearchString);
			let elemArrayCardsMatch = document.querySelectorAll(mySearchString);
			let arrayCardsMatch = [ ...elemArrayCardsMatch];
			//console.log(arrayCardsMatch);
			//console.log(elemArrayCardsMatch[0].parentElement.className);
			elemArrayCardsMatch[0].parentElement.className = "card match";
			elemArrayCardsMatch[1].parentElement.className = "card match";
			listOfCardsMatch.push(list[0]);
			listOfCardsMatch.push(list[1]);
		    clearList(list);
	    }
	    else {
	    	clearList(list);
	    };
	};
}

// Function that shows only match cards
function checkCardMatch(listOfCardsShow, listOfCardsMatch) {
    if (listOfCardsShow.length === 0) {
	    for (let card of cards) {
		    if (!card.classList.contains("match")) {
			    card.className = "card"
		    }
	    }
    }
}
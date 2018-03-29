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
//let listOfClickedCards = [];
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
 * - add animation to match and unmatch cards
 */

cards.forEach(elem => elem.addEventListener("click", handlerEventClickOnCard));

function handlerEventClickOnCard () {
	//console.log(this.className);
	addCardToShowList(this);
	//listOfClickedCards.push(this);
	//console.log(this.className);
	//if (this.className === "card") this.addEventListener("click", handlerEventClickOnCard);
};

// Function for adding Card to Show list
function addCardToShowList(card) {
	card.className += " open show";
	listOfCardsShow.push(card.firstElementChild.className);
	if (listOfCardsShow.length === 1) { //remove click event on card to prevent show his pair
		card.removeEventListener("click", handlerEventClickOnCard);
	}
	if (listOfCardsShow.length === 2) { //remove all click event to prevent open more than 2 cards
		cards.forEach(card => card.removeEventListener("click", handlerEventClickOnCard));
	};
	addCardToMatchList(listOfCardsShow); //add card to match list card if exist
	checkCardMatch(listOfCardsShow, listOfCardsMatch); //close all cards that don't match and addEventListener for click
}

// Clear showList function
function clearList(list) {
	for (let i = 0; i < 2; i++) {
            list.shift();
        }
    return list;
}

// Function for adding card to Match List and clear showList
function addCardToMatchList(list) {
	if (list.length === 2) { //if are open 2 cards
		let mySearchString = "." + list[0].toString().split(" ")[1];
		let elemArrayCardsMatch = document.querySelectorAll(mySearchString);
		let arrayCardsMatch = [ ...elemArrayCardsMatch];
		//let card1 = document.querySelector list[0];
		//let card2 = list[1];
		//console.log(card1);
		if (list[0] === list[1]) { //if card 1 is the same with card 2
			//console.log(mySearchString);
			//console.log(arrayCardsMatch);
			//console.log(elemArrayCardsMatch[0].parentElement.className);
			setTimeout(function (argument) { //set delay 1 sec to set match card
				elemArrayCardsMatch[0].parentElement.className = "card match animated pulse"; //set match card 1
				elemArrayCardsMatch[1].parentElement.className = "card match animated pulse"; //set match card 2
			}, 1000);
			listOfCardsMatch.push(list[0]); //add card 1 to match list
			listOfCardsMatch.push(list[1]); //add card 2 to match list
		    clearList(list); //clear showCardList
	    }
	    else {
	    	//adaugare pentru animare mismatch
	    	//setTimeout(function (argument) { //set delay 1 sec to set match card
			//	elemArrayCardsMatch[0].parentElement.className = "card animated pulse"; //set match card 1
			//	elemArrayCardsMatch[1].parentElement.className = "card animated pulse"; //set match card 2
				//console.log(elemArrayCardsMatch[0].parentElement.className);
				//console.log(elemArrayCardsMatch[1].parentElement.className);
			//}, 500);
			//pana aici
			let listOfClickedCards = document.querySelectorAll(".open");
			setTimeout(function (argument) {
				//listOfClickedCards[0].className += " cardBackground";
				listOfClickedCards[0].className += " cardBackground animated shake";
				listOfClickedCards[1].className += " cardBackground animated shake";
				console.log(listOfClickedCards[0].className);
				console.log(listOfClickedCards[1].className);
			}, 500);
			//listOfClickedCards[0].classList.add("animated.pulse");
			//listOfClickedCards[1].classList.add("animated.pulse");
	    	clearList(list); //clear showCardList
	    };
	};
}

// Function that shows only match cards
function checkCardMatch(listOfCardsShow, listOfCardsMatch) {
    if (listOfCardsShow.length === 0) {
	    setTimeout(function() { //add delay to close card
			for (let card of cards) {
		    	if (!card.classList.contains("match")) {
			    	card.className = "card"; //close cards that don't match
			    	//console.log(card.className);
			    	if (card.className === "card") {
			    		card.addEventListener("click", handlerEventClickOnCard); //add event listeners to cards that don't match
			    	};
		    	};
	    	};
	    }, 1000);
    };
}
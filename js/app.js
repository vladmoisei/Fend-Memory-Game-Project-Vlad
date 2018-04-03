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

//Declaring variables
let listOfCardsShuffled = [];
let listOfCardsShow = [];
let listOfCardsMatch = [];
//let listOfClickedCards = [];
const cards = document.querySelectorAll('.deck li');
const moves = document.querySelector('.moves');
let counterMoves = Number(moves.innerText);
let starsArray = document.querySelectorAll('.fa-star');
let intervalID; //Variable used to stop the timer
let counterClick = 0;
//console.log(counterMoves++);
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
 * - add counter for moves
 */

cards.forEach(elem => elem.addEventListener("click", handlerEventClickOnCard));

function handlerEventClickOnCard () {
	if (++counterClick == 1) startTimer(); //start timer at first click on card
	addCardToShowList(this);
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
		counterMoves++; //increment counter moves
		moves.innerText = counterMoves; //show counter moves on screen
		checkMovesNumber();
		let mySearchString = "." + list[0].toString().split(" ")[1];
		let elemArrayCardsMatch = document.querySelectorAll(mySearchString);
		let arrayCardsMatch = [ ...elemArrayCardsMatch];
		if (list[0] === list[1]) { //if card 1 is the same with card 2
			setTimeout(function (argument) { //set delay 1 sec to set match card
				elemArrayCardsMatch[0].parentElement.className = "card match animated pulse"; //set match card 1
				elemArrayCardsMatch[1].parentElement.className = "card match animated pulse"; //set match card 2
			}, 1000);
			listOfCardsMatch.push(list[0]); //add card 1 to match list
			listOfCardsMatch.push(list[1]); //add card 2 to match list
			checkGameOver(); //check if there are 16 cards match to popup congratulations window
		    clearList(list); //clear showCardList
	    }
	    else {
			let listOfClickedCards = document.querySelectorAll(".open");
			setTimeout(function (argument) {
				listOfClickedCards[0].className += " cardBackground animated shake";
				listOfClickedCards[1].className += " cardBackground animated shake";
			}, 500);
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
			    	if (card.className === "card") {
			    		card.addEventListener("click", handlerEventClickOnCard); //add event listeners to cards that don't match
			    	};
		    	};
	    	};
	    }, 1000);
    };
}

// Function for removing stars after certain number of muves
function checkMovesNumber() {
	if (counterMoves > 12) {
		starsArray[2].className += " star-lost";
		if (counterMoves > 20) {
			starsArray[1].className += " star-lost";
		};
	};
}

//Funtion for start timer
function startTimer() {
	var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    intervalID = setInterval( function(){
        document.getElementById("seconds").innerHTML = pad(++sec%60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec/60,10));
    }, 1000);
}

//Function stop timer
function stopTimer() {
	counterClick = 0;
	let minutesLabel = document.querySelector('#minutes');
	let secondsLabel = document.querySelector('#seconds');
	minutesLabel.innerHTML = "00";
	secondsLabel.innerHTML = "00";
	clearInterval(intervalID);
}

/*
 * Add functionality to Reset Button
 * - reset the game board
 * - reset the timer
 * - reset star rating
 */

document.querySelector(".restart").addEventListener("click", handlerEventClickOnReset);
//Function for click event on Reset Button
function handlerEventClickOnReset() {
	addShuffledCardsToGrid(); //Add random cards to grid
	cards.forEach(elem => elem.addEventListener("click", handlerEventClickOnCard));
	counterMoves = 0; //reset counter moves
	moves.innerText = counterMoves; //show counter moves on screen
	clearList(listOfCardsShow);
	//Clear listOfCardsMatch
	clearAllList(listOfCardsMatch);
	stopTimer();
	resetPopupStars(); //reset stars
}

/*
 * Add functionality appear Congratulations screen
 * - Add Congratulations window: I inspired from w3school: https://www.w3schools.com/howto/howto_css_modals.asp
 * - Add functionality and scores show to congratulations window
 */

// Get the modal
var modal = document.getElementById('myModal');

/*// Get the button that opens the modal
document.querySelector('.restart').setAttribute("id", "myBtn"); //adaugat de proba, afisare congrat window
var btn = document.getElementById("myBtn");
*/

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

/*// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
*/

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    showLeaderboard(); //show leaderBoard when you exit Congratulations Window
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    showLeaderboard(); //show leaderBoard when you exit Congratulations Window
}

document.querySelector(".resetGame").addEventListener("click", handlerEventClickOnReset);
//Function for click event on Reset Button in Modal window
function handlerEventClickOnReset() {
	addShuffledCardsToGrid(); //Add random cards to grid
	cards.forEach(elem => elem.addEventListener("click", handlerEventClickOnCard));
	counterMoves = 0; //reset counter moves
	moves.innerText = counterMoves; //show counter moves on screen
	clearList(listOfCardsShow);
	stopTimer();
	modal.style.display = "none";
	resetPopupStars(); //reset stars
	//Clear listOfCardsMatch
	clearAllList(listOfCardsMatch);
	showLeaderboard(); //show leaderBoard when you exit Congratulations Window
}

//Function ClearAllList
function clearAllList(list) {
	let condition = true;
	while (condition) {
	   	list.pop();
	   	condition = (list.length > 0) ? true : false;
	}
}
//Function check if game is over and show scores
function checkGameOver() {
	if (listOfCardsMatch.length == 16) {
	    showPopupWindow(); //show popup window
	    writeTimeCounter();
	    writeMovesCounter();
	    writeStarsCounter();
	    stopTimer();
	    //Clear listOfCardsMatch
	    clearAllList(listOfCardsMatch);
    }
}

//Function show Popup window
function showPopupWindow() {
    modal.style.display = "block";
}

//Function write timeCounter in popup window
function writeTimeCounter() {
	let timeCounter = document.getElementById('timeCounter');
	let minutesLabel = document.querySelector('#minutes');
	let secondsLabel = document.querySelector('#seconds');
	timeCounter.innerText = minutesLabel.innerText + " : " + secondsLabel.innerText;
	return timeCounter.innerText;
}

//Function write movesCounter in popup window
function writeMovesCounter() {
	let movesCounter = document.getElementById('movesCounter');
	movesCounter.innerText = counterMoves;
	return movesCounter.innerText;
}

//Function write stars score in popup window
function writeStarsCounter() {
	let star2 = document.getElementById('star2-show');
	let star3 = document.getElementById('star3-show');
	if (counterMoves > 12) {
		star3.className += " star-lost";
		if (counterMoves > 20) {
			star2.className += " star-lost";
		};
	};
}

//Reset classes for stars in popup window and stars on main window
function resetPopupStars() {
	starsArray[0].className = "fa fa-star";
	starsArray[1].className = "fa fa-star";
	starsArray[2].className = "fa fa-star";
	document.getElementById('star2-show').className = "";
	document.getElementById('star3-show').className = "";
}

/*
 * Add to LeaderBoard
 *
 *
 */

// Get LeaderBoard
var leaderBoard = document.getElementById('leaderBoard');
// Counter user scores added
let counterScoresAdded = 0;

//localStorage.setItem('Name', 'Anonimous');
//localStorage.setItem('Time', '00:00');
//localStorage.setItem('Moves', '0');

// When the user clicks anywhere outside of the leaderboard, close it
window.onclick = function(event) {
    if (event.target == leaderboard) {
        leaderboard.style.display = "none";
    }
}

//Function show leaderboard
function showLeaderboard() {
	leaderboard.style.display = "block";
	addUserScoresToTable();
}

//Function set user scores to localStorage
function setUserScores() {
localStorage.setItem('Name', getName());
localStorage.setItem('Time', getTimeCounter());
localStorage.setItem('Moves', getMovesCounter());
}

//Initiate row element for leaderboard table
let leaderboardTable = document.getElementById('leaderboard-table');

function addValueToRowElement(nameElement, timeElement, movesElement) {
	nameElement.innerText = localStorage.getItem("Name");
	timeElement.innerText = localStorage.getItem("Time");
	movesElement.innerText = localStorage.getItem("Moves");
}
function initiateRowElement() {
	let rowElement = document.createElement("tr");
	let nameElement = document.createElement("td");
	let timeElement = document.createElement("td");
	let movesElement = document.createElement("td");
	setUserScores();
	addValueToRowElement(nameElement, timeElement, movesElement);
	createRowElement(rowElement, nameElement, timeElement, movesElement);
	// console.log(rowElement);
	return rowElement;
}
function createRowElement(rowElement, nameElement, timeElement, movesElement) {
	rowElement.appendChild(nameElement);
	rowElement.appendChild(timeElement);
	rowElement.appendChild(movesElement);
}


//Function add user scores from localStore to Leaderboard table
function addUserScoresToTable() {
	// console.log(leaderboardTable);
	let rowElement = initiateRowElement();
	leaderboardTable.appendChild(rowElement);
}

let saveNameButton = document.getElementById('saveNameBtn');
saveNameButton.addEventListener("click", handlerEventClickOnSaveName);


function getName() {
	if (document.getElementById('inputName').value !== "")
		return document.getElementById('inputName').value;
	return "Anonimous";
}
function getTimeCounter() {
	return document.getElementById('timeCounter').innerText;
}
function getMovesCounter() {
	return document.getElementById('movesCounter').innerText;
}

function handlerEventClickOnSaveName() {
	showLeaderboard();
	modal.style.display = "none";
}

//showLeaderboard();
//showPopupWindow();
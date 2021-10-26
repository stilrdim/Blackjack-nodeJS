let Player = function () {
  let emptyHand = [];
  let cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  let getStartingCards = function (playerHandArray) {
    let min = 0;
    let max = 12; // Number of cards - 1
    let randomCard1 = Math.floor(Math.random() * (max - min + 1) + min);
    let randomCard2 = Math.floor(Math.random() * (max - min + 1) + min);
    let newCard1 = cards[randomCard1];
    let newCard2 = cards[randomCard2];
    playerHandArray.push(newCard1);
    if (newCard1 == 11 && newCard2 == 11) { newCard2 = 1 } // If both cards are aces, adjust second
    playerHandArray.push(newCard2);
    return playerHandArray;
  };

  this.hand = getStartingCards(emptyHand);
  // Handle player cards
  this.getPlayerCards = function () { return this.hand };
  this.setPlayerCards = function (playerCardsArray) { this.hand = playerCardsArray };

  // Handle deck
  this.getDeck = function () { return cards };
  this.setDeck = function (cardsArray) { return cards = cardsArray };

  this.getNewCard = function () {
    let min = 0;
    let max = 12; // Number of cards - 1
    let randomCard = Math.floor(Math.random() * (max - min + 1) + min);
    let newCard = cards[randomCard];
    this.hand.push(newCard);
    this.score = calculateHand(this.hand)
    if (newCard == 11 && this.score > 21) {
      newCard = 1;
      this.hand.pop(); // Get rid of the last value [ 11 ]
      this.hand.push(newCard); // Add the new value [ 1 ]
      this.score = calculateHand(this.hand);
    }
  };

  let calculateHand = function (playerHandArray) {
    let result = 0;
    for (let i = 0; i < playerHandArray.length; i++) {
      result += playerHandArray[i]
    }
    return result;
  };
  this.score = calculateHand(this.hand);
  this.bust = function () { this.hasBust = true }
  this.lose = function () { this.hasLost = true }
  this.hasLost = false;
  this.hasBust = false;
}

module.exports = Player;
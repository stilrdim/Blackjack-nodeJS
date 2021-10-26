const readline = require('readline-sync');

function drawStartingCards(userHandArray, userHandArray2) {
  let min = 0;
  let max = 12; // Number of cards - 1
  let random_card1 = Math.floor(Math.random() * (max - min + 1) + min);
  let random_card2 = Math.floor(Math.random() * (max - min + 1) + min);
  let random_card3 = Math.floor(Math.random() * (max - min + 1) + min);
  let random_card4 = Math.floor(Math.random() * (max - min + 1) + min);
  userHandArray.push(cards[random_card1]);
  userHandArray.push(cards[random_card2]);
  userHandArray2.push(cards[random_card3]);
  userHandArray2.push(cards[random_card4]);
}

function drawNewCard(userHandArray) {
  let min = 0;
  let max = 12; // Number of cards - 1
  let random_card = Math.floor(Math.random() * (max - min + 1) + min);
  userHandArray.push(cards[random_card]);
}
function calculateHand(userHandArray) {
  let result = 0;
  for (let i = 0; i < userHandArray.length; i++) {
    result += userHandArray[i]
  }
  return result;
}

const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1];

let totalWins = 0;
let totalLosses = 0;
let totalDraws = 0;

while (true) {

  let userHand = [];
  let botHand = [];

  let userLoss = false;
  let userBust = false;
  let botLoss = false;
  let botBust = false;

  drawStartingCards(userHand, botHand)

  let userScore = calculateHand(userHand);
  let botScore = calculateHand(botHand);

  // User cards
  while (true) {
    console.log(`Your cards: [ ${userHand} ]\nScore: ${userScore}\n`);

    if (userScore == 21) {
      break;
    }
    else if (userScore > 21) {
      console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BUST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
      userBust = true;
      break;
    }
    let input = readline.question('(H)it or (S)tay or (E)xit\n');
    if (input.toLowerCase() == 'e') {
      console.log(`W: ${totalWins}\tL:${totalLosses}\tD:${totalDraws}`);
      process.exit(1);
    }
    if (input.toLowerCase() == 'h') {
      drawNewCard(userHand);
      userScore = calculateHand(userHand)
      if (userHand[userHand.length - 1] == 11 && userScore > 21) {
        userHand[userHand.length - 1] = 1;
        userScore = calculateHand(userHand);
      }
    }

    else if (input.toLowerCase() == 's') {
      userScore = calculateHand(userHand)
      break;
    }
  }

  // Bot card algorithm
  while (true) {
    if (userLoss == true) { break }
    console.log(`Bot cards: [ ${botHand} ]\nScore: ${botScore}`);

    if (botScore < 17) {
      drawNewCard(botHand);
      botScore = calculateHand(botHand);
    }
    else if (botScore > 21) {
      botBust = true;
      botScore = calculateHand(botHand)
      break;
    }
    else { break }
  }

  // Decide winner
  if (botScore > userScore) {
    if (botLoss == false && botBust == false) {
      userLoss = true;
    }
    else { userLoss = false; }
  }
  else if (botScore < userScore) {
    botLoss = true;
  }

  console.log('\n')
  if (userLoss == true || userBust == true) {
    totalLosses++;
    console.log(`### YOU LOSE ###\n${userScore} vs ${botScore}\nYou have lost ${totalLosses} times`);
  }
  else if (botLoss == true || botBust == true) {
    totalWins++;
    console.log(`########################## YOU WIN ##########################\n${userScore} vs ${botScore}\nYou have won ${totalWins} times`)
  }
  else {
    totalDraws++;
    console.log(`<<<<< DRAW [ ${userScore} ]>>>>>\nYou went draw ${totalDraws} times`);
  }
  console.log('\n===============================================NEW GAME===============================================')
}
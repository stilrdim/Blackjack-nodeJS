const readline = require('readline-sync');
const Player = require('./blackJackAPI');

let totalWins = 0;
let totalLosses = 0;
let totalDraws = 0;

while (true) {
  let player = new Player();
  let dealer = new Player();

  // Handle player cardss
  while (true) {
    console.log(`Your hand: [ ${player.hand} ]\nScore: ${player.score}\n`);

    if (player.score == 21) {
      break;
    }
    else if (player.score > 21) {
      console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BUST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
      player.lose();
      break;
    }

    let input = readline.question('(H)it or (S)tay or (E)xit\n');

    if (input.toLowerCase() == 'e') {
      console.log(`W: ${totalWins}\tL:${totalLosses}\tD:${totalDraws}`);
      process.exit(1);
    }
    else if (input.toLowerCase() == 'h') { player.getNewCard(); }
    else if (input.toLowerCase() == 's') { break; }
  }

  // Handle dealer cards
  while (true) {
    if (player.hasLost == true) { break }
    console.log(`Dealer's hand: [ ${dealer.hand} ]\nScore: ${dealer.score}`);

    if (dealer.score < 17) { dealer.getNewCard(); }
    else if (dealer.score > 21) {
      dealer.bust();
      break;
    }
    else { break }
  }
  // Decide winner
  if (dealer.score > player.score) {
    if (dealer.hasLost == false && dealer.hasBust == false) {
      player.lose();
    }
    else { dealer.lose(); }
  }
  else if (dealer.score < player.score) { dealer.lose(); }


  console.log('\n')

  // Announce winner
  if (player.hasLost == true || player.hasBust == true) {
    totalLosses++;

    console.log(`### YOU LOSE ###\n${player.score} vs ${dealer.score}\nYou have lost ${totalLosses} times`);
  }
  else if (dealer.hasLost == true || dealer.hasBust == true) {
    totalWins++;
    console.log(`########################## YOU WIN ##########################\n${player.score} vs ${dealer.score}\nYou have won ${totalWins} times`)
  }
  else {
    totalDraws++;
    console.log(`<<<<< DRAW [ ${player.score} ]>>>>>\nYou went draw ${totalDraws} times`);
  }
  console.log('\n===============================================NEW GAME===============================================')
}
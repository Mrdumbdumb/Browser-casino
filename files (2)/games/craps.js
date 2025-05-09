document.getElementById('craps').innerHTML = `
  <h2>Craps</h2>
  <input type="number" id="craps-bet" placeholder="Enter your bet">
  <input type="number" id="craps-number" placeholder="Bet on a number (2-12)">
  <button onclick="playCraps()">Roll Dice</button>
  <div id="craps-output"></div>
`;

function playCraps() {
  const bet = parseInt(document.getElementById("craps-bet").value);
  const numberBet = parseInt(document.getElementById("craps-number").value);

  if (isNaN(bet) || bet <= 0 || bet > bankroll || isNaN(numberBet) || numberBet < 2 || numberBet > 12) {
    alert("Invalid bet or number!");
    return;
  }

  updateBankroll(-bet);

  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;
  const total = roll1 + roll2;
  let winnings = 0;

  if (total === numberBet) {
    winnings = bet * 10;
    document.getElementById("craps-output").innerText = `You rolled ${total}. You win $${winnings}!`;
  } else {
    document.getElementById("craps-output").innerText = `You rolled ${total}. You lose.`;
  }

  updateBankroll(winnings);
}
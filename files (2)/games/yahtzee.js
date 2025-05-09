document.getElementById('yahtzee').innerHTML = `
  <h2>Yahtzee</h2>
  <input type="number" id="yahtzee-bet" placeholder="Enter your bet">
  <button onclick="playYahtzee()">Roll Dice</button>
  <div id="yahtzee-output"></div>
`;

function playYahtzee() {
  const bet = parseInt(document.getElementById("yahtzee-bet").value);
  if (isNaN(bet) || bet <= 0 || bet > bankroll) {
    alert("Invalid bet amount!");
    return;
  }

  updateBankroll(-bet);

  const dice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
  const counts = {};
  dice.forEach(d => counts[d] = (counts[d] || 0) + 1);

  const values = Object.values(counts);
  let result = `You rolled: ${dice.join(", ")}. `;
  let winnings = 0;

  if (values.includes(5)) {
    winnings = bet * 10;
    result += "Yahtzee! +$" + winnings;
  } else if (values.includes(4)) {
    winnings = bet * 5;
    result += "Four of a Kind! +$" + winnings;
  } else if (values.includes(3) && values.includes(2)) {
    winnings = bet * 3;
    result += "Full House! +$" + winnings;
  } else if (values.includes(3)) {
    winnings = bet * 2;
    result += "Three of a Kind! +$" + winnings;
  } else {
    winnings = -bet;
    result += "No special combo. You lose.";
  }

  updateBankroll(winnings);
  document.getElementById("yahtzee-output").innerText = result;
}
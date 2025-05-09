document.getElementById('roulette').innerHTML = `
  <h2>Roulette</h2>
  <input type="text" id="roulette-bet-type" placeholder="e.g., red, black, even, odd, or a number">
  <input type="number" id="roulette-bet-amount" placeholder="Enter your bet">
  <button onclick="placeRouletteBet()">Place Bet</button>
  <div id="roulette-output"></div>
`;

const rouletteColors = Array.from({ length: 37 }, (_, i) => (i === 0 ? "green" : i % 2 === 0 ? "black" : "red"));

function placeRouletteBet() {
  const betType = document.getElementById("roulette-bet-type").value.toLowerCase();
  const betAmount = parseInt(document.getElementById("roulette-bet-amount").value);

  if (isNaN(betAmount) || betAmount <= 0 || betAmount > bankroll) {
    alert("Invalid bet amount!");
    return;
  }

  updateBankroll(-betAmount);

  const spinResult = Math.floor(Math.random() * 37);
  const spinColor = rouletteColors[spinResult];

  let winnings = 0;
  if (betType === spinResult.toString()) winnings = betAmount * 35;
  else if (betType === spinColor) winnings = betAmount * 2;
  else if (betType === "even" && spinResult % 2 === 0 && spinResult > 0) winnings = betAmount * 2;
  else if (betType === "odd" && spinResult % 2 === 1) winnings = betAmount * 2;

  document.getElementById("roulette-output").innerText = `Spin result: ${spinResult} (${spinColor}).`;

  if (winnings > 0) {
    updateBankroll(winnings);
    document.getElementById("roulette-output").innerText += ` You win $${winnings}!`;
  } else {
    document.getElementById("roulette-output").innerText += ` You lose.`;
  }
}
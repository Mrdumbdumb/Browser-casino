document.getElementById('slots').innerHTML = `
  <h2>Slots</h2>
  <input type="number" id="slot-bet" placeholder="Enter your bet">
  <button onclick="spinSlots()">Spin</button>
  <div id="slots-output"></div>
`;

const slotSymbols = ['🍒', '🍋', '🔔', '⭐', '💎'];

function spinSlots() {
  const bet = parseInt(document.getElementById("slot-bet").value);
  if (isNaN(bet) || bet <= 0 || bet > bankroll) {
    alert("Invalid bet amount!");
    return;
  }

  updateBankroll(-bet);

  const result = [randomSlotSymbol(), randomSlotSymbol(), randomSlotSymbol()];
  document.getElementById("slots-output").innerText = `Spin: ${result.join(" | ")}`;

  let winnings = 0;

  if (result[0] === result[1] && result[1] === result[2]) {
    winnings = bet * 10;
    document.getElementById("slots-output").innerText += `\nJackpot! You win $${winnings}!`;
  } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
    winnings = bet * 2;
    document.getElementById("slots-output").innerText += `\nNice! Two matching symbols. You win $${winnings}!`;
  } else {
    document.getElementById("slots-output").innerText += `\nNo match. You lose.`;
  }

  updateBankroll(winnings);
}

function randomSlotSymbol() {
  return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
}
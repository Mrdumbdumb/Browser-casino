document.getElementById('higherlower').innerHTML = `
  <h2>Higher or Lower</h2>
  <input type="number" id="higherlower-bet" placeholder="Enter your bet">
  <button onclick="higherLowerStart()">Start Game</button>
  <div id="higherlower-current-card">?</div>
  <button onclick="higherLowerGuess('higher')">Higher</button>
  <button onclick="higherLowerGuess('lower')">Lower</button>
  <div id="higherlower-result"></div>
  <div id="higherlower-score">Score: 0</div>
`;

let higherLowerCurrentCard = getRandomCard();
let higherLowerScore = 0;

function higherLowerStart() {
  const bet = parseInt(document.getElementById("higherlower-bet").value);
  if (isNaN(bet) || bet <= 0 || bet > bankroll) {
    alert("Invalid bet amount!");
    return;
  }

  updateBankroll(-bet);
  higherLowerCurrentCard = getRandomCard();
  higherLowerScore = 0;

  updateHigherLowerUI();
  document.getElementById("higherlower-result").innerText = "Game started!";
}

function getRandomCard() {
  return Math.floor(Math.random() * 13) + 1; // 1 to 13
}

function displayCard(value) {
  const faces = { 1: "A", 11: "J", 12: "Q", 13: "K" };
  return faces[value] || value;
}

function updateHigherLowerUI() {
  document.getElementById("higherlower-current-card").innerText = displayCard(higherLowerCurrentCard);
  document.getElementById("higherlower-score").innerText = `Score: ${higherLowerScore}`;
}

function higherLowerGuess(guess) {
  const nextCard = getRandomCard();
  let resultText = `Next card was ${displayCard(nextCard)}. `;

  if (
    (guess === "higher" && nextCard > higherLowerCurrentCard) ||
    (guess === "lower" && nextCard < higherLowerCurrentCard)
  ) {
    higherLowerScore++;
    resultText += "Correct! +$50";
    updateBankroll(50);
  } else if (nextCard === higherLowerCurrentCard) {
    resultText += "It's a tie! No change.";
  } else {
    resultText += "Wrong! -$50";
    higherLowerScore = 0;
    updateBankroll(-50);
  }

  higherLowerCurrentCard = nextCard;
  document.getElementById("higherlower-result").innerText = resultText;
  updateHigherLowerUI();
}

updateHigherLowerUI();
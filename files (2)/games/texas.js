
document.getElementById('texas').innerHTML = `
  <h2>Texas Hold'em</h2>
  <input type="number" id="texas-bet" placeholder="Enter your bet">
  <button onclick="startTexasGame()">Start Game</button>
  <button onclick="fold()">Fold</button> <!-- Added Fold -->
  <button onclick="check()">Check</button> <!-- Added Check -->
  <div id="texas-player-cards"></div>
  <div id="texas-river-cards"></div>
  <div id="texas-output"></div>
`;

function fold() {
  document.getElementById("texas-output").innerText = "You folded. Game over!";
  texasPot = 0; // Reset the pot
}

function check() {
  document.getElementById("texas-output").innerText = "You checked. Waiting for the dealer's move.";
}

let texasDeck = [];
let texasPlayerHand = [];
let texasRiver = [];
let texasPot = 0;

function startTexasGame() {
  const bet = parseInt(document.getElementById("texas-bet").value);
  if (isNaN(bet) || bet <= 0 || bet > bankroll) {
    alert("Invalid bet amount!");
    return;
  }

  updateBankroll(-bet);
  texasPot = bet * 2; // Player and dealer both contribute to pot
  texasDeck = createTexasDeck();
  texasPlayerHand = [dealCard(texasDeck), dealCard(texasDeck)];
  texasRiver = [dealCard(texasDeck), dealCard(texasDeck), dealCard(texasDeck), dealCard(texasDeck), dealCard(texasDeck)];

  document.getElementById("texas-player-cards").innerText = `Your Cards: ${displayHand(texasPlayerHand)}`;
  document.getElementById("texas-river-cards").innerText = `River: ${displayHand(texasRiver)}`;
  document.getElementById("texas-output").innerText = "Game started! Make your move.";
}

function createTexasDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const deck = [];
  suits.forEach(suit => ranks.forEach(rank => deck.push(`${rank}${suit}`)));
  return shuffleDeck(deck);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function dealCard(deck) {
  return deck.pop();
}

function displayHand(hand) {
  return hand.join(", ");
}
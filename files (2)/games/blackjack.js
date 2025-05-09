document.getElementById('blackjack').innerHTML = `
  <h2>Blackjack</h2>
  <input type="number" id="blackjack-bet" placeholder="Enter your bet">
  <button onclick="startBlackjackGame()">Start Game</button>
  <div id="blackjack-output"></div>
  <div id="blackjack-controls">
    <button onclick="blackjackHit()">Hit</button>
    <button onclick="blackjackStand()">Stand</button>
  </div>
`;

let blackjackDeck = [], blackjackPlayerHand = [], blackjackDealerHand = [];
let blackjackGameActive = false;

function startBlackjackGame() {
  const bet = parseInt(document.getElementById("blackjack-bet").value);
  if (isNaN(bet) || bet <= 0 || bet > bankroll) {
    alert("Invalid bet amount!");
    return;
  }

  updateBankroll(-bet); // Deduct the bet
  blackjackGameActive = true;
  blackjackDeck = createBlackjackDeck();
  blackjackPlayerHand = [dealCard(blackjackDeck), dealCard(blackjackDeck)];
  blackjackDealerHand = [dealCard(blackjackDeck), dealCard(blackjackDeck)];

  updateBlackjackOutput(`Game started! Your hand: ${displayHand(blackjackPlayerHand)} | Dealer's face-up card: ${blackjackDealerHand[0]}`);
}

function blackjackHit() {
  if (!blackjackGameActive) return;
  blackjackPlayerHand.push(dealCard(blackjackDeck));
  const playerValue = calculateHandValue(blackjackPlayerHand);
  updateBlackjackOutput(`You hit. Your hand: ${displayHand(blackjackPlayerHand)} (Value: ${playerValue})`);

  if (playerValue > 21) {
    endBlackjackGame("Bust! You lose.", "lose");
  }
}

function blackjackStand() {
  if (!blackjackGameActive) return;
  const dealerValue = playDealerHand();
  const playerValue = calculateHandValue(blackjackPlayerHand);

  if (dealerValue > 21 || playerValue > dealerValue) {
    endBlackjackGame("You win!", "win");
  } else if (playerValue < dealerValue) {
    endBlackjackGame("Dealer wins.", "lose");
  } else {
    endBlackjackGame("It's a push!", "push");
  }
}

function playDealerHand() {
  let dealerValue = calculateHandValue(blackjackDealerHand);
  while (dealerValue < 17) {
    blackjackDealerHand.push(dealCard(blackjackDeck));
    dealerValue = calculateHandValue(blackjackDealerHand);
  }
  updateBlackjackOutput(`Dealer's hand: ${displayHand(blackjackDealerHand)} (Value: ${dealerValue})`);
  return dealerValue;
}

function endBlackjackGame(message, outcome) {
  updateBlackjackOutput(message);
  if (outcome === "win") updateBankroll(bet * 2); // Double the bet
  else if (outcome === "push") updateBankroll(bet); // Refund the bet
  blackjackGameActive = false;
}

function createBlackjackDeck() {
  const suits = ["H", "D", "C", "S"];
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

function calculateHandValue(hand) {
  let value = 0, aces = 0;
  hand.forEach(card => {
    const rank = card.slice(0, -1);
    if (rank === "A") {
      value += 11;
      aces++;
    } else if (["K", "Q", "J"].includes(rank)) {
      value += 10;
    } else {
      value += parseInt(rank);
    }
  });
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return value;
}

function displayHand(hand) {
  return hand.join(", ");
}

function updateBlackjackOutput(message) {
  document.getElementById("blackjack-output").innerText = message;
}
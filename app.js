let currentPlayerIndex = 0;
let playersData = [];

// Function to fetch player details from the JSON file
async function fetchPlayerDetails() {
  try {
    const response = await fetch('players.json');
    const data = await response.json();

    // Check if the JSON data contains player details
    if (data && data.length > 0) {
      playersData = data;
      displayCurrentPlayer();
    } else {
      console.log('No player data found');
    }
  } catch (error) {
    console.log('Error fetching player details:', error);
  }
}

// Function to display the current player's details
function displayCurrentPlayer() {
  const currentPlayer = playersData[currentPlayerIndex];
  const playerNameElement = document.getElementById('player-name');
  const basePriceElement = document.getElementById('base-price');

  playerNameElement.textContent = currentPlayer.Name;
  basePriceElement.textContent = currentPlayer.ValueinCR || ''; // Modify this line if the JSON provides base price data
}

// Function to handle placing bids
function placeBid() {
  const bidAmount = parseFloat(document.getElementById('bid-amount').value);
  const currentPlayer = playersData[currentPlayerIndex];

  // Make an API request or perform any other logic to handle the bid
  // For this example, we'll log the bid details
  console.log('Placing bid for player:', currentPlayer.Name);
  console.log('Bid amount:', bidAmount);
}

// Function to fetch team details and purchased players
async function fetchTeamDetails() {
  try {
    const response = await fetch('players.json');
    const data = await response.json();

    // Update the HTML element with the fetched team details and purchased players
    const teamDetailsElement = document.getElementById('team-details');
    teamDetailsElement.innerHTML = `
      <h2>Team Details</h2>
      <ul>
        <li>Team Name: ${data.Team}</li>
        <li>Balance: ${data.Balance}</li>
        <li>Purchased Players: ${data.PurchasedPlayers.join(', ')}</li>
      </ul>
    `;
  } catch (error) {
    console.log('Error fetching team details:', error);
  }
}

// Event listener for placing a bid
document.getElementById('submit-bid').addEventListener('click', placeBid);

// Event listener for next player
document.getElementById('next-player').addEventListener('click', () => {
  currentPlayerIndex = (currentPlayerIndex + 1) % playersData.length;
  displayCurrentPlayer();
});

// Fetch initial player details and team details on page load
fetchPlayerDetails();
fetchTeamDetails();

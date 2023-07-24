fetch('playerInfo.json') // Fetch player data from playerData.json
    .then(response => response.json())
    .then(data => {
      playerData = data;
      renderPlayerDeck(playerData); // Render the initial player data on the webpage

      const socket = io();

      socket.on('player-update', updatedPlayerData => {
        playerData = updatedPlayerData;
        renderPlayerDeck(playerData);
      });
    })
    .catch(error => {
      console.error('Error fetching player data:', error);
    });


function renderPlayerDeck(players) {
    const playerDeckElement = document.querySelector('.playerDeck');
    playerDeckElement.innerHTML = '';

    players.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.classList.add('Card');

      playerCard.innerHTML = `
                <h3>${player.name}</h3>
                <p>Status: ${player.status}</p>
                <p>Category: ${player.category}</p>
                <p>Player Team: ${player.playerTeam}</p>
                <p>Player Price: ${player.playerPrice}</p>
            `;

      playerDeckElement.appendChild(playerCard);
    });
  }
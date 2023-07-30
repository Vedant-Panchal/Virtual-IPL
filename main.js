document.addEventListener('DOMContentLoaded', () => {
    // menu mobile devices
    const customMenuButton = document.querySelector('.custom-menu-button');
    const menu = document.getElementById('navbarMenu');
    
    // Function to close the menu
    const closeMenu = () => {
        customMenuButton.classList.remove('is-active');
        menu.classList.remove('is-active');
    };

    // Toggle the menu when the custom menu button is clicked
    customMenuButton.addEventListener('click', () => {
        customMenuButton.classList.toggle('is-active');
        menu.classList.toggle('is-active');

        // Show the close button with "X" when the menu is opened
        const closeButton = document.getElementById('closeButton');
        closeButton.style.display = menu.classList.contains('is-active') ? 'block' : 'none';
    });

    // Close the menu when the close button is clicked
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
        closeMenu();
    });

    // Close the menu when the user clicks outside the menu or custom menu button
    document.addEventListener('click', (event) => {
        const isMenuClicked = event.target.closest('.navbar-menu');
        const isButtonClicked = event.target.closest('.custom-menu-button');
        if (!isMenuClicked && !isButtonClicked) {
            closeMenu();
        }
    });

    // Close the menu when the user clicks the back button
    window.addEventListener('popstate', () => {
        closeMenu();
    });
  
  
    // end of mobile menu
    const teamGroupElement = document.querySelector('.team-group');
    let teamData;
    let playerData;

    function renderTeam(teamData) {
        teamGroupElement.innerHTML = '';

        teamData.forEach((team, index) => {
            const teamContainer = document.createElement('div');
            teamContainer.classList.add('column');
            teamContainer.classList.add('card');
            teamContainer.classList.add('is-one-quarter-desktop');
            teamContainer.setAttribute('id', 'card-design');
            teamContainer.setAttribute('style', 'margin: 5px 5px;');

            const totalPlayerPrice = team.batsmen.reduce((sum, player) =>sum + parsePrice(player.playerPrice), 0)
            + team.bowlers.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0)
            + team.wicketKeepers.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0)
            + team.allRounders.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0);

            let teamFunds = parseInt(parsePrice(team.teamFunds)) - totalPlayerPrice;
            const isDisqualified = teamFunds < 0;

            if (isDisqualified) {
                teamFunds = -Math.abs(teamFunds);
            }

            team.teamFunds = teamFunds.toLocaleString('en-IN');

            const teamName = isDisqualified ? `${team.teamName}<br>(disqualified)` : team.teamName;

            teamContainer.innerHTML = `
                <header class="card-header is-flex is-justify-content-space-between is-align-items-center" id="card-header">
                    <p class="card-header-title" id="card-title">
                        <span class="team-name">${teamName}</span>
                    </p>
                        ${
                        isDisqualified ?
                            `<p class="has-text-right funds-left">
                                Funds <br> ₹ ${team.teamFunds}
                            </p>`
                        
                        :
                    
                            `<p class="has-text-right funds-left">
                                Funds: ₹${team.teamFunds}
                            </p>`
                        }
                </header>
                    <div class="card-content">
                        <div class="content is-flex-direction-column">
                            <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                style="gap: 10px;margin-bottom: 1em;">
                                <p class="block" >
                                    <strong id="card-body">Batsman</strong>
                                </p>
                                <svg id="bat" viewBox="0 0 460.84737 460.84737" xmlns="http://www.w3.org/2000/svg"
                                    style="width: 1.5em">
                                    <path
                                        d="m460.847656 31.75-25.070312 25.078125-31.761719-31.757813 25.082031-25.070312zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m378.945312 50.140625 25.070313-25.070313 31.761719 31.757813-25.070313 25.070313zm0 0"
                                        fill="#7f4545" />
                                    <path
                                        d="m353.878906 75.210938 25.066406-25.070313 31.761719 31.757813-25.070312 25.070312zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m328.808594 100.28125 25.066406-25.070312 31.761719 31.757812-25.070313 25.070312zm0 0"
                                        fill="#7f4545" />
                                    <path
                                        d="m360.566406 132.039062-25.078125 25.070313-31.75-31.75 25.070313-25.078125zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m352.425781 190.320312-260.136719 260.140626c-13.847656 13.847656-36.296874 13.847656-50.140624 0l-31.761719-31.761719c-13.847657-13.84375-13.847657-36.296875 0-50.140625l260.140625-260.136719 25.070312 25.066406-.21875.222657-76.050781 107.808593 107.808594-76.050781.21875-.21875zm0 0"
                                        fill="#ffd2a6" />
                                    <path
                                        d="m327.355469 165.25-.21875.21875-107.808594 76.050781 76.050781-107.808593.21875-.222657zm0 0"
                                        fill="#7f4545" />
                                </svg>
                            </div>
                            <hr style="margin-top: -20px;">
                            <div class="content">
                                <ul class="is-left has-text-left is-flex-direction-column is-justify-content-center is-align-items-start is-marginless" style="list-style: decimal inside;">
                                ${team.batsmen.map(player => `
                                <div class="is-flex is-justify-content-space-between">
                                <li>${player.playerName}</li>
                                <div>₹<span>  ${parseInt(parsePrice(player.playerPrice)).toLocaleString("en-IN")}</span></div>
                                </div>
                              `).join('')}
                                </ul>
                            </div>
                            <div class="bought-players is-flex is-justify-content-flex-start is-align-items-baseline"
                                style="gap: 10px;margin-bottom: 1em;">
                                <p class="block">
                                    <strong id="card-body">Bowler</strong>
                                </p>
                                <img src="https://cdn-icons-png.flaticon.com/128/1099/1099680.png" id="ball" alt="ball"
                                    style="width: 1em;">
                            </div>
                        </div>
                        <hr style="margin-top: -20px;">
                        <div class="content">
                            <ul class="is-left has-text-left is-flex-direction-column is-justify-content-center is-align-items-start is-marginless" style="list-style: decimal inside;">
                            ${team.bowlers.map(player => `
                                  <div class="is-flex is-justify-content-space-between">
                                    <li>${player.playerName}</li>
                                    <div>₹<span>  ${parseInt(parsePrice(player.playerPrice)).toLocaleString("en-IN")}</span></div>
                                </div>
                                  </li>
                              `).join('')}
                                
                            </ul>
                        </div>
                        <div class="bought-players is-flex is-justify-content-flex-start is-align-items-start"
                            style="gap: 10px;margin-bottom: 1em;">
                            <p class="block">
                                <strong id="card-body">Wicket Keeper</strong>
                            </p>
                            <img src="assets/wicketkeeper.png" alt="wicketkeeper" style="width: 1.5rem;">
                        </div>
                        <hr style="margin-top: -20px;">
                        <div class="content">
                            <ul class="is-left has-text-left is-flex-direction-column is-justify-content-center is-align-items-start is-marginless" style="list-style: decimal inside;">
                            ${team.wicketKeepers.map(player => `
                            <div class="is-flex is-justify-content-space-between">
                            <li>${player.playerName}</li>
                            <div>₹<span>  ${parseInt(parsePrice(player.playerPrice)).toLocaleString("en-IN")}</span></div>
                            </div>
                              `).join('')}
                            </ul>
                        </div>
                        <div class="bought-players is-flex is-justify-content-flex-start is-align-items-baseline is-marginless"
                            style="gap: 10px;margin-bottom: 1em;">
                            <p class="block">
                                <strong id="card-body">All rounders</strong>
                            </p>
                            <img src="https://cdn-icons-png.flaticon.com/128/1099/1099680.png" id="ball" alt="ball"
                                    style="width: 0.9em;">
                            <svg id="bat" viewBox="0 0 460.84737 460.84737" xmlns="http://www.w3.org/2000/svg"
                                    style="width: 1.5em;margin-left: -5px">
                                    <path
                                        d="m460.847656 31.75-25.070312 25.078125-31.761719-31.757813 25.082031-25.070312zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m378.945312 50.140625 25.070313-25.070313 31.761719 31.757813-25.070313 25.070313zm0 0"
                                        fill="#7f4545" />
                                    <path
                                        d="m353.878906 75.210938 25.066406-25.070313 31.761719 31.757813-25.070312 25.070312zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m328.808594 100.28125 25.066406-25.070312 31.761719 31.757812-25.070313 25.070312zm0 0"
                                        fill="#7f4545" />
                                    <path
                                        d="m360.566406 132.039062-25.078125 25.070313-31.75-31.75 25.070313-25.078125zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m352.425781 190.320312-260.136719 260.140626c-13.847656 13.847656-36.296874 13.847656-50.140624 0l-31.761719-31.761719c-13.847657-13.84375-13.847657-36.296875 0-50.140625l260.140625-260.136719 25.070312 25.066406-.21875.222657-76.050781 107.808593 107.808594-76.050781.21875-.21875zm0 0"
                                        fill="#ffd2a6" />
                                    <path
                                        d="m327.355469 165.25-.21875.21875-107.808594 76.050781 76.050781-107.808593.21875-.222657zm0 0"
                                        fill="#7f4545" />
                                </svg>
                        </div>
                        <hr style="margin-top: -20px;">
                        <div class="content">
                            <ul class="is-left has-text-left is-flex-direction-column is-justify-content-center is-align-items-start is-marginless" style="list-style: decimal inside;">
                            ${team.allRounders.map(player => `
                            <div class="is-flex is-justify-content-space-between">
                            <li>${player.playerName}</li>
                            <div>₹<span>  ${parseInt(parsePrice(player.playerPrice)).toLocaleString("en-IN")}</span></div>
                            </div>
                              `).join('')}
                            </ul>
                        </div>
                    </div>
                `
          teamGroupElement.appendChild(teamContainer);
      });
  }
  
  function renderPlayerDeck(players) {
      const playerDeckElement = document.querySelector('.playerDeck');
      playerDeckElement.innerHTML = '';

      players.forEach(player => {
          const playerCard = document.createElement('div');
          playerCard.classList.add('block');
        if (player.category == 'Batsman') {
            playerCard.innerHTML = `
            <div class="column card  player-card-size" id="card-design-player" style="margin: 5px 5px;">
                        <header class="card-header is-flex is-justify-content-space-between is-align-items-center"
                            id="card-header">
                            <p id="card-title">
                                <span class="team-name">${player.name}</span>
                            </p>
                        </header>
                        <div>
                            <div class="content is-flex-direction-column">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Status : </strong>
                                    </p>
                                    <p class="block">${player.status}</p>
                                </div>
                                <hr style="margin-top: -20px;">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Category : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.category}</strong>
                                    </p>
                                    <svg id="bat" viewBox="0 0 460.84737 460.84737" xmlns="http://www.w3.org/2000/svg"
                                        style="width: 1.5em">
                                        <path
                                            d="m460.847656 31.75-25.070312 25.078125-31.761719-31.757813 25.082031-25.070312zm0 0"
                                            fill="#a85d5d" />
                                        <path
                                            d="m378.945312 50.140625 25.070313-25.070313 31.761719 31.757813-25.070313 25.070313zm0 0"
                                            fill="#7f4545" />
                                        <path
                                            d="m353.878906 75.210938 25.066406-25.070313 31.761719 31.757813-25.070312 25.070312zm0 0"
                                            fill="#a85d5d" />
                                        <path
                                            d="m328.808594 100.28125 25.066406-25.070312 31.761719 31.757812-25.070313 25.070312zm0 0"
                                            fill="#7f4545" />
                                        <path
                                            d="m360.566406 132.039062-25.078125 25.070313-31.75-31.75 25.070313-25.078125zm0 0"
                                            fill="#a85d5d" />
                                        <path
                                            d="m352.425781 190.320312-260.136719 260.140626c-13.847656 13.847656-36.296874 13.847656-50.140624 0l-31.761719-31.761719c-13.847657-13.84375-13.847657-36.296875 0-50.140625l260.140625-260.136719 25.070312 25.066406-.21875.222657-76.050781 107.808593 107.808594-76.050781.21875-.21875zm0 0"
                                            fill="#ffd2a6" />
                                        <path
                                            d="m327.355469 165.25-.21875.21875-107.808594 76.050781 76.050781-107.808593.21875-.222657zm0 0"
                                            fill="#7f4545" />
                                    </svg>
                                </div>
                                <hr style="margin-top: -20px;">

                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-baseline"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Player Team : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.playerTeam}</strong>
                                    </p>

                                </div>
                            </div>
                            <hr style="margin-top: -20px;">

                            <div class="is-flex is-justify-content-flex-start is-align-items-start"
                                style="gap: 10px;margin-bottom: 1em;">
                                <p class="block">
                                    <strong id="card-body" style="color: #0cd5eb !important">Player Price : ₹</strong>
                                </p>
                                <p class="block">
                                    <strong id="card-body">${player.playerPrice.toLocaleString('en-IN')}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
          `;
        }
        else if (player.category == 'Bowler') {
            playerCard.innerHTML = `
            <div class="column card  player-card-size" id="card-design-player" style="margin: 5px 5px;">
                        <header class="card-header is-flex is-justify-content-space-between is-align-items-center"
                            id="card-header">
                            <p id="card-title">
                                <span class="team-name">${player.name}</span>
                            </p>
                        </header>
                        <div>
                            <div class="content is-flex-direction-column">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Status : </strong>
                                    </p>
                                    <p class="block">${player.status}</p>
                                </div>
                                <hr style="margin-top: -20px;">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Category : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.category}</strong>
                                    </p>
                                    <img src="https://cdn-icons-png.flaticon.com/128/1099/1099680.png" id="ball" alt="ball"
                                    style="width: 1em;">
                                </div>
                                <hr style="margin-top: -20px;">

                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-baseline"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Player Team : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.playerTeam}</strong>
                                    </p>

                                </div>
                            </div>
                            <hr style="margin-top: -20px;">

                            <div class="is-flex is-justify-content-flex-start is-align-items-start"
                                style="gap: 10px;margin-bottom: 1em;">
                                <p class="block">
                                    <strong id="card-body" style="color: #0cd5eb !important">Player Price : ₹</strong>
                                </p>
                                <p class="block">
                                    <strong id="card-body">${player.playerPrice.toLocaleString('en-IN')}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
          `;     
        }
        else if (player.category == 'Wicket Keeper') {
            playerCard.innerHTML = `
            <div class="column card  player-card-size" id="card-design-player" style="margin: 5px 5px;">
                        <header class="card-header is-flex is-justify-content-space-between is-align-items-center"
                            id="card-header">
                            <p id="card-title">
                                <span class="team-name">${player.name}</span>
                            </p>
                        </header>
                        <div>
                            <div class="content is-flex-direction-column">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Status : </strong>
                                    </p>
                                    <p class="block">${player.status}</p>
                                </div>
                                <hr style="margin-top: -20px;">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Category : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.category}</strong>
                                    </p>
                                    <img src="assets/wicketkeeper.png" alt="wicketkeeper" style="width: 1.5rem;">
                                </div>
                                <hr style="margin-top: -20px;">

                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-baseline"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Player Team : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.playerTeam}</strong>
                                    </p>

                                </div>
                            </div>
                            <hr style="margin-top: -20px;">

                            <div class="is-flex is-justify-content-flex-start is-align-items-start"
                                style="gap: 10px;margin-bottom: 1em;">
                                <p class="block">
                                    <strong id="card-body" style="color: #0cd5eb !important">Player Price : ₹</strong>
                                </p>
                                <p class="block">
                                    <strong id="card-body">${player.playerPrice.toLocaleString('en-IN')}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
          `;     
        }
        else{
            playerCard.innerHTML = `
            <div class="column card  player-card-size" id="card-design-player" style="margin: 5px 5px;">
                        <header class="card-header is-flex is-justify-content-space-between is-align-items-center"
                            id="card-header">
                            <p id="card-title">
                                <span class="team-name">${player.name}</span>
                            </p>
                        </header>
                        <div>
                            <div class="content is-flex-direction-column">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Status : </strong>
                                    </p>
                                    <p class="block">${player.status}</p>
                                </div>
                                <hr style="margin-top: -20px;">
                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-flex-start"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Category : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.category}</strong>
                                    </p>
                                    <img src="https://cdn-icons-png.flaticon.com/128/1099/1099680.png" id="ball" alt="ball"
                                    style="width: 0.9em;">
                            <svg id="bat" viewBox="0 0 460.84737 460.84737" xmlns="http://www.w3.org/2000/svg"
                                    style="width: 1.5em;margin-left: -5px">
                                    <path
                                        d="m460.847656 31.75-25.070312 25.078125-31.761719-31.757813 25.082031-25.070312zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m378.945312 50.140625 25.070313-25.070313 31.761719 31.757813-25.070313 25.070313zm0 0"
                                        fill="#7f4545" />
                                    <path
                                        d="m353.878906 75.210938 25.066406-25.070313 31.761719 31.757813-25.070312 25.070312zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m328.808594 100.28125 25.066406-25.070312 31.761719 31.757812-25.070313 25.070312zm0 0"
                                        fill="#7f4545" />
                                    <path
                                        d="m360.566406 132.039062-25.078125 25.070313-31.75-31.75 25.070313-25.078125zm0 0"
                                        fill="#a85d5d" />
                                    <path
                                        d="m352.425781 190.320312-260.136719 260.140626c-13.847656 13.847656-36.296874 13.847656-50.140624 0l-31.761719-31.761719c-13.847657-13.84375-13.847657-36.296875 0-50.140625l260.140625-260.136719 25.070312 25.066406-.21875.222657-76.050781 107.808593 107.808594-76.050781.21875-.21875zm0 0"
                                        fill="#ffd2a6" />
                                    <path
                                        d="m327.355469 165.25-.21875.21875-107.808594 76.050781 76.050781-107.808593.21875-.222657zm0 0"
                                        fill="#7f4545" />
                                </svg>
                                </div>
                                <hr style="margin-top: -20px;">

                                <div class="bought-players is-flex is-justify-content-flex-start is-align-items-baseline"
                                    style="gap: 10px;margin-bottom: 1em;">
                                    <p class="block">
                                        <strong id="card-body" style="color: #0cd5eb !important">Player Team : </strong>
                                    </p>
                                    <p class="block">
                                        <strong id="card-body">${player.playerTeam}</strong>
                                    </p>

                                </div>
                            </div>
                            <hr style="margin-top: -20px;">

                            <div class="is-flex is-justify-content-flex-start is-align-items-start"
                                style="gap: 10px;margin-bottom: 1em;">
                                <p class="block">
                                    <strong id="card-body" style="color: #0cd5eb !important">Player Price : ₹</strong>
                                </p>
                                <p class="block">
                                    <strong id="card-body">${player.playerPrice.toLocaleString('en-IN')}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
          `;     
        }
          playerDeckElement.appendChild(playerCard);
      });
  }


  function parsePrice(price) {
      const parsedPrice = parseInt(price);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
  }
   
  // main.js
const socket = io();

// Fetch team data from data.json
fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    const teamData = data;
    renderTeam(teamData); // Replace 'renderTeam' with your rendering function
    console.log("Socket is connected for team data!");

    socket.on('team-update', updatedData => {
      console.log("Received team update from server!", updatedData);
      renderTeam(updatedData); // Replace 'renderTeam' with your rendering function
    });
  })
  .catch(error => {
    console.error('Error fetching team data:', error);
  });

// Fetch player data from playerData.json
fetch('/playerData.json')
  .then(response => response.json())
  .then(data => {
    const playerData = data;
    renderPlayerDeck(playerData); // Replace 'renderPlayerDeck' with your rendering function
    console.log("Socket is connected for player data!");

    socket.on('player-update', updatedPlayerData => {
      console.log("Received player update from server!", updatedPlayerData);
      renderPlayerDeck(updatedPlayerData); // Replace 'renderPlayerDeck' with your rendering function
    });
  })
  .catch(error => {
    console.error('Error fetching player data:', error);
  });


  // Add event listener for player search
  const playerSearchInput = document.getElementById('playerSearch');
  playerSearchInput.addEventListener('input', () => {
      const searchTerm = playerSearchInput.value.trim().toLowerCase();
      const filteredPlayers = playerData.filter(player => player.name.toLowerCase().includes(searchTerm));
      renderPlayerDeck(filteredPlayers);
  });
});

//topPicks
let divTopPicks = document.querySelector("#topPicks");
let TopPicksURL = "http://localhost:9008/api/shows/topFirst";

function showTopPicksCard() {
  fetch(TopPicksURL)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing content
      divTopPicks.innerHTML = "";

      data.forEach((show) => {
        // Create and append each card to the divTopPicks
        let card = createCard(show);
        divTopPicks.innerHTML += card;
      });
    });
}

function createCard(show) {
  let card = `
    <div class="card m-2 bg-body-secondary" style="width: 18rem;">
      <img src="${show.image}" class="card-img-top p-3" alt="${show.showName}">
      <div class="card-body">
        <h5 class="card-title">${show.showName}</h5>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem alias esse blanditiis omnis odio! Natus nostrum magnam explicabo omnis.</p>
      </div>
      <ul class="list-group list-group-flush p-3">
        <li class="list-group-item">Show date: ${show.date}</li>
        <li class="list-group-item">Price $: ${show.price}</li>
        <li class="list-group-item">Show type: ${show.showtype}</li>
      </ul>
    </div>
    `;
  return card;
}

showTopPicksCard();

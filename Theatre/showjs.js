///////// fetch by name e/o price

document.addEventListener("DOMContentLoaded", function () {
  let btnSearchByName = document.querySelector("#searchButton");
  let searchInput = document.querySelector("#search");
  let minPriceInput = document.querySelector("#minPrice");
  let maxPriceInput = document.querySelector("#maxPrice");
  let foundedShow = document.querySelector("#foundedShow");

  let baseURL = "http://localhost:9008/api/shows";

  function displayShowsFounded() {
    let inputNameValue = searchInput.value;
    let minPriceValue = minPriceInput.value;
    let maxPriceValue = maxPriceInput.value;

    let url = baseURL;

    if (inputNameValue) {
      if (minPriceValue && maxPriceValue) {
        // Search by name and price range
        url = `${baseURL}/search?name=${inputNameValue}&minPrice=${minPriceValue}&maxPrice=${maxPriceValue}`;
      } else {
        // Search by name only
        url = `${baseURL}/name/${inputNameValue}`;
      }
    } else if (minPriceValue && maxPriceValue) {
      // Search by price range only
      url = `${baseURL}/priceRange/${minPriceValue}/${maxPriceValue}`;
    } else {
      foundedShow.innerHTML =
        "<p>Please enter a name or price range to search.</p>";
      return;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        foundedShow.innerHTML = "";

        if (data.length === 0) {
          foundedShow.innerHTML = "<p>No shows found.</p>";
          return;
        }

        data.forEach((show) => {
          let card = createCard(show);
          foundedShow.innerHTML += card;
        });
      });

    searchInput.value = "";
    minPriceInput.value = "";
    maxPriceInput.value = "";
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

  btnSearchByName.addEventListener("click", displayShowsFounded);
});

////////////////////////////////   fetch to get all shows

document.addEventListener("DOMContentLoaded", () => {
  const showsList = document.querySelector("#showsList");

  fetch("http://localhost:9008/api/shows")
    .then((response) => response.json())

    .then((shows) => {
      shows.forEach((show) => {
        // Create a card for each show
        const showCard = document.createElement("div");
        showCard.className = "card col-md-4 mb-4";

        showCard.innerHTML = `
          <img src="${show.image}" class="card-img-top" alt="${show.showName}">
          <div class="card-body">
            <h5 class="card-title">${show.showName}</h5>
            <p class="card-text">Type: ${show.showType}</p>
            <p class="card-text">Date: ${show.date}</p>
            <p class="card-text">Price: $${show.price}</p>
            <p class="card-text">Available Spots: ${show.availableSpots}</p>
            <button class="btn btn-primary add-to-cart" data-show='${JSON.stringify(
              show
            )}'>Add to Cart</button>
          </div>
        `;

        showsList.appendChild(showCard);
      });

      // Add event listeners for "Add to Cart" buttons
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
          const show = JSON.parse(event.target.getAttribute("data-show"));
          addToCart(show);
        });
      });
    });

  function addToCart(show) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(show);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Show added to cart!");
  }
});

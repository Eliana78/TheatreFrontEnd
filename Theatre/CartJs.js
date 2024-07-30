document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.querySelector("#cartList");

  // Retrieve cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((show) => {
    // Create a card for each show in the cart
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
        </div>
      `;
    cartList.appendChild(showCard);
  });
});

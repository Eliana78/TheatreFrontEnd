let divAllBookings = document.querySelector("#divAllBookings");
let allbookingsURL = "http://localhost:9008/api/bookings";

//// fetch all bookings

function getAllBookings() {
  fetch(allbookingsURL)
    .then((response) => response.json())
    .then((data) => {
      divAllBookings.innerHTML = "";

      data.forEach((booking) => {
        let card = cardBookings(booking);
        divAllBookings.innerHTML += card;
      });
    });
}

function cardBookings(booking) {
  let card = `
            <tr">
              <th scope="row">${booking.bookingDate}</th>
              <td>${booking.totPeople}</td>
              <td>${booking.user.id}</td>
              <td>${booking.show.id}</td>
              <td>${booking.show.showName}</td>
              <td>${booking.show.availableSpots}</td>
            </tr>
       
    `;

  return card;
}

getAllBookings();

//delete booking by id

let deleteButton = document.querySelector("#DeleteButton");
let searchIdInput = document.querySelector("#searchId");
let divDeleteBooking = document.querySelector("#divDeleteBooking");
let deleteURL = "http://localhost:9008/api/bookings/delete/";

document.addEventListener("DOMContentLoaded", () => {
  function deleteBooking() {
    let searchId = searchIdInput.value;

    fetch(deleteURL + searchId, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        alert("Booking deleted successfully.");

        searchIdInput.value = "";
      } else {
        alert("Failed to delete booking. Status: " + response.status);
      }
    });
  }

  deleteButton.addEventListener("click", deleteBooking);
});

///// delete a show

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtonShow = document.querySelector("#DeleteButtonShow");
  const deleteIdInput = document.querySelector("#deleteId");
  const deleteShowURL = "http://localhost:9008/api/shows/delete/";

  function deleteShow() {
    // Fetch the latest value from the input field
    const deleteId = deleteIdInput.value;

    if (!deleteId) {
      alert("Please enter a Show ID.");
      return;
    }

    fetch(deleteShowURL + deleteId, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Show deleted successfully.");
          // Clear the input field
          deleteIdInput.value = "";
        } else {
          alert("Failed to delete show. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting show:", error);
        alert("An error occurred while deleting the show.");
      });
  }

  deleteButtonShow.addEventListener("click", deleteShow);
});

////////////////////////////add show

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#addShowForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Retrieve values from the form fields
    const showName = document.querySelector("#showName").value;
    const showType = document.querySelector("#showType").value;
    const showDate = document.querySelector("#showDate").value;
    const availableSpots = document.querySelector("#availableSpots").value;
    const price = document.querySelector("#price").value;
    const image = document.querySelector("#image").value;

    // Construct the show data object
    const showData = {
      showName,
      showType,
      date: showDate,
      availableSpots: parseInt(availableSpots, 10),
      price: parseFloat(price),
      image,
    };

    // Send the POST request to the backend API
    fetch("http://localhost:9008/api/shows/add", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(showData),
    }).then((response) => {
      if (response.ok) {
        alert("Show added successfully.");

        form.reset(); // Reset the form fields
      } else {
        return response.text().then((text) => {
          alert(
            "Failed to add show. Status: " + response.status + " - " + text
          );
        });
      }
    });
  });
});

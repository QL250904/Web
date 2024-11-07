document.getElementById("btn_search").addEventListener("click", () => {
    const checkin = new Date(document.getElementById("checkin").value).getTime() / 1000;
    const checkout = new Date(document.getElementById("checkout").value).getTime() / 1000;
    const adults = parseInt(document.getElementById("adults").value) || 0;
    const kids = parseInt(document.getElementById("kids").value) || 0;
    const rooms = parseInt(document.getElementById("rooms").value) || 0; 

    fetch('Bo API vao day')
        .then(response => response.json())
        .then(bookings => {
            const filteredBookings = bookings.filter(booking => {
                const departDay = new Date(booking.departday).getTime() / 1000;
                const arriveDay = new Date(booking.arriveday).getTime() / 1000;
                const roomId = booking.id;
                return (    
                    (!checkin || arriveDay <= checkin) &&
                    (!checkout || departDay >= checkout) &&
                    (!adults || booking.adult >= adults) &&
                    (!kids || booking.kids >= kids) &&
                    (!rooms || roomId == rooms)
                );
            });
            displayResults(filteredBookings);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

function displayResults(bookings) {
    const divResult = document.getElementById("div_result");
    divResult.innerHTML = '';

    if (bookings.length === 0) {
        divResult.innerHTML = "<p style = 'color: white'>No results found.</p>";
        return;
    }

    bookings.forEach(booking => {
        const bookingElement = document.createElement("div");
        bookingElement.classList.add("booking-card");
        bookingElement.innerHTML = `
            <h3>Booking ID: ${booking.id}</h3>
            <img src="${booking.image}" id = "search_img" />
            <h4>${booking.name}</h4>
            <p>Price: ${booking.price}</p>
            <p>Rating: ${booking.rating}</p>
            <p>Description: ${booking.description}</p>
            <p>Adults: ${booking.adult}</p>
            <p>Kids: ${booking.kids}</p>
            <p>Check-in Date: ${booking.arriveday}</p>
            <p>Check-out Date: ${booking.departday}</p>
            <p>Room available: ${booking.room}</p>
        `;
        divResult.appendChild(bookingElement);
    });
}
function clearSearch() {
    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("adults").value = "";
    document.getElementById("kids").value = "";
    document.getElementById("rooms").value = "0";
}
url = 'Bo API vao day'

function getHotel() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error");
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
getHotel()
    .then(data => {
        const hotelCard = document.getElementById('div_card');
        data.forEach(hotel => {
            const card = `
            <div class = "div_card">
                <div>
                    <img src = "${hotel.image}" id = "card_img">
                </div>
                <div>
                    <a href = "detail.html?id=${hotel.id}"><h1>${hotel.name}</h1></a>
                    <p>Price: ${hotel.price}/night</p>
                    <p>Rating: ${hotel.rating}</p>
                    <p>${hotel.description}</p>
                    <a href = "booking.html?roomId=${hotel.id}"><button id = "btn_book">Book Now</button></a>
                </div>
            </div>
            `;
            hotelCard.innerHTML += card;
        });
    })
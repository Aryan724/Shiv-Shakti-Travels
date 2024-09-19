// Initialize the Leaflet map
var map = L.map('map').setView([51.505, -0.09], 13);

// Use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let pickupMarker, dropoffMarker;

// Handle map click events to set pickup and dropoff points
map.on('click', function(e) {
    if (!pickupMarker) {
        pickupMarker = L.marker(e.latlng).addTo(map);
        document.getElementById('pickup').value = e.latlng.lat + ', ' + e.latlng.lng;
    } else if (!dropoffMarker) {
        dropoffMarker = L.marker(e.latlng).addTo(map);
        document.getElementById('dropoff').value = e.latlng.lat + ', ' + e.latlng.lng;
    } else {
        alert('Both pickup and dropoff points are already selected!');
    }
});

// Prevent page from refreshing on form submission
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();
    saveBooking();
});

function saveBooking() {
    const vehicle = document.getElementById('vehicle').value;
    const date = document.getElementById('date').value;
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;

    if (vehicle && date && pickup && dropoff) {
        const booking = { vehicle, date, pickup, dropoff };
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        displayBookings();
        document.getElementById('message').textContent = 'Booking saved successfully!';
    } else {
        document.getElementById('message').textContent = 'Please fill out all fields.';
    }
}

function displayBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookingList = document.getElementById('bookingList');
    bookingList.innerHTML = '';

    bookings.forEach((booking, index) => {
        const li = document.createElement('li');
        li.textContent = `${booking.vehicle} on ${booking.date}, Pickup: ${booking.pickup}, Dropoff: ${booking.dropoff}`;
        bookingList.appendChild(li);
    });
}

document.getElementById('clearBookings').addEventListener('click', function () {
    localStorage.removeItem('bookings');
    displayBookings();
    document.getElementById('message').textContent = 'Booking history cleared.';
});

// Load bookings on page load
window.onload = function () {
    displayBookings();
};

// Show vehicle details dynamically
function showVehicleDetails() {
    const vehicle = document.getElementById('vehicle').value;
    const vehicleImage = document.getElementById('vehicleImage');
    const priceSection = document.getElementById('priceSection');

    if (vehicle === 'Aura S CNG') {
        vehicleImage.src = 'https://example.com/aura-image.jpg';
        priceSection.style.display = 'block';
    } else if (vehicle === 'Ashok Leyland') {
        vehicleImage.src = 'https://example.com/leyland-image.jpg';
        priceSection.style.display = 'block';
    } else {
        vehicleImage.src = 'about:blank';
        priceSection.style.display = 'none';
    }
}

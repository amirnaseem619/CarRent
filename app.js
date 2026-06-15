// Car data array
const carsData = [
  {
    id: 1,
    name: "Koenigsegg",
    category: "Sport",
    image: "images/Car_one.png",
    gas: "90L",
    transmission: "Manuel",
    capacity: "2 People",
    price: 99.00,
    isFavorite: true,
    isPopular: true
  },
  {
    id: 2,
    name: "Nissan GT - R",
    category: "Sport",
    image: "images/Car_two.png",
    gas: "80L",
    transmission: "Manuel",
    capacity: "2 People",
    price: 80.00,
    isFavorite: false,
    isPopular: true
  },
  {
    id: 3,
    name: "Rolls - Royce",
    category: "Sedan",
    image: "images/Car_three.png",
    gas: "70L",
    transmission: "Manuel",
    capacity: "2 People",
    price: 96.00,
    isFavorite: true,
    isPopular: true
  },
  {
    id: 4,
    name: "Nissan GT - R",
    category: "Sport",
    image: "images/Car_four.png",
    gas: "80L",
    transmission: "Manuel",
    capacity: "2 People",
    price: 80.00,
    isFavorite: false,
    isPopular: true
  },
  {
    id: 5,
    name: "All New Rush",
    category: "SUV",
    image: "images/Car_five.png",
    gas: "70L",
    transmission: "Manuel",
    capacity: "6 People",
    price: 72.00,
    isFavorite: false,
    isPopular: false
  },
  {
    id: 6,
    name: "CR - V",
    category: "SUV",
    image: "images/Car_six.png",
    gas: "80L",
    transmission: "Manuel",
    capacity: "6 People",
    price: 80.00,
    isFavorite: true,
    isPopular: false
  },
  {
    id: 7,
    name: "All New Terios",
    category: "SUV",
    image: "images/Car_seven.png",
    gas: "90L",
    transmission: "Manuel",
    capacity: "6 People",
    price: 74.00,
    isFavorite: false,
    isPopular: false
  },
  {
    id: 8,
    name: "CR - V",
    category: "SUV",
    image: "images/Car_eight.png",
    gas: "80L",
    transmission: "Manuel",
    capacity: "6 People",
    price: 80.00,
    isFavorite: true,
    isPopular: false
  },
  {
    id: 9,
    name: "MG ZX Exclusice",
    category: "Hatchback",
    image: "images/Car_nine.png",
    gas: "70L",
    transmission: "Manuel",
    capacity: "4 People",
    price: 76.00,
    isFavorite: true,
    isPopular: false
  },
  {
    id: 10,
    name: "New MG ZS",
    category: "SUV",
    image: "images/Car_ten.png",
    gas: "80L",
    transmission: "Manuel",
    capacity: "6 People",
    price: 80.00,
    isFavorite: false,
    isPopular: false
  },
  {
    id: 11,
    name: "MG ZX Excite",
    category: "Hatchback",
    image: "images/Car_eleven.png",
    gas: "90L",
    transmission: "Manuel",
    capacity: "4 People",
    price: 74.00,
    isFavorite: true,
    isPopular: false
  },
  {
    id: 12,
    name: "New MG ZS",
    category: "SUV",
    image: "images/Car_twelve.png",
    gas: "80L",
    transmission: "Manuel",
    capacity: "6 People",
    price: 80.00,
    isFavorite: false,
    isPopular: false
  }
];

// Current application state
let showedMore = false;
let searchQuery = "";

// Function to generate HTML card markup for a single car
function createCarCard(car) {
  const heartColor = car.isFavorite ? "red" : "rgb(151, 147, 147)";
  
  return `
    <div class="first-car-box" data-id="${car.id}">
      <!-- name and favorite -->
      <div class="name-favourate">
        <!-- Name -->
        <div class="name">
          <h4>${car.name}</h4>
          <p>${car.category}</p>
        </div>
        <!-- Favorite -->
        <i class="fa-solid fa-heart fav-btn" style="color: ${heartColor}; cursor: pointer; transition: transform 0.2s ease, color 0.2s ease;"></i>
      </div>

      <!-- car image -->
      <div class="car-image">
        <img src="${car.image}" alt="${car.name}" />
      </div>

      <!-- Gas/L, Manuel/auto and users row -->
      <div class="gas-manuel-user">
        <!-- Gas -->
        <div class="gas">
          <i class="fa-solid fa-gas-pump" style="color: rgb(151, 147, 147)"></i>
          <p>${car.gas}</p>
        </div>
        <!-- Manuel/auto -->
        <div class="manuel">
          <i class="fa-solid fa-dharmachakra" style="color: rgb(151, 147, 147)"></i>
          <p>${car.transmission}</p>
        </div>
        <!-- users -->
        <div class="users">
          <i class="fa-solid fa-users" style="color: rgb(151, 147, 147)"></i>
          <p>${car.capacity}</p>
        </div>
      </div>

      <!-- price and rent now button -->
      <div class="price-and-button">
        <!-- price per days -->
        <div class="price">
          <h3>$${car.price.toFixed(2)}/</h3>
          <p>day</p>
        </div>

        <button class="rent-btn">Rent Now</button>
      </div>
    </div>
  `;
}

// Function to render cars in the DOM
function renderCars() {
  const popularGrid = document.getElementById("popular-cars-grid");
  const recommendedGrid = document.getElementById("recommended-cars-grid");
  
  // Filter popular cars by search
  const filteredPopular = carsData.filter(car => 
    car.isPopular && 
    (car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     car.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Filter recommended cars by search
  let filteredRecommended = carsData.filter(car => 
    !car.isPopular && 
    (car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     car.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Apply show-more pagination to recommended cars if no active search
  const totalRecommendedCount = filteredRecommended.length;
  if (!searchQuery && !showedMore) {
    filteredRecommended = filteredRecommended.slice(0, 4);
  }
  
  // Render Popular Cars
  if (filteredPopular.length === 0) {
    popularGrid.innerHTML = `
      <div class="no-cars-message">
        <i class="fa-solid fa-car-on"></i>
        <p>No popular cars match your search.</p>
      </div>`;
  } else {
    popularGrid.innerHTML = filteredPopular.map(createCarCard).join("");
  }
  
  // Render Recommended Cars
  if (filteredRecommended.length === 0) {
    recommendedGrid.innerHTML = `
      <div class="no-cars-message">
        <i class="fa-solid fa-car-on"></i>
        <p>No recommended cars match your search.</p>
      </div>`;
  } else {
    recommendedGrid.innerHTML = filteredRecommended.map(createCarCard).join("");
  }
  
  // Update "Show more car" button visibility and total count
  const showMoreSection = document.querySelector(".show-more-car");
  if (showMoreSection) {
    const showMoreBtn = showMoreSection.querySelector("button");
    const countSpan = showMoreSection.querySelector("span");
    
    // Display total current matching or overall cars
    countSpan.textContent = `${carsData.length} cars`;
    
    if (searchQuery || showedMore || filteredRecommended.length === totalRecommendedCount) {
      showMoreSection.style.opacity = "0";
      showMoreSection.style.pointerEvents = "none";
      setTimeout(() => {
        if (showMoreSection.style.opacity === "0") {
          showMoreSection.style.display = "none";
        }
      }, 300);
    } else {
      showMoreSection.style.display = "flex";
      setTimeout(() => {
        showMoreSection.style.opacity = "1";
        showMoreSection.style.pointerEvents = "all";
      }, 50);
    }
  }
}

// Handle card actions (Favorite and Rent)
function handleCarCardClick(e) {
  const card = e.target.closest(".first-car-box");
  if (!card) return;
  
  const carId = parseInt(card.dataset.id);
  const car = carsData.find(c => c.id === carId);
  if (!car) return;
  
  // Favorite Toggle
  if (e.target.classList.contains("fav-btn")) {
    car.isFavorite = !car.isFavorite;
    
    // Visual micro-animation on click
    e.target.style.transform = "scale(1.3)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 200);
    
    renderCars();
    return;
  }
  
  // Click Rent Now
  if (e.target.classList.contains("rent-btn")) {
    openBookingModal(car);
    return;
  }
}

// Open booking modal with form and confirmation receipt
function openBookingModal(car) {
  // Create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "rental-modal-overlay";
  
  modalOverlay.innerHTML = `
    <div class="rental-modal-card">
      <button class="modal-close-btn" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <h2>Rent ${car.name}</h2>
        <span class="modal-category">${car.category}</span>
      </div>
      <div class="modal-body">
        <div class="modal-car-info">
          <div class="modal-car-image-container">
            <img src="${car.image}" alt="${car.name}" class="modal-car-image" />
          </div>
          <div class="modal-car-specs">
            <div><i class="fa-solid fa-gas-pump"></i> <span>${car.gas}</span></div>
            <div><i class="fa-solid fa-dharmachakra"></i> <span>${car.transmission}</span></div>
            <div><i class="fa-solid fa-users"></i> <span>${car.capacity}</span></div>
          </div>
          <div class="modal-price-tag">
            <h3>$${car.price.toFixed(2)}/<span>day</span></h3>
          </div>
        </div>
        
        <form class="modal-booking-form">
          <div class="form-group">
            <label for="booking-name">Full Name</label>
            <input type="text" id="booking-name" required placeholder="John Doe" />
          </div>
          <div class="form-group">
            <label for="booking-phone">Phone Number</label>
            <input type="tel" id="booking-phone" required placeholder="+1 (555) 000-0000" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="booking-pickup">Pick-Up Date</label>
              <input type="date" id="booking-pickup" required />
            </div>
            <div class="form-group">
              <label for="booking-dropoff">Drop-Off Date</label>
              <input type="date" id="booking-dropoff" required />
            </div>
          </div>
          <button type="submit" class="modal-submit-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalOverlay);
  document.body.style.overflow = "hidden"; // Prevent background scrolling
  
  // Set default min dates to today
  const today = new Date().toISOString().split("T")[0];
  const pickupInput = document.getElementById("booking-pickup");
  const dropoffInput = document.getElementById("booking-dropoff");
  pickupInput.min = today;
  dropoffInput.min = today;
  
  pickupInput.addEventListener("change", () => {
    dropoffInput.min = pickupInput.value;
  });
  
  // Close triggers
  const closeBtn = modalOverlay.querySelector(".modal-close-btn");
  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  function closeModal() {
    modalOverlay.classList.add("modal-closing");
    modalOverlay.addEventListener("animationend", () => {
      modalOverlay.remove();
      document.body.style.overflow = "";
    }, { once: true });
  }
  
  // Form submission
  const form = modalOverlay.querySelector(".modal-booking-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get values
    const name = document.getElementById("booking-name").value;
    const pickup = document.getElementById("booking-pickup").value;
    const dropoff = document.getElementById("booking-dropoff").value;
    
    // Calculate rental days and total cost
    const date1 = new Date(pickup);
    const date2 = new Date(dropoff);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalCost = diffDays * car.price;
    
    // Success Screen with Checkmark micro-animation
    const modalInside = modalOverlay.querySelector(".rental-modal-card");
    modalInside.innerHTML = `
      <div class="booking-success-screen">
        <div class="success-icon">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2>Booking Confirmed!</h2>
        <p>Thank you, <strong>${name}</strong>! Your rental is successfully scheduled.</p>
        <div class="receipt-details">
          <div class="receipt-row"><span>Car Selected:</span> <strong>${car.name}</strong></div>
          <div class="receipt-row"><span>Rental Duration:</span> <strong>${diffDays} day(s)</strong></div>
          <div class="receipt-row"><span>Daily Rate:</span> <strong>$${car.price.toFixed(2)}</strong></div>
          <div class="receipt-row total-row"><span>Total Cost:</span> <strong class="total-price">$${totalCost.toFixed(2)}</strong></div>
        </div>
        <button class="success-close-btn">Done</button>
      </div>
    `;
    
    modalInside.querySelector(".success-close-btn").addEventListener("click", closeModal);
  });
}

// Initialization and event bindings
document.addEventListener("DOMContentLoaded", () => {
  const popularGrid = document.getElementById("popular-cars-grid");
  const recommendedGrid = document.getElementById("recommended-cars-grid");
  
  // Render lists initially
  renderCars();
  
  // Event listeners for grids (event delegation)
  if (popularGrid) {
    popularGrid.addEventListener("click", handleCarCardClick);
  }
  if (recommendedGrid) {
    recommendedGrid.addEventListener("click", handleCarCardClick);
  }
  
  // Search input change handler
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCars();
    });
  }
  
  // Show more cars action
  const showMoreBtn = document.querySelector(".show-more-car button");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      showedMore = true;
      renderCars();
    });
  }
});

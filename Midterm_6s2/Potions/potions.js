let potionsData = []; // Declare potionsData globally

function showPotionsSortedByPriceLowHigh() {
    fetch("./Potions/potions.json") // Fetch potions.json
        .then((response) => response.json())
        .then((myPotions) => loadPotions(myPotions, 1)) // Load and sort potions by price (low to high)
        .catch((error) => console.log("Error :" + error));
}

function showPotionsSortedByPriceHighLow() {
    fetch("./Potions/potions.json") // Fetch potions.json
        .then((response) => response.json())
        .then((myPotions) => loadPotions(myPotions, 2)) // Load and sort potions by price (high to low)
        .catch((error) => console.log("Error :" + error));
}

function showCardsContainingDescription() {
    const descriptionInput = document.getElementById("descriptionInput").value.toLowerCase();

    // Clear the display area before filtering
    const productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear previous results

    // Filter potions based on description and name
    const filteredPotions = potionsData.filter(potion => 
        (potion.description && potion.description.toLowerCase().includes(descriptionInput)) || 
        (potion.name && potion.name.toLowerCase().includes(descriptionInput))
    );

    // Check if there are any filtered potions and generate cards
    if (filteredPotions.length === 0) {
        productDisplay.innerHTML = "<p>No potions found matching that description.</p>";
    } else {
        filteredPotions.forEach(potion => {
            const potionCard = document.createElement("div");
            potionCard.className = "col"; // Add Bootstrap column class for responsive design
            
            potionCard.innerHTML = `
                <div class="card text-center border shadow-0">
                    <div class="bg-image hover-overlay ripple">
                        <img src="${potion.image}" class="img-fluid" />
                        <a href="#!">
                            <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                        </a>
                    </div>
                    <div class="card-header">${potion.name}</div> <!-- Updated to use potion.name -->
                    <div class="card-body">
                        <p class="card-text">${potion.description}</p>
                        <p class="card-text">Price: $${potion.price}</p>
                        <button type="button" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;
            productDisplay.appendChild(potionCard); // Add the potion card to the display area
        });
    }
}

function clearSearch() {
    const descriptionInput = document.getElementById("descriptionInput");
    descriptionInput.value = ""; // Clear the search input

    // Show all potions again
    const productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear previous results

    // Re-display all potions
    potionsData.forEach(potion => {
        const potionCard = document.createElement("div");
        potionCard.className = "col"; // Add Bootstrap column class for responsive design

        potionCard.innerHTML = `
            <div class="card text-center border shadow-0">
                <div class="bg-image hover-overlay ripple">
                    <img src="${potion.image}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                    </a>
                </div>
                <div class="card-header">${potion.name}</div>
                <div class="card-body">
                    <p class="card-text">${potion.description}</p>
                    <p class="card-text">Price: $${potion.price}</p>
                    <button type="button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productDisplay.appendChild(potionCard); // Add the potion card to the display area
    });
}



function loadPotions(potionsData, n) { 
    let arrayPotions = potionsData.potions; // Access potions array from potionsData

    let sortedPotions;

    if (n === 1) { // Sort by price from low to high
        sortedPotions = arrayPotions.sort((p1, p2) => 
            p1.price - p2.price // Simplified sorting
        );
    } else if (n === 2) { // Sort by price from high to low
        sortedPotions = arrayPotions.sort((p1, p2) => 
            p2.price - p1.price // Simplified sorting
        );
    }

    // Clear the display area
    var productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear current potion data

    // Display potions in a card format
    sortedPotions.forEach(potion => {
        const potionCard = document.createElement("div");
        potionCard.className = "col"; // Add Bootstrap column class for responsive design
        
        potionCard.innerHTML = `
            <div class="card text-center border shadow-0">
                <div class="bg-image hover-overlay ripple">
                    <img src="${potion.image}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                    </a>
                </div>
                <div class="card-header">${potion.name}</div>
                <div class="card-body">
                    <p class="card-text">${potion.description}</p>
                    <p class="card-text">Price: $${potion.price}</p>
                    <button type="button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productDisplay.appendChild(potionCard); // Add card to the display area
    });
}

function fetchPotionData() {
    fetch("./Potions/potions.json")
        .then((response) => response.json())
        .then((data) => {
            potionsData = data.potions; // Assuming your JSON structure
            loadPotions(data, 1); // Load all potions on initialization
        })
        .catch((error) => console.log("Error: " + error));
}

// Initialize the app by showing all potions
fetchPotionData();

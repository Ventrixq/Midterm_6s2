let tomesData = []; // Declare tomesData globally

function showTomesSortedByPriceLowHigh() {
    fetch("./Tomes/tomes.json") // Fetch tomes.json
        .then((response) => response.json())
        .then((myTomes) => loadTomes(myTomes, 1)) // Load and sort tomes by price (low to high)
        .catch((error) => console.log("Error: " + error));
}

function showTomesSortedByPriceHighLow() {
    fetch("./Tomes/tomes.json") // Fetch tomes.json
        .then((response) => response.json())
        .then((myTomes) => loadTomes(myTomes, 2)) // Load and sort tomes by price (high to low)
        .catch((error) => console.log("Error: " + error));
}

function showCardsContainingDescription() {
    const descriptionInput = document.getElementById("descriptionInput").value.toLowerCase();

    // Clear the display area before filtering
    const productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear previous results

    // Filter tomes based on description and name
    const filteredTomes = tomesData.filter(tome => 
        (tome.description && tome.description.toLowerCase().includes(descriptionInput)) || 
        (tome.name && tome.name.toLowerCase().includes(descriptionInput))
    );

    // Check if there are any filtered tomes and generate cards
    if (filteredTomes.length === 0) {
        productDisplay.innerHTML = "<p>No tomes found matching that description.</p>";
    } else {
        filteredTomes.forEach(tome => {
            const tomeCard = document.createElement("div");
            tomeCard.className = "col"; // Add Bootstrap column class for responsive design
            
            tomeCard.innerHTML = `
                <div class="card text-center border shadow-0">
                    <div class="bg-image hover-overlay ripple">
                        <img src="${tome.image}" class="img-fluid" />
                        <a href="#!">
                            <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                        </a>
                    </div>
                    <div class="card-header">${tome.name}</div> <!-- Updated to use tome.name -->
                    <div class="card-body">
                        <p class="card-text">${tome.description}</p>
                        <p class="card-text">Price: $${tome.price}</p>
                        <button type="button" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;
            productDisplay.appendChild(tomeCard); // Add the tome card to the display area
        });
    }
}

function clearSearch() {
    const descriptionInput = document.getElementById("descriptionInput");
    descriptionInput.value = ""; // Clear the search input

    // Show all tomes again
    const productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear previous results

    // Re-display all tomes
    tomesData.forEach(tome => {
        const tomeCard = document.createElement("div");
        tomeCard.className = "col"; // Add Bootstrap column class for responsive design

        tomeCard.innerHTML = `
            <div class="card text-center border shadow-0">
                <div class="bg-image hover-overlay ripple">
                    <img src="${tome.image}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                    </a>
                </div>
                <div class="card-header">${tome.name}</div>
                <div class="card-body">
                    <p class="card-text">${tome.description}</p>
                    <p class="card-text">Price: $${tome.price}</p>
                    <button type="button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productDisplay.appendChild(tomeCard); // Add the tome card to the display area
    });
}

function loadTomes(tomesData, n) { 
    let arrayTomes = tomesData.tomes; // Access tomes array from tomesData

    let sortedTomes;

    if (n === 1) { // Sort by price from low to high
        sortedTomes = arrayTomes.sort((t1, t2) => 
            t1.price - t2.price // Simplified sorting
        );
    } else if (n === 2) { // Sort by price from high to low
        sortedTomes = arrayTomes.sort((t1, t2) => 
            t2.price - t1.price // Simplified sorting
        );
    }

    // Clear the display area
    var productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear current tome data

    // Display tomes in a card format
    sortedTomes.forEach(tome => {
        const tomeCard = document.createElement("div");
        tomeCard.className = "col"; // Add Bootstrap column class for responsive design
        
        tomeCard.innerHTML = `
            <div class="card text-center border shadow-0">
                <div class="bg-image hover-overlay ripple">
                    <img src="${tome.image}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                    </a>
                </div>
                <div class="card-header">${tome.name}</div>
                <div class="card-body">
                    <p class="card-text">${tome.description}</p>
                    <p class="card-text">Price: $${tome.price}</p>
                    <button type="button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productDisplay.appendChild(tomeCard); // Add card to the display area
    });
}

function fetchTomeData() {
    fetch("./Tomes/tomes.json")
        .then((response) => response.json())
        .then((data) => {
            tomesData = data.tomes; // Assuming your JSON structure
            loadTomes(data, 1); // Load all tomes on initialization
        })
        .catch((error) => console.log("Error: " + error));
}

// Initialize the app by showing all tomes
fetchTomeData();

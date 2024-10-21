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

function showPotionsContainingDescriptionA() {
    const inputField = document.getElementById("inputField");
    inputField.style.display = "block"; // Show the input field
    showPotionsContainingDescriptionB();
}

function showPotionsContainingDescriptionB() {
    fetch("./Potions/potions.json") // Fetch potions.json
        .then((response) => response.json())
        .then((myPotions) => loadPotions(myPotions, 3)) // Load potions containing specific description
        .catch((err) => console.log("Error :" + err));
}

function loadPotions(potionsData, n) {
    let arrayPotions = potionsData.potions; // Access potions array from potionsData

    let sortedPotions;

    if (n == 1) { // Sort by price from low to high
        sortedPotions = arrayPotions.sort((p1, p2) => 
            p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
        );
    } else if (n === 2) { // Sort by price from high to low
        sortedPotions = arrayPotions.sort((p1, p2) => 
            p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
        );
    } else if (n === 3) {
        // Filter potions by description input
        sortedPotions = [];
        const inputDescription = document.getElementById("descriptionInput").value; // Get input description
        document.getElementById("inputField").style.display = "none"; // Hide input field

        // Select potions only containing input description
        for (let potion of arrayPotions) {
            if (potion.description.includes(inputDescription)) {
                sortedPotions.push(potion);
            }
        }
    }

    var CardPotions = document.getElementById("productdisplay"); // Find Bootstrap ID card
    CardPotions.innerHTML = ""; // Clear current potion data

    // Display potions in a card format
    for (let i = 0; i < sortedPotions.length; i++) {
        let title = sortedPotions[i].title;
        let description = sortedPotions[i].description;
        let image = sortedPotions[i].image; // Use image path directly
        let price = sortedPotions[i].price; // Potion price

        // Construct the HTML element
        let AddCardPotions = document.createElement("div");
        AddCardPotions.classList.add("productdisplay"); // Add Bootstrap class to the column
        
        AddCardPotions.innerHTML = `
            <div class="card text-center border shadow-0 ">
                <div class="bg-image hover-overlay ripple">
                    <img src="${image}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 255)"></div>
                    </a>
                </div>
                <div class="card-header">${title}</div>
                <div class="card-body">
                    <p class="card-text">
                        ${description}
                    </p>
                    <p class="card-text">
                        Price: $${price}
                    </p>
                    <button type="button" class="btn btn-primary">Buy</button>
                </div>
            </div>
        `;

        CardPotions.appendChild(AddCardPotions); // Add card to the display area
    }
}

function fetchPotionData() {
    const form = document.getElementById("my_form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting traditionally
        // Fetch JSON
        fetch("./Potions/potions.json") // Fetch potions.json
            .then((response) => response.json())
            .then((data) => appendData(data)) // Assuming appendData is defined elsewhere
            .catch((error) => console.log("Error: " + error));
    });
}

// Initialize the app by showing all potions (or any specific function call)
showPotionsContainingDescriptionB();

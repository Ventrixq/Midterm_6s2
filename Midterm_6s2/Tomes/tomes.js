function showCardsSortedByPriceLowHigh() { 
    fetch("./Tomes/tomes.json") // Fetch tomes.json
      .then((response) => response.json())
      .then((myTomes) => loadTomes(myTomes, 1)) // Load and sort tomes by price (low to high)
      .catch((error) => console.log("Error :" + error));
}
  
function showCardsSortedByPriceHighLow() {
    fetch("./Tomes/tomes.json") // Fetch tomes.json
      .then((response) => response.json())
      .then((myTomes) => loadTomes(myTomes, 2)) // Load and sort tomes by price (high to low)
      .catch((error) => console.log("Error :" + error));
}
  
function showCardsContainingDescriptionA() {
    const inputField = document.getElementById("inputField");
    inputField.style.display = "block"; // Show the input field
    showCardsContainingDescriptionB()
}
  
function showCardsContainingDescriptionB() {
    fetch("./Tomes/tomes.json") // Fetch tomes.json
      .then((response) => response.json())
      .then((myTomes) => loadTomes(myTomes, 3)) // Load tomes containing specific description
      .catch((err) => console.log("Error :" + err));
}
  
function loadTomes(tomesData, n) {
    let arrayTomes = tomesData.spells; // Access spells array from tomesData

    let sortedTomes;
    
    if (n == 1) { // Sort by price from low to high
        sortedTomes = arrayTomes.sort((t1, t2) => 
            t1.price > t2.price ? 1 : t1.price < t2.price ? -1 : 0
        );
    } else if (n === 2) { // Sort by price from high to low
        sortedTomes = arrayTomes.sort((t1, t2) => 
            t1.price < t2.price ? 1 : t1.price > t2.price ? -1 : 0
        );
    } else if (n === 3) {
        // Filter tomes by description input
        sortedTomes = [];
        const inputDescription = document.getElementById("descriptionInput").value; // Get input description
        document.getElementById("inputField").style.display = "none"; // Hide input field

        // Select tomes only containing input description
        for (let tome of arrayTomes) {
            if (tome.description.includes(inputDescription)) {
                sortedTomes.push(tome);
            }
        }
    }

    var CardTomes = document.getElementById("productdisplay"); // Find Bootstrap ID card
    CardTomes.innerHTML = ""; // Clear current tome data

    // Display tomes in a card format
    for (let i = 0; i < sortedTomes.length; i++) {
        let title = sortedTomes[i].title;
        let description = sortedTomes[i].description;
        let image = sortedTomes[i].image; // Use image path directly
        let price = sortedTomes[i].price; // Tome price

        // Construct the HTML element
        let AddCardTomes = document.createElement("div");
        AddCardTomes.classList.add("productdisplay"); // Add Bootstrap class to the column
        
        AddCardTomes.innerHTML = `
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

        CardTomes.appendChild(AddCardTomes); // Add card to the display area
    } 
}

function fetchData() {
    // Read form submission
    const b = document.getElementById("my_form");
    
    b.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally
        // Fetch JSON
        fetch("./Tomes/tomes.json") // Fetch tomes.json
            .then((response) => response.json())
            .then((data) => appendData(data)) // Assuming appendData is defined elsewhere
            .catch((error) => console.log("Error: " + error));
    });
}

// Initialize the app by showing all tomes (or any specific function call)
showCardsContainingDescriptionB();

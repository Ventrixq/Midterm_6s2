let wardrobeData = []; // Declare wardrobeData globally

function showWardrobeSortedByPriceLowHigh() {
    fetch("./wardrobedata.json") // Fetch wardrobedata.json
        .then((response) => response.json())
        .then((data) => loadWardrobe(data.products, 1)) // Load and sort wardrobe by price (low to high)
        .catch((error) => console.log("Error: " + error));
}

function showWardrobeSortedByPriceHighLow() {
    fetch("./wardrobedata.json") // Fetch wardrobedata.json
        .then((response) => response.json())
        .then((data) => loadWardrobe(data.products, 2)) // Load and sort wardrobe by price (high to low)
        .catch((error) => console.log("Error: " + error));
}

function showCardsContainingDescription() {
  const descriptionInput = document.getElementById("descriptionInput").value.toLowerCase();

  // Clear the display area before filtering
  const productDisplay = document.getElementById("productdisplay");
  productDisplay.innerHTML = ""; // Clear previous results

  // Filter wardrobe products based on name, category, or color
  const filteredProducts = wardrobeData.filter(product => 
      (product.name && product.name.toLowerCase().includes(descriptionInput)) ||
      (product.category && product.category.toLowerCase().includes(descriptionInput)) ||
      (product.color && product.color.toLowerCase().includes(descriptionInput))
  );

  // Check if there are any filtered products and generate cards
  if (filteredProducts.length === 0) {
      productDisplay.innerHTML = "<p>No wardrobe items found matching that search.</p>";
  } else {
      filteredProducts.forEach(product => {
          const productCard = document.createElement("div");
          productCard.className = "col"; // Add Bootstrap column class for responsive design
          
          productCard.innerHTML = `
              <div class="card text-center border shadow-0">
                  <div class="bg-image hover-overlay ripple">
                      <img src="${product.imageUrl}" class="img-fluid" />
                      <a href="#!">
                          <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                      </a>
                  </div>
                  <div class="card-header">${product.name}</div>
                  <div class="card-body">
                      <p class="card-text">Category: ${product.category}</p>
                      <p class="card-text">Color: ${product.color}</p>
                      <p class="card-text">Price: $${product.price}</p>
                      <button type="button" class="btn btn-primary">Add to Cart</button>
                  </div>
              </div>
          `;
          productDisplay.appendChild(productCard); // Add the product card to the display area
      });
  }
}


function clearSearch() {
    const descriptionInput = document.getElementById("descriptionInput");
    descriptionInput.value = ""; // Clear the search input

    // Show all products again
    const productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear previous results

    // Re-display all products
    wardrobeData.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "col"; // Add Bootstrap column class for responsive design

        productCard.innerHTML = `
            <div class="card text-center border shadow-0">
                <div class="bg-image hover-overlay ripple">
                    <img src="${product.imageUrl}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                    </a>
                </div>
                <div class="card-header">${product.name}</div>
                <div class="card-body">
                    <p class="card-text">Category: ${product.category}</p>
                    <p class="card-text">Color: ${product.color}</p>
                    <p class="card-text">Price: $${product.price.toFixed(2)}</p>

                    <button type="button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productDisplay.appendChild(productCard); // Add card to the display area
    });
}

function loadWardrobe(products, n) { 
    let sortedProducts;

    if (n === 1) { // Sort by price from low to high
        sortedProducts = products.sort((p1, p2) => 
            p1.price - p2.price // Simplified sorting
        );
    } else if (n === 2) { // Sort by price from high to low
        sortedProducts = products.sort((p1, p2) => 
            p2.price - p1.price // Simplified sorting
        );
    }

    // Clear the display area
    var productDisplay = document.getElementById("productdisplay");
    productDisplay.innerHTML = ""; // Clear current product data

    // Display products in a card format
    sortedProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "col"; // Add Bootstrap column class for responsive design
        
        productCard.innerHTML = `
            <div class="card text-center border shadow-0">
                <div class="bg-image hover-overlay ripple">
                    <img src="${product.imageUrl}" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(255, 255, 255, 0.5)"></div>
                    </a>
                </div>
                <div class="card-header">${product.name}</div>
                <div class="card-body">
                    <p class="card-text">Category: ${product.category}</p>
                    <p class="card-text">Color: ${product.color}</p>
                    <p class="card-text">Price: $${product.price.toFixed(2)}</p>

                    <button type="button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productDisplay.appendChild(productCard); // Add card to the display area
    });
}

function fetchWardrobeData() {
    fetch("./wardrobedata.json")
        .then((response) => response.json())
        .then((data) => {
            wardrobeData = data.products; // Access products array from wardrobeData
            loadWardrobe(wardrobeData, 1); // Load all products on initialization
        })
        .catch((error) => console.log("Error: " + error));
}

// Initialize the app by showing all products
fetchWardrobeData();

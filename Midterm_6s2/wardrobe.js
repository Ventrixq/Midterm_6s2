function showCardsSortedByPriceLowHigh() {
    fetch("./wardrobedata.json")
      .then((response) => response.json())
      .then((myClothing) => loadClothing(myClothing, 1))
      .catch((error) => console.log("Error :" + error));
  }
  
  function showCardsSortedByPriceHighLow() {
    fetch("./wardrobedata.json")
      .then((response) => response.json())
      .then((myClothing) => loadClothing(myClothing, 2))
      .catch((error) => console.log("Error :" + error));
  }
  
  function showCardsContainingDescriptionA() {
    const inputField = document.getElementById("inputField");
    inputField.style.display = "block"; // Show the input field
    showCardsContainingDescriptionB()
  }
  
  function showCardsContainingDescriptionB() {
    fetch("./wardrobedata.json")
      .then((response) => response.json())
      .then((myClothing) => loadClothing(myClothing, 3))
      .catch((err) => console.log("Error :" + err));
  }
  
  function loadClothing(clothing, n) {
    let arrayClothing = [];
    for (let i = 0; i < clothing.products.length; i++) { //Convert myMovies to Array
      arrayClothing.push(clothing.products[i]);
    }
  
    if (n == 1) { //Sort array from low to high
      sortedClothing = arrayClothing.sort((p1, p2) =>
        p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
      );
    } 

    else if (n === 2) { //Sort array from high to low
      sortedClothing = arrayClothing.sort((p1, p2) =>
        p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
      );
    } 
    else if (n === 3) {

      // Description Input
      sortedClothing = [];     // Clear Movies
      const inputDescription = document.getElementById("descriptionInput").value; // Description
      document.getElementById("inputField").style.display = "none"; // Input field Mask
  
      // Select movies only containing input description
      for (let clothing of arrayClothing) {
        if (clothing.name.includes(inputDescription)) {
          sortedClothing.push(clothing);
        }
      }
    } 
  
    var CardClothing = document.getElementById("productdisplay"); // Find bootstap ID Card
  
    CardClothing.innerHTML = ""; // Clear Movie Data
      /*
  {
            "name": "Drilocarius V2's",
            "imageUrl": "./OutfitImages/DrilocariusV2.webp",
            "price": 90.99,
            "category": "Robes", 
            "color": "Red"
        },
  */

    for (let i = 0; i < sortedClothing.length; i++) {
      let name = sortedClothing[i].name;
      let url = sortedClothing[i].imageUrl;
      let price = sortedClothing[i].price;
      let category = sortedClothing[i].category;
      let color = sortedClothing[i].color;
      // construct the HTML element
      let AddCardClothing = document.createElement("div");
      AddCardClothing.classList.add("productdisplay"); // Add Bootstrap class to the column
      /*
      AddCardClothing.innerHTML = `
           <div class="card shadow-sm">
             <img src=${url} class="card-img-top" alt="..."></img>
             <div class="card-body">
               <p class="card-text"> <strong>${name}</strong>, ${category}, $${price}, ${color}</p>
             </div>
           </div>
         `;
    */
    
      AddCardClothing.innerHTML = `
        <div class="swiper-slide">
            <div class="product-item image-zoom-effect link-effect">
         <div class="image-holder position-relative">
        <a href="wardrobe.html">
            <img src="${url}" alt="${category}" class="product-image img-fluid">
        </a>
        <a href="wardrobe.html" class="btn-icon btn-wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#heart"></use>
            </svg>
        </a>
        </div>
        <div class="product-content">
        <h5 class="element-title text-uppercase fs-5 mt-3">
            <a href="wardrobe.html">${name}</a>
        </h5>
        <p>${name}</p>
        <a href="#" class="text-decoration-none" data-after="Add to cart">
            <span>$${price}</span>
        </a>
        </div>
        </div>
        </div>`;
    
      CardClothing.appendChild(AddCardClothing);
    } // end of for
  }
  
  function fetchData() {
    //Read form
    const b = document.getElementById("my_form");
    
    b.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
      //fetch JSON
      fetch("./wardrobedata.json")
        .then((response) => response.json())
        .then((data) => appendData(data))
        .catch((error) => console.log("Error: " + error));
    });
  }
  
  showCardsContainingDescriptionB()
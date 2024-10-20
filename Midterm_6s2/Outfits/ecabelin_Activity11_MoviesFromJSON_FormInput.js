function showCardsSortedByPriceLowHigh() {
    fetch("./MoviesFromJSON.json")
      .then((response) => response.json())
      .then((myMovies) => loadMovies(myMovies, 1))
      .catch((error) => console.log("Error :" + error));
  }
  
  function showCardsSortedByPriceHighLow() {
    fetch("./MoviesFromJSON.json")
      .then((response) => response.json())
      .then((myMovies) => loadMovies(myMovies, 2))
      .catch((error) => console.log("Error :" + error));
  }
  
  function showCardsContainingDescriptionA() {
    const inputField = document.getElementById("inputField");
    inputField.style.display = "block"; // Show the input field
    showCardsContainingDescriptionB()
  }
  
  function showCardsContainingDescriptionB() {
    fetch("./MoviesFromJSON.json")
      .then((response) => response.json())
      .then((myMovies) => loadMovies(myMovies, 3))
      .catch((err) => console.log("Error :" + err));
  }
  
  function loadMovies(movies, n) {
  
    let arrayMovies = [];
    for (let i = 0; i < movies.movies.length; i++) { //Convert myMovies to Array
      arrayMovies.push(movies.movies[i]);
    }
  
    if (n == 1) { //Sort array from low to high
      sortedMovies = arrayMovies.sort((p1, p2) =>
        p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
      );
    } 

    else if (n === 2) { //Sort array from high to low
      sortedMovies = arrayMovies.sort((p1, p2) =>
        p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
      );
    } 
    else if (n === 3) {

      // Description Input
      sortedMovies = [];     // Clear Movies
      const inputDescription = document.getElementById("descriptionInput").value; // Description
      document.getElementById("inputField").style.display = "none"; // Input field Mask
  
      // Select movies only containing input description
      for (let movie of arrayMovies) {
        if (movie.description.includes(inputDescription)) {
          sortedMovies.push(movie);
        }
      }
    } 
  
    var CardMovie = document.getElementById("col"); // Find bootstap ID Card
  
    CardMovie.innerHTML = ""; // Clear Movie Data
  
    for (let i = 0; i < sortedMovies.length; i++) {
      let title = sortedMovies[i].title;
      let year = sortedMovies[i].year;
      let url = sortedMovies[i].url;
      let price = sortedMovies[i].price;
      // construct the HTML element
      let AddCardMovie = document.createElement("div");
      AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
      AddCardMovie.innerHTML = `
           <div class="card shadow-sm">
             <img src=${url} class="card-img-top" alt="..."></img>
             <div class="card-body">
               <p class="card-text"> <strong>${title}</strong>, ${year}, $${price}</p>
             </div>
           </div>
         `;
      CardMovie.appendChild(AddCardMovie);
    } // end of for
  }
  
  function fetchData() {
    //Read form
    const b = document.getElementById("my_form");
  
    b.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
      //fetch JSON
      fetch("./MoviesFromJSON.json")
        .then((response) => response.json())
        .then((data) => appendData(data))
        .catch((error) => console.log("Error: " + error));
    });
  }
  
  function showCardsContainingDescriptionB() {
    fetch("./index.json")
      .then((response) => response.json())
      .then((myModels) => loadModels(myModels, 3))
      .catch((err) => console.log("Error :" + err));
  }
  
  function loadModels(Models, n) {
    let sortedModels = [];
    for (let i = 0; i < Models.models.length; i++) { //Convert myMovies to Array
      sortedModels.push(Models.models[i]);
    }
   
    var CardModels = document.getElementById("modeldisplay"); // Find bootstap ID Card
  
    CardModels.innerHTML = "";
    /* Example Json
    {
        "name": "Coltar",
        "imageUrl": "./OutfitImages/DrilocariusV2.webp",
        "description": "Never the Coolest Guy",
        "age": 029
    }
    */
    for (let i = 0; i < sortedModels.length; i++) {
        let name = sortedModels[i].name;
        let url = sortedModels[i].imageUrl;
        let description = sortedModels[i].description;
        let age = sortedModels[i].age;
        // construct the HTML element
        let AddModel = document.createElement("div");
        AddModel.classList.add("modeldisplay"); // Add Bootstrap class to the column

        AddModel.innerHTML = `
                <a href="#" class="card">
        <img src="${url}" alt="" class="card__img">
        <span class="card__footer">
            <span><p class = "h2 fst-italic">${name}</p></span>
            <span><p class = "">${description}</p></span>
        </span>
        <span class="card__action">
        </span>
        </a>
        <hr class="featurette-divider">`
        ;

        CardModels.appendChild(AddModel);
    } // end of for
  }
  
  showCardsContainingDescriptionB()



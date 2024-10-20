// index.js

function loadContent() {
    // Fetch data from data.json
    fetch('../potionAndTomes/tomes.json')
        .then(response => response.json())
        .then(data => {
            const tomeContainer = document.getElementById('tome-container');
            tomeContainer.innerHTML = ''; // Clear existing content

            // Iterate through the data and create HTML elements
            data.tomes.forEach(tome => {
                const tomeDiv = document.createElement('div');
                tomeDiv.classList.add('tome'); // Add a class for styling

                // Add content to the tomeDiv
                tomeDiv.innerHTML = `
                    <h2 class="display-5" style="color: ${tome.color};">${tome.title}</h2>
                    <p class="lead">${tome.description}</p>
                    <div class="bg-body-tertiary shadow-sm mx-auto" style="width: 80%; height: 350px; border-radius: 21px 21px 0 0; background-image: url(${tome.image}); background-size: cover; background-position: center;"></div>
                    <span class="visually-hidden">Image of a ${tome.title}</span>
                `;

                // Append the tomeDiv to the container
                tomeContainer.appendChild(tomeDiv);
            });
        })
        .catch(error => console.error('Error loading data:', error));
}

// Call the function to load content on page load
document.addEventListener('DOMContentLoaded', loadContent);


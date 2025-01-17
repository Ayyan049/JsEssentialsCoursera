// Fetch Recommendations from JSON
async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}

// Search Recommendations
async function searchRecommendations() {
    const searchBar = document.getElementById('search-bar');
    const query = searchBar.value.trim().toLowerCase();
    const recommendations = await fetchRecommendations();

    const resultsContainer = document.getElementById('content');
    resultsContainer.innerHTML = '';

    if (query === '') {
        resultsContainer.innerHTML = '<p>Please enter a keyword to search.</p>';
        return;
    }

    const filteredResults = recommendations.filter((rec) =>
        rec.name.toLowerCase().includes(query) || rec.type.toLowerCase().includes(query)
    );

    if (filteredResults.length > 0) {
        filteredResults.forEach((result) => {
            const recommendationHTML = `
    <div class="recommendation">
        <h2>${result.name}</h2>
        <img src="${result.imageUrl}" alt="${result.name}">
        <p>${result.description}</p>
        <a id="visitb" href="/" style="border-corner: rounded;background-color: yellow;color: black; display: block; text-align: center; text-decoration: none; margin-top: 10px;">Visit</a>
    </div>
`;
            resultsContainer.innerHTML += recommendationHTML;
        });
    } else {
        resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
    }
}

// Clear Results
function clearResults() {
    const searchBar = document.getElementById('search-bar');
    const resultsContainer = document.getElementById('content');
    searchBar.value = '';
    resultsContainer.innerHTML = '';
}

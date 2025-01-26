function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const filteredData = {
            countries: data.countries.filter(item => item.name.toLowerCase().includes(input)),
            temples: data.temples.filter(item => item.name.toLowerCase().includes(input)),
            beaches: data.beaches.filter(item => item.name.toLowerCase().includes(input))
        };

        if (filteredData.countries.length === 0 && filteredData.temples.length === 0 && filteredData.beaches.length === 0) {
            resultDiv.innerHTML = 'No destinations found.';
        } else {
            if (filteredData.countries.length > 0) {
                resultDiv.innerHTML += '<h3>Countries</h3>';
                filteredData.countries.forEach(item => {
                    item.cities.forEach(city => {
                        resultDiv.innerHTML += '<img src="' + city.imageUrl + '" alt="' + city.name + '" width="200" height="200">';
                        resultDiv.innerHTML += `<p>${city.name}</p>`;
                        resultDiv.innerHTML += `<p>${city.description}</p>`;
                    });
                });
            }
            if (filteredData.temples.length > 0) {
                resultDiv.innerHTML += '<h3>Temples</h3>';
                filteredData.temples.forEach(item => {
                    resultDiv.innerHTML += '<img src="' + item.imageUrl + '" alt="' + item.name + '" width="200" height="200">';
                    resultDiv.innerHTML += `<p>${item.name}</p>`;
                    resultDiv.innerHTML += `<p>${item.description}</p>`;
                });
            }
            if (filteredData.beaches.length > 0) {
                resultDiv.innerHTML += '<h3>Beaches</h3>';
                filteredData.beaches.forEach(item => {
                    resultDiv.innerHTML += '<img src="' + item.imageUrl + '" alt="' + item.name + '" width="200" height="200">';
                    resultDiv.innerHTML += `<p>${item.name}</p>`;
                    resultDiv.innerHTML += `<p>${item.description}</p>`;
                });
            }
        }
    })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
    const btnSearch = document.getElementById('btnSearch');
    btnSearch.addEventListener('click', searchDestination);

    function clearSearch() {
        document.getElementById('destinationInput').value = '';
        document.getElementById('result').innerHTML = '';
    }

    const btnClear = document.getElementById('btnClear');
    btnClear.addEventListener('click', clearSearch);
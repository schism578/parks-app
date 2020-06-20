'use strict';

const api_key = 'v1mrZ48jVXxf7BJKILeAgKNQhzIw2aRDiReF5sIi'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    let output = '';
    for (let i = 0; i < responseJson.data.length; i++){
      output +=
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].addresses[0].line1} ${responseJson.data[i].addresses[0].line2}
           ${responseJson.data[i].addresses[0].line3} ${responseJson.data[i].addresses[0].city}
           ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
        <a href='${responseJson.data[i].url}' target="_blank">For More Info</a>
        </li>`;
    };
    $('#results-list').append(output);
    $('#search-results').removeClass('hidden');
  };

function getParkListings(stateCode, limit) {
  const params = {
    api_key,
    stateCode,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function handleParkListings() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    const limit = $('#results').val();
    getParkListings(searchTerm, limit);
  });
}

$(handleParkListings);
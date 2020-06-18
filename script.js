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
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').html(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].addresses[0]}
      <a href='${responseJson.data[i].url}'></a>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParkListings(query, limit=10) {
  const params = {
    api_key: 'v1mrZ48jVXxf7BJKILeAgKNQhzIw2aRDiReF5sIi',
    q: query,
    limit: '10',
    fullName: "",
    description: "",
    addresses: "",
    url: ""
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
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParkListings(searchTerm, limit);
  });
}

$(handleParkListings);
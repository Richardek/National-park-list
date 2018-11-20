const NATIONAL_PARKS_URL = "https://developer.nps.gov/api/v1/parks?";

const API_KEY = `Poa38muv1zhg1WZqGuyZnk8sHUOWNDs6RojdtSZY`;

function getNationalParksList(state, maxResults) { 
  // -setup query
  const params = {
    api_key: API_KEY,
    stateCode: state,
    limit: maxResults,
    
  };

  const queryString = formatQueryParams(params);
  const url = `${NATIONAL_PARKS_URL}${queryString}`;
 
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
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-results-list').empty();

  for (let i in responseJson.data) {

    let elementID = `li${i}`;
    $('.js-results-list').append(
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
      <p>Description: ${responseJson.data[i].description}</p>
      </li>
      `
    );
  }

  $('.js-results').removeClass('hidden');
}


function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const state = $('.js-state').val();
    const maxResults = $('.js-max-results').val() - 1;

    getNationalParksList(state, maxResults);
  });
}

$(watchForm);
const countryInfoContainer = document.querySelector("#country-info-container");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#btn-search");
const suggestionsContainer = document.querySelector("#suggestions-container");
const countries = [];
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    function renderCountry(country) {
      const response = `
    <div class="country-info-flag">
      <img class="flag-img" src=${country.flags.png} alt="" />
      <p class="flag-name">${country.name.common}</p>
    </div>
    <div class="country-info-details">
      <p class="datail" ><strong>Capital: </strong> ${country.capital}</p>
      <p class="datail" >
        <strong>Continent: </strong> ${country.continents}
      </p>
      <p class="datail" >
        <strong>Population: </strong> ${country.population}
      </p>
      <p class="datail" >
        <strong>Currency: </strong> ${
          country.currencies[Object.keys(country.currencies)].name
        }
      </p>
      <p class="datail" >
        <strong>Language: </strong> ${Object.values(country.languages)
          .toString()
          .split(",")
          .join(", ")}
      </p>
    </div>`;
      countryInfoContainer.innerHTML = response;
    }
    countries.push(...data);
    console.log(searchInput.value);
    function findMatch(wordtToFind, countries) {
      if (wordtToFind === "") {
        suggestionsContainer.style.display = "none";
      }
      return countries.filter((country) => {
        let regex = new RegExp(wordtToFind, "gi");
        return country.name.common.match(regex);
      });
    }
    function displayMatches() {
      suggestionsContainer.style.display = "block";
      let searchResponse = findMatch(this.value, countries);
      if (searchResponse.length === 0) {
        suggestionsContainer.style.display = "none";
      }
      let suggestionHtml = searchResponse
        .map((response) => {
          return ` <div class="sugg">              
          <p>${response.name.common}, ${response.capital}</p>
          <p>${response.population}</p>
          </div>`;
        })
        .join("");
      suggestionsContainer.innerHTML = suggestionHtml;
      console.log(typeof this.value);
    }

    searchInput.addEventListener("change", displayMatches);
    searchInput.addEventListener("keyup", displayMatches);
    function render() {
      const searchResponse = findMatch(searchInput.value, countries);
      renderCountry(searchResponse[0]);
      searchInput.value = "";
      suggestionsContainer.style.display = "none";
    }
    searchBtn.addEventListener("click", render);
  })
  .catch((error) => console.log(error));

console.log(countryInfoContainer);

const stateInput = $("#state-input");
const cityInput = $("#city-input");
const countryInput = $("#country-input");
const tableBody = $("#table-body");

const dataFetching = async () => {
  try {
    const response = await fetch("assets/json/affiliated-clubs.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const createStateInput = (data) => {
  const uniqueStates = [...new Set(data.map((element) => element.State))]; // Extract unique states
  uniqueStates.forEach((State, index) => {
    const option = document.createElement("option");
    if (index == 0) {
      const option = document.createElement("option");
      option.value = "All";
      option.textContent = "All";
      stateInput.append(option);
    }
    option.value = State;
    option.textContent = State;
    stateInput.append(option);
  });
};
const createCountryInput = (data) => {
  const uniqueCountry = [...new Set(data.map((element) => element.Country))]; // Extract unique Country
  uniqueCountry.forEach((Country, index) => {
    const option = document.createElement("option");
    if (index == 0) {
      const option = document.createElement("option");
      option.value = "All";
      option.textContent = "All";
      countryInput.append(option);
    }
    option.value = Country;
    option.textContent = Country;
    countryInput.append(option);
  });
};

const tableCreator = (data) => {
  $("#table-body").empty();
  data.forEach((club) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${club.ClubName}  <br> - ${club.Address}</td>
            <td>${club.State}</td>
            <td>${club.City}</td>
            <td>${club.PhoneNumbers.join("<br>")}</td>
        `;
    tableBody.append(row);
  });
};

const createCityInput = (data, State) => {
  $("#city-input").empty();

  if (State == "All") {
    tableCreator(data);
    const uniqueCity = [
        ...new Set(data.map((element) => element.City)),
      ]; // Extract unique City
      uniqueCity.forEach((City, index) => {
        const option = document.createElement("option");
        if (index == 0) {
          const option = document.createElement("option");
          option.value = "All";
          option.textContent = "All";
          cityInput.append(option);
        }
  
        option.value = City;
        option.textContent = City;
        cityInput.append(option);
      });
  } else {
    const currentState = data.filter((club) => club.State === State);
    tableCreator(currentState);
    const uniqueCity = [
      ...new Set(currentState.map((element) => element.City)),
    ]; // Extract unique City
    uniqueCity.forEach((City, index) => {
      const option = document.createElement("option");
      if (index == 0) {
        const option = document.createElement("option");
        option.value = "All";
        option.textContent = "All";
        cityInput.append(option);
      }
      option.value = City;
      option.textContent = City;
      cityInput.append(option);
    });
  }
};

const countryInputChange = async () => {
  const data = await dataFetching();
  createStateInput(data, countryInput.val());
};

const stateInputChange = async () => {
  const data = await dataFetching();
  createCityInput(data, stateInput.val());
};

const cityInputChange = async () => {
  const data = await dataFetching();
  const currentCity = data.filter((club) => club.City === cityInput.val());
  tableCreator(currentCity);
};


$(document).ready(async function () {
  const data = await dataFetching();
  createCountryInput(data);
  createStateInput(data);
  createCityInput(data, stateInput.val());
});

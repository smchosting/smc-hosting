const countryInput = $("#country-input");
const stateInput = $("#state-input");
const cityInput = $("#city-input");
const tableBody = $("#table-body");

// data fetching function 
const dataFetching = async () => {
  try {
    const response = await fetch("assets/json/affiliated-clubs.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// create input
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

const createStateInput = (data, Country) => {
  $("#state-input").empty();

  if (Country == "All") {
    tableCreator(data);
    const uniqueState = [
        ...new Set(data.map((element) => element.State)),
      ]; // Extract unique State
      uniqueState.forEach((State, index) => {
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
  } else {
    const currentCountry = data.filter((club) => club.Country === Country);
    tableCreator(currentCountry);
    const uniqueState = [
      ...new Set(currentCountry.map((element) => element.State)),
    ]; // Extract unique State
    uniqueState.forEach((State, index) => {
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
  }
};

const createCityInput = (data, State, Country) => {
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

// table create function 
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

// input change handler
const countryInputChange = async () => {
  const data = await dataFetching();
  createStateInput(data, countryInput.val());
  createCityInput(data, stateInput.val() ,countryInput.val());
  if(countryInput.val() == "All"){
    const currentCountry = data.filter((club) => club.Country);
    tableCreator(currentCountry);
  }else{
    const currentCountry = data.filter((club) => club.Country === countryInput.val());
    tableCreator(currentCountry);
  }

};

const stateInputChange = async () => {
  const data = await dataFetching();
  const currentState = data.filter((club) => club.State === stateInput.val());
  tableCreator(currentState);
};

const cityInputChange = async () => {
  const data = await dataFetching();
  const currentCity = data.filter((club) => club.City === cityInput.val());
  tableCreator(currentCity);
};


$(document).ready(async function () {
  const data = await dataFetching();
  createCountryInput(data);
  createStateInput(data, countryInput.val());
  createCityInput(data, stateInput.val() ,countryInput.val());
});

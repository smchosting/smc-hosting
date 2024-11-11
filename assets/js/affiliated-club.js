

const stateInput = $('#state-input');
const cityInput = $('#city-input');
const tableBody = $('#table-body');


//function for data fetching from json
const dataFetching = async () => {
    try {
        const response = await fetch('assets/json/affiliated-clubs.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

//creating state inputs
const createStateInput = (data) =>{
    const uniqueStates = [...new Set(data.map(element => element.state))]; // Extract unique states
    uniqueStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateInput.append(option);
    });
}

//function for table Creating
const tableCreator = (data) =>{
    // tableBody.innerHTML = ""; // Clear any existing rows
    $('#table-body').empty();
    data.forEach(club => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${club.club}</td>
            <td>${club.state}</td>
            <td>${club.city}</td>
            <td>${club.phone}</td>
        `;
        tableBody.append(row);
    });
}

//creating city inputs
const createCityInput = (data, state) =>{
    $('#city-input').empty();
    const currentState = data.filter(club => club.state === state);
    tableCreator(currentState)
    const uniqueCity = [...new Set(currentState.map(element => element.city))]; // Extract unique city
    uniqueCity.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityInput.append(option);
    });
}

const stateInputChange = async () =>{
    const data = await dataFetching()
    createCityInput(data, stateInput.val())
}
const cityInputChange = () =>{
}





$(document).ready(async function () {
    fetch('assets/json/affiliated-clubs.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createStateInput(data)
            createCityInput(data, stateInput.val())
        })
        .catch(error => console.error('Error fetching data:', error));
});
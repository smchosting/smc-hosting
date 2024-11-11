
const stateInput = $('#state-input');
const cityInput = $('#city-input');
const tableBody = $('#table-body');

const dataFetching = async () => {
    try {
        const response = await fetch('assets/json/affiliated-clubs.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const createStateInput = (data) =>{
    const uniqueStates = [...new Set(data.map(element => element.state))]; // Extract unique states
    uniqueStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateInput.append(option);
    });
}

const tableCreator = (data) =>{
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

const cityInputChange = async () =>{
    const data = await dataFetching()
    const currentCity = data.filter(club => club.city === cityInput.val());
    tableCreator(currentCity)
    
}

$(document).ready(async function () {
    const data = await dataFetching()
    createStateInput(data)
    createCityInput(data, stateInput.val())
});
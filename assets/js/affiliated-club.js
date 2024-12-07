
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
    const uniqueStates = [...new Set(data.map(element => element.State))]; // Extract unique states
    uniqueStates.forEach(State => {
        const option = document.createElement('option');
        option.value = State;
        option.textContent = State;
        stateInput.append(option);
    });
}

const tableCreator = (data) =>{
    $('#table-body').empty();
    data.forEach(club => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${club.ClubName}  <br> - ${club.Address}</td>
            <td>${club.State}</td>
            <td>${club.City}</td>
            <td>${club.PhoneNumbers.join('<br>')}</td>
        `;
        tableBody.append(row);
    });
}

const createCityInput = (data, State) =>{
    $('#city-input').empty();
    const currentState = data.filter(club => club.State === State);
    tableCreator(currentState)
    const uniqueCity = [...new Set(currentState.map(element => element.City))]; // Extract unique City
    uniqueCity.forEach(City => {
        const option = document.createElement('option');
        option.value = City;
        option.textContent = City;
        cityInput.append(option);
    });
}

const stateInputChange = async () =>{
    
    const data = await dataFetching()
    createCityInput(data, stateInput.val())
}

const cityInputChange = async () =>{
    const data = await dataFetching()
    const currentCity = data.filter(club => club.City === cityInput.val());
    tableCreator(currentCity)
    
}

$(document).ready(async function () {
    const data = await dataFetching()
    console.log("data");
    console.log(data);
    createStateInput(data)
    createCityInput(data, stateInput.val())
});
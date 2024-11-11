

const stateInput = $('#state-input');
const cityInput = $('#city-input');

//function for data fetching from json
const dataFetching = () =>{
    fetch('assets/json/affiliated-clubs.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            return data
        })
        .catch(error => console.error('Error fetching data:', error));
}

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

//creating city inputs
const createCityInput = (data) =>{
    const uniqueCity = [...new Set(data.map(element => element.city))]; // Extract unique city
    uniqueCity.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityInput.append(option);
    });
}

const stateInputChange = () =>{
}
const cityInputChange = () =>{
}



$(document).ready(async function () {
    fetch('assets/json/affiliated-clubs.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createStateInput(data)
            createCityInput(data)
        })
        .catch(error => console.error('Error fetching data:', error));
});
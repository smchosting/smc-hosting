$(document).ready(function () {
    fetch('assets/json/affiliated-clubs.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);


            const stateInput = $('#state-input');
            const uniqueStates = [...new Set(data.map(element => element.state))]; // Extract unique states
            uniqueStates.forEach(state => {
                console.log(state);

                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateInput.append(option);
            });

            const cityInput = $('#city-input');
            const uniqueCity = [...new Set(data.map(element => element.city))]; // Extract unique city
            uniqueCity.forEach(city => {
                console.log(city);

                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityInput.append(option);
            });
            


            // const container = document.getElementById('lift-image-container');
            // images.forEach(image => {
            //   const block = document.createElement('div');
            //   block.className = 'project-block_one col-lg-4 col-md-6 col-sm-12';
            //   block.innerHTML = `
            //     <div class="project-block_one-inner wow fadeInRight" data-wow-delay="300ms" data-wow-duration="1500ms">
            //       <a href="${image}" title="" class="popup-link">
            //         <div class="gallery-card">
            //           <img src="${image}" alt="Image">
            //         </div>
            //       </a>
            //     </div>
            //   `;
            //   container.appendChild(block);
            // });


        })
        .catch(error => console.error('Error fetching data:', error));
});
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicWhvbGxpcyIsImEiOiJja201NzM1NmkwYm11Mm9wYjVobXMwcmQ4In0.yCgatPrn48ZW6kjKTzPEgQ'
}).addTo(mymap);

const marker = L.marker([51.5, -0.09]).addTo(mymap);


return mymap;
}
async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

}


const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const zipcodes = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => zipcodes.push(...data))

function findMatches(wordToMatch, zipcodes){
    return zipcodes.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.zip.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, zipcodes);
    const topFive = matchArray.slice(0,5)
    const html = topFive.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city;
        const zipCode = place.zip;
        const addressLine1 = place.address_line_1;
        const restaurantName = place.name;
      
      
        return `
            <div class="box is-small">
                <li>
                    <div class="name">${restaurantName}</div>
                    <div class="address">${addressLine1}</div>
                    <div class="address">${cityName}, ${zipCode}</div>  
                </li>
            </div>
            `;
    }).join('');
    suggestions.innerHTML = html;
};

const searchInput = document.querySelector('.input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);



async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
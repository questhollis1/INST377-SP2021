function mapInit() {
    // follow the Leaflet Getting Started tutorial here
    const mymap = L.map('mapid').setView([38.9907561,-76.9384114], 13);
  
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoicWhvbGxpcyIsImEiOiJja201NzM1NmkwYm11Mm9wYjVobXMwcmQ4In0.yCgatPrn48ZW6kjKTzPEgQ'
    }).addTo(mymap);
  
    const popup = L.popup();
  
    const marker = L.marker([0,0]).addTo(mymap);

    return mymap;
  }
  
  async function dataHandler(mapObjectFromFunction) {
    // use your assignment 1 data handling code here
    // and target mapObjectFromFunction to attach markers
   
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const search = document.querySelector('#input');
    const formElem = document.querySelector('#formElem');
    const suggestions = document.querySelector('.suggestions');
    const replyMessage = document.querySelector('.reply-message');
    const request = await fetch(endpoint);
    const data = await request.json();
  
    function displayMatches(event, zipcodes) {
      function findMatches(wordToMatch) {
        return zipcodes.filter((place) => {
          const regex = new RegExp(wordToMatch, "gi");
          return place.zip.match(regex);
        });
      }
  
      const matchArray = findMatches(event.target.value, zipcodes);
      zipcodes.forEach((item) => {
        const longLat = item.geocoded_column_1.coordinates;
        console.log('markerLongLat', longLat[0], longLat[1]);
        const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);
        const html = matchArray.map((place) => {
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
      });
    }
  
 
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
      const topFive = filtered.slice(0, 5);
         if (topFive.length < 1) {
           replyMessage.classList.add('box');
           replyMessage.innerText = 'error: No matches found';
      }
      displayMatches(evt, topFive);
    });
  }
  
  async function windowActions() {
    const map = mapInit();
    await dataHandler(map);
  }
  
  window.onload = windowActions;
  
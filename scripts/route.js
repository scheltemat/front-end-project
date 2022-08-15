/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let startID = document.querySelector("#startLocation")
let endID = document.querySelector("#endLocation")
let searchID = document.querySelector("#searchButton")

startID.value
endID.value

let weatherAd = []
let placeAd = []
let foodPins = []
let gasPins = []


var service;

let printCard = document.querySelector(".row")
let printImg = document.querySelectorAll("img")

//used to hid info
let restaurantButton = document.getElementById('restaurant')
restaurantButton.addEventListener('click', e =>{
   let printCard = document.querySelector(".row")
    printCard.style.display = "flex"
    let weathercard = document.querySelector('#weather2')
    weathercard.style.display = "none"

   // restaurantButton.disabled = true;
})


// on start up initMap runs, impelmenting all the google commands 
function initMap(){

  //this is the intital map creation and location start
  const map = new google.maps.Map(
    document.getElementById("map"),{
      zoom: 4, //initial zoom level of the map
      center: { lat: 39.8283, lng: -98.5795 }, // Center of the USA
    });

  //creation of two constonts needed later
  const directionsService = new google.maps.DirectionsService();

  // drag was cool this it burns all your free data
  // map to attach to the map constont made
  // panels are used to hold info like directions or pins
  const directionsRenderer = new google.maps.DirectionsRenderer({
    // draggable: true, 
    map, 
    panel: document.getElementById("panel"), 
  });

  //this was used with in conjuction with the "draggable: true" to update the directions if the pins moved
  // directionsRenderer.addListener("directions_changed", () => {
  //   const directions = directionsRenderer.getDirections();
  //   if (directions) {
  //     computeTotalDistance(directions);
  //   }});

  // What happens when the search button is clicked
  //creating a geocoder which takes location data and returns more location data
  //showing the side bar now that a search has occured
  //grabbing the user input of the end location and giving it to the weather api to use
  //only grabs the route if both fields are filled
  searchID.onclick = () =>{

    geocoder = new google.maps.Geocoder();
    // let resCard = document.querySelector("#resCards")
    // resCard.style.display = "flex"
    // let gasCard = document.querySelector("#gasCards")
    // gasCard.style.display = "none"
    // let weathercard = document.querySelector('#weather2')
    // weathercard.style.display = "none"
    let sidebar = document.querySelector("#sidebar")
    let address = endID.value

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK){
        console.log('lat long results', results);
          weatherAd = []
          weatherAd.push(results[0].geometry.location.lat()) 
          weatherAd.push(results[0].geometry.location.lng()) 
          console.log(weatherAd);
      };
    });
    if(startID.value != ""&&endID.value != ""){
      sidebar.style.display = "flex"
      displayRoute(
      startID.value,
      endID.value,
      directionsService,
      directionsRenderer
      );
    };
  };

  const service = new google.maps.places.PlacesService(map);

  //this piece ofcode will grab the first 20 resterant in the 2000m radius of the click
  google.maps.event.addListener(map, "click", (event) => {
    service.nearbySearch(
      { location: event.latLng, radius: 2000, type: "restaurant" },
      (results, status,) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
      });
      // service.nearbySearch(
      //   { location: event.latLng, radius: 3000, type: "gas_station" },
      //   (results, status,) => {
      //     if (status !== "OK" || !results) return;
      //     addGas(results, map);
      //   });
  });  
}

//this fuction will creat the pins and cards from the click
//before it does anything it resets all past pins and cards
function addPlaces(places, map) {
  for(let A = 0;A<foodPins.length;A++ ){
    foodPins[A].setMap(null);
  }
  foodPins = []
  let printFood = document.querySelector(".row")
  printFood.innerHTML = ""
  let B = 0

  //grabs each places info. check if its 4.5 rated or more. if it is the it creats the pin and card of it
  for (const place of places) {
    if(place.rating>=4.5){
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        console.log(place)
        foodPins.push(new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        })
        );
        
        //the b counter is used a tracker cause the pin will be in an array in the same pos and the id number
        let eachCard =`
            <div class="col">
            <div class="card h-100" id="${B}" onclick="cardClickFun(this.id)">
                    <img src="${place.photos[0].getUrl({maxWidth:150})}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${place.name}</h5>
                      <p class="card-text">${place.rating} \n ${place.business_status}</p>
                    </div>
                  </div>
                </div>`
            printCard.innerHTML += eachCard
            B++
      }
    }
  }
  //creates the restaurants name if the pin is clicked
  for(let B = 0; B<foodPins.length;B++){
  const contentString = `<div>${foodPins[B].title}</div>`
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  console.log(foodPins[B])
  console.log(infowindow)
  foodPins[B].addListener("click", () => {
    infowindow.open({
      anchor: foodPins[B],
      map,
      shouldFocus: false,
    });
  });
} 
}


// function addGas(places, map) {
//   for(let A = 0;A<gasPins.length;A++ ){
//     gasPins[A].setMap(null);
//   }
//   gasPins = []
//   let printGas = document.querySelector("#gasCards")
//   printGas.innerHTML = ""
//   let B = 0

//   //grabs each places info. check if its 4.5 rated or more. if it is the it creats the pin and card of it
//   for (const place of places) {
//     console.log(place)
//     if (place.geometry && place.geometry.location) {
//       const image = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25),
//       };
//       console.log(place)
//       gasPins.push(new google.maps.Marker({
//         map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location,
//       })
//       );
      
//       //the b counter is used a tracker cause the pin will be in an array in the same pos and the id number
//       let eachCard =`
//           <div class="col">
//           <div class="card h-100" id="${B}" onclick="cardClickFun(this.id)">
//                   <img src="${place.photos[0].getUrl({maxWidth:150})}" class="card-img-top" alt="...">
//                   <div class="card-body">
//                     <h5 class="card-title">${place.name}</h5>
//                     <p class="card-text">${place.rating} \n ${place.business_status}</p>
//                   </div>
//                 </div>
//               </div>`
//           printCard.innerHTML += eachCard
//           B++
//     }
    
//   }
//   //creates the restaurants name if the pin is clicked
//   for(let B = 0; B<gasPins.length;B++){
//   const contentString = `<div>${gasPins[B].title}</div>`
//   const infowindow = new google.maps.InfoWindow({
//     content: contentString,
//   });
//   console.log(gasPins[B])
//   console.log(infowindow)
//   gasPins[B].addListener("click", () => {
//     infowindow.open({
//       anchor: gasPins[B],
//       map,
//       shouldFocus: false,
//     });
//   });
// } 
// }

//this fuction is attacted to ther cards created before
//makes it so if a card is click the associated icon will bounce
const cardClickFun = (id) =>{
if (foodPins[id].getAnimation() == google.maps.Animation.BOUNCE) {
  foodPins[id].setAnimation(null);
}
else{
  foodPins[id].setAnimation(google.maps.Animation.BOUNCE);
  console.log("clicked")
}
}

//this function will show the base route with waypoints if you want or paramiters 
function displayRoute(origin,destination,service,display) {
  service
    .route({
      origin: origin,
      destination: destination,
      waypoints: [
        // { location: "Cleveland, OH" },
        // { location: "Trenton, NJ" },
      ],
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true,
      provideRouteAlternatives: true,
      unitSystem: google.maps.UnitSystem.IMPERIAL//gross
    })
    .then((result) => {
      display.setDirections(result);
      console.log(result)
      
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}

//calculates the total distance
function computeTotalDistance(result) {
  let total = 0;
  const myroute = result.routes[0];
  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }

  total = (total / 1000)*.62137; //convert value of myroute.legs[...].distance from meters to miles//gross

  (document.getElementById("total")).innerHTML = total.toFixed(1) + " miles";
}

   
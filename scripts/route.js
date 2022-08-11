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


var service;


function initMap(){
  const map = new google.maps.Map(
    document.getElementById("map"),
    {
      zoom: 4,
      center: { lat: 39.8283, lng: -98.5795 }, // Australia.
    }
  );

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    // draggable: true,
    map,
    panel: document.getElementById("panel"),
  });

  directionsRenderer.addListener("directions_changed", () => {
    const directions = directionsRenderer.getDirections();

    if (directions) {
      computeTotalDistance(directions);
    }
  });
  searchID.onclick = () =>{
    console.log("running?")
    geocoder = new google.maps.Geocoder();

    let address = endID.value
    geocoder.geocode( { 'address': address}, function(results, status) {
    
      if (status == google.maps.GeocoderStatus.OK)
      {
        console.log('lat long results', results);
          // do something with the geocoded result
          
          weatherAd.push(results[0].geometry.location.lat()) 
          weatherAd.push(results[0].geometry.location.lng()) 
      }
    })
    if(startID.value != ""&&endID.value != ""){
      displayRoute(
      startID.value,
      endID.value,
      directionsService,
      directionsRenderer
    );
    }
  };

  const service = new google.maps.places.PlacesService(map);


  google.maps.event.addListener(map, "click", (event) => {
    service.nearbySearch(
      { location: event.latLng, radius: 1500, type: "restaurant" },
      (results, status,) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
      });
  });  
}
function addPlaces(places, map) {
  // const placesList = document.getElementById("places");

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
      });

      // const li = document.createElement("li");

      // li.textContent = place.name;
      // placesList.appendChild(li);
      // li.addEventListener("click", () => {
      //   map.setCenter(place.geometry.location);
      // });
    }
  }
}


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
      unitSystem: google.maps.UnitSystem.IMPERIAL
    })
    .then((result) => {
      display.setDirections(result);
      console.log(result)
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}

function computeTotalDistance(result) {
  let total = 0;
  const myroute = result.routes[0];
  // console.log(myroute)
  // weatherAd = myroute.legs[0].end_address
  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }

  total = (total / 1000)*.62137; //convert value of myroute.legs[...].distance from meters to miles

  (document.getElementById("total")).innerHTML = total.toFixed(1) + " miles";
}

// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   new google.maps.Marker({
//     position: location,
//     label: "C",
//     map: map,
//   });
// }


  // window.initMap = initMap;

  
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

let weatherAd = ""
let placeAd = []


function initMap(){
  const map = new google.maps.Map(
    document.getElementById("map"),
    {
      zoom: 8,
      center: { lat: -24.345, lng: 134.46 }, // Australia.
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
    if(startID.value != ""&&endID.value != ""){
      displayRoute(
      startID.value,
      endID.value,
      directionsService,
      directionsRenderer
    );
    }
  };
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
    placeAd = event.latLng
    console.log(event.latLng)
    console.log(placeAd)
  });  
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
  console.log(myroute)
  weatherAd = myroute.legs[0].end_address
  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }

  total = (total / 1000)*.62137; //convert value of myroute.legs[...].distance from meters to miles

  (document.getElementById("total")).innerHTML = total.toFixed(1) + " miles";
}

function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: "C",
    map: map,
  });
}


  // window.initMap = initMap;

  
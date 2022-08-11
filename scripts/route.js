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

var service;


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

  const service = new google.maps.places.PlacesService(map);


  google.maps.event.addListener(map, "click", (event) => {
    service.nearbySearch(
      { location: event.latLng, radius: 1000, type: "restaurant" },
      (results, status,) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
      });

    // const request = {
    //   query: "restaurant",
    //   fields: ["name", "geometry","rating"],
    //   locationBias: event.latLng
    // };

    // service = new google.maps.places.PlacesService(map);

    // service.findPlaceFromQuery(request, function(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       createMarker(results[i]);
    //     }
    //     map.setCenter(results[0].geometry.location);
    //   }
    // });
  
    // addMarker(event.latLng, map);
    // placeAd = event.latLng
    // console.log(event.latLng)
    // console.log(placeAd)
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

// function createMarker(place = google.maps.places.PlaceResult) {
//   if (!place.geometry || !place.geometry.location) return;

//   const marker = new google.maps.Marker({
//     map,
//     position: place.geometry.location,
//   });
// }

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

  
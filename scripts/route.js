/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 function initMap(){
    const map = new google.maps.Map(
      document.getElementById("map"),
      {
        zoom: 4,
        center: { lat: -24.345, lng: 134.46 }, // Australia.
      }
    );
  
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map,
      panel: document.getElementById("panel"),
    });
  
    directionsRenderer.addListener("directions_changed", () => {
      const directions = directionsRenderer.getDirections();
  
      if (directions) {
        computeTotalDistance(directions);
      }
    });
  
    displayRoute(
      "indianapolis, IN",
      "New York, NY",
      directionsService,
      directionsRenderer
    );
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
      })
      .catch((e) => {
        alert("Could not display directions due to: " + e);
      });
  }
  
  function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
    console.log(myroute)
    if (!myroute) {
      return;
    }
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
  
    total = (total / 1000)*.62137; //convert value of myroute.legs[...].distance from meters to miles
  
    (document.getElementById("total")).innerHTML = total.toFixed(1) + " miles";
  }
  

  window.initMap = initMap;

  
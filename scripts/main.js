let printCard = document.querySelector(".row")
let printImg = document.querySelectorAll("img")

// const placesFetch = async (location)=>{
//     let results = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=${location}&radius=3000&type=restaurant&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`)
//     if (!results.ok) {
//         throw new Error(`An error occurred: ${results.status}`);
//     }
    
//     return await results.json();

// }
// // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=49.8880%2C-119.4960&radius=1000&type=restaurant&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`

// //business_status,name,opening hours: periods/weekday_text,photos,rating,geometry

// const photosFetch = async (ref)=>{
//    // console.log("f1")
//    for(let C in ref){
//       let results = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref[C]}&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`)
//          if (!results.ok) {
//             throw new Error(`An error occurred: ${results.status}`);
//       }
//    }
//    //  console.log(results)
//    //  return results.json();

// }

// const loadFetch = async ()=>{
//     const placesParent = await placesFetch("49.8880%2C-119.4960")
//     let placesData = placesParent.results
//     let hold = {} //i can make it gobal the reset it on fuctions start if needed
//     let photosHold = []
//     console.log(placesData)
//     for(let A = 0; A<placesData.length;A++){
//         hold[A] = placesData[A]
        
//     }
//    for(let B in hold){
//       console.log(B)
//       let currentHold = hold[B]
//       console.log(currentHold.rating)
//       if (currentHold.rating>4.5){
//          console.log(currentHold.photos[0].photo_reference)
//          photosHold.push(currentHold.photos[0].photo_reference)
//          console.log("reak here")
//          // let photosData = await photosFetch(photosHold)
//          // console.log(photosData)
//          let eachCard =`
//          <div class="col">
//                <div class="card h-100">
//                   <img src="" class="card-img-top" alt="...">
//                   <div class="card-body">
//                      <h5 class="card-title">${currentHold.name}</h5>
//                      <p class="card-text">${currentHold.rating} /n ${currentHold.business_status}</p>
//                   </div>
//                </div>
//                </div>`
//          printCard.innerHTML += eachCard
//             // photosData
//             // currentHold.business_status
//             // currentHold.geometry.location.lat
//             // currentHold.geometry.location.lng
//             // currentHold.name
//             // currentHold.rating
//          }
//    }
//    const photosArr = await Promise.all(
//       photosHold.map(async photoRef =>{
//          let photoReponse = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`)
//          return photoReponse.url
//       })
//    )
//    let printImg = document.querySelectorAll("img")
//    console.log(photosArr)
//    for(let C = 0; C<photosArr.length;C++){
//       printImg[C].src = photosArr[C]
//    }

//    //  console.log("hihi")
//    //  console.log(printImg[0])
//    //  printImg[0].src = await photosFetch()
//    //  console.log(printImg[0].src)
//    //  console.log("ahhasd")
//    //  for(let C in photosHold) {
//    //    let photosData = await photosFetch(photosHold[C])
//    //    printImg[C].src = 
//    //  }
    
// }

let restaurantButton = document.getElementById('restaurant')
restaurantButton.addEventListener('click', e =>{
   let printCard = document.querySelector(".row")
    printCard.style.display = "flex"
    let weathercard = document.querySelector('#weather2')
    weathercard.style.display = "none"

   // restaurantButton.disabled = true;
})

// console.log(placeFetch()) 



//loop each object from data to get image, name, type of food
// for(let i =0; i < cards.length; i++){
//     let eachCard = `
//     <div class="col">
//           <div class="card h-100">
//             <img src="${}" class="card-img-top" alt="...">
//             <div class="card-body">
//               <h5 class="card-title">${cards[i].name}</h5>
//               <p class="card-text">${cards[i].food} </p>
//             </div>
//           </div>
//         </div>`
//     printCard.innerHTML += eachCard
// }
// let cards =[
//     {
//         id: 1234,
//         name: "Fadi's",
//         distance: 3,
//         image: "https://www.fadiscuisine.com/wp-content/uploads/2020/02/fadis_katy_location_300x300.jpg",
//         food: "Medditerranean Cuisine"
//     },
//      {
//         id: 5678,
//         name: "McDonald's",
//         distance: 4,
//         image: "https://www.eatthis.com/wp-content/uploads/sites/4/2021/06/mcdonalds-2.jpg?quality=82&strip=1",
//         food: "Fast Food"
//      },
//      {
//         id: 3366,
//         name: "Olive Garden",
//         distance: 5,
//         image: "https://securecdn.pymnts.com/wp-content/uploads/2022/06/darden-earnings-Olive-Garden.jpg",
//         food: "Italian Food"
//      },
//      {
//         id: 7788,
//         name: "Arby's",
//         distance: 6,
//         image: "https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Fguiltyeats.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2016%2F04%2F963750644-850x560.jpeg",
//         food: "Fast Food"
//      },
//      {
//         id: 7968,
//         name: "Taco Bell",
//         distance: 1,
//         image: "https://www.aaaa.org/wp-content/uploads/taco.png",
//         food: "Mexican-inspired Food"
//      }
// ]





// function printRestaurants(){
//    //print info on info cards
//    let printCard = document.querySelector(".row")
//    //loop each object from data to get image, name, type of food
//    for(let i =0; i < cards.length; i++){
//       let eachCard = `
//       <div class="col">
//             <div class="card h-100">
//                <img src="${cards[i].image}" class="card-img-top" alt="...">
//                <div class="card-body">
//                <h5 class="card-title">${cards[i].name}</h5>
//                <p class="card-text">${cards[i].food} </p>
//                </div>
//             </div>
//          </div>`
//       printCard.innerHTML += eachCard
//    }
// }

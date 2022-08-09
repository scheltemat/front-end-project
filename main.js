let cards =[
    {
        id: 1234,
        name: "Fadi's",
        distance: 3,
        image: "https://www.fadiscuisine.com/wp-content/uploads/2020/02/fadis_katy_location_300x300.jpg"
    },
     {
        id: 5678,
        name: "McDonald's",
        distance: 4,
        image: "https://www.eatthis.com/wp-content/uploads/sites/4/2021/06/mcdonalds-2.jpg?quality=82&strip=1"
     },
     {
        id: 3366,
        name: "Olive Garden",
        distance: 5,
        image: "https://securecdn.pymnts.com/wp-content/uploads/2022/06/darden-earnings-Olive-Garden.jpg"
     },
     {
        id: 7788,
        name: "Arby's",
        distance: 6,
        image: "https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Fguiltyeats.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2016%2F04%2F963750644-850x560.jpeg"
     },
     {
        id: 7968,
        name: "Taco Bell",
        distance: 1,
        image: "https://www.aaaa.org/wp-content/uploads/taco.png"
     }
]

let img = document.querySelector(".card-img-top")
let cardTitle = document.querySelector(".caard-title")
let milesAway = document.querySelector(".card-text")
let printCard = document.querySelector(".row")

cards.forEach(e=>{
    console.log(e)
    let eachCard = `
    <div class="col">
          <div class="card h-100">
            <img src="${e.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${e.name}</h5>
              <p class="card-text">${e.distance} miles away.</p>
            </div>
          </div>
        </div>`
    printCard.innerHTML += eachCard
    
})
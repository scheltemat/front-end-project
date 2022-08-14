let printCard = document.querySelector(".row")
let printImg = document.querySelectorAll("img")


let restaurantButton = document.getElementById('restaurant')
restaurantButton.addEventListener('click', e =>{
   let printCard = document.querySelector(".row")
    printCard.style.display = "flex"
    let weathercard = document.querySelector('#weather2')
    weathercard.style.display = "none"

   // restaurantButton.disabled = true;
})



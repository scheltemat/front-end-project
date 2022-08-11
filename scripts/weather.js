// let button = document.querySelector(".search");
let weathercard = document.querySelector('#weather2')
let weatherButton = document.getElementById('weather')

//added a class "end" on inpuut2 section
// let input = document.querySelector(".end");

weatherButton.addEventListener('click', e=>{
	fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=77494&days=3', options)
	.then(response => response.json())
	.then(response => logAPI(response))
	.catch(err => console.error(err));


})

function logAPI (data){
    console.log(data)
   
	console.log(data.forecast.forecastday);

	//get the 3 dates from the data
	let date = data.forecast.forecastday

	let dateArr = []
	let iconArr = []
	let highTemperatureArr = []
	let lowTemperatureArr = []
	let chanceOfRainArr = []
	for(let i=0; i < date.length; i++){
		dateArr.push(date[i].date)
		iconArr.push(date[i].day.condition.icon)
		highTemperatureArr.push(date[i].day.maxtemp_f)
		lowTemperatureArr.push(date[i].day.mintemp_f)
		chanceOfRainArr.push(date[i].day.daily_chance_of_rain)
		
		
	}
	console.log(dateArr); //this is array of 3 dates
	console.log(highTemperatureArr); //this is array of max tem
	console.log(lowTemperatureArr); //this is array of low tem
	console.log(chanceOfRainArr); //this is array of rain
	console.log(iconArr);

	//getting the cards to display on the screen
	let addWeathertoCard = "";
	
	for(let j=0; j< chanceOfRainArr.length; j++){
		// let weatherDiv = document.querySelector('.image')
		// let image= document.createElement('img')
		// image.src=`${iconArr[j]}`
		// weatherDiv.replaceWith(image)
		let printWeather =`
		
                    
						<div class="day1">
							<h5 class="card-title">${dateArr[j]}</h5>
							<div class="image">
								<img src="${iconArr[j]}">
							</div>
							<p class="card-text">${highTemperatureArr[j]}º
								<span>${lowTemperatureArr[j]}º </span>
							</p>                    
							<p class="card-text">Chance of Rain: ${chanceOfRainArr[j]}%</p>
						</div>
					
                `
		
		addWeathertoCard += printWeather
			
				
	}

	console.log(addWeathertoCard);
	weathercard.innerHTML = `
	
		
			<div class="weatherContainer">
				${addWeathertoCard}
			</div>
			`

}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a6c84714aamshd7312f736a5f530p1a827bjsn8c619e6200a6',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};


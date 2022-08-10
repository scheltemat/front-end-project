let button = document.querySelector(".search");

//added a class "end" on inpuut2 section
let input = document.querySelector(".end");

function logAPI (data){
    console.log(data)
    // return
	console.log(data.forecast.forecastday);

	//get the 3 dates from the data
	let date = data.forecast.forecastday

	let dateArr = []
	let temperatureArr = []
	let conditionTextArr = []
	for(let i=0; i < date.length; i++){
		dateArr.push(date[i].date)
		temperatureArr.push(date[i].day.avgtemp_f)
		conditionTextArr.push()
	}
	console.log(dateArr); //this is array of 3 dates
	console.log(temperatureArr); //this is array of 3 dates
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a6c84714aamshd7312f736a5f530p1a827bjsn8c619e6200a6',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Houston&days=3', options)
	.then(response => response.json())
	.then(response => logAPI(response))
	.catch(err => console.error(err));
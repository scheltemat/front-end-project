const placesFetch = async (location)=>{
    let results = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=${location}&radius=1000&type=restaurant&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`)
    if (!results.ok) {
        throw new Error(`An error occurred: ${results.status}`);
    }
    
    return await results.json();

}
// `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=49.8880%2C-119.4960&radius=1000&type=restaurant&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`

//business_status,name,opening hours: periods/weekday_text,photos,rating,geometry

const photosFetch = async (ref)=>{
    let results = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=AIzaSyDs76VeBs3S5YCAJfu_KkiepYooAYIX12k`)
    if (!results.ok) {
        throw new Error(`An error occurred: ${results.status}`);
    }
    
    return await results.json();

}

const loadFetch = async ()=>{
    const placesData = await placesFetch(location)
    let hold = {}
    for(let A = 0; A<placesData.length;A++){
        hold[A] = placesData[A]
    }
    for(let B in hold){
        let currentHold = hold[B]
        let photosHold = currentHold.photos[0].photo_reference
        let photosData = await photosFetch(photosHold)
        photosData
        currentHold.business_status
        currentHold.geometry.location.lat
        currentHold.geometry.location.lng
        currentHold.name
        currentHold.rating

    }
}


console.log(dataFetch()) 

import React, {useRef} from "react";



function WeatherHome(){
    const apiKey= '5ae2586ea2964eecb0c182829240706'; 
    const apiURL = 'http://api.weatherapi.com/v1/current.json'; 

    const locationInputRef  = useRef(null); 
    
    const locationElementRef = useRef(null);
    
    const tempElementRef = useRef(null);
    const descriptionElementRef = useRef(null); 
    const imageElementRef = useRef(null); 

    const fetchWeather = (location) => {
        const url = `${apiURL}?key=${apiKey}&q=${location}&aqi=no`;  
        // console.log(url); 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationElementRef.current.textContent = data.location.name + ', ' +  data.location.region; 
                tempElementRef.current.textContent = data.current.temp_f; 
                descriptionElementRef.current.textContent = data.current.condition.text; 
                imageElementRef.current.src = data.current.condition.icon; 
                imageElementRef.current.alt = data.current.condition.text; 
            })
            .catch(error => {
                console.error('error fetching weather data, try again', error); 
                descriptionElementRef.current.textContent = ('City not found, please try again'); 
            })
    };

    const handleClick = () => {
        const location = locationInputRef.current.value; 
        if(location){
            fetchWeather(location);
            // console.log('we are fetching');
        }
    }; 

    return (
        <>
        <div className="container mx-auto"> 
            <h1 className="text-6xl pb-10 pt-4"> The Weather App </h1>
            <input id="inputLocation" type="text" placeholder="Enter a City" ref={locationInputRef} className="mr-5 border-solid rounded border-2 border-blue-500 p-1"/> 
            <button type="submit" id="searchButton" name="search" onClick={handleClick} className="bg-blue-500 p-2 rounded"> Search</button>
            <div id="info" className="py-32"> 
                <h2 id="location" ref={locationElementRef} className="text-4xl"> </h2>
                <p id="temperature" ref={tempElementRef}> </p>
                <p id="description" ref={descriptionElementRef}> </p> 
                <img id='weatherIcon' ref={imageElementRef} /> 
            </div>
        </div>
        </>
    )
}

 
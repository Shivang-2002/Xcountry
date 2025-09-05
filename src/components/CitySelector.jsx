import React, { useState, useEffect } from "react";
import axios from "axios";

const CitySelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCoutries, setSelectedCountries] = useState("");
    const [selectedStates, setSelectedStates] = useState("");
    const [selectedCities, setSelectedCities] = useState("");


    useEffect(() => {
        axios.get("https://crio-location-selector.onrender.com/countries")
        .then((response) => {
            setCountries(response.data);
        })
        .catch((error) => {
            console.error("error fectching countries: ", error);
        });
    }, []);

    useEffect(() => {
        if(selectedCoutries){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCoutries}/states`)
            .then((response) =>  {
                setStates(response.data);
                setSelectedStates("");
                setCities([]);
                setSelectedCities("");
            })
            .catch((error) => {
                console.error("Error fetching states: ", error);
            });
        }
    }, [selectedCoutries]);

    useEffect(() => {
        if(selectedCoutries && selectedStates){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCoutries}/state=${selectedStates}/cities`)
            .then((response) => {
                setCities(response.data);
                setSelectedCities("");
            })
            .catch((error) => {
                console.error("Error fetching the ciities:", error);
            });
        }
    }, [selectedCoutries, selectedStates]);

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "Arial, sans-serif"}}>
            <h1>Select Location</h1>
            <div>
                <select 
                    style={{padding: "5px", margin: "5px"}}
                    value={selectedCoutries}
                    onChange={(e) => setSelectedCountries(e.target.value)}
                >
                        <option value="" disabled> Select Country </option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                </select>

                <select
                    style={{padding: "5px", margin: "5px"}}
                    value={selectedStates}
                    onChange={(e) => setSelectedStates(e.target.value)}
                    disabled={!selectedCoutries}
                >
                        <option value="" disabled> Select state </option>
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                </select>

                <select
                    style={{padding: "5px", margin: "5px"}}
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.target.value)}
                    disabled={!selectedStates}
                >
                        <option value="" disabled> Select cities </option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                </select>
            </div>
            {selectedCities && (
        <h2 style={{fontSize: "16px"}}>
          You selected <span style={{fontWeight: "bold", fontSize: "24px"}} >{selectedCities}</span>,
          <span style={{color: "grey"}}>
            {" "}
            {selectedStates}, {selectedCoutries}
          </span>
        </h2>
      )}
        </div>
    );

};

export default CitySelector;
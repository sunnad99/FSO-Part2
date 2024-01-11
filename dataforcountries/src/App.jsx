import { useState, useEffect } from "react";

import axios from "axios";
import apiKey from "./config";

const WeatherReport = ({ weatherDetails }) => {
  if (!weatherDetails) return <p></p>;
  const heading = `Weather in ${weatherDetails.name}`;
  const temperature = weatherDetails.main.temp;
  const windSpeed = weatherDetails.wind.speed;
  const weatherIcon = weatherDetails.weather[0].icon;
  return (
    <div>
      <h2>{heading}</h2>
      <p>temperature: {temperature} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt=""
      />
      <p>wind: {windSpeed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  console.log("Entered Country Component with country:", country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  );
};

const processResults = (results, showCountry) => {
  console.log("The data to process is:", results);
  if (typeof results === "string") return <p>{results}</p>;
  if (results.length > 1) {
    return results.map((result) => (
      <p>
        {result.name.common}{" "}
        <button onClick={() => showCountry([result])}>show</button>
      </p>
    ));
  }

  return results.map((result) => {
    return <Country country={result} />;
  });
};

function App() {
  const [country, setCountry] = useState("");
  const [results, setResults] = useState(null);
  const [weatherReport, setWeatherReport] = useState(null);

  // Effect hook for retrieving country data
  useEffect(() => {
    console.log("Entered the use effect with:", country);
    if (country) {
      const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
      axios
        .get(url)
        .then((response) => {
          const data = response.data;

          const filteredCountries = data.filter(
            (c) =>
              c.name.common.toLowerCase().includes(country.toLowerCase()) &&
              c.name.official.toLowerCase().includes(country.toLowerCase())
          );

          console.log("The filtered countries are:", filteredCountries);

          if (filteredCountries.length > 10) {
            setResults("Too many matches, specify another filter");
          } else {
            setResults(filteredCountries);
          }
        })
        .catch((error) => {
          console.log(`No country found with the name ${country}`);
        });
    }
  }, [country]);

  // Effect hook for retrieving weather report
  useEffect(() => {
    // The effect hook runs at least once at the start
    if (!results) return;

    if (results.length === 1) {
      // Render the weather report here
      const countryName = results[0].name.common;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}&units=metric`;
      axios.get(url).then((response) => {
        console.log("The weather data is:", response.data);
        setWeatherReport(response.data);
      });
    } else {
      setWeatherReport(null);
    }
  }, [results]);

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const resultsToShow = results ? processResults(results, setResults) : <p></p>;

  return (
    <>
      find countries <input value={country} onChange={handleCountry} />
      {resultsToShow}
      <WeatherReport weatherDetails={weatherReport} />
    </>
  );
}

export default App;

import { useState, useEffect } from "react";

import axios from "axios";

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

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const resultsToShow = results ? processResults(results, setResults) : <p></p>;

  return (
    <>
      find countries <input value={country} onChange={handleCountry} />
      {resultsToShow}
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import CountryList from "./CountryList";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <div>
        <label htmlFor="country">find countries</label>
        <input type="text" value={search} onChange={inputHandler} />
      </div>
      <div>
        <CountryList
          search={search}
          countries={countries}
          setSearch={setSearch}
        />
      </div>
    </>
  );
};

export default App;

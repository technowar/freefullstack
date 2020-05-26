import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import Country from './components/Country'
import './index.css'

const App = () => {
  const [{ countries, filter }, setState] = useState({ countries: [], filter: '' });
  const fetchCountries = useCallback(async () => {
    const { data } = await Axios.get('https://restcountries.eu/rest/v2/all');

    setState((state) => ({ ...state, countries: data }));
  }, []);
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  const onChange = (type) => (evt) => {
    const { value } = evt.target;

    setState((state) => ({ ...state, [type]: value }));
  };
  const onClick = (filter) => setState((state) => ({ ...state, filter }));

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <>
      <div>
        find countries <input onChange={onChange('filter')} />
      </div>
      <Country filter={filter} list={filteredCountries} onClick={onClick}/>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

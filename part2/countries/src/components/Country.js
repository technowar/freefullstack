import React from 'react'
import Weather from './Weather'

export default function Country({ filter, list, onClick }) {
  let display = null;

  if (filter.length && list.length > 10) {
    display = <p>Too many matches, specify another filter</p>
  } else if (list.length >= 2 && list.length <= 10) {
    display = (
      <div>
        {list.map(country => (
          <p key={country.cioc}>
            <span>{country.name}</span>
            <button onClick={() => onClick(country.name)}>show</button>
          </p>
        ))}
      </div>
    );
  } else if (list.length === 1) {
    display = (
      <div>
        <h1>{list[0].name}</h1>
        <p>capital {list[0].capital}</p>
        <p>population {list[0].population}</p>
        <h3>languages</h3>
        <ul>
          {list[0].languages.map(lang => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={list[0].flag} width="150px" alt="flag" />
        <Weather capital={list[0].capital} />
      </div>
    );
  }

  return display
};

import React from 'react';
import InputSelect from 'react-material-selectable-inputtext';

const App = () => {
  const [allCountries, setAllCountries] = React.useState([]);
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const countriesResp = await fetch('https://restcountries.eu/rest/v2/all');
      if (countriesResp.ok) {
        const countries = await countriesResp.json();
        const mappedCountries = countries.map(c => {
          return { id: c.name, text: c.name, population: c.population }
        });
        setAllCountries(mappedCountries);
      }
    })()
  }, []);

  const onAddHandler = (item) => {
    setList([...list, item]);
  }

  return (
    <div style={{ margin: '20px' }}>
      <InputSelect optionsList={allCountries} excludedOptions={list} onAdd={onAddHandler} textFieldProps={{
        variant: 'outlined'
      }} />
      {list.map(items => <div key={items.text}>{items.text}</div>)}
    </div>
  );
}

export default App;

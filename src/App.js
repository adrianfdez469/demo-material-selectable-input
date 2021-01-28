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
    <div style={{ margin: '20px', fontSize: '20px' }}>
      <h2>To see what the component can do, follow the steps.</h2>
      <ol>
        <li>Focus the component and white an "A" letter, it will pop up all the countries that begin with "A"</li>
        <li>Press the arrow down key from your keyboard, and choose "Albania", then press "Enter"</li>
        <li>Again write an "A" letter, you'll see that "Albania" is no longer available. This time with your mouse select other country option and press "Enter" or press the plus button</li>
        <li>Now write anther country name without selecting it from the list and added, you can see after that the country is no logner available on the list</li>
        <li>Also you can write anything that is not on the list, and added as well</li>
        <li>Be aware that we you write a substring, you can navigate throgth the options with down arrow key, but you can comeback to the input with the ip arrow key</li>
      </ol>

      <InputSelect optionsList={allCountries} excludedOptions={list} onAdd={onAddHandler} textFieldProps={{
        variant: 'outlined'
      }} />
      {list.map(items => <div key={items.text}>{items.text}</div>)}
    </div>
  );
}

export default App;

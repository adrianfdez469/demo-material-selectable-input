import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import InputSelect from 'react-material-selectable-inputtext';



const App = () => {
  const [allCountries, setAllCountries] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const countriesResp = await fetch('https://restcountries.eu/rest/v2/all');
      if (countriesResp.ok) {
        const countries = await countriesResp.json();
        console.log(countries);
        const mappedCountries = countries.map(c => {
          // The object passed to the optionsList prop and excludedOptions must have id and text properties
          return { id: c.name, text: c.name, population: c.population, flag: c.flag }
        });
        setAllCountries(mappedCountries);
      }
    })()
  }, []);

  const onAddHandler = (item) => {
    setSelected([...selected, item]);
  }

  return (
    <div style={{ margin: '20px', fontSize: '20px' }}>
      <Typography variant="h3">To see what the component can do, follow the steps.</Typography>
      <ol>
        <li><Typography variant="body1">Focus the component and white an "A" letter, it will pop up all the countries that begin with "A"</Typography></li>
        <li><Typography variant="body1">Press the arrow down key from your keyboard, and choose "Albania", then press "Enter"</Typography></li>
        <li><Typography variant="body1">Again write an "A" letter, you'll see that "Albania" is no longer available. This time with your mouse select other country option and press "Enter" or press the plus button</Typography></li>
        <li><Typography variant="body1">Now write anther country name without selecting it from the list and added, you can see after that the country is no logner available on the list</Typography></li>
        <li><Typography variant="body1">Also you can write anything that is not on the list, and added as well</Typography></li>
        <li><Typography variant="body1">Be aware that we you write a substring, you can navigate throgth the options with down arrow key, but you can comeback to the input with the ip arrow key</Typography></li>
      </ol>

      <InputSelect optionsList={allCountries} excludedOptions={selected} onAdd={onAddHandler} textFieldProps={{
        variant: "outlined"
      }} />
      {
        selected.map(item =>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img alt="Flag" src={item.flag} style={{ width: '24px', height: '24px', margin: '5px' }} />
            <Typography
              variant="body1"
              key={item.text}
            >
              {`Country: ${item.text} |  Population: ${item.population}`}
            </Typography>
          </div>
        )}
    </div>
  );
}

export default App;

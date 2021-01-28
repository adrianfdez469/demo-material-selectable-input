import React from 'react';
import { Typography, Chip, Avatar } from '@material-ui/core';
import InputSelect from 'react-material-selectable-inputtext';



const App = () => {
  const [allCountries, setAllCountries] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const countriesResp = await fetch('https://restcountries.eu/rest/v2/all');
      if (countriesResp.ok) {
        const countries = await countriesResp.json();
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
  const handleDelete = (item) => {
    setSelected((state) => state.filter((it) => it.text !== item.text));
  }

  return (
    <div style={{ margin: '20px', fontSize: '20px' }}>
      <Typography variant="h3">To see what the component can do, follow the steps.</Typography>
      <ol>
        <li><Typography variant="body1">Focus the component and write an "A" letter, it will pop up all the countries that begin with "A"</Typography></li>
        <li><Typography variant="body1">Press the arrow down key from your keyboard, and choose "Albania", then press "Enter"</Typography></li>
        <li><Typography variant="body1">Again write an "A" letter, you'll see that "Albania" is no longer available. (Revert this by removing "Albania" from the chips) This time with your mouse select other country option and press "Enter" or press the plus button/button</Typography></li>
        <li><Typography variant="body1">Now write other country name without selecting it from the list and press "Enter".</Typography></li>
        <li><Typography variant="body1">Also you can write anything that is not on the list, and added as well</Typography></li>
        <li><Typography variant="body1">Be aware that we you write a substring, you can navigate throgth the options with down arrow key, but you can go back to the input with the up arrow key</Typography></li>
      </ol>

      <InputSelect
        optionsList={allCountries}
        excludedOptions={selected}
        onAdd={onAddHandler}
        textFieldProps={{
          variant: "outlined",
          label: 'Country',
          style: {
            margin: 10
          }
        }}
      />
      <InputSelect optionsList={allCountries} excludedOptions={selected} onAdd={onAddHandler} textFieldProps={{
        variant: "filled",
        required: true,
        helperText: 'Write and select a country, or just write it!',
        style: {
          margin: 10
        },
        fullWidth: true
      }} />
      <InputSelect
        optionsList={allCountries}
        excludedOptions={selected}
        onAdd={onAddHandler}
        textFieldProps={{
          variant: "standard",
          style: {
            margin: 10
          },
          placeholder: 'Country',
          fullWidth: true
        }}
      />
      {
        selected.map(item =>
          <Chip
            avatar={<Avatar alt="Flag" src={item.flag} />}
            label={item.text}
            onDelete={() => handleDelete(item)}
            style={{ margin: '4px' }}
          />
        )}
    </div>
  );
}

export default App;

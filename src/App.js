import React from 'react';
import { Typography, Chip, Avatar, Snackbar, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon  from "@material-ui/icons/Close";
import InputSelect from 'react-material-selectable-inputtext';


const App = () => {
  const [allCountries, setAllCountries] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    (() => {
      setLoading(true);

      fetch('https://restcountries.com/v2/all')
        .then(countriesResp => {
          if (countriesResp.ok) {
            return countriesResp.json();
          }
        })
        .then(countries => {
          const mappedCountries = countries.map(c => {
            // The object passed to the optionsList prop and excludedOptions must have id and text properties
            return { id: c.name, text: c.name, population: c.population, flag: c.flag }
          });
          setAllCountries(mappedCountries);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setError(true);
        });
    })()
  }, []);

  const onCloseErrorMsg = () => {
    setError(false);
  }

  const onAddHandler = (item) => {
    setSelected([...selected, item]);
  }
  const handleDelete = (item) => {
    setSelected((state) => state.filter((it) => it.text !== item.text));
  }

  return (
    <div style={{ margin: '20px', fontSize: '20px' }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={onCloseErrorMsg}
        message="Conutry service not available"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onCloseErrorMsg}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Typography variant="h3">To see what the component can do, follow the steps.</Typography>
      <ol>
        <li><Typography variant="body1">Focus the component and write an "A" letter, it will pop up all the countries that begin with "A"</Typography></li>
        <li><Typography variant="body1">Press the arrow down key from your keyboard, and choose "Albania", then press "Enter"</Typography></li>
        <li><Typography variant="body1">Again write an "A" letter, you'll see that "Albania" is no longer available. (Revert this by removing "Albania" from the chips) This time with your mouse select other country option and press "Enter" or press the plus button/button</Typography></li>
        <li><Typography variant="body1">Now write other country name without selecting it from the list and press "Enter".</Typography></li>
        <li><Typography variant="body1">Also you can write anything that is not on the list, and added as well</Typography></li>
        <li><Typography variant="body1">Be aware that we you write a substring, you can navigate throgth the options with down arrow key, but you can go back to the input with the up arrow key</Typography></li>
      </ol>
      {loading && <CircularProgress /> }
      <InputSelect
        optionsList={allCountries}
        excludedOptions={selected}
        onAdd={onAddHandler}
        textFieldProps={{
          variant: "outlined",
          label: 'Country',
          style: {
            margin: 10
          },
          disabled: loading
        }}
      />
      <InputSelect 
        optionsList={allCountries} 
        excludedOptions={selected} 
        onAdd={onAddHandler} 
        textFieldProps={{
          variant: "filled",
          required: true,
          helperText: 'Write and select a country, or just write it!',
          style: {
            margin: 10
          },
          fullWidth: true,
          hidden: loading
        }}
      />
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
          fullWidth: true,
          hidden: loading
        }}
      />
      {selected.map(item =>
        <Chip
          key={item.text}
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

import { Autocomplete, TextField } from '@mui/material';

import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { Place } from 'src/types';

export interface LocationSelectProps {
  place: Place;
  setPlace: Dispatch<SetStateAction<Place>>;
}

const LocationSelect: FC<LocationSelectProps> = ({
  place,
  setPlace,
}: LocationSelectProps) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesAutocompleteService({
      options: {
        input: '',
        componentRestrictions: { country: 'us' },
      },
      apiKey: 'AIzaSyC41gKwv8dQF1yN0WKNmCmZn08ikNmLSAU',
    });

  const handleSearch = (search: string) => {
    setPlace({
      ...place,
      city: search,
    });
    getPlacePredictions({
      input: search,
    });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };
  const handleInput = (
    _: SyntheticEvent<Element, Event>,
    // @ts-expect-error this is complex
    value: google.maps.places.AutocompletePrediction
  ) => {
    if (value) {
      let termsCityStateCountry = value?.terms;
      if (value?.terms.length >= 3) {
        termsCityStateCountry = value?.terms?.reverse().slice(0, 3);
        termsCityStateCountry.shift();
      }

      const [{ value: state }, { value: city }] = termsCityStateCountry;

      setPlace({
        ...place,
        ...{
          description: value.description,
          city,
          state,
        },
      });
    } else {
      setPlace({
        ...place,
        ...{
          description: '',
          city: '',
          state: '',
        },
      });
    }
  };

  return (
    <Autocomplete
      inputValue={place.description || place.city}
      options={placePredictions}
      getOptionLabel={(option) => option.description}
      onChange={handleInput}
      loading={isPlacePredictionsLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search by city, state..."
          onChange={handleChange}
          name="places"
          id="places-input"
          variant="outlined"
        />
      )}
    />
  );
};

export default LocationSelect;

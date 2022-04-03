import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { PropTypes } from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelect(props) {
  const { label, items, handleSelection } = props;
  const theme = useTheme();
  const [values, setValues] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    var selectedValues = typeof value === 'string' ? value.split(',') : value;
    setValues(selectedValues);
    handleSelection(selectedValues);
  };

  const handleDelete = (value) => {
    const items = values.filter((item) => item !== value);
    setValues(items);
    handleSelection(items);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, width: 350 }}
        style={{ width: '95%', maxWidth: '350px', marginLeft: '0px' }}
      >
        <InputLabel id="multi-select-label">{label}</InputLabel>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple
          value={values}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={items.find((item) => item.value === value).name}
                  onDelete={() => handleDelete(value)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              style={getStyles(item.name, values, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
MultiSelect.propTypes = {
  label: PropTypes.string,
  items: PropTypes.any,
  handleSelection: PropTypes.func,
};

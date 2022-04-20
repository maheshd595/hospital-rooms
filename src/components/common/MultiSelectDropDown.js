import React, { useState } from 'react';
import Select from 'react-select';
import { PropTypes } from 'prop-types';

export default function MultiSelectDropDown(props) {
  const {
    label,
    items,
    selectedOpts,
    handleOpenSelect,
    handleSelection,
    loading,
  } = props;
  const [value, setValue] = useState([]);

  React.useEffect(() => {
    setValue([]);
    checkHasElement();
  }, [selectedOpts, loading]);

  const checkHasElement = () => {
    var optionArr = [];
    selectedOpts.forEach((opt) => {
      optionArr.push(items.find((item) => item.value === opt));
    });
    setValue(optionArr);
  };

  const handleChange = (values) => {
    handleSelection(values.map((a) => a.value));
  };

  return (
    <div>
      <span style={{ fontSize: '14px' }}>{label}</span>
      <div style={{ marginRight: '10px', marginTop: '2px' }}>
        <Select
          isMulti
          defaultValue="select Location"
          value={value}
          name="name"
          options={items}
          onMenuOpen={handleOpenSelect}
          onChange={handleChange}
          className="basic-multi-select"
          classNamePrefix="select"
          menuPortalTarget={document.body}
          isLoading={loading}
          isDisabled={loading}
          menuPlacement="auto"
        />
      </div>
    </div>
  );
}

MultiSelectDropDown.propTypes = {
  label: PropTypes.any,
  items: PropTypes.any,
  selectedOpts: PropTypes.any,
  handleSelection: PropTypes.func,
  handleOpenSelect: PropTypes.func,
  loading: PropTypes.any,
};

// Copy from https://github.com/hnordt/react-number-picker/blob/master/index.babel.js

import React, { PropTypes } from 'react';
import range from 'lodash.range';

import Picker from './Picker';

export default function NumberPicker({
  min,
  max,
  step,
  reverse,
  ...other
}) {
  const options = range(min, max + 1, step);
  if (reverse) {
    options.reverse();
  }
  return (
    <Picker
      {...other}
      options={options.map(value => ({ label: value, value }))}
    />
  );
}

NumberPicker.propTypes = {
  className: PropTypes.string,
  optionsPerRow: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  reverse: PropTypes.bool,
  renderHeader: PropTypes.func,
  renderOption: PropTypes.func,
  onChange: PropTypes.func
};

NumberPicker.defaultProps = Picker.defaultProps;

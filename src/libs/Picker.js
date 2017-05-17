/* eslint react/no-multi-comp: 0 */
// Copy from https://github.com/hnordt/react-picker/blob/master/index.babel.js

import React, { PropTypes } from 'react';
import chunk from 'lodash.chunk';

export default function Picker({
  className,
  options,
  optionsPerRow,
  value: currentValue,
  renderHeader,
  renderOption,
  onChange,
  ...other
}) {
  const header = renderHeader && renderHeader(currentValue);
  const chunks = chunk(options, optionsPerRow);
  // Error: Warning: Unknown prop `yearFormat` on <table> tag.
  delete other.yearFormat;
  return (
    <table {...other} className={className}>
      {header && (
        <thead>
          <tr>
            <td colSpan={optionsPerRow}>
              {header}
            </td>
          </tr>
        </thead>
      )}
      <tbody>
        {chunks.map((opts, chunkIndex) => (
          <tr key={chunkIndex}>
            {opts.map(option => {
              if (option.readOnly || !onChange) {
                return (
                  <td key={option.value}>
                    {renderOption(option, currentValue)}
                  </td>
                );
              }
              return (
                <td
                  key={option.value}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onChange(option.value)}
                >
                  {renderOption(option, currentValue)}
                </td>
              );
            })}
            {opts.length < optionsPerRow && <td colSpan={optionsPerRow - opts.length} />}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Picker.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    readOnly: PropTypes.bool
  })).isRequired,
  optionsPerRow: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  renderHeader: PropTypes.func,
  renderOption: PropTypes.func,
  onChange: PropTypes.func
};

Picker.defaultProps = {
  className: 'smalldots-react-picker table table-condensed table-striped text-center',
  optionsPerRow: 5,
  renderOption: (option, currentValue) => {
    if (option.value === currentValue) {
      return <span className="badge">{option.label}</span>;
    }
    return option.label;
  }
};

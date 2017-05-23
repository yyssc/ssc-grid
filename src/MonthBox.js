import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

/**
 * MonthBox 只提供给MonthPicker组件使用
 */
const MonthBox = createReactClass({
  propTypes: {
    value: PropTypes.string,
    onClick: PropTypes.func
  },
  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || ''
    });
  },
  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  },
  render() {
    return (
      <div className="box" onClick={this.handleClick}>
        <input type="text" value={this.state.value}
          onChange={() => {}}
        />
      </div>
    );
  }

});
export default MonthBox;

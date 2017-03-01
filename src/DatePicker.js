import React, { Component, PropTypes } from 'react';
import { default as ReactBootstrapDatePicker } from 'react-bootstrap-date-picker';

/**
 * DatePicker控件
 */
export default class DatePicker extends Component {
  static defaultProps = {
  }

  static propTypes = {
    id: PropTypes.string,
    /**
     * value
     */
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
  };

  constructor(props) {
    super(props);
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const { id, value } = this.props;
    return (<ReactBootstrapDatePicker
      id={id} value={value} onChange={this.handleChange.bind(this)} />);
  }
}

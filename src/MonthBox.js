import React from 'react';

/**
 * MonthBox 只提供给MonthPicker组件使用
 */
const MonthBox = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  getInitialState() {
    return {
      value: this.props.value || 'N/A'
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || 'N/A'
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

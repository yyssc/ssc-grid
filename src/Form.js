import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class Form extends Component {
  static propTypes = {
    /**
     * 表单中的数据
     */
    formDefaultData: PropTypes.array.isRequired,
    /**
     * 光标离开文本框时候调用该函数
     */
    onBlur: PropTypes.func,
    /**
     * 点击提交时候调用该函数
     */
    onSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  getValidationState() {
    //return 'error';
    //return 'warning';
    return 'success';
  }

  // Performance issue?
  // http://stackoverflow.com/questions/33266156/react-redux-input-onchange-is-very-slow-when-typing-in-when-the-input-have-a
  handleBlur(label, event) {
    if (this.props.onBlur) {
      this.props.onBlur(label, event.target.value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  handleReset() {
  }

  render() {
    const { formDefaultData, className } = this.props;

    const FieldGroup = ({ key, id, label, help, ...props }) => {
      return (
        <FormGroup key={key} controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    return (
      <div className={classNames(className)}>
        <form>
          {formDefaultData.map(col =>
            <FieldGroup
              key={col.label}
              id={`formControlsText-${col.label}`}
              type={col.type}
              label={col.label}
              placeholder="Enter text"
              defaultValue={col.value}
              onBlur={this.handleBlur.bind(this, col.label)}
            />
          )}
          <Button onClick={this.handleSubmit.bind(this)} type="submit">保存</Button>
          <Button onClick={this.handleReset.bind(this)} type="reset">清空</Button>
        </form>
      </div>
    );
  }
};

import classNames from 'classnames';
import React, { PropTypes } from 'react';

import { Button, FormGroup, ControlLabel } from 'react-bootstrap';

// form control
import { FormControl } from 'react-bootstrap';

export default React.createClass({
  propTypes: {
    fieldsModel: PropTypes.array.isRequired,
    defaultData: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func
  },
  getInitialState() {
    return {
      formData: {...this.props.defaultData}
    };
  },

  handleChange(id, e) {
    const newState = {
      formData: this.state.formData
    };
    newState.formData[id] = e.target.value;
    this.setState(newState);
    this.props.onChange(e, id);
  },

  handleSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.formData);
    }
  },

  handleReset(event) {
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  },

  render() {
    const { fieldsModel, className } = this.props;
    return (
      <form className={classNames(className)}>
        {
          fieldsModel.map((fieldModel, index) => {
            return (
              <FormGroup
                key={index}
                controlId={`formBasicText-${fieldModel.id}`}
              >
                <ControlLabel>{fieldModel.label}</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.formData[fieldModel.id]}
                  placeholder={fieldModel.placeholder}
                  onChange={this.handleChange.bind(this, fieldModel.id)}
                />
                <FormControl.Feedback />
              </FormGroup>
            );
          })
        }
        <Button onClick={this.handleSubmit} type="submit">保存</Button>
        <Button onClick={this.handleReset} type="reset">清空</Button>
      </form>
    );
  }
});

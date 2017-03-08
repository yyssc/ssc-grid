const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'string', id: 'formValidationDanjubianhao', label: '单据编号',
    validation: {
      type: 'required'
    }
  },
  {type: 'string', id: 'formValidationEmail', label: '邮箱地址',
    validation: {
      type: 'email'
    }
  }
];

const mockFormData = {
  id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  formValidationDanjubianhao: 'abc123',
  formValidationEmail: 'a@b.com'
};

const FormValidationExample = React.createClass({
  getInitialState() {
    return {
      formData: {}
    };
  },

  handleBlur(/* index, fieldModel, value */) {
  },

  handleChange(fieldId, value) {
    const newState = { ...this.state };
    newState.formData[fieldId] = value;
    this.setState(newState);
  },

  handleSubmit(event, formData) {
    alert('提交的数据: Form.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
    event.preventDefault();
  },

  render() {
    return (
      <Form
        className="form-validation-example"
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormValidationExample />, mountNode);

const mockFieldsModel = [
  { type: 'string', id: 'name', label: '名称', validators: [{type: 'required'}], }
];
const mockFormData = { name: '' };
const FormValidationExample = React.createClass({
  getInitialState() {
    return {
      formData: {}
    };
  },
  handleChange(fieldId, value) {
    const newState = { ...this.state };
    newState.formData[fieldId] = value;
    this.setState(newState);
  },
  handleSubmit(formData) {
    alert('Form.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
  },
  handleClick() {
    // submit() function
    // 1. Show validation status on text box
    // 2. call onSubmit callback
    this.formRef.submit();
  },
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Submit form</button>
        <Form
          ref={(c) => { this.formRef = c; }}
          fieldsModel={mockFieldsModel}
          defaultData={mockFormData}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          showSubmitButton={false}
        />
      </div>
    );
  }
});
ReactDOM.render(<FormValidationExample />, mountNode);

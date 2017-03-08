const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'ref', id: 'zuzhi', label: '组织'}
];

const mockFormData = {
  id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  zuzhi: {
    id: '02EDD0F9-F384-43BF-9398-5E5781DAC5D0',
    code: '0502',
    name: '二车间',
    config: {
      referConditions: {
        refCode: 'dept',
        refType: 'tree',
        rootName: '部门'
      },
      referDataUrl: 'http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON'
    }
  }
};

const FormWithReferExample = React.createClass({
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
        className="form-with-refer-example"
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormWithReferExample />, mountNode);

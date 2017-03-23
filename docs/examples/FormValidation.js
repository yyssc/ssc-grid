const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'string', id: 'formValidationName', label: '名称',
    validation: {type: 'required'}
  },
  {type: 'string', id: 'formValidationDanjubianhao', label: '单据编号',
    validation: {type: 'required'}
  },
  {type: 'string', id: 'formValidationEmail', label: '邮箱地址',
    validation: {type: 'email'}
  },
  {type: 'ref', id: 'formValidationPkOrg', label: '组织',
    referConfig: {
      referConditions: {refCode: 'org', refType: 'tree', rootName: '组织'},
      referDataUrl: 'http://127.0.0.1:3009/refbase_ctr/queryRefJSON'
    },
    validation: {
      type: 'required'
    }
  },
  {type: 'enum', label: '账户性质', id: 'formValidationAccountProperty',
    data: [
      {key: 'BASE', value: '基本'},
      {key: 'NORMAL', value: '一般'},
      {key: 'TEMPORARY', value: '临时'},
      {key: 'SPECIAL', value: '专用'}
    ],
    validation: {
      type: 'required'
    }
  }
];

const mockFormData = {
  formValidationName: '',
  formValidationDanjubianhao: '',
  formValidationEmail: '',
  formValidationPkOrg: null,
  formValidationAccountProperty: ''
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
    alert('提交的数据: formData: \n' + JSON.stringify(
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

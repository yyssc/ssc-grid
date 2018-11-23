const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'ref', id: 'pk_org', label: '组织',
    referConfig: {
      referConditions: {
        refCode: 'org',
        refType: 'tree',
        rootName: '组织'
      },
      referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
    }
  },
  {type: 'ref', id: 'parentid', label: '上级部门',
    referConfig: {
      referConditions: {
        refCode: 'dept',
        refType: 'tree',
        rootName: '部门'
      },
      referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
    }
  },
  {type: 'ref', id: 'person', label: '部门主管', placeholder: 'Please select',
    referConfig: {
      referConditions: {
        refCode: 'user',
        refType: 'tree',
        rootName: '部门主管'
      },
      referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
    },
    referExtend: {
      showDisabledBtnText: 'Show Disabled',
      showDisabledBtnText_Not: 'Hide Disabled'
    },
  }
];

const mockFormData = {
  id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  pk_org: {
    id: 'G001ZM0000BASEDOCDEFAULTORG000000000',
    code: '0001',
    name: '默认组织',
  },
  parentid: {
    code: 'fi',
    name: '财务部门',
    id: '27A8CFA0-A8EF-4D0B-AF99-B31861849471'
  },
  person: null
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

  handleSubmit(formData) {
    alert('提交的数据: Form.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
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

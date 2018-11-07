// 封装一个文本框作为自定义组件
const CustomTextFieldComponent = React.createClass({
  propTypes: {
    customFieldValue: React.PropTypes.string,
    onCustomFieldChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
      value: this.props.customFieldValue
    };
  },
  handleChange(event) {
    let value = event.target.value;
    this.setState({ value });
    if (this.props.onCustomFieldChange) {
      this.props.onCustomFieldChange(value);
    }
  },
  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
});

const DropdownData = [
  {id: 'dept', name: '部门'},
  {id: 'org', name: '组织'},
  {id: 'user', name: '人员'}
];

// 封装一个下拉菜单作为自定义组件
const DropdownComponent = React.createClass({
  propTypes: {
    /**
     * Form组件传入的值
     * value = {id: '2631', name: '差旅费借款单'}
     */
    customFieldValue: React.PropTypes.object,
    onCustomFieldChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    const { customFieldValue } = this.props;
    return {
      /**
       * 下拉菜单的id，比如'2631'
       */
      dropdownId: customFieldValue ? customFieldValue.id : ''
    };
  },
  handleChange(event) {
    let dropdownId = event.target.value;
    this.setState({
      dropdownId
    });
    if (this.props.onCustomFieldChange) {
      let value = DropdownData.find(item => item.id === dropdownId);
      this.props.onCustomFieldChange(value);
    }
  },
  render() {
    return (
      <FormControl componentClass="select"
        value={this.state.dropdownId}
        onChange={this.handleChange}
      >
        {DropdownData.map(
          opt => <option key={opt.id} value={opt.id}>{opt.name}</option>
        )}
      </FormControl>
    );
  }
});

// 封装一个参照组件作为自定义组件
const ReferComponent = React.createClass({
  propTypes: {
    customFieldModel: React.PropTypes.object.isRequired,
    /**
     * Form表单组件传入的值
     * ```js
     * [{
     *   id: 'G001ZM0000BASEDOCDEFAULTORG000000000',
     *   code: '0001',
     *   name: '默认组织'
     * }]
     * ```
     */
    customFieldValue: React.PropTypes.array,
    /**
     * 自定义类型字段发生变化的时候
     * @param {Object} value 参照值，比如
     * ```js
     * [{
     *   id: 'G001ZM0000BASEDOCDEFAULTORG000000000',
     *   code: '0001',
     *   name: '默认组织'
     * }]
     * ```
     */
    onCustomFieldChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
    };
  },
  handleChange(selected) {
    // alert(JSON.stringify(selected));
    if (this.props.onCustomFieldChange) {
      this.props.onCustomFieldChange(selected);
    }
  },
  render() {
    const referConditions = {
      refCode: this.props.customFieldModel.refCode || 'dept',
      refType: 'tree',
      rootName: this.props.customFieldModel.rootName || '部门',
    };
    let referDataUrl = 'http://127.0.0.1:3009/refbase_ctr/queryRefJSON';
    if (this.props.customFieldModel.refCode === 'user') {
      referDataUrl = 'http://127.0.0.1:3009/userCenter/queryUserAndDeptByDeptPk';
    }
    return (
      <Refers
        disabled={this.props.customFieldModel.disabled === true}
        minLength={0}
        align="justify"
        emptyLabel=""
        labelKey="name"
        onChange={this.handleChange}
        placeholder="请选择..."
        referConditions={referConditions}
        referDataUrl={referDataUrl}
        referType="list"
        defaultSelected={this.props.customFieldValue}
        ref={ref => this._myrefers = ref}
      />
    );
  }
});

const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {id: 'code', dataType: 0, datatype: 0, type: 'string', label: '编码', hidden: false, defaultValue: '', validators: [{type: 'required'}, {type: 'length', options: {min: 0, max: 50}}]},
  {type: 'custom', id: 'name', label: '名称', component: CustomTextFieldComponent, defaultValue: '', validators: [{type: 'required'}, {type: 'length', 'options': {min: 0, max: 100}}]},
  {type: 'custom', id: 'formCustomFieldCanzhaoleixing', label: '参照类型',component: DropdownComponent, data: DropdownData},
  {type: 'custom', id: 'formCustomFieldParentId', label: '组织', component: ReferComponent}
];

const mockFormData = {
  id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  code: '',
  name: '',
  formCustomFieldCanzhaoleixing: {
    id: 'org',
    name: '组织',
  },
  formCustomFieldParentId: []
};

const FormCustomFieldExample = React.createClass({
  getInitialState() {
    return {
      formData: mockFormData
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
    // 动态设置参照字段模型
    if (this.state.formData.formCustomFieldCanzhaoleixing) {
      mockFieldsModel[3].disabled = false;
      mockFieldsModel[3].refCode = this.state.formData.formCustomFieldCanzhaoleixing.id;
      mockFieldsModel[3].rootName = this.state.formData.formCustomFieldCanzhaoleixing.name;
    } else {
      mockFieldsModel[3].disabled = true;
    }

    return (
      <Form
        className="form-custom-field-example"
        fieldsModel={mockFieldsModel}
        defaultData={this.state.formData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormCustomFieldExample />, mountNode);

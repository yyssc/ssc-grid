// 封装一个文本框作为自定义组件
const CustomTextFieldComponent = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
      value: this.props.value
    };
  },
  handleChange(event) {
    let value = event.target.value;
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
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
  {id: '2631', name: '差旅费借款单'},
  {id: '2632', name: '会议费借款单'},
  {id: 'D3', name: '付款单'}
];

// 封装一个下拉菜单作为自定义组件
const DropdownComponent = React.createClass({
  propTypes: {
    /**
     * Form组件传入的值
     * value = {id: '2631', name: '差旅费借款单'}
     */
    value: React.PropTypes.object,
    onChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
      /**
       * 下拉菜单的id，比如'2631'
       */
      dropdownId: this.props.value.id
    };
  },
  handleChange(event) {
    let dropdownId = event.target.value;
    this.setState({
      dropdownId
    });
    if (this.props.onChange) {
      let value = DropdownData.find(item => item.id === dropdownId);
      this.props.onChange(value);
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

const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'custom', id: 'name', label: '名称', component: CustomTextFieldComponent},
  {type: 'custom', id: 'danjuleixing', label: '单据类型',
    component: DropdownComponent, data: DropdownData}
];

const mockFormData = {
  id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  name: '',
  danjuleixing: {
    id: 'D3',
    name: '付款单',
  }
};

const FormCustomFieldExample = React.createClass({
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

ReactDOM.render(<FormCustomFieldExample />, mountNode);

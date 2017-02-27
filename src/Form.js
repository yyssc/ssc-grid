import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Button, Form as ReactBootstrapForm, FormGroup, ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 */

// 表单(form)控件(control/widget)
import { FormControl, Checkbox } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

// 使用我们自己造的轮子
import TextField from './TextField';

export default class Form extends Component {
  static propTypes = {
    /**
     * 表单中的数据
     */
    fieldsModel: PropTypes.array.isRequired,
    /**
     * 填充表单值<br>
     * 时间类型比较特殊，请先转成
     * <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式的字符串
     * 之后，再传进来。
     * <pre><code>defaultData = {
     *   date: new Date('2017-02-14').toISOString()
     * }</code></pre>
     */
    defaultData: PropTypes.object,
    /**
     * 当控件的值发生改变的时候触发<br>
     * 参数1, <code>fieldId</code>, 也就是传入组件中fieldsModel中的id<br>
     * 参数2, <code>value</code>, 改变之后的值<br>
     * 参数3, <code>opt</code>, 可选参数，当type为string/boolean/enum等简单类型的时候，可以
     *             通过opt.event获取Event对象。<br>
     *             当type为date类型的时候，可以通过opt.formattedValue获取格式化
     *             之后的时间值。<br>
     */
    onChange: PropTypes.func,
    /**
     * 当表单被提交的时候触发<br>
     * 参数1, <code>event</code>, Event对象<br>
     * 参数2. <code>formData</code>, 整个表单中所有控件的值，是一个JSON对象，结构和传入参数
     *                  defaultData保持一致。<br>
     */
    onSubmit: PropTypes.func,
    /**
     * 当点击“重置”按钮的时候
     */
    onReset: PropTypes.func
  };

  state = {
    formData: {...this.props.defaultData}
  };

  constructor(props) {
    super(props);
  }

  // 这里只处理简单类型的控件，比如input, select, checkbox
  // 不处理复杂类型的空间，比如date-picker
  handleChange(fieldId, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    const newState = {
      formData: this.state.formData
    };
    newState.formData[fieldId] = value;
    this.setState(newState);

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        event
      });
    }
  }

  // 只处理date-picker控件
  handleDatePickerChange(fieldId, value, formattedValue) {
    const newState = { ...this.state };
    newState.formData[fieldId] = value;
    this.setState(newState);

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        formattedValue
      });
    }
  }

  handleSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.formData);
    }
  }

  handleReset(event) {
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  }

  render() {
    const { fieldsModel, className } = this.props;
    return (
      <ReactBootstrapForm horizontal className={classNames(className)}>
        {
          fieldsModel.map((fieldModel, index) => {
            const { id, type, label, placeholder, validationType } = fieldModel;
            let formCtrl;

            // 隐藏字段
            if (fieldModel.hidden === true) {
              return null;
            }

            // 根据字段类型，生成不同的表单控件
            // 每个类型后面跟着的数字是后端传过来的datatype，这里提到的后端是
            // 用友自己的后端，Form组件并不依赖这些datetype数值，写在这里只是
            // 为了用友程序员调试方便。
            switch (type) {
              default:
              case 'string': // 0
              case 'double': // 2
              case 'ref': // 5
                formCtrl = (
                  <TextField
                    value={this.state.formData[id]}
                    placeholder={placeholder}
                    validationType={validationType}
                    onChange={this.handleChange.bind(this, id)}
                  />
                );
                break;
              case 'date': // 3
                // 注意value的格式
                // value = new Date().toISOString()
                formCtrl = (
                  <DatePicker
                    value={this.state.formData[id]}
                    onChange={this.handleDatePickerChange.bind(this, id)}
                  />
                );
                break;
              case 'boolean': // 4
                formCtrl = (
                  <Checkbox checked={this.state.formData[id]}
                    onChange={this.handleChange.bind(this, id)}
                  />
                );
                break;
              case 'enum': // 6
                formCtrl = (
                  <FormControl componentClass="select" placeholder={placeholder && '请选择'}
                    value={this.state.formData[id]}
                    onChange={this.handleChange.bind(this, id)}
                  >
                    {fieldModel.data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
                  </FormControl>
                );
                break;
            }
            return (
              <FormGroup
                key={index}
                controlId={`formControl-${id}`}
              >
                <Col sm={2}>
                  {}
                </Col>
                <Col componentClass={ControlLabel} sm={2}>
                  {label}
                </Col>
                <Col sm={5}>
                  {formCtrl}
                </Col>
                <Col sm={3}>
                  {}
                </Col>
                <FormControl.Feedback />
              </FormGroup>
            );
          })
        }
        <FormGroup>
          <Col sm={12} className={'text-center'}>
            <Button bsStyle="info" onClick={this.handleReset.bind(this)} type="reset">
              取消
            </Button>
            <Button bsStyle="info" onClick={this.handleSubmit.bind(this)} type="submit">
              完成
            </Button>
          </Col>
        </FormGroup>
      </ReactBootstrapForm>
    );
  }
}

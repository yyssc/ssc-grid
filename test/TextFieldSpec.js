import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import TextField from '../src/TextField';

describe('<TextField>', () => {

  /**
   * helper function
   */

  function getTextField(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  /**
   * 文本框是否有验证错误样式
   * 如果验证错误，className会自动添加has-error，UI就可以显示红色错误提示
   */
  // const hasErrorStyle = textField => {
  //   return textField.className.indexOf('has-error') !== -1;
  // };

  /**
   * 文本框是否有验证成功的样式
   * 如果验证成功，className会自动添加has-success，UI就可以显示绿色的成功提示
   */
  // const hasSuccessStyle = textField => {
  //   return textField.className.indexOf('has-success') !== -1;
  // };

  /**
   * 文本框没有校验状态的样式
   * 如果没有开始进行校验，className中不应该存在has-{success/warning/error}
   */
  // const hasNoValidationStateStyle = ({className}) => (
  //   ['has-success', 'has-warning', 'has-error'].reduce((accumulator, currentStyleName) => (
  //     accumulator && className.indexOf(currentStyleName) === -1
  //   ), true)
  // );

  it('uses "input" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField />
    );

    assert.equal(getTextField(instance).nodeName, 'INPUT');
  });

  it('正确显示通过value传入的值', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );

    assert.equal(getTextField(instance).value, 'abc123');
  });

  it('正确禁用字段', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
        disabled
      />
    );
    let textField = getTextField(instance);
    assert.equal(textField.disabled, true);
    instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );
    textField = getTextField(instance);
    assert.equal(textField.disabled, false);
  });

  it('当用户修改文本框中的值的时候，输入框中的值和组件的state.value应该相应变化', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = 'abc123 modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'abc123 modified');
    assert.equal(instance.state.value, 'abc123 modified');
  });

  it('当用户修改文本框中的值的时候，输入框中的值和组件的state.value应该相应变化', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField />
    );

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = 'modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'modified');
    assert.equal(instance.state.value, 'modified');
  });

  it('通过props更新输入框的默认值，应该重新渲染为新数据', () => {
    let node = document.createElement('div');
    let component;

    component = ReactDOM.render(
      <TextField
        value="a123"
      />, node
    );
    assert.equal(component.state.value, 'a123');
    assert.equal(getTextField(component).value, 'a123');
    component = ReactDOM.render(
      <TextField
        value="b456"
      />, node
    );
    assert.equal(component.state.value, 'b456');
    assert.equal(getTextField(component).value, 'b456');
  });

});

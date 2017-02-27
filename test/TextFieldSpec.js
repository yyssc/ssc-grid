import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import TextField from '../src/TextField';

describe('<TextField>', () => {

  // helper function

  function getTextField(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  function getInputInTextField(instance) {
    return getTextField(instance).querySelector('input');
  }

  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField />
    );

    assert.equal(getTextField(instance).nodeName, 'DIV');
  });

  it('正确显示通过value传入的值', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );

    assert.equal(getInputInTextField(instance).value, 'abc123');
  });

  it('当用户修改文本框中的值的时候，输入框中的值和组件的state.value应该相应变化', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );

    // 修改文本框中的值
    let inputNode = getInputInTextField(instance);
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
    let inputNode = getInputInTextField(instance);
    inputNode.value = 'modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'modified');
    assert.equal(instance.state.value, 'modified');
  });

  it('应该正确校验Email地址', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        validationType="email"
      />
    );

    // 修改文本框中的值
    let textField = getTextField(instance);
    let inputNode = getInputInTextField(instance);
    inputNode.value = 'not_email';
    ReactTestUtils.Simulate.change(inputNode);
    // 如果验证错误，会自动添加has-error，UI就可以显示红色字体了
    assert.notEqual(textField.className.indexOf('has-error'), -1);
  });

});

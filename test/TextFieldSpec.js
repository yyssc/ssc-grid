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

  // 1. 初始输入框为空，没有显示校验错误的红色字样
  // 2. 用户focus输入框，开始输入，不应该显示校验错误的红色字样
  // 3. 用户blur输入框，应该显示红色字样
  // 4. 用户focus输入框，继续输入，仍然显示红色字样
  // 5. 输入了正确的Email地址，不再显示红色字样
  it('应该正确校验Email地址', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        validation={{ type: 'email' }}
      />
    );

    let textField = getTextField(instance);
    let inputNode = getInputInTextField(instance);

    // 初始状态，不进行验证，UI不应该显示红色字体
    assert.equal(textField.className.indexOf('has-error'), -1);

    // 修改文本框中的值
    inputNode.value = 'not_email';
    ReactTestUtils.Simulate.change(inputNode);
    // 如果验证错误，会自动添加has-error，UI就可以显示红色字体了
    assert.notEqual(textField.className.indexOf('has-error'), -1);
  });

});

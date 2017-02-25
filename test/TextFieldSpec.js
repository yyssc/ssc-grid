import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import TextField from '../src/TextField';

describe('<TextField>', () => {

  // helper function

  function getInput(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  it('uses "input" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField />
    );

    assert.equal(getInput(instance).nodeName, 'INPUT');
  });

  it('正确显示通过value传入的值', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).value, 'abc123');
  });

  it('当用户修改文本框中的值的时候，输入框中的值和组件的state.value应该相应变化', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TextField
        value="abc123"
      />
    );

    // 修改文本框中的值
    let inputNode = getInput(instance);
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
    let inputNode = getInput(instance);
    inputNode.value = 'modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'modified');
    assert.equal(instance.state.value, 'modified');
  });

});

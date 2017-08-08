import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import ValidateInput from '../src/ValidateInput';
import {
  hasSuccessStyle,
  hasErrorStyle,
  getHelpText,
  getContainer,
  getTextField,
  hasNoValidationStateStyle
} from './helpers';

describe('<ValidateInput> Internal type', () => {

  // TODO 没有找到方法来测试非法参数
  // it('出现未知类型应该报错', () => {
  //   ReactTestUtils.renderIntoDocument(
  //     <ValidateInput
  //       validators={[
  //         { type: 'foo' }
  //       ]}
  //     />
  //   );
  // });

  it('正确处理内置校验 type: currency', () => {
    let validateInputRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          { type: 'currency' },
        ]}
        value="123abc"
      />
    );
    const validationContainer = getContainer(instance);

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true);
    assert.equal(getHelpText(validationContainer), '\n请输入正确的货币格式！');
    assert.equal(validationResult, false);

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = '123';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false);
    assert.equal(getHelpText(validationContainer), '');
    assert.equal(validationResult, true);
  });

  it('正确处理内置校验 type: decimal', () => {
    let validateInputRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          { type: 'decimal' },
        ]}
        value="123abc"
      />
    );
    const validationContainer = getContainer(instance);

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true);
    assert.equal(getHelpText(validationContainer), '\n请输入正确的数字格式！');
    assert.equal(validationResult, false);

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = '123';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false);
    assert.equal(getHelpText(validationContainer), '');
    assert.equal(validationResult, true);
  });

  it('应该正确校验Email地址 type: email', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'email' }
        ]}
      />
    );

    let validationContainer = getContainer(instance);
    let inputNode = getTextField(instance);

    assert.equal(hasNoValidationStateStyle(validationContainer), true,
      '1. 组件刚初始化完，输入框为空，不应该显示校验样式');

    ReactTestUtils.Simulate.focus(inputNode);
    assert.equal(hasNoValidationStateStyle(validationContainer), true,
      '2. 用户focus到输入框，还没有开始输入，不应该显示校验状态');

    inputNode.value = 'chenyangf@';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '3. 用户往文本框输入内容“chenyangf@”，应该显示校验错误的红色样式');

    inputNode.value = 'chenyangf@yonyou.com';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasSuccessStyle(validationContainer), true,
      '4. 用户往文本框输入内容“chenyangf@yonyou.com”，应该校验成功');
  });

  it('正确处理内置校验 type: int', () => {
    let validateInputRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          { type: 'int' },
        ]}
        value="123abc"
      />
    );
    const validationContainer = getContainer(instance);

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true);
    assert.equal(getHelpText(validationContainer), '\n请输入正确的整数格式！');
    assert.equal(validationResult, false);

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = '123';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false);
    assert.equal(getHelpText(validationContainer), '');
    assert.equal(validationResult, true);
  });

  it('正确处理内置校验 type: length', () => {
    let validateInputRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          { type: 'length', options: { min: 3, max: 6 } },
        ]}
        value="1"
      />
    );
    const validationContainer = getContainer(instance);

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true);
    assert.equal(getHelpText(validationContainer), '\n输入长度必须介于 3 和 6 之间的字符串');
    assert.equal(validationResult, false);

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = '1234';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false);
    assert.equal(getHelpText(validationContainer), '');
    assert.equal(validationResult, true);
  });

  it('正确处理内置校验 type: mobilePhone', () => {
    let validateInputRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          { type: 'mobilePhone' },
        ]}
        value="1"
      />
    );
    const validationContainer = getContainer(instance);

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true);
    assert.equal(getHelpText(validationContainer), '\n请输入正确的手机号格式!');
    assert.equal(validationResult, false);

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = '18911112222';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false);
    assert.equal(getHelpText(validationContainer), '');
    assert.equal(validationResult, true);
  });

  it('正确处理内置校验 type: required', () => {
    let validateInputRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          { type: 'required' },
        ]}
        value=""
      />
    );
    const validationContainer = getContainer(instance);

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true);
    assert.equal(getHelpText(validationContainer), '\n必须输入该字段！');
    assert.equal(validationResult, false);

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = 'abc123';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false);
    assert.equal(getHelpText(validationContainer), '');
    assert.equal(validationResult, true);
  });

  it('应该正确进行非空校验', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        value=""
        validators={[
          { type: 'required' }
        ]}
      />
    );

    let validationContainer = getContainer(instance);
    let inputNode = getTextField(instance);

    assert.equal(hasNoValidationStateStyle(validationContainer), true,
      '1. 组件刚初始化完，输入框为空，不应该显示校验状态');
    assert.equal(getHelpText(validationContainer), '',
      '1.1 不应该显示错误提示');
    assert.equal(instance.state.validationState, null);

    ReactTestUtils.Simulate.focus(inputNode);
    assert.equal(hasNoValidationStateStyle(validationContainer), true,
      '2. 用户focus到输入框，还没有开始输入，不应该显示校验状态');
    assert.equal(getHelpText(validationContainer), '',
      '2.1 不应该显示错误提示');
    assert.equal(instance.state.validationState, null);

    ReactTestUtils.Simulate.blur(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '3. 用户blur出输入框，应该显示校验失败状态');
    assert.equal(getHelpText(validationContainer), '\n必须输入该字段！',
      '3.1 应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');

    ReactTestUtils.Simulate.focus(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '4. 用户focus到输入框，应该仍然显示校验失败');
    assert.equal(getHelpText(validationContainer), '\n必须输入该字段！',
      '4.1 应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');

    inputNode.value = 'd3vin';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasSuccessStyle(validationContainer), true,
      '5. 用户往文本框输入任意内容，应该校验成功');
    assert.equal(getHelpText(validationContainer), '',
      '5.1 不应该显示错误提示');
    assert.equal(instance.state.validationState, 'success');

    inputNode.value = '';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '6. 用户清空文本框，应该校验失败');
    assert.equal(getHelpText(validationContainer), '\n必须输入该字段！',
      '6.1 应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');
  });

  it('正确校验数字类型 type: decimal', () => {
    let validateInputRef;
    let node = document.createElement('div');
    let component;

    component = ReactDOM.render(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {type: 'decimal'},
          {
            type: 'custom',
            matchFunc: value => {
              return parseInt(value, 10) <= 100 && parseInt(value, 10) >= 0;
            },
            helpText: () => '残值率不能大于100%，小于0%',
          }
        ]}
        value="0"
      />, node
    );
    const validationContainer = getContainer(component);
    const inputNode = getTextField(component);

    assert.equal(validateInputRef.textFieldRef.state.value, '0');
    assert.equal(getTextField(component).value, '0');

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), false,
      '主动校验状态，应该显示校验失败样式');
    assert.equal(getHelpText(validationContainer), '',
      '不应该显示错误提示');
    assert.equal(component.state.validationState, 'success');
    assert.equal(validationResult, true);

    inputNode.value = '1000';
    ReactTestUtils.Simulate.change(inputNode);

    validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true,
      '主动校验状态，应该显示校验失败样式');
    assert.equal(getHelpText(validationContainer), '\n残值率不能大于100%，小于0%',
      '应该显示错误提示');
    assert.equal(component.state.validationState, 'error');
    assert.equal(validationResult, false);
  });

});

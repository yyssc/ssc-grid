import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import ValidateInput from '../src/ValidateInput';

describe('<ValidateInput>', () => {

  /**
   * helper function
   */

  function getContainer(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  function getTextField(instance) {
    return getContainer(instance).querySelector('input');
  }

  // 获取文本框校验状态的提示信息
  const getHelpText = container => container.querySelector('span.help-block').textContent;

  /**
   * 文本框是否有验证错误样式
   * 如果验证错误，className会自动添加has-error，UI就可以显示红色错误提示
   */
  const hasErrorStyle = textField => {
    return textField.className.indexOf('has-error') !== -1;
  };

  /**
   * 文本框是否有验证成功的样式
   * 如果验证成功，className会自动添加has-success，UI就可以显示绿色的成功提示
   */
  const hasSuccessStyle = textField => {
    return textField.className.indexOf('has-success') !== -1;
  };

  /**
   * 文本框没有校验状态的样式
   * 如果没有开始进行校验，className中不应该存在has-{success/warning/error}
   */
  const hasNoValidationStateStyle = ({className}) => (
    ['has-success', 'has-warning', 'has-error'].reduce((accumulator, currentStyleName) => (
      accumulator && className.indexOf(currentStyleName) === -1
    ), true)
  );

  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'required', },
        ]}
      />
    );

    assert.equal(getContainer(instance).nodeName, 'DIV');
  });

  it('正确处理缺省参数', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        value="abc123"
      />
    );
    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = 'abc123 modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'abc123 modified');
  });

  it('正确显示通过value传入的值', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'required', },
        ]}
        value="abc123"
      />
    );

    assert.equal(getTextField(instance).value, 'abc123');
  });

  it('正确渲染传入新的value', () => {
    let node = document.createElement('div');
    let instance = ReactDOM.render(
      <ValidateInput
        validators={[
          {
            type: 'required',
          }
        ]}
        value="123"
      />, node
    );
    assert.equal(getTextField(instance).value, '123');

    instance = ReactDOM.render(
      <ValidateInput
        validators={[
          {
            type: 'required',
          }
        ]}
        value="321"
      />, node
    );
    assert.equal(getTextField(instance).value, '321');
  });

  it('正确禁用字段', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'required', },
        ]}
        value="abc123"
        disabled
      />
    );
    let textField = getTextField(instance);
    assert.equal(textField.disabled, true);
    instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'required', },
        ]}
        value="abc123"
      />
    );
    textField = getTextField(instance);
    assert.equal(textField.disabled, false);
  });

  it('当用户修改文本框中的值的时候，输入框中的值和组件的state.value应该相应变化', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'required', },
        ]}
        value="abc123"
      />
    );

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = 'abc123 modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'abc123 modified');
    // 如何获得ValidateInput下一级别组件TextField组件的state?
    // assert.equal(instance.state.value, 'abc123 modified');
  });

  it('当用户修改文本框中的值的时候，输入框中的值和组件的state.value应该相应变化', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        validators={[
          { type: 'required', },
        ]}
      />
    );

    // 修改文本框中的值
    let inputNode = getTextField(instance);
    inputNode.value = 'modified';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(inputNode.value, 'modified');
    // 如何获得ValidateInput下一级别组件TextField组件的state?
    // assert.equal(instance.state.value, 'modified');
  });

  it('应该正确校验Email地址', () => {
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

  it('正确进行自定义校验', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        value=""
        validators={[
          {
            type: 'custom',
            helpText: (/* value, validator */) => '请确保字符长度大于等于3',
            matchFunc: value => (value.length >= 3),
          }
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
    assert.equal(getHelpText(validationContainer), '\n请确保字符长度大于等于3',
      '3.1 应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');

    ReactTestUtils.Simulate.focus(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '4. 用户focus到输入框，应该仍然显示校验失败');
    assert.equal(getHelpText(validationContainer), '\n请确保字符长度大于等于3',
      '4.1 应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');

    inputNode.value = 'd3';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '用户往文本框输入两个字符，应该校验失败');
    assert.equal(getHelpText(validationContainer), '\n请确保字符长度大于等于3',
      '应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');

    inputNode.value = 'd3vin';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasSuccessStyle(validationContainer), true,
      '5. 用户往文本框输入5个字符，应该校验成功');
    assert.equal(getHelpText(validationContainer), '',
      '5.1 不应该显示错误提示');
    assert.equal(instance.state.validationState, 'success');

    inputNode.value = '';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasErrorStyle(validationContainer), true,
      '6. 用户清空文本框，应该校验失败');
    assert.equal(getHelpText(validationContainer), '\n请确保字符长度大于等于3',
      '6.1 应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');
  });

  it('重置文本框校验状态', () => {
    let validateInputRef;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {
            type: 'required',
          }
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

    inputNode.value = 'd3vin';
    ReactTestUtils.Simulate.change(inputNode);
    assert.equal(hasSuccessStyle(validationContainer), true,
      '5. 用户往文本框输入5个字符，应该校验成功');
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

    // 重置文本框校验状态
    validateInputRef.reset();

    assert.equal(hasNoValidationStateStyle(validationContainer), true,
      '组件被初始化了，输入框为空，不应该显示校验状态');
    assert.equal(getHelpText(validationContainer), '',
      '不应该显示错误提示');
    assert.equal(instance.state.validationState, null);
  });

  it('主动校验输入框状态', () => {
    let validateInputRef;
    let instance = ReactTestUtils.renderIntoDocument(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {
            type: 'required',
          }
        ]}
      />
    );

    let validationContainer = getContainer(instance);

    assert.equal(hasNoValidationStateStyle(validationContainer), true,
      '1. 组件刚初始化完，输入框为空，不应该显示校验状态');
    assert.equal(getHelpText(validationContainer), '',
      '1.1 不应该显示错误提示');
    assert.equal(instance.state.validationState, null);

    // 主动校验状态

    let validationResult = validateInputRef.doValidate();
    assert.equal(hasErrorStyle(validationContainer), true,
      '主动校验状态，应该显示校验失败样式');
    assert.equal(getHelpText(validationContainer), '\n必须输入该字段！',
      '应该显示错误提示');
    assert.equal(instance.state.validationState, 'error');
    assert.equal(validationResult, false);
  });

  it('重置输入框再次通过props传入新的原来的值', () => {
    let validateInputRef;
    let node = document.createElement('div');
    let instance = ReactDOM.render(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {
            type: 'required',
          }
        ]}
        value="123"
      />, node
    );
    assert.equal(validateInputRef.props.value, '123');
    assert.equal(validateInputRef.textFieldRef.props.value, '123');
    assert.equal(getTextField(instance).value, '123');
    assert.equal(getTextField(instance).value, '123');

    // 重置文本框校验状态
    validateInputRef.reset();
    assert.equal(validateInputRef.props.value, '123');
    assert.equal(validateInputRef.textFieldRef.props.value, '123');
    assert.equal(validateInputRef.state.validateState, null);
    assert.equal(validateInputRef.textFieldRef.state.value, '123');
    assert.equal(getTextField(instance).value, '123');

    instance = ReactDOM.render(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {
            type: 'required',
          }
        ]}
        value="123"
      />, node
    );
    assert.equal(validateInputRef.props.value, '123');
    assert.equal(validateInputRef.textFieldRef.props.value, '123');
    assert.equal(validateInputRef.state.validateState, null);
    assert.equal(validateInputRef.textFieldRef.state.value, '123');
    assert.equal(getTextField(instance).value, '123');
  });

  it('通过props更新输入框的默认值，应该重新渲染为新数据', () => {
    let validateInputRef;
    let node = document.createElement('div');
    let component;

    component = ReactDOM.render(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {
            type: 'required',
          }
        ]}
        value="a123"
      />, node
    );
    assert.equal(validateInputRef.textFieldRef.state.value, 'a123');
    assert.equal(getTextField(component).value, 'a123');

    component = ReactDOM.render(
      <ValidateInput
        ref={(c) => validateInputRef = c}
        validators={[
          {
            type: 'required',
          }
        ]}
        value="b456"
      />, node
    );
    assert.equal(validateInputRef.textFieldRef.state.value, 'b456');
    assert.equal(getTextField(component).value, 'b456');
  });

  it('正确校验数字类型', () => {
    let validateInputRef;
    let node = document.createElement('div');
    let component;

    component = ReactDOM.render(
      <ValidateInput
        type=""
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

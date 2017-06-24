import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Form from '../src/Form';
import { getInput, getSubmitButton } from './helpers';

describe('<Form> validation', () => {

  // helper function

  /**
   * 只运行一个测试
   * it.only('', () => {});
   */

  it('表单中必选项初始内容为空，直接点击提交按钮，应该主动验证', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name0', label: '名称0',
            validators: [
              {type: 'required'}
            ]
          },
          {type: 'string', id: 'name1', label: '名称1',
            validators: [
              {type: 'required'}
            ]
          }
        ]}
        defaultData={{name0: '', name1: ''}}
      />
    );

    // 获取DOM element
    let text0 = getInput(component, 0);
    let text1 = getInput(component, 1);
    let submitButton = getSubmitButton(component);

    // 初始验证状态应该是未知
    assert.strictEqual(component.state.fieldsValidationState.name0, null);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);

    // 初始的时候，保存按钮状态不应该是disabled
    assert.strictEqual(submitButton.disabled, false);
    assert.strictEqual(component.state.submitButtonDisabled, false,
      '按钮状态应该是启用的');

    ReactTestUtils.Simulate.click(submitButton);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'error');
    assert.strictEqual(component.state.fieldsValidationState.name1, 'error');
    assert.strictEqual(submitButton.disabled, true,
      '模拟鼠标点击提交按钮，提交按钮状态应该变成disabled');

    // 在表单中第一个文本框中输入内容，第一个文本框应该验证成功
    text0.value = 'test';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'success');
    assert.strictEqual(component.state.fieldsValidationState.name1, 'error');
    assert.strictEqual(submitButton.disabled, true);
    assert.strictEqual(component.state.submitButtonDisabled, true,
      '按钮状态应该是禁用的');

    // 在表单中第二个文本框中输入内容，第二个文本框应该验证成功
    text1 = getInput(component, 1);
    text1.value = 'test';
    ReactTestUtils.Simulate.change(text1);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'success');
    assert.strictEqual(component.state.fieldsValidationState.name1, 'success');
    assert.strictEqual(component.state.submitButtonDisabled, false,
      '按钮状态应该是启用的');
    assert.strictEqual(submitButton.disabled, false,
      '在表单中第二个文本框输入内容，提交按钮不应该是禁用状态');

    // 清空表单中第一个文本框中的内容，第一个文本框应该验证失败
    text0 = getInput(component, 0);
    text0.value = '';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'error');
    assert.strictEqual(component.state.fieldsValidationState.name1, 'success');
    assert.strictEqual(submitButton.disabled, true,
      '提交按钮的状态应该是禁用');

  });

  it('表单中必选项初始内容为空，然后开始修改', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name0', label: '名称0',
            validators: [
              {type: 'required'}
            ]
          },
          {type: 'string', id: 'name1', label: '名称1',
            validators: [
              {type: 'required'}
            ]
          }
        ]}
        defaultData={{name0: '', name1: ''}}
      />
    );
    // 获取DOM element
    let text0 = getInput(component, 0);
    let text1 = getInput(component, 1);
    let submitButton = getSubmitButton(component);

    // 初始验证状态应该是未知
    assert.strictEqual(component.state.fieldsValidationState.name0, null);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);

    // 初始的时候，保存按钮状态不应该是disabled
    assert.strictEqual(submitButton.disabled, false);
    assert.strictEqual(component.state.submitButtonDisabled, false,
      '按钮状态应该是启用的');

    ReactTestUtils.Simulate.focus(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, null);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);
    assert.strictEqual(submitButton.disabled, false,
      '当focus在第一个文本框，提交按钮状态不应该disabled');

    // 在表单中第一个文本框中输入内容，第一个文本框应该验证成功
    text0.value = 'test';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'success');
    assert.strictEqual(component.state.fieldsValidationState.name1, null);
    assert.strictEqual(submitButton.disabled, false);
    assert.strictEqual(component.state.submitButtonDisabled, false,
      '按钮状态应该是禁用的');

    // 在表单中第二个文本框中输入内容，第二个文本框应该验证成功
    text1 = getInput(component, 1);
    text1.value = 'test';
    ReactTestUtils.Simulate.change(text1);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'success');
    assert.strictEqual(component.state.fieldsValidationState.name1, 'success');
    assert.strictEqual(component.state.submitButtonDisabled, false,
      '按钮状态应该是启用的'); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    assert.strictEqual(submitButton.disabled, false,
      '在表单中第二个文本框输入内容，提交按钮不应该是禁用状态');

    // 清空表单中第一个文本框中的内容，第一个文本框应该验证失败
    text0 = getInput(component, 0);
    text0.value = '';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'error');
    assert.strictEqual(component.state.fieldsValidationState.name1, 'success');
    assert.strictEqual(submitButton.disabled, true,
      '提交按钮的状态应该是禁用');

  });

  it('表单中必填项初始有内容，后被清空，应该验证失败', () => {
    let text0;
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name0', label: '名称0',
            validators: [
              {type: 'required'}
            ]
          },
          {type: 'string', id: 'name1', label: '名称1',
            validators: [
              {type: 'required'}
            ]
          }
        ]}
        defaultData={{name0: 'test0', name1: 'test1'}}
      />
    );
    let submitButton = getSubmitButton(component);

    // 初始验证状态应该是验证状态未知
    assert.strictEqual(component.state.fieldsValidationState.name0, null);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);
    assert.strictEqual(submitButton.disabled, false,
      '初始状态提交按钮应该未被禁用');

    // 清空表单中第一个文本框中的内容，第一个文本框应该验证失败
    text0 = getInput(component, 0);
    text0.value = '';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, 'error');
    assert.strictEqual(component.state.fieldsValidationState.name1, null);
    assert.strictEqual(submitButton.disabled, true,
      '提交按钮的状态应该是禁用');
  });

  it('Hidden required field will not cause validation error', () => {
    let isSubmit = false;
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name1', label: '名称1', validators: [{type: 'required'}] },
          {type: 'string', id: 'name2', label: '名称2', validators: [{type: 'required'}], hidden: true },
        ]}
        defaultData={{name1: 'test1', name2: ''}}
        onSubmit={() => { isSubmit = true; }}
      />
    );
    let submitButton = getSubmitButton(component);
    ReactTestUtils.Simulate.click(submitButton);
    assert.strictEqual(isSubmit, true);
  });

});

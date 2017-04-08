import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Form2 from '../src/Form2';
import Field from '../src/Field';
import { getForm } from './helpers';

/**
 * 是否启用日志
 * 1 启用日志
 * 0 禁用日志
 */
const LOG = 0;

describe('<Form2>', () => {

  /**
   * 只运行一个测试
   * it.only('', () => {});
   */

  it('应该正常显示空表单', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form2 />
    );
    let form = getForm(instance);
    assert.equal(form.querySelectorAll('.form-group').length, 0);
  });

  it('应该正常显示表单中的字段', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form2>
        <Field />
      </Form2>
    );
    let form = getForm(instance);
    assert.equal(form.querySelectorAll('.form-group').length, 1);
  });

});

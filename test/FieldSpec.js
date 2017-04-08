import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Field from '../src/Field';
import { getNode } from './helpers';

describe('<Field>', () => {

  /**
   * 只运行一个测试
   * it.only('', () => {});
   */

  it('默认类型为string', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Field />
    );
    assert.equal(instance.props.type, 'string');
  });

  it('应该正常显示文本框', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Field />
    );
    let node = getNode(instance);
    let inputList = node.querySelectorAll('input');
    assert.equal(inputList.length, 1);
    let input = inputList[0];
    assert.equal(input.type, 'text');
  });

  it('应该正常显示类型为double的文本框', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Field type="double" />
    );
    let node = getNode(instance);
    assert.equal(node.querySelectorAll('input').length, 1);
  });

});

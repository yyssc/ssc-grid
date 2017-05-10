import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Form from '../src/Form';
import { getInput } from './helpers';

describe('<Form> 禁用字段', () => {

  it('字段应该正确被禁用', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name2', label: '名称2', disabled: true},
          {type: 'string', id: 'name3', label: '名称3', disabled: false},
          {type: 'string', id: 'name4', label: '名称4'}
        ]}
        defaultData={{
          name2: '名称2',
          name3: '名称3',
          name4: '名称4'
        }}
      />
    );

    assert.equal(getInput(instance, 0).disabled, true);
    assert.equal(getInput(instance, 1).disabled, false);
    assert.equal(getInput(instance, 2).disabled, false);
  });

});

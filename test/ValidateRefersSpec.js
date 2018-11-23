import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import ValidateRefers from '../src/ValidateRefers';

describe('<ValidateRefers>', () => {


  it('应该正常显示树', () => {
    let component = ReactTestUtils.renderIntoDocument(
        <ValidateRefers
          validators={[
            { type: 'required' },
          ]}
          referConditions={{
            refCode: 'user',
            refType: 'tree',
            rootName: '部门主管',
          }}
          referDataUrl="http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON"
          selected={[]}
        />
    );
    let node = ReactDOM.findDOMNode(component);
    assert.equal(node.querySelectorAll('input').length, 2);
  });

});

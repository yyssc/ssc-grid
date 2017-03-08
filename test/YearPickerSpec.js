import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import YearPicker from '../src/YearPicker';

describe('<YearPicker>', () => {

  // helper function

  function getNode(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  it('没有任何参数时候文本框应该为空', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <YearPicker />
    );
    assert.equal(getNode(instance).querySelector('input').value, '');
  });

});

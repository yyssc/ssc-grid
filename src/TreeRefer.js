import React, { Component } from 'react';

import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

/**
 * TreeRefer组件
 *
 * Options: https://datatables.net/reference/option/
 *
 * http://adazzle.github.io/react-data-grid
 *
 */

class TreeRefer extends Component {

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <FormGroup>
          <InputGroup>
            <FormControl type="text" />
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
    );
  }
}

export default TreeRefer;

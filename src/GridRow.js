import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

/**
 * GridRow组件
 * @param {number} rowIdx row index
 * @param {boolean} checkboxColumn 每一行是否显示最左侧的复选框
 * @param {boolean} operateColumn 每一行是否显示最右侧的操作按钮列
 * @param {Array} cols 每一列数据
 *                     如果单元格数据为boolean，默认渲染为复选框
 */

class GridRow extends Component {
  static propTypes = {
    // TODO(d3vin.chen@gmail.com): row is not used.
    row: PropTypes.object.isRequired,
    rowIdx: PropTypes.number.isRequired,
    onRowSelection: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    checkboxColumn: PropTypes.bool,
    operateColumn: PropTypes.bool,
    onCellChecked: PropTypes.func
  };

  static defaultProps = {
    selectable: true,
    checkboxColumn: false,
    operateColumn: false,
    onCellChecked: () => {}
  };

  constructor(props) {
    super(props);
  }

  handleSelection(rowIdx, event) {
    // this.setState({value: event.target.value});
    this.props.onRowSelection(rowIdx, event.target.checked);
  }

  handleEdit(rowIdx, rowData) {
    this.props.onEdit(rowIdx, rowData);
  }

  // handleCheckbox(rowIdx, colIdx, e) {
  handleCheckbox(rowIdx, colIdx) {
    // e.target
    this.props.onCellChecked(rowIdx, colIdx);
  }

  renderCells = (row) => {
    return row.cols.map((col, colIdx) => {
      let cellContent = col.value;
      return <td key={colIdx}>{cellContent}</td>;
    });
  }

  render() {
    const { row, rowIdx, checkboxColumn, operateColumn } = this.props;
    return (
      <tr>
        {
          // <td><Checkbox onChange={::this.handleSelection} /></td>
          checkboxColumn
            ? <td><input type="checkbox" onChange={this.handleSelection.bind(this, rowIdx)} /></td>
            : null
        }
        { this.renderCells(row) }
        { operateColumn
          ? <td><Button onClick={this.handleEdit.bind(this, rowIdx, row)}>修改</Button></td>
          : null }
      </tr>
    );
  }
}

export default GridRow;

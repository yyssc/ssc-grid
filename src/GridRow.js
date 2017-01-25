import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

/**
 * GridRow组件
 */

class GridRow extends Component {
  static propTypes = {
    /**
     * 用于指定列模型，比如每个字段的类型是什么，字段类型决定了单元格的样式。
     */
    cols: PropTypes.array.isRequired,
    /**
     * row.cols中存储了本行中每一列的数据
     */
    row: PropTypes.object.isRequired,
    /**
     * row index 从0开始，等同于key
     */
    rowIdx: PropTypes.number.isRequired,
    onRowSelection: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    /**
     * 每一行是否显示最左侧的复选框
     */
    checkboxColumn: PropTypes.bool,
    /**
     * 每一行是否显示最右侧的操作按钮列
     */
    operateColumn: PropTypes.bool,
    onCellChecked: PropTypes.func
  };

  static defaultProps = {
    selectable: true,
    checkboxColumn: false,
    operateColumn: false
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
    if (this.props.onCellChecked) {
      this.props.onCellChecked(rowIdx, colIdx);
    }
  }

  renderCells = (cols, row) => {
    return row.cols.map((col, colIdx) => {
      let cellContent = col.value;
      let className = cols[colIdx].type === 'money' ? 'text-right' : '';
      return <td key={colIdx} className={className}>{cellContent}</td>;
    });
  }

  render() {
    const { cols, row, rowIdx, checkboxColumn, operateColumn } = this.props;
    return (
      <tr>
        {
          // <td><Checkbox onChange={::this.handleSelection} /></td>
          checkboxColumn
            ? <td><input type="checkbox" onChange={this.handleSelection.bind(this, rowIdx)} /></td>
            : null
        }
        { this.renderCells(cols, row) }
        { operateColumn
          ? <td><Button onClick={this.handleEdit.bind(this, rowIdx, row)}>修改</Button></td>
          : null }
      </tr>
    );
  }
}

export default GridRow;

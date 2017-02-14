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
    columnsModel: PropTypes.array.isRequired,
    /**
     * 本行中每一列的数据
     * <pre>
     * {
     *   id: '11',
     *   danjuleixing: '123'
     * }
     * </pre>
     */
    rowObj: PropTypes.object.isRequired,
    /**
     * 表格中本行的index，从0开始，等同于key
     */
    rowIdx: PropTypes.number.isRequired,
    onRowSelection: PropTypes.func.isRequired,
    /**
     * 当点击“修改”按钮的时候
     */
    onEdit: PropTypes.func.isRequired,
    /**
     * 当点击“删除”按钮的时候
     */
    onRemove: PropTypes.func.isRequired,
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

  handleEdit(rowIdx, rowData, event) {
    this.props.onEdit(rowIdx, rowData, event);
  }

  handleRemove(rowIdx, rowData, event) {
    this.props.onRemove(rowIdx, rowData, event);
  }

  // handleCheckbox(rowIdx, colIdx, e) {
  handleCheckbox(rowIdx, colIdx) {
    // e.target
    if (this.props.onCellChecked) {
      this.props.onCellChecked(rowIdx, colIdx);
    }
  }

  renderCells = (columnsModel, rowObj) => {
    return columnsModel.map((columnModel, colIdx) => {
      let className = '';
      let cellContent = '';
      let value = rowObj[columnModel.id];
      switch (columnModel.type) {
        case 'double': // 之前的金额类型
          className = 'text-right';
          cellContent = value;
          break;
        case 'enum':
          cellContent = columnModel.data.find(enumItem => (enumItem.key === value)).value;
          break;
        case 'boolean':
          cellContent = value ? '是' : '否';
          break;
        default:
          cellContent = value;
          break;
      }
      return <td key={colIdx} className={className}>{cellContent}</td>;
    });
  }

  render() {
    const { columnsModel, rowObj, rowIdx, checkboxColumn, operateColumn } = this.props;
    return (
      <tr>
        {
          // <td><Checkbox onChange={::this.handleSelection} /></td>
          checkboxColumn
            ? <td><input type="checkbox" onChange={this.handleSelection.bind(this, rowIdx)} /></td>
            : null
        }
        { this.renderCells(columnsModel, rowObj) }
        { operateColumn
          ? (<td>
              <Button onClick={this.handleEdit.bind(this, rowIdx, rowObj)}>修改</Button>
              <Button onClick={this.handleRemove.bind(this, rowIdx, rowObj)}>删除</Button>
            </td>)
          : null }
        {
          this.props.children
        }
      </tr>
    );
  }
}

export default GridRow;

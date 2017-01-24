import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Table, Pagination, Checkbox } from 'react-bootstrap';

import GridRow from './GridRow';

/**
 * Grid组件
 *
 * Options: https://datatables.net/reference/option/
 *
 * http://adazzle.github.io/react-data-grid
 *
 */

class Grid extends Component {

  static propTypes = {
    /**
     * 表头每一列的名称
     */
    cols: PropTypes.array,
    /**
     * 表格填充数据，如果单元格中的数据类型为boolean，默认渲染为复选框
     */
    tableData: PropTypes.object.isRequired,
    /**
     * 分页
     */
    onPagination: PropTypes.func.isRequired,
    /**
     * 选择
     */
    onSelectOne: PropTypes.func.isRequired,
    /**
     * 编辑
     */
    onEdit: PropTypes.func.isRequired,
    /**
     * 每页显示的数量
     */
    itemsPerPage: PropTypes.number.isRequired,
    /**
     * 是否在表格的最左边一列显示复选框
     */
    checkboxColumn: PropTypes.bool,
    /**
     * 是否在表格的最右边一列显示操作按钮
     */
    operateColumn: PropTypes.bool,
    /**
     * 选择一个单元格
     */
    onCellChecked: PropTypes.func,
    /**
     * 是否显示分页
     */
    paging: PropTypes.bool
  };

  static defaultProps = {
    checkboxColumn: false,
    operateColumn: false,
    onCellChecked: () => {},
    paging: true
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRows: {}
    };
  }

  handlePagination(eventKey) {
    this.props.onPagination(eventKey);
  }

  handleSelectAll() {
  }

  handleSelectOne(rowIdx, checked) {
    this.props.onSelectOne(rowIdx, checked);
  }

  handleEdit(rowIdx, rowData) {
    this.props.onEdit(rowIdx, rowData);
  }

  handleCellChecked(rowIdx, colIdx) {
    this.props.onCellChecked(rowIdx, colIdx);
  }

  render() {
    const { cols, tableData, itemsPerPage,
      checkboxColumn, operateColumn,
      className
    } = this.props;

    if (!tableData) {
      return (<div></div>);
    }
    let activePage = Math.ceil(tableData.startIndex / itemsPerPage);
    let items = Math.ceil(tableData.totalItems / itemsPerPage);

    const renderTableHeader = () => {
      if (cols) {
        return cols.map((col, key) => (
          <th key={key}>{col}</th>
        ));
      }
      return tableData.items[0] ? tableData.items[0].cols.map((col, key) =>
        <th key={key}>{col.label}</th>
      ) : null;
    };

    const renderCheckboxHeader = () => (
      checkboxColumn ? <th><Checkbox onChange={this.handleSelectAll.bind(this)} /></th> : null
    );

    const pagination = (
      <Pagination className="pagination"
        prev
        next
        first
        last
        ellipsis
        items={items}
        maxButtons={10}
        activePage={activePage}
        onSelect={this.handlePagination.bind(this)}
      />
    );

    const self = this;

    // var onRow = this.props.onRow;
    return (
      <div className={classNames(className)}>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              { renderCheckboxHeader() }
              { renderTableHeader() }
              { operateColumn ? <th>操作</th> : null }
            </tr>
          </thead>
          <tbody>
          {
            tableData.items.map((row, rowIdx) => {
              return (<GridRow
                checkboxColumn={checkboxColumn}
                operateColumn={operateColumn}
                row={row} key={rowIdx}
                cols={row.cols} rowIdx={rowIdx}
                onRowSelection={self.handleSelectOne.bind(self)}
                onEdit={self.handleEdit.bind(self)}
                onCellChecked={self.handleCellChecked.bind(self)}
              />);
            })
          }
          </tbody>
        </Table>
        {this.props.paging ? pagination : null}
      </div>
    );
  }
}

export default Grid;

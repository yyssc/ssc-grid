import React, { Component, PropTypes } from 'react';

import { Table, Pagination, Checkbox } from 'react-bootstrap';

import GridRow from './GridRow';

/**
 * Grid组件
 *
 * Options: https://datatables.net/reference/option/
 *
 * @param {boolean} checkboxColumn 是否在表格的最左边一列显示复选框
 * @param {boolean} operateColumn 是否在表格的最右边一列显示操作按钮
 * @param {Array} cols 表头每一列的名称
 * @param {Object} tableData 表格填充数据
 *                           如果单元格中的数据类型为boolean，默认渲染为复选框
 * @param {number} itemsPerPage 每页显示的数量
 * @param {boolean} paging 是否显示分页
 */

class Grid extends Component {

  static propTypes = {
    cols: PropTypes.array,
    tableData: PropTypes.object.isRequired,
    onPagination: PropTypes.func.isRequired,
    onSelectOne: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    checkboxColumn: PropTypes.bool,
    operateColumn: PropTypes.bool,
    onCellChecked: PropTypes.func
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

  render () {
    const { cols, tableData, itemsPerPage,
      checkboxColumn, operateColumn
    } = this.props;

    if (!tableData) {
      return (<div></div>)
    }
    let activePage = Math.ceil(tableData.startIndex/itemsPerPage);
    let items = Math.ceil(tableData.totalItems/itemsPerPage);

    const renderTableHeader = () => {
      if (cols) {
        return cols.map((col, key) => (
          <th key={key}>{col}</th>
        ));
      } else {
        return tableData.items[0] ? tableData.items[0].cols.map((col, key) =>
          <th key={key}>{col.label}</th>
        ) : null;
      }
    };

    const renderCheckboxHeader = () => (
      checkboxColumn ? <th><Checkbox onChange={this.handleSelectAll.bind(this)} /></th> : null
    )

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
    )

    const self = this

    //var onRow = this.props.onRow;
    return (
      <div className="admin-table">
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
              return <GridRow
                checkboxColumn={checkboxColumn}
                operateColumn={operateColumn}
                row={row} key={rowIdx}
                cols={row.cols} rowIdx={rowIdx}
                onRowSelection={self.handleSelectOne.bind(self)}
                onEdit={self.handleEdit.bind(self)}
                onCellChecked={self.handleCellChecked.bind(self)}
              ></GridRow>}
            )
          }
          </tbody>
        </Table>
        {this.props.paging ? pagination : null}
      </div>
    );
  }
};

export default Grid;

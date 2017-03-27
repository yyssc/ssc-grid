import { cloneElement } from 'react';
import ReactDOM from 'react-dom';

export function shouldWarn(about) {
  console.error.expected.push(about); // eslint-disable-line no-console
}

/**
 * Helper for rendering and updating props for plain class Components
 * since `setProps` is deprecated.
 * @param  {ReactElement} element     Root element to render
 * @param  {HTMLElement?} mountPoint  Optional mount node, when empty it uses an unattached div like `renderIntoDocument()`
 * @return {ComponentInstance}        The instance, with a new method `renderWithProps` which will return a new instance with updated props
 */
export function render(element, mountPoint) {
  let mount = mountPoint || document.createElement('div');
  let instance = ReactDOM.render(element, mount);

  if (instance && !instance.renderWithProps) {
    instance.renderWithProps = newProps => {

      return render(
        cloneElement(element, newProps), mount);
    };
  }

  return instance;
}

export function getOne(collection) {
  expect(collection.length).to.equal(1);
  return collection[0];
}

/**
 * Grid helper function
 */

export function getTableHead(instance) {
  let node = ReactDOM.findDOMNode(instance); // <div> root node
  let table = node.querySelector('table'); // <table>
  return table.querySelector('thead'); // <thead>
}

export function getTableHeadColumn(instance, index) {
  let ths = getTableHead(instance).querySelectorAll('th');
  return ths[index];
}

// 获得指定列头中的文本
// <th> -> textContent
export function getTableHeadColumnContent(instance, index) {
  return getTableHeadColumn(instance, index).textContent;
}

export function getTableBody(instance) {
  let node = ReactDOM.findDOMNode(instance); // <div> root node
  let table = node.querySelector('table'); // <table>
  return table.querySelector('tbody'); // <tbody>
}

// 得到行号为index（从0开始）的行DOM节点
export function getTableRow(instance, index) {
  let tbody = getTableBody(instance);
  let trs = tbody.querySelectorAll('tr');
  return trs[index];
}

// 获得单元格<td>节点
export function getTableCell(instance, rowIndex, columnIndex) {
  let trN = getTableRow(instance, rowIndex); // <tr> node
  let tds = trN.querySelectorAll('td'); // <td> node list
  return tds[columnIndex];
}

// 获得单元格中的内容，类型为string
export function getTableCellContent(instance, rowIndex, columnIndex) {
  return getTableCell(instance, rowIndex, columnIndex).textContent;
}

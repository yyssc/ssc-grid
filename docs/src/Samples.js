/* eslint no-path-concat: 0, no-var: 0, key-spacing: 0 */

// 请按照字母顺序进行排序
export default {
  FormBasic:           require('fs').readFileSync(__dirname + '/../examples/FormBasic.js', 'utf8'),
  GridBasic:           require('fs').readFileSync(__dirname + '/../examples/GridBasic.js', 'utf8'),
  GridOperation:       require('fs').readFileSync(__dirname + '/../examples/GridOperation.js', 'utf8'),
  GridPagination:      require('fs').readFileSync(__dirname + '/../examples/GridPagination.js', 'utf8'),
  GridSelection:       require('fs').readFileSync(__dirname + '/../examples/GridSelection.js', 'utf8'),
  ReferBasic:          require('fs').readFileSync(__dirname + '/../examples/ReferBasic.js', 'utf8'),
  ReferTree:           require('fs').readFileSync(__dirname + '/../examples/ReferTree.js', 'utf8'),
  TextFieldBasic:      require('fs').readFileSync(__dirname + '/../examples/TextFieldBasic.js', 'utf8')
};

/* eslint no-path-concat: 0, no-var: 0, key-spacing: 0 */

export default {
  GridBasic:                     require('fs').readFileSync(__dirname + '/../examples/GridBasic.js', 'utf8'),
  GridOperation:                 require('fs').readFileSync(__dirname + '/../examples/GridOperation.js', 'utf8'),
  GridPagination:                require('fs').readFileSync(__dirname + '/../examples/GridPagination.js', 'utf8'),
  ReferBasic:                    require('fs').readFileSync(__dirname + '/../examples/ReferBasic.js', 'utf8'),
  ReferTree:                     require('fs').readFileSync(__dirname + '/../examples/ReferTree.js', 'utf8'),

  FormBasic:                     require('fs').readFileSync(__dirname + '/../examples/FormBasic.js', 'utf8')
};

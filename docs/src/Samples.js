/* eslint no-path-concat: 0, no-var: 0, key-spacing: 0 */

// const readFile = filename => require('fs').readFileSync(`${__dirname}/../examples/${filename}`, 'utf8');

// 请按照字母顺序进行排序
export default {
  DatePicker2Basic:             require('fs').readFileSync(__dirname + '/../examples/DatePicker2Basic.js', 'utf8'),
  DatePicker2Formatter:         require('fs').readFileSync(__dirname + '/../examples/DatePicker2Formatter.js', 'utf8'),
  DatePicker2YearMonthDropdown: require('fs').readFileSync(__dirname + '/../examples/DatePicker2YearMonthDropdown.js', 'utf8'),
  DatePickerBasic:              require('fs').readFileSync(__dirname + '/../examples/DatePickerBasic.js', 'utf8'),
  DatePickerFormatter:          require('fs').readFileSync(__dirname + '/../examples/DatePickerFormatter.js', 'utf8'),
  DropdownBasic:                require('fs').readFileSync(__dirname + '/../examples/DropdownBasic.js', 'utf8'),
  FormBasic:                    require('fs').readFileSync(__dirname + '/../examples/FormBasic.js', 'utf8'),
  FormCustomField:              require('fs').readFileSync(__dirname + '/../examples/FormCustomField.js', 'utf8'),
  FormDisabledFields:           require('fs').readFileSync(__dirname + '/../examples/FormDisabledFields.js', 'utf8'),
  FormHiddenField:              require('fs').readFileSync(__dirname + '/../examples/FormHiddenField.js', 'utf8'),
  FormLayout:                   require('fs').readFileSync(__dirname + '/../examples/FormLayout.js', 'utf8'),
  FormValidation:               require('fs').readFileSync(__dirname + '/../examples/FormValidation.js', 'utf8'),
  FormValidation2:              require('fs').readFileSync(__dirname + '/../examples/FormValidation2.js', 'utf8'),
  FormValidation3:              require('fs').readFileSync(__dirname + '/../examples/FormValidation3.js', 'utf8'),
  FormWithRefer:                require('fs').readFileSync(__dirname + '/../examples/FormWithRefer.js', 'utf8'),
  GridBasic:                    require('fs').readFileSync(__dirname + '/../examples/GridBasic.js', 'utf8'),
  GridCellFormatter:            require('fs').readFileSync(__dirname + '/../examples/GridCellFormatter.js', 'utf8'),
  GridClickEvent:               require('fs').readFileSync(__dirname + '/../examples/GridClickEvent.js', 'utf8'),
  GridColumnAlign:              require('fs').readFileSync(__dirname + '/../examples/GridColumnAlign.js', 'utf8'),
  GridColumnAlign2:             require('fs').readFileSync(__dirname + '/../examples/GridColumnAlign2.js', 'utf8'),
  GridColumnClass:              require('fs').readFileSync(__dirname + '/../examples/GridColumnClass.js', 'utf8'),
  GridEmptyValue:               require('fs').readFileSync(__dirname + '/../examples/GridEmptyValue.js', 'utf8'),
  GridLocalSearch:              require('fs').readFileSync(__dirname + '/../examples/GridLocalSearch.js', 'utf8'),
  GridOperation:                require('fs').readFileSync(__dirname + '/../examples/GridOperation.js', 'utf8'),
  GridOperationColumnFloat:     require('fs').readFileSync(__dirname + '/../examples/GridOperationColumnFloat.js', 'utf8'),
  GridPagination:               require('fs').readFileSync(__dirname + '/../examples/GridPagination.js', 'utf8'),
  GridSelection:                require('fs').readFileSync(__dirname + '/../examples/GridSelection.js', 'utf8'),
  GridSelectionBeforeSelect:    require('fs').readFileSync(__dirname + '/../examples/GridSelectionBeforeSelect.js', 'utf8'),
  GridSelectionInitSelected:    require('fs').readFileSync(__dirname + '/../examples/GridSelectionInitSelected.js', 'utf8'),
  GridSelectionSelectMethod:    require('fs').readFileSync(__dirname + '/../examples/GridSelectionSelectMethod.js', 'utf8'),
  GridSelectionWithPagination:  require('fs').readFileSync(__dirname + '/../examples/GridSelectionWithPagination.js', 'utf8'),
  GridStyle:                    require('fs').readFileSync(__dirname + '/../examples/GridStyle.js', 'utf8'),
  MonthPickerBasic:             require('fs').readFileSync(__dirname + '/../examples/MonthPickerBasic.js', 'utf8'),
  TextFieldBasic:               require('fs').readFileSync(__dirname + '/../examples/TextFieldBasic.js', 'utf8'),
  TreeBasic:                    require('fs').readFileSync(__dirname + '/../examples/TreeBasic.js', 'utf8'),
  ValidateInputBasic:           require('fs').readFileSync(__dirname + '/../examples/ValidateInputBasic.js', 'utf8'),
  ValidateInputDoValidate:      require('fs').readFileSync(__dirname + '/../examples/ValidateInputDoValidate.js', 'utf8'),
  ValidateInputReset:           require('fs').readFileSync(__dirname + '/../examples/ValidateInputReset.js', 'utf8'),
  ValidateRefersBasic:          require('fs').readFileSync(__dirname + '/../examples/ValidateRefersBasic.js', 'utf8'),
  ValidateRefersDoValidate:     require('fs').readFileSync(__dirname + '/../examples/ValidateRefersDoValidate.js', 'utf8'),
  ValidateRefersReset:          require('fs').readFileSync(__dirname + '/../examples/ValidateRefersReset.js', 'utf8'),
  YearPickerBasic:              require('fs').readFileSync(__dirname + '/../examples/YearPickerBasic.js', 'utf8'),
};

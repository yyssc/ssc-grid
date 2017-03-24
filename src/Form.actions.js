/**
 * 模拟redux dispatch去更新state
 * https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3#.52vhwpymp
 */

import update from 'immutability-helper';

import * as validationUtils from './utils/validation';

/**
 * 更新表单中指定字段的值（单值类型）
 */
export function updateFieldValue(fieldId, value) {
  return (prevState/* , props */) => {
    return update(prevState, {
      formData: {
        [fieldId]: {$set: value}
      }
    });
  };
}

/**
 * 更新表单中指定的参照字段的值
 * @param {String} fieldId
 * @param {Array} selected 该字段的类型由Refer组件决定，可能会变化，
 * 现在假定是如下结构
 * ```
 * [{
 *     "id": "E6CB6CBE-C701-48EC-A3EB-C823DF8DBEED",
 *     "isLeaf": "true",
 *     "name": "测试组织1",
 *     "pid": "FBA1DBB5-24A2-4A78-A4D5-453F7CC46AA6",
 *     "code": "02"
 * }]
 * ```
 * 当参照被清空之后，这里传过来的是个空数组
 */
export function updateReferFieldValue(fieldId, selected) {
  return (prevState/* , props */) => {
    return update(prevState, {
      formData: {
        [fieldId]: {
          $set: selected.length === 0 ? null : selected[0]
        }
      }
    });
  };
}

/**
 * 更新表单中指定字段的验证状态
 * stateless
 * @param {String} fieldId
 * @param {String} value
 * @param {Array} validators
 */
export function updateFormFieldValidationState(fieldId, value, validators) {
  return (prevState/* , props */) => {
    const { validationState, helpText } = validationUtils.calcValidationState(value, validators);
    return update(prevState, {
      fieldsValidationState: {
        [fieldId]: {
          $set: validationState
        }
      },
      fieldsHelpText: {
        [fieldId]: {
          $set: helpText
        }
      }
    });
  };
}


/**
 * 从表单数据中获取值
 * @param {Object} fieldModel
 * @param {Object} formData
 * @return {String} 对于参照这种复杂类型，需要返回字符类型的显示值
 * stateless
 */
const getFieldValue = ({id, type}, formData) => {
  let value = '';
  if (type === 'ref') {
    value = formData[id]
      ? formData[id].name
      : '';
  } else {
    value = formData[id];
  }
  return value;
};

/**
 * 更新表单中指定字段的验证状态
 * stateless
 * @param {String} fieldId
 * @param {String} value
 * @param {Array} validators
 */
export function updateAllFormFieldsValidationState(fieldsModel, formData) {
  return (prevState/* , props */) => {
    let fieldsValidationState = {};
    let fieldsHelpText = {};

    fieldsModel.forEach(fieldModel => {
      if (fieldModel.validators) {
        let value = getFieldValue(fieldModel, formData);
        const { validationState, helpText } = validationUtils.calcValidationState(value, fieldModel.validators);
        fieldsValidationState[fieldModel.id] = validationState;
        fieldsHelpText[fieldModel.id] = helpText;
      }
    });

    return update(prevState, {
      fieldsValidationState: {$set: fieldsValidationState},
      fieldsHelpText: {$set: fieldsHelpText}
    });
  };
}

/**
 * 更新提交按钮的状态
 * @param {String} fieldId
 * @param {Array} selected 该字段的类型由Refer组件决定，可能会变化
 */
export function updateSubmitButtonState() {
  return (prevState/* , props */) => {
    return update(prevState, {
      submitButtonDisabled: {
        $set: !validationUtils.isStatesValid(prevState.fieldsValidationState)
      }
    });
  };
}

/**
 * 模拟redux dispatch去更新state
 * https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3#.52vhwpymp
 */

import update from 'immutability-helper';

import * as validationUtils from './utils/validation';

/**
 * action的一般格式
 * ```js
 * export const updateFoo = (value) => (prevState, props) => (
 *   update(prevState, {
 *     foo: {$set: value}
 *   })
 * );
 * ```
 */

/**
 * 更新表单所有值
 * @param {Object} formData
 */
export const updateFormData = (formData) => (prevState) => (
  update(prevState, {
    formData: { $set: formData }
  })
);

/**
 * 更新表单中指定字段的值（单值类型）
 * @param {string} fieldId
 * @param {string} value
 */
export const updateFieldValue = (fieldId, value) => (prevState) => (
  update(prevState, {
    formData: {
      [fieldId]: {$set: value}
    }
  })
);

/**
 * 更新表单中指定的参照字段的值
 * @param {String} fieldId
 * @param {Array} selected 该字段的类型由Refer组件决定，可能会变化，
 * @param {Array} multiple 是否多选，
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
export function updateReferFieldValue(fieldId, selected, multiple) {
  return (prevState/* , props */) => {
    return update(prevState, {
      formData: {
        [fieldId]: {
          $set: selected.length === 0 && !multiple ? null : selected
        }
      }
    });
  };
}

/**
 * 更新表单中指定字段的验证状态
 * stateless
 * @param {String} fieldId
 * @param {String} value 由于validators库只能校验字符串，所以这个参数也必须是字符串
 * @param {Array} validators
 */
export function updateFormFieldValidationState(fieldId, value, validators) {
  return (prevState/* , props */) => {
    const {
      validationState,
      helpText
    } = validationUtils.calcValidationState(value, validators);
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
const getFieldValue = ({id, type, multiple}, formData) => {
  let value = '';
  if (type === 'ref') {
    if (multiple || Array.isArray(formData[id])) {
      value = formData[id].map((val) => {
        return val.id || '';
      });
      value = value.join('');
    } else {
      value = formData[id]
        ? formData[id].id
        : '';
    }
  } else {
    value = formData[id];
  }
  return value;
};

/**
 * Calculate validation state of all form fields (without hidden fields)
 * then return validation states and help text object
 * @param {String} fieldId
 * @param {String} value
 * @param {Array} validators
 */
export function updateAllFormFieldsValidationState(fieldsModel, formData) {
  return (prevState/* , props */) => {
    let fieldsValidationState = {};
    let fieldsHelpText = {};

    fieldsModel.forEach(fieldModel => {
      if (fieldModel.hidden === true) {
        return;
      }
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

// TODO: The publicly exposed parts of this should be in lib/SSCGridUtils.
import validator from 'validator';

export function getValidationObj({type, helpText}) {
  const vs = {
    currency: {
      matchFunc: value => validator.isDecimal(value),
      helpText: () => '请输入正确的货币格式！'
    },
    decimal: {
      matchFunc: value => validator.isDecimal(value),
      helpText: () => '请输入正确的数字格式！'
    },
    email: {
      matchFunc: value => validator.isEmail(value),
      helpText: () => '请输入正确的邮箱格式！'
    },
    int: {
      matchFunc: value => validator.isInt(value),
      helpText: () => '请输入正确的整数格式！'
    },
    length: {
      /**
       * v.options = { min: 3, max: 6 }
       */
      matchFunc: (value, v) => validator.isLength(value, v.options),
      helpText: (value, v) => `输入长度必须介于 ${v.options.min} 和 ${v.options.max} 之间的字符串`
    },
    mobilePhone: {
      matchFunc: value => validator.isMobilePhone(value, 'zh-CN'),
      helpText: () => '请输入正确的手机号格式!'
    },
    required: {
      matchFunc: (value) => {
        // Removes whitespace from both ends of a string
        // Whitespace in this context is all the whitespace characters
        // (space, tab, no-break space, etc.) and all the line terminator
        // characters (LF, CR, etc.).
        value = value.trim();
        // 这个判断没有啥实际意义，就是装逼用的
        // Remove zero-width space characters from a JavaScript string
        // http://stackoverflow.com/a/11305926/4685522
        value = value.replace(/[\u200B-\u200D\uFEFF]/g, '');
        // TODO 更装逼的做法是使用https://github.com/slevithan/XRegExp
        // http://stackoverflow.com/a/11598864/4685522
        return !validator.isEmpty(value);
      },
      helpText: () => '必须输入该字段！'
    },
  };

  let validationObj = vs[type];
  if (helpText) {
    // 自定义错误提示
    validationObj.helpText = helpText;
  }

  return validationObj;
}

/**
 * 校验字段是否不为'error'
 * @param {String|null} vstate react-bootstrap的验证状态
 * @param {Boolean}
 */
export function isFieldValid(vstate) {
  return vstate !== 'error';
}

/**
 * 判断校验对象是否全部正确
 * @param {Object} states
 * ```
 * {
 *   email: 'error',
 *   name: 'success'
 * }
 * ```
 * @return {boolean}
 */
export function isStatesValid(states) {
  let isAllValid = true;
  let fieldId;

  // 遍历检查每个需要校验的字段的状态
  for (fieldId in states) {
    if (states.hasOwnProperty(fieldId)) {
      isAllValid = isAllValid && isFieldValid(states[fieldId]);
    }
  }

  return isAllValid;
}

/**
 * 对一个字段进行校验
 * @param {String} value
 * @param {Array} validators
 * @return {Object} 校验之后的状态和提示信息
 * ```json
 * {
 *   validationState: 'error',
 *   helpText: '请输入正确的邮箱地址'
 * }
 * ```
 */
export function calcValidationState(value, validators) {
  let validationState = 'success';
  let helpTexts = '';
  validators.forEach(v => {
    const { matchFunc, helpText } = v.type === 'custom'
      ? v
      : getValidationObj(v);
    let isValid = matchFunc(value, v);
    if (!isValid) {
      validationState = 'error';
      helpTexts += '\n' + helpText(value, v);
    }
  });
  return {
    validationState,
    helpText: helpTexts
  };
}

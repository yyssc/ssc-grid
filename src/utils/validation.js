// TODO: The publicly exposed parts of this should be in lib/SSCGridUtils.
import validator from 'validator';

export function getValidationObj(validation) {
  const vs = {
    required: {
      matchFunc: value => !validator.isEmpty(value),
      helpText: '必须输入该字段！'
    },
    email: {
      matchFunc: value => validator.isEmail(value),
      helpText: '请输入正确的邮箱格式！'
    },
    decimal: {
      matchFunc: value => validator.isDecimal(value),
      helpText: '请输入正确的数字格式！'
    },
    currency: {
      matchFunc: value => validator.isDecimal(value),
      helpText: '请输入正确的货币格式！'
    },
    int: {
      matchFunc: value => validator.isInt(value),
      helpText: '请输入正确的整数格式！'
    },
    mobilePhone: {
      matchFunc: value => validator.isMobilePhone(value, 'zh-CN'),
      helpText: '请输入正确的手机号格式!'
    }
  };

  let validationObj;

  if (validation.type === 'custom') {
    // 自定义格式
    validationObj = validation;
  } else {
    validationObj = vs[validation.type];
    if (validation.helpText) {
      // 自定义错误提示
      validationObj.helpText = validation.helpText;
    }
  }

  return validationObj;
}

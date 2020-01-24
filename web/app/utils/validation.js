export function makeHandleFieldChange(fieldName, validateFunc=(() => (true))) {
  return function(event) {
    let newState = {
      ...this.state,
      [fieldName]: event.target.value
    };

    if (validateFunc(newState[fieldName])) {
      newState.validation[fieldName] = true;
    }
    else {
      newState.validation[fieldName] = false;
    }

    this.setState(newState);
  };
}

export function makeChainedValidateFunc(funcList) {
  return (text) => {
    return funcList.every((func) => {
      return func(text);
    });
  }
}

export const validateEmail = (text) => {
  let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(text);
};

export const validatePassword = (text) => { // 영문 대소문자(반드시 포함), 숫자(반드시 포함) 및 특수문자
  let re = /(?=.*[a-zA-Z])(?=.*[0-9])^[a-zA-Z0-9!@#\$%\^&\*]+$/;
  return re.test(text)
}

export const validateName = (text) => { // 한글, 영문 대소문자 (공백 포함)
  let re = /(?=.*[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣])^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]+$/;
  return re.test(text);
}

export const makeValidateMinLength = (length) => (text) => {
  return (text.length >= length);
}

export const makeValidateMaxLength = (length) => (text) => {
  return (text.length <= length);
}

export const makeValidateMatch = (fieldName, thisObject) => {
  return function(text) {
    return (this.state[fieldName] === text);
  }.bind(thisObject);
}

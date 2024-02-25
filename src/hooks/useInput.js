import { useState } from "./index";

function useInput(validate, initValue = "") {
  let validateHandler = () => true;

  if (
    (arguments.length === 2 || arguments.length === 1) &&
    typeof arguments[0] === "function"
  ) {
    validateHandler = validate;
  } else if (arguments.length === 1 && typeof arguments[0] !== "function") {
    initValue = validate;
  } else {
    // enhance stage
  }

  const [value, setValue] = useState(initValue);
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const changeHandler = (event) => {
    setValue(event.target.value);
    setIsTouched(isTouched.value);

    const enteredValid = !!validateHandler(value.value);
    const hasError = !enteredValid && isTouched.value;
    setIsValid(typeof arguments[0] === "function" && enteredValid);
    setError(hasError);

    if (isValid.value) {
      setIsTouched(true);
    }
  };

  const blurHandler = (touched = true) => {
    setIsTouched(touched);
    const enteredValid = !!validateHandler(value.value);
    const hasError = !enteredValid && isTouched.value;
    setIsValid(typeof arguments[0] === "function" && enteredValid);
    setError(hasError);
  };

  const resetHandler = (value = "") => {
    setValue(value);
    setIsTouched(false);
    setError(false);
    setIsValid(false);
  };

  return {
    value,
    isValid,
    isInvalid: error,
    blurHandler,
    changeHandler,
    resetHandler,
  };
}

export default useInput;

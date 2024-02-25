import useState from "./useState";

const useAlert = () => {
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  // show popup alert by update alertIsVisible state to true
  const showAlert = () => setAlertIsVisible(true);
  // hide popup alert by update alertIsVisible state to false
  const hideAlert = () => setAlertIsVisible(false);

  return {
    alertIsVisible,
    showAlert,
    hideAlert,
  };
};

export default useAlert;

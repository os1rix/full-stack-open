const Alert = ({ alert }) => {
  if (!alert) {
    return;
  } else {
    return <div className="alert">{alert}</div>;
  }
};

export default Alert;

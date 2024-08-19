const Alert = ({ alert, isError }) => {
  if (!alert) {
    return;
  } else if (isError) {
    return <div className="alert-error">{alert}</div>;
  } else {
    return <div className="alert-success">{alert}</div>;
  }
};

export default Alert;

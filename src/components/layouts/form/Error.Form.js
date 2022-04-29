// React
import { memo } from "react";

// Librarys
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { isString } from "@utils/Validations";

const ErrorForm = memo(({ title, color }) => {
  return (
    <div className="d-flex mt-2 align-items-center">
      <FontAwesomeIcon icon="exclamation-circle" color={color} />
      <span className="error-message d-block ms-1" style={{ color }}>{title}</span>
    </div>
  )
});

function renderError(error, color) {
  if (!error) return;

  const textColor = isString(color) ? color : "var(--bg-red)";
  return <ErrorForm title={error} color={textColor} />;
}

export { renderError };
export default ErrorForm;


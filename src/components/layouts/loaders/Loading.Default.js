// Librarys
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const Loading = ({ size, color, className }) => {
  return (
    <Spinner
      size={size}
      color={color}
      animation="border"
      role="status"
      className={className}
    />
  );
}

export default Loading;

Loading.propTypes = {
  size:  PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
}
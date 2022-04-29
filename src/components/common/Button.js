// React
import { Fragment, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";

// Components
import Loading from "@layouts/loaders/Loading.Default";

// Librarys
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { classnames } from '@utils/Helper'
import { isFunction } from "@utils/Validations";

const Button = forwardRef((props, ref) => {
  const {
    type,
    style,
    className,
    attributes,
    onClick,
    icon,
    title,
    titleClass,
    titleStyle,
    loading,
    textColor,
    backgroundColor,
  } = props;

  const [isLoading, setLoading] = useState(false);

  // Mostrar loading
  const showLoading = useCallback(() => setLoading(true), []);

  // Ocultar loading
  const hideLoading = useCallback(() => setLoading(false), []);

  // Evento 'click' en el botón
  const handleClick = useCallback((event) => {
    if (!isFunction(onClick)) return;

    onClick({
      event: event,
      showLoading: showLoading,
      hideLoading: hideLoading
    });
  }, props.executeAgainEventClick);

  // Renderizar 'loading'
  const renderLoading = useCallback(() => {
    return <Loading size="sm" {...loading} />
  }, [loading]);


  // Renderizar icon del boton
  const renderIcon = useCallback(() => {
    if (!icon) return;

    return (
      <FontAwesomeIcon
        size={icon.size}
        style={icon.style}
        color={icon.color}
        icon={icon.name || icon}
        className="me-1"
      />
    );
  }, [icon]);


  // Renderizar titulo del boton
  const renderTitle = useCallback(() => {
    if (!title) return;

    return <span style={titleStyle} className={titleClass}>{title}</span>;
  }, [title]);


  // Renderizar contenido del botón
  const renderContent = useCallback(() => {
    if (isLoading) return renderLoading();

    return (
      <Fragment>
        {renderIcon()}
        {renderTitle()}
      </Fragment>
    );
  }, [isLoading]);

  // Comprobar si el botón debe deshabilitarse o no
  const buttonDisabled = useMemo(() => {
    return loading ? isLoading : attributes.disabled;
  }, [loading, isLoading, attributes]);

  // Classes del botón
  const classes = classnames(["pointer", "scale", "border-0", className]);

  useImperativeHandle(ref, () => ({
    showLoading: showLoading,
    hideLoading: hideLoading
  }));

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={buttonDisabled}
      style={{
        ...style,
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      {...attributes}
    >
      {renderContent()}
    </button>
  );
});

export default Button;

Button.defaultProps = {
  icon: false,
  loading: false,
  type: "button",
  attributes: {},
  executeAgainEventClick: []
}

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  attributes: PropTypes.object,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  loading: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
}
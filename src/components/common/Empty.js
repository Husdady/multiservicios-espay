// Librarys
import Image from "next/image";
import PropTypes from "prop-types"

// Utils
import { classnames } from '@utils/Helper'

const Empty = ({ style, className, title, titleStyle, image, width, height }) => {
  const emptyClasses = classnames([
    "d-flex align-items-center mt-3 flex-column empty-content",
    className
  ])

  return (
    <div style={style} className={emptyClasses}>
    	{/* Imagen */}
      <div className="position-relative">
        <Image
          src={image}
          blurDataURL={image}
          loading="eager"
          objectFit="cover"
          placeholder="blur"
          width={width}
          height={height}
          alt="empty-image-content"
        />
      </div>

    	{/* Título */}
      <span className="title fw-bold text-secondary" style={titleStyle}>{title}</span>
    </div>
  );
}

export default Empty

Empty.defaultProps = {
  width: 400,
  height: 400,
};

Empty.propTypes = {
	image: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
  className: PropTypes.string,
}

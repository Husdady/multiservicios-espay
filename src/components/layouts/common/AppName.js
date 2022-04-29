// Components
import AppLogo from "./AppLogo";

// API
import { APP_NAME } from '@api/credentials'

// Utils
import { classnames } from '@utils/Helper'

const AppName = ({ className, titleStyle, titleClass  }) => {
  const titleClasses = classnames(["app-name", 'text-center', titleClass])

  return (
    <div className={className}>
  		{/* Logo de la app */}
      <AppLogo />

    	{/* Nombre de la app */}
      <h3 style={titleStyle} className={titleClasses}>
        {APP_NAME}
      </h3>
    </div>
  )
}

export default AppName;

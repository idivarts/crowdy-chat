import React from 'react'

const ImageComponent: React.FC<{
  url: any,
  className?: any,
  style?: any,
}> = ({
  url,
  className,
  style,
}) => {
    return (
      <img
        className={className}
        src={url}
        style={style}
        onError={(ev) => {
          ev.currentTarget.src = "/images/placeholder-image/png"
        }}
      />
    )
  }

export default ImageComponent

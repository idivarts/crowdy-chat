import React from 'react'

import PlaceHolderImage from '@/assets/images/placeholder-image.png'

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
        src={url || PlaceHolderImage}
        style={style}
      />
    )
  }

export default ImageComponent

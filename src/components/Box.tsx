import React, { CSSProperties, ReactNode } from 'react'

interface BoxProps {
  children: ReactNode
  isColumn?: boolean
  shouldWrap?: boolean
  gap?: number | string
  xAlign?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  yAlign?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  minWidth?: string | number
  maxHeight?: string | number
  minHeight?: string | number
  padding?: string | number
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  margin?: string | number
  marginTop?: string | number
  marginRight?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginCentered?: boolean
  className?: string
  style?: CSSProperties
}

const Box: React.FC<BoxProps> = ({
  children,
  isColumn = false,
  shouldWrap = false,
  gap = 0,
  xAlign = 'start',
  yAlign = 'start',
  width,
  height,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginCentered = false,
  className = '',
  style = {},
}) => {
  const flexDirection = isColumn ? 'flex-col' : 'flex-row'
  const wrap = shouldWrap ? 'flex-wrap' : 'flex-nowrap'
  const xAlignClass = isColumn ? getAlignItemsClass(xAlign) : getJustifyContentClass(xAlign)
  const yAlignClass = isColumn ? getJustifyContentClass(yAlign) : getAlignItemsClass(yAlign)

  // Updated gap handling
  let gapClass = ''
  let gapStyle = {}
  if (gap !== 0) {
    if (typeof gap === 'number') {
      gapClass = `gap-${gap}`
    } else {
      gapStyle = { gap: gap }
    }
  }

  const dimensionStyle = {
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(maxWidth !== undefined && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(minWidth !== undefined && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(maxHeight !== undefined && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(minHeight !== undefined && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
  }

  const paddingStyle = {
    ...(padding !== undefined && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
    ...(paddingTop !== undefined && { paddingTop: typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop }),
    ...(paddingRight !== undefined && { paddingRight: typeof paddingRight === 'number' ? `${paddingRight}px` : paddingRight }),
    ...(paddingBottom !== undefined && { paddingBottom: typeof paddingBottom === 'number' ? `${paddingBottom}px` : paddingBottom }),
    ...(paddingLeft !== undefined && { paddingLeft: typeof paddingLeft === 'number' ? `${paddingLeft}px` : paddingLeft }),
  }

  const marginStyle = {
    ...(margin !== undefined && { margin: typeof margin === 'number' ? `${margin}px` : margin }),
    ...(marginTop !== undefined && { marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop }),
    ...(marginRight !== undefined && { marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight }),
    ...(marginBottom !== undefined && { marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom }),
    ...(marginLeft !== undefined && { marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft }),
    ...(marginCentered && { marginLeft: 'auto', marginRight: 'auto' }),
  }

  const combinedStyle = {
    ...dimensionStyle,
    ...paddingStyle,
    ...marginStyle,
    ...gapStyle, // Add gapStyle to combinedStyle
    ...style,
  }

  return (
    <div className={`flex ${flexDirection} ${wrap} ${xAlignClass} ${yAlignClass} ${gapClass} ${className}`} style={combinedStyle}>
      {children}
    </div>
  )
}

function getJustifyContentClass(align: string): string {
  switch (align) {
    case 'start':
      return 'justify-start'
    case 'end':
      return 'justify-end'
    case 'center':
      return 'justify-center'
    case 'between':
      return 'justify-between'
    case 'around':
      return 'justify-around'
    case 'evenly':
      return 'justify-evenly'
    default:
      return 'justify-start'
  }
}

function getAlignItemsClass(align: string): string {
  switch (align) {
    case 'start':
      return 'items-start'
    case 'end':
      return 'items-end'
    case 'center':
      return 'items-center'
    case 'stretch':
      return 'items-stretch'
    case 'baseline':
      return 'items-baseline'
    default:
      return 'items-start'
  }
}

export default Box

import React from 'react'

const createSizeClass = (size) => {
  if (typeof size === 'number') {
    return `${size}px`
  }
  return size
}

const createAlignClass = (align, isColumn) => {
  const alignMap = {
    start: isColumn ? 'items-start' : 'justify-start',
    end: isColumn ? 'items-end' : 'justify-end',
    center: isColumn ? 'items-center' : 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }
  return alignMap[align] || ''
}

const createCrossAlignClass = (align, isColumn) => {
  const alignMap = {
    start: isColumn ? 'justify-start' : 'items-start',
    end: isColumn ? 'justify-end' : 'items-end',
    center: isColumn ? 'justify-center' : 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  }
  return alignMap[align] || ''
}

export const Layout = ({
  children,
  isColumn = false,
  shouldWrap = false,
  gap = 0,
  xAlign = 'start',
  yAlign = 'start',
  width = 'auto',
  height = 'auto',
  padding = 0,
  margin = 0,
  backgroundColor = 'transparent',
  borderRadius = 0,
  boxShadow = 'none',
  overflow = 'visible',
  className = '',
  style = {},
}) => {
  const flexDirection = isColumn ? 'flex-col' : 'flex-row'
  const flexWrap = shouldWrap ? 'flex-wrap' : 'flex-nowrap'
  const gapClass = typeof gap === 'number' ? `gap-${gap}` : `gap-[${gap}]`
  const mainAlignClass = createAlignClass(xAlign, isColumn)
  const crossAlignClass = createCrossAlignClass(yAlign, isColumn)
  const widthClass = `w-[${createSizeClass(width)}]`
  const heightClass = `h-[${createSizeClass(height)}]`
  const paddingClass = typeof padding === 'number' ? `p-${padding}` : `p-[${padding}]`
  const marginClass = typeof margin === 'number' ? `m-${margin}` : `m-[${margin}]`
  const borderRadiusClass = `rounded-[${borderRadius}]`
  const overflowClass = `overflow-${overflow}`

  const boxStyle = {
    ...style,
    backgroundColor,
    boxShadow,
  }

  const boxClasses = [
    'flex',
    flexDirection,
    flexWrap,
    gapClass,
    mainAlignClass,
    crossAlignClass,
    widthClass,
    heightClass,
    paddingClass,
    marginClass,
    borderRadiusClass,
    overflowClass,
    className,
  ].join(' ')

  return (
    <div className={boxClasses} style={boxStyle}>
      {children}
    </div>
  )
}
